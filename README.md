# Our Friendship Forever 💖

> Dedicated to: **"Bestest besttttttt Nanbanneyyyyyyyy 💗"**  
> *"Thank you for making my life brighter, happier, and more meaningful."*

A modern, responsive web application celebrating friendship, gratitude, shared memories, and interactive mini-games. Built with a cute pastel pink and lavender aesthetic, floating sparkles, glassmorphism, native Web Audio ambient lo-fi melody, and 5 fully playable games.

---

## ✨ Features

- **🌸 Aesthetic & Responsive Design:**
  - Soft pastel pink, rose, lavender, purple, and cream color palette.
  - Floating hearts and sparkles ambient animations.
  - Glassmorphic card layouts with subtle hover elevations.
  - **Light Mode Default** with an instant Light / Dark mode toggle switch.
  - Fully responsive across mobile phones, tablets, and desktop displays.

- **💌 Homepage & Hero:**
  - Dedicated heading: *"Bestest besttttttt Nanbanneyyyyyyyy 💗"*.
  - Subtitle: *"Thank you for making my life brighter, happier, and more meaningful."*
  - Animated *"Open My Heart 💌"* button with confetti burst.
  - **Live Friendship Counter:** Tracks days, hours, minutes, and seconds since your special friendship date with inline customization!

- **📸 Memories Gallery:**
  - Curated gallery featuring the uploaded real friendship moments.
  - Polaroid-style cards with date badges and tags (*Besties*, *Funny*, *Together*, *Peaceful*).
  - Fullscreen Lightbox viewer with Next / Previous navigation and keyboard shortcuts.
  - In-browser **Add New Memory** modal with photo upload and local storage persistence.

- **💖 Gratitude & Appreciation Section:**
  - **A Heartfelt Personal Letter:** Styled like an elegant wax-sealed parchment note.
  - **Reasons Why You Are Special:** 6 interactive glowing cards detailing what makes this bond irreplaceable.
  - **Appreciation Cards:** Messages like *"Thank you for always being there"*, *"Thank you for believing in me"*, and more.
  - **Friendship Promises:** 6 sacred pledges (3 AM calls, sharing food, unconditional support).
  - **Customizable Friends Spotlight:** Editable friend profiles and messages.
  - **Surprise Thank-You Button:** Pop-up secret message with celebratory confetti.
  - Closing quote: *"No matter where life takes us, you will always have a special place in my heart."*

- **🎮 5 Fully Playable Friendship Games:**
  1. **Friendship Quiz:** Multiple-choice quiz calculating match percentage, personalized verdicts, and celebratory confetti.
  2. **Memory Match:** Card-flipping memory game with friendship emojis, live timer, move tracker, and victory celebration.
  3. **Tic-Tac-Toe:** Play 💖 vs ⭐ in 2-Player pass-and-play mode or vs *Nanban AI*.
  4. **Spin The Friendship Wheel:** Realistic animated canvas spinning wheel with hilarious dares, challenges, and sweet coupons.
  5. **Guess Our Friendship:** Scenario trivia guessing game with fun friendship takeaways.

- **🎁 Surprise Mystery Section:**
  - Interactive 3D gift box with bouncing animations.
  - Smooth unwrapping revealing an official **"Certificate of Bestest Nanban 💖"**.
  - Replay button to seal and reopen anytime.

- **🎶 Music & Sound System:**
  - Gentle lo-fi ambient melody built via the native **Web Audio API** (no missing audio file errors or network dependencies).
  - User-controlled playback (starts only after explicit click), with volume slider and mute controls.
  - Interactive sound effects (pops, card flips, wheel ticks, and chimes).

- **⚙️ Full In-Browser Customization:**
  - Click the **Customize** button in the navbar to edit the Hero Heading, Subtitle, Friendship Start Date, and Friend Messages on the fly.
  - Automatically saved to `localStorage`.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Installation

1. Clone or open the project directory:
   ```bash
   cd our-friendship-forever
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the displayed local URL (typically `http://localhost:3000`).

---

## 📦 Building for Production

To create an optimized production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 🌐 Deploying to Vercel

### Option 1: Via Vercel CLI
```bash
npm i -g vercel
vercel
```

### Option 2: Via GitHub Integration
1. Push this repository to your GitHub account (see instructions below).
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository (`our-friendship-forever`).
4. Select **Vite** as framework preset (detected automatically).
5. Click **Deploy**. Vercel will build and assign you a live production URL!

---

## 🛠️ Project Structure

```
our-friendship-forever/
├── public/
│   └── memories/              # Real friendship photos
│       ├── photo1.png
│       ├── photo2.png
│       ├── photo3.png
│       └── photo4.jpg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── CustomizeModal.jsx # Live site content editor
│   │   ├── FloatingHearts.jsx # Ambient background particles
│   │   ├── Footer.jsx         # Signoff & navigation
│   │   ├── GamesSection.jsx   # Arcade wrapper for games
│   │   ├── GratitudeSection.jsx # Letter, promises & appreciation
│   │   ├── Hero.jsx           # Heading, counter & open heart button
│   │   ├── MemoriesGallery.jsx# Polaroid gallery & lightbox
│   │   ├── Navbar.jsx         # Navigation, theme & music controls
│   │   └── SurpriseSection.jsx# 3D Gift Box & BFF Certificate
│   ├── data/
│   │   └── friendshipData.js  # Default content & trivia questions
│   ├── games/
│   │   ├── FriendshipQuiz.jsx # Game 1
│   │   ├── MemoryMatch.jsx    # Game 2
│   │   ├── TicTacToe.jsx      # Game 3
│   │   ├── SpinWheel.jsx      # Game 4
│   │   └── GuessFriendship.jsx# Game 5
│   ├── utils/
│   │   └── soundEffects.js    # Web Audio API music & sound effects
│   ├── App.jsx                # Core application controller
│   ├── index.css              # Custom styles & Tailwind imports
│   └── main.jsx               # React entrypoint
├── index.html                 # HTML template with Google Fonts
├── package.json
├── tailwind.config.js
├── vite.config.js
├── vercel.json
└── README.md
```

---

## 💖 Made with Love for Bestest Nanban
*"A friend is someone who knows all about you and still loves you."*
