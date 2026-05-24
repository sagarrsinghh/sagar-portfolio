# 🕸️ The Amazing Spider-Verse Portfolio: Developer & Director Deck

A highly immersive, cinematic, dual-mode portfolio built around the theme of the **Spider-Verse**. It features fluid animations, atmospheric audio-visual dashboards, and real-time environmental elements (rain, lightning, fog, and storm dust) to create a breathtaking user experience.

Developed by **Sagar Singh** as a showcase of creative coding and cinematic video production.

---

## 🚀 Live Demo & Portals
*   **Live Portfolio**: *[Deploying to Vercel]*
*   **GitHub Repository**: [github.com/sagarrsinghh/sagar-portfolio](https://github.com/sagarrsinghh/sagar-portfolio)

---

## 🎨 Dual-Deck Architecture

This portfolio operates on a **state-driven Dual-Deck layout**, seamlessly shifting between two distinct professional universes via a custom-designed animated transition sweep:

### 1. 🛰️ The Developer Deck (Tech Mode)
*   **Target Audience**: Tech recruiters, software engineering firms, and full-stack collaborators.
*   **Focus**: Scalable full-stack systems, modern frontends, and complex interactive UI designs.
*   **Key Sections**: 
    *   **Hero Reveal**: An interactive mask reveal that dynamically peels back the Spiderman face to reveal the developer on mouse cursor tracking.
    *   **About & Origin Story**: A cinematic introduction text followed by expandable 3D Glassmorphic stats cards.
    *   **Technical Toolkit**: Specialized cards displaying expert skills in React, NestJS, Tailwind, and MySQL.
    *   **Project-Verse**: A custom horizontal scrolling track with 3D modal views, expandable code features lists, and GitHub repo integrations.
    *   **Contact Hub**: Supports encrypted AJAX email transmissions using custom JSON FormSubmit pipelines.

### 🎬 The Director Deck (Video Mode)
*   **Target Audience**: Content agencies, film producers, and creators looking for premium video edits.
*   **Focus**: Professional cinematography, high-impact travel vlogs, viral reels, and color grading.
*   **Key Sections**:
    *   **Cinema Viewfinder HUD Hero**: An interactive camera HUD simulation featuring uncompressed cinematic play previews.
    *   **Selected Timeline Edits**: A dual-grid catalog highlighting landscape (16:9/21:9) cinema edits and vertical (9:16) reels/shorts.
    *   **Director's Story**: A timeline highlighting creative achievements, brand collaborations, and algorithmic reach.
    *   **Direct Contact Pipeline**: Supports direct WhatsApp chat draft generation and instant SMS links.

---

## 🛠️ Premium Interactive Features

*   **🕸️ Dynamic Web Curtain Transition**: Precise state transitions happening mid-sweep to load different decks flawlessly without reloading the browser.
*   **🎵 Cinematic Audio Dashboard**: Integrated audio players with global sound control featuring custom background music (Sunflower) and realistic environmental audio overlays.
*   **🌪️ Atmospheric Climate Controllers**: Fully responsive Canvas particles rendering heavy rain, dynamic lightning flash matching, wind dust, and creeping fog.
*   **👁️ Radial Reveal Masking**: GPU-accelerated cursor masking using radial gradients and smooth spring physics.
*   **🧬 3D Glassmorphism Cards**: Premium aesthetic layouts using vanilla CSS backdrops, harmonic HSL colors, and red drop-shadow glows.

---

## 💻 Tech Stack & Dependencies

*   **Frontend Library**: React 19 (Hooks, Context, Custom Canvas rendering)
*   **Bundler & Environment**: Vite & ESModules
*   **Animation Engine**: Framer Motion (useTransform, Spring physics, AnimatePresence)
*   **Styling & Design System**: TailwindCSS & Custom CSS properties
*   **Audio/Video Streaming**: HTML5 Media Elements & Mixkit CDN streaming
*   **Form Submissions**: FormSubmit AJAX JSON API Integration
*   **Icons**: React Icons (Fi, Fa)

---

## ⚙️ Local Installation & Development

To clone, set up, and run this project locally, run these commands in your shell:

### 1. Clone the Repository
```bash
git clone https://github.com/sagarrsinghh/sagar-portfolio.git
cd sagar-portfolio
```

### 2. Install Node Dependencies
```bash
npm install
```

### 3. Launch Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the live site.

### 4. Build Production Bundle
```bash
npm run build
```
Vite will compile the code, compress the assets, and package the static files in the `/dist` directory, fully prepared for free hosting on Vercel, Netlify, or GitHub Pages.

---

## 📝 License
This project is open-source and available under the **MIT License**.

*Designed with passion. Coded with precision. Pulling threads across the Spider-Verse.* 🕸️🌌
