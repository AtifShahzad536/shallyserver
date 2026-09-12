import mongoose from "mongoose";

const siteSettingSchema = new mongoose.Schema(
  {
    siteTitle: { type: String, default: "SHALLY ✨ Creative Content & Digital Experiences" },
    tagline: { type: String, default: "Social Media Marketing • Content Writing • Video Editing" },
    email: { type: String, default: "hello@shallycreates.com" },
    phone: { type: String, default: "+1 (555) 234-5678" },
    location: { type: String, default: "Worldwide Remote / EST Orbit" },
    
    // Hero Section Configuration
    hero: {
      availabilityText: { type: String, default: "Available for Select Brand Collaborations & Retainers" },
      isAvailable: { type: Boolean, default: true },
      titleGreeting: { type: String, default: "Hi, I'm" },
      titleName: { type: String, default: "Shally" },
      titleLine2: { type: String, default: "Creative Content &" },
      titleLine3: { type: String, default: "Digital Experiences" },
      description: { type: String, default: "Blending magnetic Social Media Marketing, conversion-focused Editorial Copywriting, and high-energy Cinematic Video Editing to make modern brands impossible to ignore." },
      chip1: { type: String, default: "Social Media Growth" },
      chip2: { type: String, default: "Editorial Copywriting" },
      chip3: { type: String, default: "Short-Form Video Production" },
      previewImage: { type: String, default: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80" },
      motto: { type: String, default: "Design for emotion. Edit for rhythm. Write for conversion." },
      stat1Val: { type: String, default: "18M+" },
      stat1Label: { type: String, default: "Organic Video Views" },
      stat2Val: { type: String, default: "+340%" },
      stat2Label: { type: String, default: "Avg Client Social Lift" },
      stat3Val: { type: String, default: "46.2%" },
      stat3Label: { type: String, default: "Email Open Rate Record" },
      stat4Val: { type: String, default: "99.8%" },
      stat4Label: { type: String, default: "Client Satisfaction" }
    },

    // Video Workspace Section Configuration
    videoWorkspace: {
      badgeText: { type: String, default: "NLE TIMELINE WORKSPACE" },
      headlinePrefix: { type: String, default: "Crafting" },
      headlineHighlight: { type: String, default: "Hypnotic Edits" },
      headlineSuffix: { type: String, default: "Frame by Frame" },
      description: { type: String, default: "Short-form video editing isn't just cutting clips—it's psychological pacing, rhythmic sound design, speed ramps, and retention engineering." },
      videoPreviewUrl: { type: String, default: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80" },
      subtitleHookText: { type: String, default: "“STOP LOSING 70% OF SCROLLERS IN THE FIRST 3 SECONDS.”" },
      trackV2Label: { type: String, default: "[3s HOOK TITLE]" },
      trackV1Label: { type: String, default: "HOOK_CLIP_A.mp4" },
      trackA1Label: { type: String, default: "WHOOSH_01" },
      trackA2Label: { type: String, default: "VIRAL_TIKTOK_AUDIO_TREND.wav (128 BPM)" }
    },

    socialLinks: {
      whatsapp: { type: String, default: "https://wa.me/15552345678" },
      facebook: { type: String, default: "https://facebook.com/shally.creates" },
      instagram: { type: String, default: "https://instagram.com/shally.creates" },
      tiktok: { type: String, default: "https://tiktok.com/@shallytok" },
      linkedin: { type: String, default: "https://linkedin.com/in/shally-creative" },
      behance: { type: String, default: "https://behance.net/shally-portfolio" }
    },
    seo: {
      metaTitle: { type: String, default: "Shally — Creative Portfolio & Studio" },
      metaDescription: { type: String, default: "Premium portfolio of Shally: Social Media, Copywriting & Video Editing." },
      keywords: { type: String, default: "social media, video editing, copywriting, portfolio, creative director" }
    }
  },
  { timestamps: true }
);

export const SiteSetting = mongoose.model("SiteSetting", siteSettingSchema);
