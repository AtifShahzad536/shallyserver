import { SiteSetting } from "../models/SiteSetting.js";
import { getDbStatus } from "../config/db.js";

const defaultSettings = {
  siteTitle: "SHALLY ✨ Creative Content & Digital Experiences",
  tagline: "Social Media Marketing • Content Writing • Video Editing",
  email: "hello@shallycreates.com",
  phone: "+1 (555) 234-5678",
  location: "Worldwide Remote / EST Orbit",

  hero: {
    availabilityText: "Available for Select Brand Collaborations & Retainers",
    isAvailable: true,
    titleGreeting: "Hi, I'm",
    titleName: "Shally",
    titleLine2: "Creative Content &",
    titleLine3: "Digital Experiences",
    description: "Blending magnetic Social Media Marketing, conversion-focused Editorial Copywriting, and high-energy Cinematic Video Editing to make modern brands impossible to ignore.",
    chip1: "Social Media Growth",
    chip2: "Editorial Copywriting",
    chip3: "Short-Form Video Production",
    previewImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    motto: "Design for emotion. Edit for rhythm. Write for conversion.",
    stat1Val: "18M+",
    stat1Label: "Organic Video Views",
    stat2Val: "+340%",
    stat2Label: "Avg Client Social Lift",
    stat3Val: "46.2%",
    stat3Label: "Email Open Rate Record",
    stat4Val: "99.8%",
    stat4Label: "Client Satisfaction"
  },

  videoWorkspace: {
    badgeText: "NLE TIMELINE WORKSPACE",
    headlinePrefix: "Crafting",
    headlineHighlight: "Hypnotic Edits",
    headlineSuffix: "Frame by Frame",
    description: "Short-form video editing isn't just cutting clips—it's psychological pacing, rhythmic sound design, speed ramps, and retention engineering.",
    videoPreviewUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    subtitleHookText: "“STOP LOSING 70% OF SCROLLERS IN THE FIRST 3 SECONDS.”",
    trackV2Label: "[3s HOOK TITLE]",
    trackV1Label: "HOOK_CLIP_A.mp4",
    trackA1Label: "WHOOSH_01",
    trackA2Label: "VIRAL_TIKTOK_AUDIO_TREND.wav (128 BPM)"
  },

  socialLinks: {
    whatsapp: "https://wa.me/15552345678",
    facebook: "https://facebook.com/shally.creates",
    instagram: "https://instagram.com/shally.creates",
    tiktok: "https://tiktok.com/@shallytok",
    linkedin: "https://linkedin.com/in/shally-creative",
    behance: "https://behance.net/shally-portfolio"
  },
  seo: {
    metaTitle: "Shally — Creative Portfolio & Studio",
    metaDescription: "Premium portfolio of Shally: Social Media, Copywriting & Video Editing.",
    keywords: "social media, video editing, copywriting, portfolio, creative director"
  }
};

let inMemorySettings = { ...defaultSettings };

export const getSettings = async (req, res) => {
  try {
    if (getDbStatus()) {
      let settings = await SiteSetting.findOne();
      if (!settings) {
        settings = new SiteSetting(defaultSettings);
        await settings.save();
      }
      return res.json({ success: true, data: settings });
    }
    return res.json({ success: true, data: inMemorySettings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSettings = async (req, res) => {
  try {
    const data = req.body;
    if (getDbStatus()) {
      let settings = await SiteSetting.findOneAndUpdate({}, data, { new: true, upsert: true });
      return res.json({ success: true, message: "Site settings saved successfully!", data: settings });
    } else {
      inMemorySettings = {
        ...inMemorySettings,
        ...data,
        hero: { ...inMemorySettings.hero, ...(data.hero || {}) },
        videoWorkspace: { ...inMemorySettings.videoWorkspace, ...(data.videoWorkspace || {}) },
        socialLinks: { ...inMemorySettings.socialLinks, ...(data.socialLinks || {}) },
        seo: { ...inMemorySettings.seo, ...(data.seo || {}) }
      };
      return res.json({ success: true, message: "Site settings saved successfully!", data: inMemorySettings });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
