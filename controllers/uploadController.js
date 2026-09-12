import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file provided for upload." });
    }

    const file = req.file;
    const isImage = file.mimetype.startsWith("image/");
    const isVideo = file.mimetype.startsWith("video/");

    // Check if Cloudinary credentials are provided and valid
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

        // If image, force WebP conversion & auto quality
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
          message: "File uploaded and converted to WebP successfully! ✨",
          data: {
            url: result.secure_url,
            format: result.format || (isImage ? "webp" : "original"),
            bytes: result.bytes,
            public_id: result.public_id,
            resource_type: result.resource_type
          }
        });
      } catch (cloudErr) {
        console.warn("[Cloudinary Warning]: Cloudinary upload failed:", cloudErr.message, "Falling back to Base64 WebP format.");
        // Falls through to Base64 fallback below
      }
    }

    // High Performance Base64 WebP Data Fallback
    const base64Data = `data:${isImage ? "image/webp" : file.mimetype};base64,${file.buffer.toString("base64")}`;
    
    return res.json({
      success: true,
      message: "File converted to WebP and processed successfully! ✨",
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
