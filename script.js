(function () {
  const cfg = window.ARTIST_CONFIG || {};
  const page = document.body.dataset.page || "home";

  const defaultAssets = {
    prefix: "placeholder",
    start: 1,
    end: 10,
    extension: ".png"
  };

  applyMetadata();
  applyThemeVariables();
  setupBackgroundSystem();
  setupBranding();
  setupNavigation();
  setupAbout();
  setupContact();

  const orderModal = setupOrderModal();
  const pieceImages = getPieceImages();

  if (page === "home") {
    renderPortfolio(pieceImages);
  }

  if (page === "pricing") {
    renderPricing(pieceImages, orderModal);
  }

  renderTestimonials();
  setupFooter();
  setupLightbox();
  setupScrollProgress();
  setupRevealAnimations();
  setupInteractiveCursor();
  setupTiltCards();
  setupParallax();
  setupSmoothScrolling();

  function applyMetadata() {
    const titleBase = (cfg.site && cfg.site.title) || "Artist Portfolio";
    if (page === "pricing") {
      document.title = titleBase + " | Pricing";
    } else if (page === "tos") {
      document.title = titleBase + " | TOS";
    } else {
      document.title = titleBase;
    }

    const description =
      (cfg.site && cfg.site.defaultPageDescription) || "Artist portfolio website";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    }

    const faviconPath = (cfg.site && cfg.site.faviconPath) || "icon.png";
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
      favicon.setAttribute("href", faviconPath);
    }
  }

  function applyThemeVariables() {
    const theme = cfg.theme || {};
    const root = document.documentElement;

    setVar(root, "--color-primary", theme.colorPrimary);
    setVar(root, "--color-secondary", theme.colorSecondary);
    setVar(root, "--color-accent", theme.colorAccent);
    setVar(root, "--color-text", theme.textColor);
    setVar(root, "--color-muted", theme.mutedTextColor);
    setVar(root, "--color-surface", theme.surfaceColor);
    setVar(root, "--color-surface-strong", theme.surfaceStrongColor);
    setVar(root, "--color-border", theme.borderColor);
    setVar(root, "--color-glow", theme.glowColor);
    setVar(root, "--selection", theme.selectionColor);

    if (theme.gradientSpeedSeconds) {
      setVar(root, "--gradient-speed", String(theme.gradientSpeedSeconds) + "s");
    }

    const animation = cfg.animation || {};
    if (animation.revealDistancePx != null) {
      setVar(root, "--reveal-distance", String(animation.revealDistancePx) + "px");
    }
    if (animation.revealDurationMs != null) {
      setVar(root, "--reveal-duration", String(animation.revealDurationMs) + "ms");
    }
    if (animation.revealStaggerMs != null) {
      setVar(root, "--reveal-stagger", String(animation.revealStaggerMs) + "ms");
    }
    if (animation.logoBounceDurationMs != null) {
      setVar(root, "--logo-bounce-duration", String(animation.logoBounceDurationMs) + "ms");
    }
    if (animation.logoGlowPulseDurationMs != null) {
      setVar(root, "--logo-glow-duration", String(animation.logoGlowPulseDurationMs) + "ms");
    }
    if (animation.cursorGlowSizePx != null) {
      setVar(root, "--cursor-glow-size", String(animation.cursorGlowSizePx) + "px");
    }
    if (animation.cursorDotSizePx != null) {
      setVar(root, "--cursor-dot-size", String(animation.cursorDotSizePx) + "px");
    }
    if (animation.cursorTrailSizePx != null) {
      setVar(root, "--cursor-trail-size", String(animation.cursorTrailSizePx) + "px");
    }
    if (animation.cursorAuraSizePx != null) {
      setVar(root, "--cursor-aura-size", String(animation.cursorAuraSizePx) + "px");
    }

    const testimonials = cfg.testimonials || {};
    if (testimonials.speedSeconds != null) {
      setVar(root, "--testimonial-speed", String(testimonials.speedSeconds) + "s");
    }
  }

  function setupBackgroundSystem() {
    const imagePath = cfg.site && cfg.site.backgroundImagePath;
    if (!imagePath) {
      enableAmbientParticles();
      return;
    }

    const image = new Image();
    image.onload = function () {
      document.body.classList.add("has-background-image");
      document.body.style.setProperty("--background-image", "url('" + imagePath + "')");
      const particles = document.getElementById("ambient-particles");
      if (particles) {
        particles.remove();
      }
    };
    image.onerror = function () {
      document.body.classList.remove("has-background-image");
      enableAmbientParticles();
    };
    image.src = imagePath;
  }

  function enableAmbientParticles() {
    const animation = cfg.animation || {};
    if (animation.enableAmbientParticles === false) {
      return;
    }

    if (document.getElementById("ambient-particles")) {
      return;
    }

    const container = document.createElement("div");
    container.className = "ambient-particles";
    container.id = "ambient-particles";
    container.setAttribute("aria-hidden", "true");

    const count = Number(animation.particleCount) || 24;
    const minSize = Number(animation.particleMinSizePx) || 2;
    const maxSize = Number(animation.particleMaxSizePx) || 7;

    for (let i = 0; i < count; i += 1) {
      const particle = document.createElement("span");
      particle.className = "ambient-particle";

      const size = randomInRange(minSize, maxSize);
      particle.style.width = String(size) + "px";
      particle.style.height = String(size) + "px";
      particle.style.left = String(randomInRange(0, 100)) + "%";
      particle.style.bottom = String(randomInRange(-25, 15)) + "%";
      particle.style.animationDuration = String(randomInRange(14, 36)) + "s";
      particle.style.animationDelay = String(randomInRange(-20, 0)) + "s";
      particle.style.opacity = String(randomInRange(0.2, 0.7));

      container.appendChild(particle);
    }

    document.body.appendChild(container);
  }

  function setupBranding() {
    const brandText = document.getElementById("brand-text");
    if (brandText) {
      brandText.textContent = (cfg.site && cfg.site.ownerName) || "Artist";
    }

    const heroTitle = document.getElementById("hero-title");
    if (heroTitle) {
      heroTitle.textContent = (cfg.site && cfg.site.title) || "Artist Portfolio";
    }

    const heroSubtitle = document.getElementById("hero-subtitle");
    if (heroSubtitle) {
      heroSubtitle.textContent = (cfg.hero && cfg.hero.subtitle) || "";
    }

    const heroBadge = document.getElementById("hero-badge");
    if (heroBadge) {
      const badgeText = (cfg.hero && cfg.hero.badgeText) || "Open For Commissions";
      heroBadge.innerHTML =
        "<span>" + escapeHtml(badgeText) + "</span>" + availabilityPillHtml();
    }

    const heroLogo = document.getElementById("hero-logo");
    if (heroLogo) {
      heroLogo.src = (cfg.site && cfg.site.logoPath) || "logo.png";
      heroLogo.alt = ((cfg.site && cfg.site.ownerName) || "Artist") + " logo";
    }

    const ctaPrimary = document.getElementById("hero-cta-primary");
    if (ctaPrimary) {
      ctaPrimary.textContent = (cfg.hero && cfg.hero.ctaPrimaryLabel) || "View Pieces";
      ctaPrimary.setAttribute("href", (cfg.hero && cfg.hero.ctaPrimaryHref) || "#portfolio");
    }

    const ctaSecondary = document.getElementById("hero-cta-secondary");
    if (ctaSecondary) {
      ctaSecondary.textContent = (cfg.hero && cfg.hero.ctaSecondaryLabel) || "See Pricing";
      ctaSecondary.setAttribute("href", (cfg.hero && cfg.hero.ctaSecondaryHref) || "pricing.html");
    }
  }

  function setupNavigation() {
    const navLinks = document.getElementById("nav-links");
    if (!navLinks) {
      return;
    }

    navLinks.innerHTML = "";
    const items = (cfg.navigation && cfg.navigation.items) || [];

    items.forEach(function (item) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = item.href;
      a.textContent = item.label;

      const normalized = normalizeHref(item.href);
      const current = normalizeHref(window.location.pathname.split("/").pop() || "index.html");
      if ((page === "home" && normalized === "index.html#home") || normalized === current) {
        a.classList.add("is-active");
      }
      if (page === "pricing" && normalized === "pricing.html") {
        a.classList.add("is-active");
      }

      li.appendChild(a);
      navLinks.appendChild(li);
    });

    const toggle = document.getElementById("nav-toggle");
    const nav = document.querySelector(".site-nav");
    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        const expanded = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!expanded));
        nav.classList.toggle("is-open");
      });

      navLinks.addEventListener("click", function (event) {
        if (event.target && event.target.tagName === "A") {
          nav.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    }
  }

  function setupAbout() {
    const heading = document.getElementById("about-heading");
    const intro = document.getElementById("about-intro");
    const body = document.getElementById("about-body");
    const avatar = document.getElementById("about-avatar");
    const stats = document.getElementById("about-stats");

    if (heading) {
      heading.textContent = (cfg.about && cfg.about.heading) || "About Me";
    }
    if (intro) {
      intro.textContent = (cfg.about && cfg.about.intro) || "";
    }
    if (body) {
      body.textContent = (cfg.about && cfg.about.body) || "";
    }
    if (avatar) {
      avatar.src = (cfg.about && cfg.about.avatarPath) || (cfg.site && cfg.site.logoPath) || "logo.png";
      avatar.alt = ((cfg.site && cfg.site.ownerName) || "Artist") + " avatar";
    }

    if (stats) {
      stats.innerHTML = "";
      const items = (cfg.about && cfg.about.stats) || [];
      items.forEach(function (item) {
        const card = document.createElement("div");
        card.className = "stat";
        card.innerHTML =
          "<strong>" +
          escapeHtml(item.value) +
          "</strong><span>" +
          escapeHtml(item.label) +
          "</span>";
        stats.appendChild(card);
      });
    }
  }

  function getPieceImages() {
    const assets = cfg.assets || {};
    const prefix = assets.piecePrefix || defaultAssets.prefix;
    const start = assets.pieceStartIndex || defaultAssets.start;
    const end = assets.pieceEndIndex || defaultAssets.end;
    const extension = assets.pieceExtension || defaultAssets.extension;

    const list = [];
    for (let i = start; i <= end; i += 1) {
      list.push(prefix + String(i) + extension);
    }
    return list;
  }

  function getPieceDetails(index) {
    const details = (cfg.assets && cfg.assets.pieceDetails) || [];
    return details[index] || {};
  }

  function renderPortfolio(images) {
    const heading = document.getElementById("portfolio-heading");
    const description = document.getElementById("portfolio-description");
    const grid = document.getElementById("portfolio-grid");

    if (heading) {
      heading.textContent = (cfg.portfolio && cfg.portfolio.heading) || "Selected Pieces";
    }

    if (description) {
      description.textContent =
        (cfg.portfolio && cfg.portfolio.description) ||
        "A curated look at recent work.";
    }

    if (!grid) {
      return;
    }

    grid.innerHTML = "";

    images.forEach(function (src, index) {
      const card = document.createElement("article");
      card.className = "portfolio-item reveal";
      card.setAttribute("data-reveal", "up");
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", "Preview piece " + String(index + 1));
      card.dataset.pieceIndex = String(index);

      const image = document.createElement("img");
      image.src = src;
      image.alt = "Portfolio piece " + String(index + 1);
      image.loading = "lazy";
      image.dataset.pieceIndex = String(index);
      image.classList.add("preview-image");
      image.addEventListener("error", function () {
        card.classList.add("missing-image");
      });

      const overlay = document.createElement("div");
      overlay.className = "portfolio-overlay";
      overlay.innerHTML =
        "<span>Piece " +
        String(index + 1).padStart(2, "0") +
        "</span><span>" +
        escapeHtml((cfg.portfolio && cfg.portfolio.hoverLabel) || "Open Piece") +
        "</span>";

      card.appendChild(image);
      card.appendChild(overlay);
      grid.appendChild(card);
    });
  }

  function renderPricing(images, orderModal) {
    const heading = document.getElementById("pricing-heading");
    const subheading = document.getElementById("pricing-subheading");
    const cards = document.getElementById("pricing-cards");
    const carouselConfig = (cfg.pricing && cfg.pricing.carousel) || {};

    if (carouselConfig.imageFit === "cover" || carouselConfig.imageFit === "contain") {
      document.documentElement.style.setProperty("--carousel-image-fit", carouselConfig.imageFit);
    }

    if (heading) {
      heading.textContent = (cfg.pricing && cfg.pricing.heading) || "Commission Pricing";
    }
    if (subheading) {
      subheading.textContent = (cfg.pricing && cfg.pricing.subheading) || "";
      const availability = getAvailability();
      const status = document.createElement("p");
      status.className = "availability-line";
      status.innerHTML =
        '<span class="availability-pill availability-' +
        availability.status +
        '"><span class="availability-dot"></span>' +
        escapeHtml(availability.label) +
        "</span> " +
        escapeHtml(availability.note);
      subheading.insertAdjacentElement("afterend", status);
    }

    if (cards) {
      cards.innerHTML = "";
      const entries = (cfg.pricing && cfg.pricing.cards) || [];
      entries.forEach(function (entry) {
        const card = document.createElement("article");
        card.className = "pricing-card reveal";
        card.setAttribute("data-reveal", "up");

        const title = document.createElement("h3");
        title.textContent = entry.title;

        const description = document.createElement("p");
        description.textContent = entry.description;

        const price = document.createElement("span");
        price.className = "price-tag";
        price.textContent = entry.price;

        const orderControl = createOrderControl(entry, orderModal);

        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(price);
        card.appendChild(orderControl);
        cards.appendChild(card);
      });
    }

    setupCarousel(images);
  }

  function createOrderControl(entry, orderModal) {
    const action = (cfg.pricing && cfg.pricing.orderAction) || {};
    const type = String(action.type || "modal").toLowerCase();
    const label = action.label || "Order Now";
    const webhookUrl = getDiscordWebhookUrl();

    if (!webhookUrl) {
      const disabledButton = document.createElement("button");
      disabledButton.className = "btn btn-secondary order-now-btn is-disabled";
      disabledButton.type = "button";
      disabledButton.disabled = true;
      disabledButton.textContent = label;
      disabledButton.title = action.missingWebhookLabel || "Set Discord webhook in config.js";
      return disabledButton;
    }

    if (type === "discord") {
      const link = document.createElement("a");
      link.className = "btn btn-secondary order-now-btn";
      link.href = action.discordUrl || ((cfg.contact && cfg.contact.discord && cfg.contact.discord.url) || "#");
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = label;
      link.addEventListener("click", function () {
        sendDiscordWebhook({
          content: "New order intent from pricing page.",
          embeds: [
            {
              title: "Order Intent",
              color: 16738728,
              fields: [
                { name: "Package", value: entry.title || "Custom", inline: true },
                { name: "Price", value: entry.price || "N/A", inline: true },
                { name: "Action", value: "Discord link", inline: true }
              ]
            }
          ]
        });
      });
      return link;
    }

    if (type === "email") {
      const link = document.createElement("a");
      link.className = "btn btn-secondary order-now-btn";
      const mailSubject = action.emailSubject || "Commission Request";
      const intro = action.emailBodyIntro || "Hi, I would like to order a commission.";
      const body =
        intro +
        "\n\nPackage: " +
        entry.title +
        "\nPrice Range: " +
        entry.price +
        "\n\nDetails:";
      const to = action.emailTo || ((cfg.contact && cfg.contact.email) || "Example@gmail.com");
      link.href =
        "mailto:" +
        String(to).trim() +
        "?subject=" +
        encodeURIComponent(mailSubject) +
        "&body=" +
        encodeURIComponent(body);
      link.textContent = label;
      link.addEventListener("click", function () {
        sendDiscordWebhook({
          content: "New order intent from pricing page.",
          embeds: [
            {
              title: "Order Intent",
              color: 16738728,
              fields: [
                { name: "Package", value: entry.title || "Custom", inline: true },
                { name: "Price", value: entry.price || "N/A", inline: true },
                { name: "Action", value: "Email prefill", inline: true }
              ]
            }
          ]
        });
      });
      return link;
    }

    const button = document.createElement("button");
    button.className = "btn btn-secondary order-now-btn";
    button.type = "button";
    button.textContent = label;
    button.addEventListener("click", function () {
      orderModal.open(entry);
    });
    return button;
  }

  function setupCarousel(images) {
    const track = document.getElementById("carousel-track");
    const dotsWrap = document.getElementById("carousel-dots");
    const prev = document.getElementById("carousel-prev");
    const next = document.getElementById("carousel-next");
    const container = document.getElementById("pricing-carousel");

    if (!track || !dotsWrap || !prev || !next || !container) {
      return;
    }

    track.innerHTML = "";
    dotsWrap.innerHTML = "";

    let index = 0;
    let timer = null;

    images.forEach(function (src, i) {
      const slide = document.createElement("figure");
      slide.className = "carousel-slide";

      const image = document.createElement("img");
      image.src = src;
      image.alt = "Carousel piece " + String(i + 1);
      image.loading = i === 0 ? "eager" : "lazy";
      image.className = "preview-image";
      image.dataset.pieceIndex = String(i);
      image.addEventListener("error", function () {
        slide.style.background = "linear-gradient(145deg, rgba(255,108,168,0.2), rgba(77,168,255,0.24))";
      });

      const caption = document.createElement("figcaption");
      caption.className = "carousel-caption";
      caption.textContent = "Piece " + String(i + 1).padStart(2, "0");

      slide.appendChild(image);
      slide.appendChild(caption);
      track.appendChild(slide);

      const dot = document.createElement("button");
      dot.className = "carousel-dot";
      dot.setAttribute("aria-label", "Go to slide " + String(i + 1));
      dot.addEventListener("click", function () {
        index = i;
        update();
        restart();
      });
      dotsWrap.appendChild(dot);
    });

    function update() {
      track.style.transform = "translateX(-" + String(index * 100) + "%)";
      const dots = dotsWrap.querySelectorAll(".carousel-dot");
      dots.forEach(function (dot, i) {
        dot.classList.toggle("is-active", i === index);
      });
    }

    function nextSlide() {
      index = (index + 1) % images.length;
      update();
    }

    function prevSlide() {
      index = (index - 1 + images.length) % images.length;
      update();
    }

    function start() {
      const carouselConfig = (cfg.pricing && cfg.pricing.carousel) || {};
      const autoPlay = carouselConfig.autoPlay !== false;
      if (!autoPlay || images.length < 2) {
        return;
      }
      const interval = carouselConfig.intervalMs || 3200;
      timer = window.setInterval(nextSlide, interval);
    }

    function stop() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    function restart() {
      stop();
      start();
    }

    prev.addEventListener("click", function () {
      prevSlide();
      restart();
    });

    next.addEventListener("click", function () {
      nextSlide();
      restart();
    });

    const carouselConfig = (cfg.pricing && cfg.pricing.carousel) || {};
    if (carouselConfig.pauseOnHover !== false) {
      container.addEventListener("mouseenter", stop);
      container.addEventListener("mouseleave", start);
    }

    update();
    start();
  }

  function setupContact() {
    const heading = document.getElementById("contact-heading");
    if (heading) {
      heading.textContent = (cfg.contact && cfg.contact.heading) || "Contact";
    }

    const phone = (cfg.contact && cfg.contact.phone) || "+1 (123)-123-1234";
    const email = (cfg.contact && cfg.contact.email) || "Example@gmail.com";

    const phoneEl = document.getElementById("contact-phone");
    if (phoneEl) {
      phoneEl.textContent = phone;
      phoneEl.href = "tel:" + phone.replace(/[^+\d]/g, "");
    }

    const emailEl = document.getElementById("contact-email");
    if (emailEl) {
      emailEl.textContent = email;
      emailEl.href = "mailto:" + email;
    }

    const location = document.getElementById("contact-location");
    if (location && cfg.contact && cfg.contact.locationLabel) {
      location.textContent = cfg.contact.locationLabel;
    }

    const contactCopy = document.querySelector(".contact-copy");
    const discord = cfg.contact && cfg.contact.discord;
    if (contactCopy && discord && discord.url) {
      const exists = document.getElementById("contact-discord");
      if (!exists) {
        const item = document.createElement("p");
        item.className = "contact-item";
        item.id = "contact-discord";
        item.innerHTML =
          '<span class="contact-icon" aria-hidden="true">' +
          socialIcon("discord") +
          "</span>" +
          '<a href="' +
          escapeHtml(discord.url) +
          '" target="_blank" rel="noopener noreferrer">' +
          escapeHtml((discord.label || "Discord") + ": " + (discord.username || "")) +
          "</a>";
        if (location) {
          location.insertAdjacentElement("beforebegin", item);
        } else {
          contactCopy.appendChild(item);
        }
      }
    }

    renderSocialButtons("contact-socials");
  }

  function renderTestimonials() {
    if (page !== "home") {
      return;
    }

    const testimonials = cfg.testimonials || {};
    const items = testimonials.items || [];
    if (!items.length) {
      return;
    }

    const contactSection = document.getElementById("contact");
    if (!contactSection || document.getElementById("testimonials")) {
      return;
    }

    const section = document.createElement("section");
    section.className = "section testimonials-section";
    section.id = "testimonials";

    const container = document.createElement("div");
    container.className = "container";

    const head = document.createElement("div");
    head.className = "section-head reveal";
    head.setAttribute("data-reveal", "up");
    head.innerHTML =
      "<h2>" +
      escapeHtml(testimonials.heading || "Testimonials") +
      "</h2><p>" +
      escapeHtml(testimonials.subheading || "Client feedback") +
      "</p>";

    const marquee = document.createElement("div");
    marquee.className = "testimonials-marquee reveal";
    marquee.setAttribute("data-reveal", "up");

    const track = document.createElement("div");
    track.className = "testimonials-track";

    const doubled = items.concat(items);
    doubled.forEach(function (item) {
      const card = document.createElement("article");
      card.className = "testimonial-card";

      const stars = "★".repeat(Math.max(1, Math.min(5, Number(item.stars) || 5)));
      card.innerHTML =
        '<p class="testimonial-stars">' +
        stars +
        "</p><p class=\"testimonial-text\">\"" +
        escapeHtml(item.text || "Great work!") +
        "\"</p><p class=\"testimonial-meta\">" +
        escapeHtml(item.name || "Client") +
        " · " +
        escapeHtml(item.choice || "Commission") +
        " · " +
        escapeHtml(item.price || "$0") +
        "</p>";

      track.appendChild(card);
    });

    marquee.appendChild(track);
    container.appendChild(head);
    container.appendChild(marquee);
    section.appendChild(container);

    contactSection.insertAdjacentElement("beforebegin", section);
  }

  function setupFooter() {
    const copy = document.getElementById("footer-copy");
    if (copy) {
      copy.textContent =
        (cfg.footer && cfg.footer.copyright) ||
        "Copyright " + String(new Date().getFullYear()) + " Artist. All rights reserved.";
    }

    const footerLinks = document.getElementById("footer-links");
    if (footerLinks) {
      footerLinks.innerHTML = "";
      const links = (cfg.footer && cfg.footer.quickLinks) || [];
      links.forEach(function (link) {
        const a = document.createElement("a");
        a.href = link.href;
        a.textContent = link.label;
        footerLinks.appendChild(a);
      });
    }

    renderSocialButtons("footer-socials");
  }

  function renderSocialButtons(targetId) {
    const wrap = document.getElementById(targetId);
    if (!wrap) {
      return;
    }

    wrap.innerHTML = "";
    const socials = (cfg.contact && cfg.contact.socials) || [];
    socials.forEach(function (social) {
      const a = document.createElement("a");
      a.className = "social-btn";
      a.href = social.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.innerHTML = socialIcon(social.name) + "<span>" + escapeHtml(social.name) + "</span>";
      wrap.appendChild(a);
    });
  }

  function setupRevealAnimations() {
    const revealElements = Array.from(document.querySelectorAll(".reveal"));
    if (!revealElements.length) {
      return;
    }

    revealElements.forEach(function (el, index) {
      el.style.transitionDelay =
        String(index * ((cfg.animation && cfg.animation.revealStaggerMs) || 90)) + "ms";
    });

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible", "is-glow");
            window.setTimeout(function () {
              entry.target.classList.remove("is-glow");
            }, 1200);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  function setupScrollProgress() {
    const animation = cfg.animation || {};
    if (animation.enableScrollProgress === false) {
      return;
    }

    if (document.getElementById("scroll-progress")) {
      return;
    }

    const wrap = document.createElement("div");
    wrap.className = "scroll-progress";
    wrap.id = "scroll-progress";

    const bar = document.createElement("span");
    bar.className = "scroll-progress-bar";
    wrap.appendChild(bar);
    document.body.appendChild(wrap);

    function updateProgress() {
      const doc = document.documentElement;
      const maxScroll = Math.max(doc.scrollHeight - window.innerHeight, 0);
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      bar.style.transform = "scaleX(" + String(Math.min(Math.max(progress, 0), 1)) + ")";
    }

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
  }

  function setupInteractiveCursor() {
    const animation = cfg.animation || {};
    const enabled = animation.enableInteractiveCursor !== false;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;

    const legacyGlow = document.getElementById("cursor-glow");
    if (legacyGlow) {
      legacyGlow.style.display = "none";
    }

    if (!enabled || isCoarse) {
      return;
    }

    const dot = document.createElement("span");
    dot.className = "cursor-dot";
    dot.setAttribute("aria-hidden", "true");

    const trail = document.createElement("span");
    trail.className = "cursor-trail";
    trail.setAttribute("aria-hidden", "true");

    const auraEnabled = animation.enableCursorGlow !== false;
    const aura = document.createElement("span");
    aura.className = "cursor-aura";
    aura.setAttribute("aria-hidden", "true");

    if (auraEnabled) {
      document.body.appendChild(aura);
    }
    document.body.appendChild(trail);
    document.body.appendChild(dot);
    document.body.classList.add("cursor-enhanced");

    const lag = Number(animation.cursorTrailLag) || 0.42;
    const auraLag = Number(animation.cursorAuraLag) || 0.24;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let trailX = targetX;
    let trailY = targetY;
    let auraX = targetX;
    let auraY = targetY;

    function tick() {
      trailX += (targetX - trailX) * lag;
      trailY += (targetY - trailY) * lag;
      auraX += (targetX - auraX) * auraLag;
      auraY += (targetY - auraY) * auraLag;

      dot.style.left = String(targetX) + "px";
      dot.style.top = String(targetY) + "px";
      trail.style.left = String(trailX) + "px";
      trail.style.top = String(trailY) + "px";
      if (auraEnabled) {
        aura.style.left = String(auraX) + "px";
        aura.style.top = String(auraY) + "px";
      }

      window.requestAnimationFrame(tick);
    }

    window.requestAnimationFrame(tick);

    function onMove(event) {
      targetX = event.clientX;
      targetY = event.clientY;

      const hovered = document.elementFromPoint(event.clientX, event.clientY);
      const interactive =
        hovered &&
        hovered.closest(
          "a, button, .btn, .portfolio-item, .preview-image, .social-btn, .pricing-card, input, textarea, select, label"
        );

      document.body.classList.toggle("cursor-hover", Boolean(interactive));
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", function () {
      document.body.classList.add("cursor-pressed");
    });
    window.addEventListener("mouseup", function () {
      document.body.classList.remove("cursor-pressed");
    });
    window.addEventListener("mouseleave", function () {
      document.body.classList.remove("cursor-hover", "cursor-pressed");
    });
  }

  function setupTiltCards() {
    const animation = cfg.animation || {};
    if (animation.enableTiltCards === false) {
      return;
    }

    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const maxX = Number(animation.tiltMaxXDeg) || 8;
    const maxY = Number(animation.tiltMaxYDeg) || 10;

    const cards = Array.from(
      document.querySelectorAll(
        ".hero-copy, .about-media, .contact-panel, .portfolio-item, .pricing-card, .carousel, .testimonial-card"
      )
    );

    cards.forEach(function (card) {
      card.classList.add("tilt-card");

      function move(event) {
        const rect = card.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;

        const rotateY = (px - 0.5) * maxY * 2;
        const rotateX = (0.5 - py) * maxX * 2;

        card.style.setProperty("--mx", String((px * 100).toFixed(1)) + "%");
        card.style.setProperty("--my", String((py * 100).toFixed(1)) + "%");
        card.style.transform =
          "perspective(900px) rotateX(" +
          String(rotateX.toFixed(2)) +
          "deg) rotateY(" +
          String(rotateY.toFixed(2)) +
          "deg) translateY(-2px)";
      }

      function reset() {
        card.style.transform = "";
      }

      card.addEventListener("mousemove", move);
      card.addEventListener("mouseleave", reset);
      card.addEventListener("blur", reset, true);
    });
  }

  function setupParallax() {
    const enabled = cfg.animation && cfg.animation.enableParallax;
    if (!enabled) {
      return;
    }

    const heroLogoWrap = document.querySelector(".hero-logo-wrap");
    if (!heroLogoWrap) {
      return;
    }

    window.addEventListener(
      "scroll",
      function () {
        const y = window.scrollY * 0.08;
        heroLogoWrap.style.transform = "translateY(" + String(y) + "px)";
      },
      { passive: true }
    );
  }

  function setupSmoothScrolling() {
    const anchors = document.querySelectorAll('a[href*="#"]');
    anchors.forEach(function (link) {
      link.addEventListener("click", function (event) {
        const href = link.getAttribute("href") || "";
        if (!href.includes("#")) {
          return;
        }

        const parts = href.split("#");
        const hash = parts[1];
        if (!hash) {
          return;
        }

        const currentFile = window.location.pathname.split("/").pop() || "index.html";
        const targetFile = parts[0] || currentFile;
        if (normalizeHref(targetFile) !== normalizeHref(currentFile)) {
          return;
        }

        const target = document.getElementById(hash);
        if (!target) {
          return;
        }

        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", "#" + hash);
      });
    });
  }

  function setupLightbox() {
    if (document.getElementById("art-lightbox")) {
      return;
    }

    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.id = "art-lightbox";
    lightbox.setAttribute("aria-hidden", "true");
    lightbox.innerHTML =
      '<div class="lightbox-panel">' +
      '<button class="lightbox-close" type="button" aria-label="Close preview">✕</button>' +
      '<img class="lightbox-image" src="" alt="Artwork preview" />' +
      '<div class="lightbox-info">' +
      '<h3 class="lightbox-title"></h3>' +
      '<p class="lightbox-description"></p>' +
      '<div class="lightbox-tags"></div>' +
      "</div>" +
      "</div>";

    document.body.appendChild(lightbox);

    const image = lightbox.querySelector(".lightbox-image");
    const title = lightbox.querySelector(".lightbox-title");
    const description = lightbox.querySelector(".lightbox-description");
    const tags = lightbox.querySelector(".lightbox-tags");
    const closeBtn = lightbox.querySelector(".lightbox-close");

    function closeLightbox() {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.classList.remove("modal-open");
    }

    function openLightbox(src, pieceIndex, alt) {
      const details = getPieceDetails(pieceIndex);
      image.src = src;
      image.alt = alt || "Artwork preview";
      title.textContent = details.title || ("Piece " + String(pieceIndex + 1).padStart(2, "0"));
      description.textContent = details.description || "";

      tags.innerHTML = "";
      const list = Array.isArray(details.tags) ? details.tags : [];
      list.forEach(function (tag) {
        const chip = document.createElement("span");
        chip.className = "lightbox-tag";
        chip.textContent = tag;
        tags.appendChild(chip);
      });

      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
    }

    document.addEventListener("click", function (event) {
      const trigger = event.target.closest(".preview-image");
      if (!trigger) {
        return;
      }

      event.preventDefault();
      const pieceIndex = Number(trigger.dataset.pieceIndex || "0");
      openLightbox(trigger.currentSrc || trigger.src, pieceIndex, trigger.alt);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        if (lightbox.classList.contains("is-open")) {
          closeLightbox();
        }
      }

      if (event.key === "Enter") {
        const focusedCard = document.activeElement && document.activeElement.closest(".portfolio-item");
        if (focusedCard) {
          const pieceIndex = Number(focusedCard.dataset.pieceIndex || "0");
          const imageEl = focusedCard.querySelector("img");
          if (imageEl) {
            openLightbox(imageEl.currentSrc || imageEl.src, pieceIndex, imageEl.alt);
          }
        }
      }
    });

    closeBtn.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }

  function setupOrderModal() {
    const modal = document.createElement("div");
    modal.className = "order-modal";
    modal.id = "order-modal";
    modal.setAttribute("aria-hidden", "true");

    modal.innerHTML =
      '<div class="order-modal-panel">' +
      '<button class="order-modal-close" type="button" aria-label="Close order form">✕</button>' +
      '<h3>Start Your Order</h3>' +
      '<p class="order-modal-subtitle">Send your request details and references.</p>' +
      '<p class="order-selected" id="order-selected-package"></p>' +
      '<form id="order-form" class="order-form">' +
      '<label>Name<input type="text" name="name" required /></label>' +
      '<label>Email<input type="email" name="email" required /></label>' +
      '<label>Details<textarea name="details" rows="4" placeholder="Style, mood, references, deadline..."></textarea></label>' +
      '<button class="btn btn-primary" type="submit">Send Order Request</button>' +
      "</form>" +
      '<p class="order-form-status" id="order-form-status" aria-live="polite"></p>' +
      "</div>";

    document.body.appendChild(modal);

    const closeButton = modal.querySelector(".order-modal-close");
    const selected = modal.querySelector("#order-selected-package");
    const form = modal.querySelector("#order-form");
    const status = modal.querySelector("#order-form-status");

    let activeEntry = null;

    function close() {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("modal-open");
      if (status) {
        status.textContent = "";
      }
      activeEntry = null;
      if (form) {
        form.reset();
      }
    }

    function open(entry) {
      activeEntry = entry || null;
      if (selected) {
        selected.textContent = activeEntry
          ? "Selected: " + activeEntry.title + " (" + activeEntry.price + ")"
          : "Selected: Custom Commission";
      }
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
    }

    closeButton.addEventListener("click", close);
    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        close();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && modal.classList.contains("is-open")) {
        close();
      }
    });

    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      const action = (cfg.pricing && cfg.pricing.orderAction) || {};
      const intro = action.emailBodyIntro || "Hi, I would like to order a commission.";
      const webhookUrl = getDiscordWebhookUrl();
      const submitButton = form.querySelector('button[type="submit"]');

      if (!webhookUrl) {
        if (status) {
          status.textContent = action.missingWebhookLabel || "Discord webhook is not configured.";
        }
        return;
      }

      const data = new FormData(form);
      const details = String(data.get("details") || "").trim();

      const payload = {
        content: "New commission order submitted.",
        embeds: [
          {
            title: "Commission Order",
            color: 4883199,
            description: intro,
            fields: [
              { name: "Package", value: activeEntry ? activeEntry.title : "Custom", inline: true },
              { name: "Price Range", value: activeEntry ? activeEntry.price : "N/A", inline: true },
              { name: "Name", value: String(data.get("name") || "Unknown"), inline: true },
              { name: "Email", value: String(data.get("email") || "Unknown"), inline: true },
              { name: "Details", value: details || "No extra details provided.", inline: false }
            ],
            footer: {
              text: "Commission Order"
            },
            timestamp: new Date().toISOString()
          }
        ]
      };

      if (submitButton) {
        submitButton.disabled = true;
      }

      try {
        await sendDiscordWebhook(payload);
        if (status) {
          status.textContent = "Order sent to Discord webhook.";
        }
        window.setTimeout(close, 450);
      } catch (error) {
        if (status) {
          status.textContent = "Failed to send webhook. Check webhook URL and browser network policy.";
        }
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
        }
      }
    });

    return {
      open: open,
      close: close
    };
  }

  function availabilityPillHtml() {
    const availability = getAvailability();
    return (
      '<span class="availability-pill availability-' +
      availability.status +
      '"><span class="availability-dot"></span>' +
      escapeHtml(availability.label) +
      "</span>"
    );
  }

  function getAvailability() {
    const availability = cfg.availability || {};
    const status = String(availability.status || "open").toLowerCase();

    return {
      status: ["open", "limited", "closed"].includes(status) ? status : "open",
      label: availability.label || "Open",
      note: availability.note || ""
    };
  }

  function getDiscordWebhookUrl() {
    const action = (cfg.pricing && cfg.pricing.orderAction) || {};
    return String(action.discordWebhookUrl || "").trim();
  }

  async function sendDiscordWebhook(payload) {
    const webhookUrl = getDiscordWebhookUrl();
    if (!webhookUrl) {
      throw new Error("Webhook URL missing");
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
      keepalive: true
    });

    if (!response.ok) {
      throw new Error("Webhook request failed with status " + String(response.status));
    }
  }

  function socialIcon(name) {
    const key = String(name || "").toLowerCase();
    if (key.includes("instagram")) {
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-5 3.8A5.2 5.2 0 1 1 6.8 13 5.2 5.2 0 0 1 12 7.8zm0 2A3.2 3.2 0 1 0 15.2 13 3.2 3.2 0 0 0 12 9.8zm5.4-3.2a1.2 1.2 0 1 1-1.2 1.2 1.2 1.2 0 0 1 1.2-1.2z"/></svg>';
    }
    if (key.includes("behance")) {
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h6.5a4.2 4.2 0 0 1 2.6.7 2.9 2.9 0 0 1 1.1 2.4 2.9 2.9 0 0 1-1.6 2.8 3 3 0 0 1 2 3c0 2.6-2 4.1-5 4.1H4V6zm2.4 2v3h3.7c1.2 0 1.8-.6 1.8-1.6S11.3 8 10 8H6.4zm0 5v3.7h4c1.3 0 2.1-.6 2.1-1.8s-.8-1.9-2.2-1.9H6.4zM16 8h5v1.4h-5V8zm0 3.6c0-2.7 1.8-4.4 4.5-4.4S25 8.9 25 11.8v.8h-6.8c.2 1.3 1 2.1 2.4 2.1 1 0 1.8-.4 2.1-1h2c-.4 2-2.1 3.4-4.2 3.4-2.9 0-4.5-2-4.5-4.5zm2.3-.8h4.3c-.1-1.2-.9-1.9-2-1.9s-1.9.7-2.3 1.9z"/></svg>';
    }
    if (key.includes("artstation")) {
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 18.5h10.7l-2.4-4.2H5.5L3 18.5zm11.6 0H21L10.5 0h-6l10.1 18.5zM8.3 9.8h5.8L8.6 0H2.9l5.4 9.8z"/></svg>';
    }
    if (key.includes("discord")) {
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.3 4.4A16.8 16.8 0 0 0 16.2 3l-.2.5a14 14 0 0 1 4 1.5 12.8 12.8 0 0 0-3.6-1.2 16.3 16.3 0 0 0-8.8 0A12.8 12.8 0 0 0 4 5a14 14 0 0 1 4-1.5L7.8 3a16.8 16.8 0 0 0-4.1 1.4C1.1 8.3.3 12.1.7 15.8a16.8 16.8 0 0 0 5.1 2.6l1.1-1.7a10.8 10.8 0 0 1-1.7-.8l.4-.3a12.1 12.1 0 0 0 10.8 0l.4.3c-.6.3-1.2.6-1.8.8l1.1 1.7a16.8 16.8 0 0 0 5.1-2.6c.5-4.3-.8-8.1-3.9-11.4zM8.7 13.5c-1 0-1.8-1-1.8-2.1s.8-2.1 1.8-2.1c1 0 1.8 1 1.8 2.1s-.8 2.1-1.8 2.1zm6.6 0c-1 0-1.8-1-1.8-2.1s.8-2.1 1.8-2.1c1 0 1.8 1 1.8 2.1s-.8 2.1-1.8 2.1z"/></svg>';
    }
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 3h4.5l3.4 5L15.6 3H20l-5.9 8.4L20.5 21H16l-4.1-6.1L7.5 21H3l6.2-8.9L4 3z"/></svg>';
  }

  function setVar(root, name, value) {
    if (value != null && value !== "") {
      root.style.setProperty(name, String(value));
    }
  }

  function normalizeHref(href) {
    return String(href || "").trim().toLowerCase();
  }

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  function escapeHtml(input) {
    return String(input || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
})();
