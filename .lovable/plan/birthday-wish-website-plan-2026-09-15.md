# Birthday Wish Website — Plan

## Goal
A single-page, static, gamified & funny birthday site for the user's girlfriend. No backend, no accounts, no database — just simple React + CSS animations. Works great on a phone (she'll likely open it on her phone).

## Look & feel (default, since no direction was picked)
- Bright party palette: warm cream background, coral pink, sunny yellow, mint, sky blue.
- Round chunky type (Fredoka-style display font + Nunito body), wobbly balloons, confetti bursts.
- Bouncy, springy animations: buttons pop, candles flicker, balloons drift.

## The party journey (one page, top to bottom)
1. **Hero** — "Happy Birthday!" with floating balloons, confetti in the background, and a big "Start the party" button that scrolls to the game.
2. **Mini-game 1: Blow out the candles** — 5 candles on a cake; she taps each one to blow it out. When all are out: confetti burst + "You did it!" message.
3. **Mini-game 2: Whack the piñata** — tap the piñata 10 times; each hit drops a funny little message ("Achievement unlocked: survived my jokes for another year"). Final hit bursts it open.
4. **Joke quiz** — one silly question ("How much do I love you?") where every answer is wrong except "Infinity". Wrong picks get playful roasts.
5. **Unlockable wishes** — funny "achievement" cards that flip open when tapped (e.g. "Best Laugh in the Universe — unlocked").
6. **The real gift: final birthday card** — a heartfelt handwritten-style message with a big confetti explosion, plus a "Replay" button.

## Tech approach (kept deliberately simple)
- Rewrite `src/routes/index.tsx` with the whole experience in one component file; small components in the same file.
- Only `useState` counters and CSS keyframe animations — no complex libraries beyond `canvas-confetti` for the bursts.
- New design tokens (party palette + fonts) added to `src/styles.css`; no colors hardcoded in components.
- Update the page title/meta in the route head ("Happy Birthday! 🎉").
- Mobile-friendly layout, tested in the preview before handoff.

## Not included (on purpose)
- No backend, no login, no data storage — pure static fun.
