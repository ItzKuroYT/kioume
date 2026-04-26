# Artist Portfolio Template

A modern, animated portfolio website template for artists, illustrators, and commission creators.

This is the first release of the template and is ready to publish. It includes a premium visual style, smooth interactions, and a fully configurable content system powered by one file: `config.js`.

---

## Listing Description (Short)

Modern artist portfolio template with animated hero, artwork lightbox, pricing page carousel, testimonials marquee, interactive cursor effects, mobile-friendly design, and configurable order flow. All content and behavior are editable from one config file.

## Listing Description (Long)

Artist Portfolio Template is built to look high-end out of the box while staying easy to customize. It includes a polished landing page, portfolio gallery, full pricing page, contact and socials, animated effects, and commission-ready order actions.

The entire site is driven by `config.js`, so you can quickly change branding, colors, links, pricing, and section content without rewriting core files.

---

## Features

### Site Structure

- Multi-page setup:
  - `index.html` for Home, About, Portfolio, Testimonials, Contact
  - `pricing.html` for Carousel, Pricing cards, and Order actions
- Sticky navigation with smooth scrolling
- Footer links and social links

### Design and Motion

- Animated hero logo with bounce and glow
- Smooth reveal animations across sections
- Gradient background with optional image background support
- Ambient particles and glow accents when no custom background is provided
- Scroll progress bar at the top of the page
- Interactive card tilt and spotlight effect on desktop pointers

### Portfolio and Preview

- Portfolio grid for 10 artworks (`placeholder1.png` to `placeholder10.png`)
- Hover effects on artwork cards
- Fullscreen lightbox preview with title, description, and tags
- Close via button, outside click, or Escape key

### Pricing and Orders

- Autoplay image carousel with controls and dots
- Default pricing cards:
  - Headshot
  - Uncolored Sketch
  - Colored
  - Full Body
- Per-card Order button
- Configurable order behavior (modal, Discord, email)
- Discord webhook integration for order notifications
- Order buttons are disabled until webhook is configured

### Contact and Socials

- Contact details (phone, email, location)
- Discord contact line support
- Social icon buttons auto-matched by social name

### Testimonials and Status

- Animated testimonials marquee (stars, names, quote, choice, price)
- Availability status chips:
  - Open
  - Limited
  - Closed

### Mobile Support

- Responsive layout for desktop/tablet/mobile
- Mobile nav menu
- Cursor enhancements auto-disabled on touch devices
- Modal, lightbox, and testimonials tuned for smaller screens

---

## Quick Start

1. Place the template files in your project folder.
2. Add required image assets (see Asset Requirements below).
3. Open `config.js` and update branding, text, pricing, links, and effects.
4. Open `index.html` in a browser.
5. Open `pricing.html` to verify carousel and order actions.

---

## Configuration Guide

All customizations are in `config.js`.

- `site`: title, owner name, logo path, favicon, background image, SEO description
- `theme`: color palette, surface colors, glow, text and border values
- `animation`: reveal timing, cursor controls, particles, parallax, progress, tilt
- `availability`: current commission status and note
- `navigation`: menu items and links
- `hero`: landing heading text and CTA links
- `about`: biography text, avatar, profile stats
- `assets`: image prefix/range/extension and per-piece metadata
- `portfolio`: section heading, description, hover label
- `pricing`: section text, carousel options, order action settings, pricing cards
- `contact`: phone/email/location, Discord details, socials
- `testimonials`: heading, speed, testimonials list
- `footer`: copyright and footer quick links

---

## Discord Webhook Setup (Orders)

To enable clickable Order buttons, set:

- `pricing.orderAction.discordWebhookUrl`

Behavior:

- If webhook URL is empty, Order buttons are disabled.
- If webhook URL is set, order actions can send notifications to Discord.

---

## File Map

- `index.html` main page layout
- `pricing.html` pricing and order page
- `styles.css` all styling and animation rules
- `script.js` rendering and interaction logic
- `config.js` single source of editable content/settings

---

## Asset Requirements

Required:

- `logo.png`
- `icon.png`
- `placeholder1.png` to `placeholder10.png`

Optional:

- `background.png`

If `background.png` is missing, the site automatically uses animated gradient plus ambient particles.

---

## Publish Checklist

Before publishing this template:

1. Replace placeholder images with your own sample art.
2. Update `site.title`, owner name, and branding links.
3. Set a real Discord webhook URL if you want live order notifications.
4. Confirm social links and contact info.
5. Test on desktop and mobile viewport sizes.

---

## License / Usage

Use this template for personal or commercial portfolio projects. Replace placeholder text and media before public release.
