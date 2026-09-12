import mongoose from "mongoose";

const siteSettingSchema = new mongoose.Schema(
  {
    siteTitle: { type: String, default: "SHALLY ✨ Creative Content & Digital Experiences" },
    tagline: { type: String, default: "Social Media Marketing • Content Writing • Video Editing" },
    email: { type: String, default: "hello@shallycreates.com" },
    phone: { type: String, default: "+1 (555) 234-5678" },
    location: { type: String, default: "Worldwide Remote / EST Orbit" },
    
    // 1. Hero Section Configuration
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

    // 2. Video Workspace Section Configuration
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

    // 3. About Section Configuration
    about: {
      badgeText: { type: String, default: "BEHIND THE CREATIVE VISION" },
      headlinePrefix: { type: String, default: "Meet" },
      headlineName: { type: String, default: "Shally" },
      headlineSuffix: { type: String, default: "— Digital Creator & Strategist" },
      bioParagraph1: { type: String, default: "I live at the intersection of visual psychology, high-retention video cutting, and hypnotic editorial copy." },
      bioParagraph2: { type: String, default: "Over the past 5+ years, I've helped boutique luxury brands, disruptive tech founders, and ambitious lifestyle creators break through algorithm fatigue. My philosophy is simple: attention isn't given; it is engineered with artistic taste and rhythm." },
      portraitImage: { type: String, default: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80" },
      statusBadge: { type: String, default: "Based in Digital Nomad Orbit" },
      timezone: { type: String, default: "EST / GMT" },
      hobbyTitle: { type: String, default: "Fueled By Iced Matcha" },
      hobbySub: { type: String, default: "& 90s Cyberpunk Soundtracks" },
      pillar1Title: { type: String, default: "Rhythmic Storytelling" },
      pillar1Desc: { type: String, default: "Every edit, paragraph, and reel is scored like music with intentional cadence, tension, and release." },
      pillar2Title: { type: String, default: "Psychological Hooks" },
      pillar2Desc: { type: String, default: "Capturing attention in the first 3 seconds through visual curiosity, bold statements, and pattern interrupts." },
      pillar3Title: { type: String, default: "Dark-Luxe Aesthetics" },
      pillar3Desc: { type: String, default: "Elevated, editorial visuals that stand apart from generic templates and cheap commercial noise." },
      stat1: { type: String, default: "5+ Years Active Production" },
      stat2: { type: String, default: "45+ Campaigns Shipped" },
      stat3: { type: String, default: "100% On-Time Track Record" }
    },

    // 4. Social Ecosystem Section Configuration
    socialEcosystem: {
      badgeText: { type: String, default: "SOCIAL MEDIA ECOSYSTEM" },
      headlinePrefix: { type: String, default: "Strategy + Aesthetics +" },
      headlineHighlight: { type: String, default: "Viral Growth" },
      description: { type: String, default: "We don't post random content. Every piece is engineered with psychological 3-second hooks, aesthetic curation, and strategic CTA funnels that build loyal brand cults." },
      reel1Tag: { type: String, default: "#OrganicSkincare" },
      reel1Views: { type: String, default: "1.4M" },
      reel1Caption: { type: String, default: "POV: You finally found the 3-step routine that fixes dull barrier damage in 7 days ✨🧴" },
      reel1Image: { type: String, default: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80" },
      reel2Tag: { type: String, default: "#FashionAesthetics" },
      reel2Views: { type: String, default: "2.8M" },
      reel2Caption: { type: String, default: "How to style vintage leather jackets for aesthetic night outs in NYC 🖤⚡" },
      reel2Image: { type: String, default: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80" },
      reel3Tag: { type: String, default: "#MatchaRituals" },
      reel3Views: { type: String, default: "3.2M" },
      reel3Caption: { type: String, default: "The sound of ceremonial matcha on a rainy Sunday morning in Tokyo 🍵🌧️" },
      reel3Image: { type: String, default: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80" }
    },

    // 5. Content Writing Section Configuration
    contentWriting: {
      badgeText: { type: String, default: "EDITORIAL CONTENT LAB" },
      headlineQuote: { type: String, default: "“Words that make people stop scrolling & start caring.”" },
      description: { type: String, default: "Whether it's poetic brand storytelling, high-retention video scripts, or conversion-driven website copy, every syllable is engineered to captivate attention and drive decisive action." },
      manifestoTitle: { type: String, default: "The modern luxury of intentional stillness." },
      manifestoSub: { type: String, default: "Crafted for a high-end botanical fragrance house in Milan." },
      manifestoBody: { type: String, default: "In an era of endless noise and hyper-stimulation, true luxury is the quiet confidence of knowing exactly who you are. We don't bottle scents to mask reality; we distill moments of profound clarity." },
      hooksTitle: { type: String, default: "3 uncomfortable truths about building in public in 2026." },
      hooksSub: { type: String, default: "Designed for a tech founder's LinkedIn & Twitter personal brand." },
      hooksBody: { type: String, default: "Most creators obsess over vanity views while their bank accounts starve. Here is the framework we used to turn 1,200 engaged followers into a $42,000 monthly consulting engine." }
    },

    // 6. Contact & Footer Info
    contact: {
      badgeText: { type: String, default: "PROJECT INITIATION & BOOKING" },
      headlinePrefix: { type: String, default: "Let's Build Something" },
      headlineHighlight: { type: String, default: "Iconic Together." },
      description: { type: String, default: "Currently accepting select brand collaborations, high-impact retainer partnerships, and creative strategy sprints." },
      availabilityStatus: { type: String, default: "Accepting Q1/Q2 Retainers" }
    },

    // 7. Social Links
    socialLinks: {
      whatsapp: { type: String, default: "https://wa.me/15552345678" },
      facebook: { type: String, default: "https://facebook.com/shally.creates" },
      instagram: { type: String, default: "https://instagram.com/shally.creates" },
      tiktok: { type: String, default: "https://tiktok.com/@shallytok" },
      linkedin: { type: String, default: "https://linkedin.com/in/shally-creative" },
      behance: { type: String, default: "https://behance.net/shally-portfolio" }
    },

    // 8. SEO Metadata
    seo: {
      metaTitle: { type: String, default: "Shally — Creative Portfolio & Studio" },
      metaDescription: { type: String, default: "Premium portfolio of Shally: Social Media, Copywriting & Video Editing." },
      keywords: { type: String, default: "social media, video editing, copywriting, portfolio, creative director" }
    }
  },
  { timestamps: true }
);

export const SiteSetting = mongoose.model("SiteSetting", siteSettingSchema);
