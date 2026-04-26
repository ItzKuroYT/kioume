window.ARTIST_CONFIG = {
  site: {
    title: "Kioume's Art Portfolio",
    ownerName: "Kioume",
    tagline: "A template for artists to showcase their work and commissions with style.",
    logoPath: "logo.png",
    faviconPath: "icon.png",
    backgroundImagePath: "background.png",
    defaultPageDescription:
      "Kioume's art portfolio features vibrant character pieces, dynamic poses, and expressive designs. Explore a curated selection of artwork and commission options to bring your vision to life.",
  },

  theme: {
    colorPrimary: "#ff6ca8",
    colorSecondary: "#4da8ff",
    colorAccent: "#8be9fd",
    textColor: "#f4f7ff",
    mutedTextColor: "#c6d0e6",
    surfaceColor: "rgba(11, 16, 35, 0.58)",
    surfaceStrongColor: "rgba(16, 22, 44, 0.78)",
    borderColor: "rgba(173, 201, 255, 0.24)",
    glowColor: "rgba(122, 188, 255, 0.45)",
    gradientSpeedSeconds: 18,
    selectionColor: "rgba(255, 108, 168, 0.35)"
  },

  animation: {
    revealDistancePx: 26,
    revealDurationMs: 760,
    revealStaggerMs: 90,
    logoBounceDurationMs: 2200,
    logoGlowPulseDurationMs: 3600,
    enableParallax: true,
    enableCursorGlow: true,
    cursorGlowSizePx: 260,
    enableInteractiveCursor: true,
    cursorDotSizePx: 10,
    cursorTrailSizePx: 34,
    cursorTrailLag: 0.42,
    cursorAuraSizePx: 180,
    cursorAuraLag: 0.24,
    enableScrollProgress: true,
    enableTiltCards: true,
    tiltMaxXDeg: 8,
    tiltMaxYDeg: 10,
    enableAmbientParticles: true,
    particleCount: 24,
    particleMinSizePx: 2,
    particleMaxSizePx: 7
  },

  availability: {
    status: "open",
    label: "Open",
    note: "Commissions are currently open"
  },

  navigation: {
    mobileBreakpointPx: 900,
    items: [
      { label: "Home", href: "index.html#home" },
      { label: "About", href: "index.html#about" },
      { label: "Portfolio", href: "index.html#portfolio" },
      { label: "Pricing", href: "pricing.html" },
      { label: "TOS", href: "tos.html" },
      { label: "Contact", href: "index.html#contact" }
    ]
  },

  hero: {
    subtitle: "Welcome to My Art Portfolio",
    ctaPrimaryLabel: "View Pieces",
    ctaPrimaryHref: "#portfolio",
    ctaSecondaryLabel: "See Pricing",
    ctaSecondaryHref: "pricing.html",
    badgeText: "Commissions Status"
  },

  about: {
    heading: "About Me",
    intro:
      "Hi! I'm Kioume, a passionate artist with over 8 years of experience creating vibrant character art. I specialize in blending sketch-driven concepts with layered digital painting to bring characters to life. My work focuses on clean silhouettes, rich color accents, and expressive designs that resonate with clients worldwide.",
    body:
      "Whether you're looking for a simple headshot or a fully rendered character piece, I bring dedication and creativity to every commission. I love collaborating with clients to understand their vision and deliver artwork that exceeds expectations. Let's create something amazing together!",
    avatarPath: "logo.png",
    stats: [
      { label: "Years Creating", value: "9+" },
      { label: "Commissioned Pieces", value: "27+" },
      { label: "Global Clients", value: "30+" }
    ]
  },

  assets: {
    piecePrefix: "placeholder",
    pieceStartIndex: 1,
    pieceEndIndex: 10,
    pieceExtension: ".png",
    pieceDetails: [
      {
        title: "placeholder",
        description: "placeholder",
        tags: ["placeholder"]
      },
      {
        title: "placeholder",
        description: "placeholder",
        tags: ["placeholder"]
      },
      {
        title: "placeholder",
        description: "placeholder",
        tags: ["placeholder"]
      },
      {
        title: "placeholder",
        description: "placeholder",
        tags: ["placeholder"]
      },
      {
        title: "placeholder",
        description: "placeholder",
        tags: ["placeholder"]
      },
      {
        title: "placeholder",
        description: "placeholder",
        tags: ["placeholder"]
      },
      {
        title: "placeholder",
        description: "placeholder",
        tags: ["placeholder"]
      },
      {
        title: "placeholder",
        description: "placeholder",
        tags: ["placeholder"]
      },
      {
        title: "placeholder",
        description: "placeholder",
        tags: ["placeholder"]
      },
      {
        title: "placeholder",
        description: "placeholder",
        tags: ["placeholder"]
      }
    ]
  },

  portfolio: {
    heading: "Selected Pieces",
    description:
      "Take a look at my most recent art pieces!",
    hoverLabel: "Open Piece"
  },

  pricing: {
    heading: "Commission Pricing",
    subheading:
      "Choose a commission type and finish level.",
    carousel: {
      autoPlay: true,
      intervalMs: 5200,
      pauseOnHover: true,
      imageFit: "contain"
    },
    orderAction: {
      type: "modal",
      label: "Order Now",
      discordWebhookUrl: "https://discord.com/api/webhooks/1497778992592326847/AL6q5g-wszX1rPpEAxV-rjktqQZ2hdb0mZ_x9d7pfNr1PGHUAgSLh5F7rj50QyIoqeqh",
      missingWebhookLabel: "Set Discord webhook in config",
      discordUrl: "https://discord.gg/example",
      emailTo: "isaaccooper926@gmail.com",
      emailSubject: "New Commission Request",
      emailBodyIntro: "Hi, I would like to order a commission."
    },
    cards: [
      {
        title: "Headshot",
        description: "Sketch: $5\nLineart + Flat color: $10\nRendered: $15",
        price: "$5 / $10 / $15"
      },
      {
        title: "Half-Body",
        description: "Sketch: $15\nLineart + Flat color: $20\nRendered: $25",
        price: "$15 / $20 / $25"
      },
      {
        title: "Full Body",
        description: "Sketch: $25\nLineart + Flat color: $30\nRendered: $35",
        price: "$25 / $30 / $35"
      },
      {
        title: "Chibis + YCH",
        description: "Sketch: $5\nLineart + Flat color: $10\nRendered: $15",
        price: "$5 / $10 / $15"
      },
      {
        title: "Reference Sheets",
        description: "Flat fee: $20",
        price: "$20"
      }
    ]
  },

  contact: {
    heading: "Contact",
    phone: "No phone number set",
    email: "No email set",
    locationLabel: "Remote Worldwide",
    discord: {
      label: "Discord",
      username: "whimsicalmutt_",
      url: "https://discord.gg/kfgTkjHwKh"
    },
    socials: [
      { name: "Instagram", url: "https://instagram.com" },
      { name: "Behance", url: "https://behance.net" },
      { name: "ArtStation", url: "https://artstation.com" },
      { name: "X", url: "https://x.com" },
      { name: "Discord", url: "https://discord.gg/example" }
    ]
  },

  testimonials: {
    heading: "Kind Words",
    subheading: "What clients say about commissions",
    speedSeconds: 32,
    items: [
      {
        name: "Isaac C.",
        stars: 5,
        text: "This was actually THE BEST commission, Thanks for the new discord pfp!",
        choice: "Headshot + Uncolored Sketch",
        price: "$0 (service for service)"
      },
      {
        name: "@kittybrew2",
        stars: 5,
        text: "OH MY GOD IM SCREAMING HE LOOKS SO PRETTY, TYSM!!",
        choice: "Headshot + pose",
        price: "$20"
      },
      {
        name: "@sugarykiwi",
        stars: 5,
        text: "Ahh so cute!!!",
        choice: "Full Body",
        price: "$60"
      },
      {
        name: "@gator_mutt",
        stars: 4,
        text: "AHHHH ITS SO GOOD",
        choice: "Uncolored Sketch",
        price: "$15"
      },
      {
        name: "@reedleey",
        stars: 5,
        text: "ITS SO GOOD I WILL BE COMMISSIONING AGAIN, OMG!!!",
        choice: "Uncolored Sketch",
        price: "$15"
      }
    ]
  },

  footer: {
    copyright: "Copyright 2026 ItzKuroYT. All rights reserved.",
    quickLinks: [
      { label: "Home", href: "index.html#home" },
      { label: "Portfolio", href: "index.html#portfolio" },
      { label: "Pricing", href: "pricing.html" },
      { label: "TOS", href: "tos.html" },
      { label: "Contact", href: "index.html#contact" }
    ]
  }
};
