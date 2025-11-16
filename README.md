# GlassArtista & Magnolia Tiffany Studio

A multilingual Next.js website showcasing architectural decorative glass works and handcrafted Tiffany lamps.

## Overview

This project presents two distinct brands:

- **GlassArtista** - Architectural and interior decorative glass works including stained-glass domes, glass canopies, entrance doors, skylights, and modern glass windows
- **Magnolia Tiffany Studio** - Handcrafted Tiffany lamps based on original Louis Comfort Tiffany designs

## Features

- **Multilingual Support**: Available in Hungarian (hu), German (de), and English (en)
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Interactive Animations**: Smooth scrolling effects and carousel presentations using Framer Motion
- **Contact Form**: Integrated contact form with reCAPTCHA validation
- **Modern UI**: Built with Hero UI (NextUI) and Tailwind CSS

## Tech Stack

- **Framework**: Next.js 15+ with App Router
- **UI Library**: Hero UI (NextUI), React Icons
- **Styling**: Tailwind CSS, Animate.css
- **Animations**: Framer Motion
- **Forms**: React Hook Form, reCAPTCHA
- **Language**: JavaScript (React)

## Project Structure
```
app/
├── [lang]/                          # Language-based routing
│   ├── page.js                      # Landing page with dual brand selection
│   ├── (glassartista)/              # GlassArtista section
│   │   ├── home/page.js             # GlassArtista home page
│   │   └── contact/page.js          # Contact form
│   └── tiffanystudio/               # Tiffany Studio section
│       └── page.js                  # Tiffany Studio showcase
├── components/                      # Reusable components
│   └── carousel.js                  # Image and text carousel components
└── api/                            # API routes
└── contact/                        # Contact form handler
```

## Available Languages

- `hu` - Hungarian (Magyar)
- `de` - German (Deutsch) - Default locale
- `en` - English

## Key Pages

- `/[lang]` - Landing page with brand selection
- `/[lang]/home` - GlassArtista information page
- `/[lang]/contact` - Contact form
- `/[lang]/tiffanystudio` - Tiffany Studio showcase with interactive scroll

## Contact Information

- **Email**: info@glassartista.com
- **Instagram**: [@glassartista\_h](https://www.instagram.com/glassartista_h)
- **Facebook**: [GlassArtista](https://www.facebook.com/glassartistah)
- **YouTube**: [@GlassArtista](https://www.youtube.com/@GlassArtista)

## License

© 2025 GlassArtista. All rights reserved.