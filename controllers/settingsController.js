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

  about: {
    badgeText: "BEHIND THE CREATIVE VISION",
    headlinePrefix: "Meet",
    headlineName: "Shally",
    headlineSuffix: "— Digital Creator & Strategist",
    bioParagraph1: "I live at the intersection of visual psychology, high-retention video cutting, and hypnotic editorial copy.",
    bioParagraph2: "Over the past 5+ years, I've helped boutique luxury brands, disruptive tech founders, and ambitious lifestyle creators break through algorithm fatigue. My philosophy is simple: attention isn't given; it is engineered with artistic taste and rhythm.",
    portraitImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
    statusBadge: "Based in Digital Nomad Orbit",
    timezone: "EST / GMT",
    hobbyTitle: "Fueled By Iced Matcha",
    hobbySub: "& 90s Cyberpunk Soundtracks",
    pillar1Title: "Rhythmic Storytelling",
    pillar1Desc: "Every edit, paragraph, and reel is scored like music with intentional cadence, tension, and release.",
    pillar2Title: "Psychological Hooks",
    pillar2Desc: "Capturing attention in the first 3 seconds through visual curiosity, bold statements, and pattern interrupts.",
    pillar3Title: "Dark-Luxe Aesthetics",
    pillar3Desc: "Elevated, editorial visuals that stand apart from generic templates and cheap commercial noise.",
    stat1: "5+ Years Active Production",
    stat2: "45+ Campaigns Shipped",
    stat3: "100% On-Time Track Record"
  },

  socialEcosystem: {
    badgeText: "SOCIAL MEDIA ECOSYSTEM",
    headlinePrefix: "Strategy + Aesthetics +",
    headlineHighlight: "Viral Growth",
    description: "We don't post random content. Every piece is engineered with psychological 3-second hooks, aesthetic curation, and strategic CTA funnels that build loyal brand cults.",
    reel1Tag: "#OrganicSkincare",
    reel1Views: "1.4M",
    reel1Caption: "POV: You finally found the 3-step routine that fixes dull barrier damage in 7 days ✨🧴",
    reel1Image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
    reel2Tag: "#FashionAesthetics",
    reel2Views: "2.8M",
    reel2Caption: "How to style vintage leather jackets for aesthetic night outs in NYC 🖤⚡",
    reel2Image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80",
    reel3Tag: "#MatchaRituals",
    reel3Views: "3.2M",
    reel3Caption: "The sound of ceremonial matcha on a rainy Sunday morning in Tokyo 🍵🌧️",
    reel3Image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80"
  },

  contentWriting: {
    badgeText: "EDITORIAL CONTENT LAB",
    headlineQuote: "Words that make people stop scrolling & start caring.",
    description: "Whether it's poetic brand storytelling, high-retention video scripts, or conversion-driven website copy, every syllable is engineered to captivate attention and drive decisive action.",
    manifestoTitle: "The modern luxury of intentional stillness.",
    manifestoSub: "Crafted for a high-end botanical fragrance house in Milan.",
    manifestoBody: "In an era of endless noise and hyper-stimulation, true luxury is the quiet confidence of knowing exactly who you are. We don't bottle scents to mask reality; we distill moments of profound clarity.",
    hooksTitle: "3 uncomfortable truths about building in public in 2026.",
    hooksSub: "Designed for a tech founder's LinkedIn & Twitter personal brand.",
    hooksBody: "Most creators obsess over vanity views while their bank accounts starve. Here is the framework we used to turn 1,200 engaged followers into a $42,000 monthly consulting engine."
  },

  contact: {
    badgeText: "PROJECT INITIATION & BOOKING",
    headlinePrefix: "Let's Build Something",
    headlineHighlight: "Iconic Together.",
    description: "Currently accepting select brand collaborations, high-impact retainer partnerships, and creative strategy sprints.",
    availabilityStatus: "Accepting Q1/Q2 Retainers"
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
        about: { ...inMemorySettings.about, ...(data.about || {}) },
        socialEcosystem: { ...inMemorySettings.socialEcosystem, ...(data.socialEcosystem || {}) },
        contentWriting: { ...inMemorySettings.contentWriting, ...(data.contentWriting || {}) },
        contact: { ...inMemorySettings.contact, ...(data.contact || {}) },
        socialLinks: { ...inMemorySettings.socialLinks, ...(data.socialLinks || {}) },
        seo: { ...inMemorySettings.seo, ...(data.seo || {}) }
      };
      return res.json({ success: true, message: "Site settings saved successfully!", data: inMemorySettings });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
