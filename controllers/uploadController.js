import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
import { Media } from "../models/Media.js";
import { getDbStatus } from "../config/db.js";

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file provided for upload." });
    }

    const file = req.file;
    const isImage = file.mimetype.startsWith("image/");
    const isVideo = file.mimetype.startsWith("video/");

    // 1. Check if Cloudinary credentials are provided and valid
    const hasCloudinary = process.env.CLOUDINARY_CLOUD_NAME && 
      process.env.CLOUDINARY_CLOUD_NAME !== "demo" && 
      process.env.CLOUDINARY_API_KEY && 
      process.env.CLOUDINARY_API_KEY !== "1234567890" &&
      process.env.CLOUDINARY_API_SECRET &&
      process.env.CLOUDINARY_API_SECRET !== "abcdefghijklmnopqrstuvwxyz";

    if (hasCloudinary) {
      try {
        const uploadOptions = {
          folder: "shally_portfolio",
          resource_type: isVideo ? "video" : "auto",
        };

        if (isImage) {
          uploadOptions.format = "webp";
          uploadOptions.quality = "auto:good";
        }

        const streamUpload = () => {
          return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
              if (result) {
                resolve(result);
              } else {
                reject(error);
              }
            });
            streamifier.createReadStream(file.buffer).pipe(stream);
          });
        };

        const result = await streamUpload();

        return res.json({
          success: true,
          message: "File uploaded to Cloudinary successfully! ✨",
          data: {
            url: result.secure_url,
            format: result.format || (isImage ? "webp" : "original"),
            bytes: result.bytes,
            public_id: result.public_id,
            resource_type: result.resource_type
          }
        });
      } catch (cloudErr) {
        console.warn("[Cloudinary Warning]: Cloudinary upload failed:", cloudErr.message, "Falling back to MongoDB Media storage.");
      }
    }

    // 2. Persistent MongoDB Media Storage Fallback (Generates direct streaming URL)
    if (getDbStatus()) {
      try {
        const media = new Media({
          filename: file.originalname || (isVideo ? "video.webm" : "image.webp"),
          contentType: file.mimetype || (isVideo ? "video/webm" : "image/webp"),
          size: file.size || file.buffer.length,
          data: file.buffer,
          public_id: "media_" + Date.now()
        });

        await media.save();

        const host = req.get("host") || "shallyserver.vercel.app";
        const protocol = req.protocol === "http" && host.includes("vercel.app") ? "https" : req.protocol;
        const mediaUrl = `${protocol}://${host}/api/media/${media._id}`;

        return res.json({
          success: true,
          message: "File stored & ready for fast streaming! ✨",
          data: {
            url: mediaUrl,
            format: isImage ? "webp" : file.mimetype.split("/")[1] || "video",
            bytes: file.size || file.buffer.length,
            public_id: media._id.toString(),
            resource_type: isImage ? "image" : isVideo ? "video" : "raw"
          }
        });
      } catch (dbErr) {
        console.warn("[Media DB Warning]: Failed to save to MongoDB Media collection:", dbErr.message);
      }
    }

    // 3. Fallback Base64 Data (Only if MongoDB not connected)
    const base64Data = `data:${isImage ? "image/webp" : file.mimetype};base64,${file.buffer.toString("base64")}`;
    
    return res.json({
      success: true,
      message: "File processed successfully! ✨",
      data: {
        url: base64Data,
        format: isImage ? "webp" : file.mimetype.split("/")[1] || "file",
        bytes: file.size,
        public_id: "local_" + Date.now(),
        resource_type: isImage ? "image" : isVideo ? "video" : "raw"
      }
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ success: false, message: error.message || "Failed to process upload." });
  }
};

// Stream Media with HTTP 206 Partial Content support for videos & images
export const getMediaById = async (req, res) => {
  try {
    const { id } = req.params;
    const media = await Media.findById(id);

    if (!media || !media.data) {
      return res.status(404).json({ success: false, message: "Media not found." });
    }

    const totalSize = media.size || media.data.length;
    const contentType = media.contentType || "video/webm";
    const range = req.headers.range;

    // HTTP Range streaming for videos (allows scrubbing & instant playback)
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : totalSize - 1;
      const chunkSize = end - start + 1;

      res.writeHead(206, {
        "Content-Range": `bytes ${start}-${end}/${totalSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable"
      });

      const bufferSlice = media.data.slice(start, end + 1);
      return res.end(bufferSlice);
    }

    // Full file delivery
    res.writeHead(200, {
      "Content-Length": totalSize,
      "Content-Type": contentType,
      "Accept-Ranges": "bytes",
      "Cache-Control": "public, max-age=31536000, immutable"
    });

    return res.end(media.data);
  } catch (error) {
    console.error("Get Media error:", error);
    res.status(500).json({ success: false, message: error.message || "Error retrieving media." });
  }
};
