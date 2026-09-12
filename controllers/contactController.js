import { Contact } from "../models/Contact.js";
import { getDbStatus } from "../config/db.js";

let inMemoryInquiries = [
  {
    id: "inq_1",
    _id: "inq_1",
    name: "Elena Rostova",
    email: "elena@luminabeauty.com",
    service: "Social Media Growth & Management",
    budget: "$3,000 - $6,000",
    timeline: "Within 2-4 Weeks",
    message: "We need an aesthetic viral TikTok & Reels campaign for our new night serum launch in Paris.",
    status: "New",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
  },
  {
    id: "inq_2",
    _id: "inq_2",
    name: "Marcus Vance",
    email: "marcus@voguestreet.com",
    service: "Short-Form Video Editing (Reels/TikTok)",
    budget: "$1,500 - $3,000",
    timeline: "Immediately (< 2 Weeks)",
    message: "Need 12 high-energy fashion cuts with sound design and speed ramps for Milan Fashion Week.",
    status: "Contacted",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
  },
  {
    id: "inq_3",
    _id: "inq_3",
    name: "Sophia Chen",
    email: "sophia@nexuslabs.ai",
    service: "Editorial Content & Copywriting",
    budget: "$6,000+ Enterprise / Retainer",
    timeline: "Ongoing Monthly Partnership",
    message: "Looking for monthly retainer copywriter to craft our founder thought leadership and product launch emails.",
    status: "Closed",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString()
  }
];

export const submitContact = async (req, res) => {
  try {
    const { name, email, service, budget, message, timeline } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please provide your name, email, and project message."
      });
    }

    const newInquiry = {
      id: "inq_" + Date.now(),
      name,
      email,
      service: service || "General Inquiry",
      budget: budget || "Flexible",
      timeline: timeline || "Flexible",
      message,
      status: "New",
      createdAt: new Date().toISOString()
    };

    if (getDbStatus()) {
      const contactRecord = new Contact(newInquiry);
      await contactRecord.save();
    } else {
      inMemoryInquiries.unshift(newInquiry);
    }

    console.log(`[New Contact Inquiry from ${name} (${email})]: "${message.slice(0, 40)}..."`);

    return res.status(201).json({
      success: true,
      message: "Thank you, your message has reached Shally! She will respond within 24 hours.",
      data: newInquiry
    });
  } catch (error) {
    console.error("Contact Submission Error:", error);
    res.status(500).json({ success: false, message: "Server error processing your inquiry." });
  }
};

export const getContactSubmissions = async (req, res) => {
  try {
    if (getDbStatus()) {
      let contacts = await Contact.find().sort({ createdAt: -1 });
      if (contacts.length === 0) {
        await Contact.insertMany(inMemoryInquiries);
        contacts = await Contact.find().sort({ createdAt: -1 });
      }
      return res.json({ success: true, count: contacts.length, data: contacts });
    }
    return res.json({ success: true, count: inMemoryInquiries.length, data: inMemoryInquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (getDbStatus()) {
      const updated = await Contact.findOneAndUpdate(
        { $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }] },
        { status },
        { new: true }
      );
      return res.json({ success: true, message: "Inquiry status updated!", data: updated });
    } else {
      const idx = inMemoryInquiries.findIndex((c) => c.id === id || c._id === id);
      if (idx !== -1) {
        inMemoryInquiries[idx].status = status;
        return res.json({ success: true, message: "Inquiry status updated!", data: inMemoryInquiries[idx] });
      }
      return res.status(404).json({ success: false, message: "Inquiry not found." });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    if (getDbStatus()) {
      await Contact.findOneAndDelete({ $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }] });
    } else {
      inMemoryInquiries = inMemoryInquiries.filter((c) => c.id !== id && c._id !== id);
    }
    return res.json({ success: true, message: "Inquiry deleted successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
