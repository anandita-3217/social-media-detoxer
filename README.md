# Social Media Detox Helper 🚫📱

A React app that helps you break your social media addiction by replacing mindless scrolling with actually useful (and entertainingly passive-aggressive) content.

## What This Thing Does

- **Replaces your doom-scrolling** with random facts, dad jokes, coding challenges, or motivational quotes
- **Tracks time saved** from not scrolling through Instagram/TikTok/Twitter
- **Converts saved time** into "productive things you could've done" metrics
- **Provides gentle reality checks** about your digital habits (with humor, not judgment... okay maybe a little judgment)

## Features (Planned)

- [ ] Timer tracking for detox sessions
- [ ] Random content feed (facts, jokes, coding tips)
- [ ] Time-saved calculator with funny conversions
- [ ] Progress tracking and stats
- [ ] Motivational (but sarcastic) messages
- [ ] "Relapse prevention" - warnings when you've been on the app too long

## Tech Stack

- React 19
- CSS3 (keeping it simple for now)
- External APIs for content (facts, jokes, etc.)
- Local storage for tracking data

## Installation

```bash
# Clone this repo
git clone https://github.com/anandita-3217/social-media-detoxer
cd social-media-detox-helper

# Install dependencies
npm install

# Start the development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Project Structure

```
src/
  ├── components/
  │   ├── Timer.js           # Tracks detox session time
  │   ├── ContentFeed.js     # Random helpful/funny content
  │   ├── StatsTracker.js    # Shows time saved & conversions
  │   └── MotivationalNag.js # Gentle (firm) reality checks
  ├── hooks/
  │   └── useLocalStorage.js # Custom hook for persistence
  ├── utils/
  │   └── timeConversions.js # "You could've read 0.3 books"
  ├── App.js
  └── App.css
```

## Why I Built This

Because I realized I was spending more time watching 15-second videos of things that dont even intrest me than actually doing something productive. This app is my digital intervention - useful enough to actually help, funny enough to not feel like digital vegetables, and distraction to keep me away from my phone so i have something else to wrestle with

## Contributing

Found a bug? Want to add more sarcastic motivational messages? PRs welcome! Just remember: we're building a tool to help people, not judge them (too harshly).

<!-- ## License

MIT - Use this to save yourself and others from the scroll hole. -->

---

*"The best time to stop mindless scrolling was yesterday. The second best time is right now."* - Ancient Proverb (probably)