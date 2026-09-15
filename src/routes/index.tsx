import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Birthday, Beautiful! 🎉" },
      {
        name: "description",
        content:
          "A tiny, silly birthday game built with love — blow out the candles, whack the piñata, and claim your real gift.",
      },
      { property: "og:title", content: "Happy Birthday, Beautiful! 🎉" },
      {
        property: "og:description",
        content:
          "A tiny, silly birthday game built with love — come blow out the candles and unwrap your gift.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BirthdayParty,
});

const CONFETTI_COLORS = ["#FF5C7A", "#FFC145", "#46D39A", "#5BC8FF", "#FF9EDB"];

async function popConfetti(big = false) {
  const confetti = (await import("canvas-confetti")).default;
  confetti({
    particleCount: big ? 200 : 90,
    spread: big ? 100 : 75,
    origin: { y: 0.7 },
    colors: CONFETTI_COLORS,
  });
  if (big) {
    window.setTimeout(
      () =>
        confetti({
          particleCount: 130,
          spread: 120,
          origin: { y: 0.5 },
          colors: CONFETTI_COLORS,
        }),
      350,
    );
    window.setTimeout(
      () =>
        confetti({
          particleCount: 130,
          spread: 140,
          origin: { x: 0.15, y: 0.6 },
          colors: CONFETTI_COLORS,
        }),
      700,
    );
    window.setTimeout(
      () =>
        confetti({
          particleCount: 130,
          spread: 140,
          origin: { x: 0.85, y: 0.6 },
          colors: CONFETTI_COLORS,
        }),
      1050,
    );
  }
}

const PINATA_MESSAGES = [
  "Ouch! First hit — you're a natural. 🥊",
  "The piñata is officially sweating.",
  "Achievement unlocked: Certified Piñata Bully 🏆",
  "It just apologized. That won't save it.",
  "Halfway there! Your lawyer has been notified.",
  "The piñata's family is watching. Awkward.",
  "This counts as cardio, by the way. You're welcome.",
  "It's holding on by a thread and pure spite.",
  "ONE more hit. The candy demands freedom!",
];

type QuizOption = { label: string; roast?: string; correct?: boolean };

const QUIZ_OPTIONS: QuizOption[] = [
  { label: "A lot", roast: "Cute guess. Wrong. Try again 💅" },
  { label: "To the moon and back", roast: "Adorable. Still not enough. Again!" },
  { label: "More than pizza", roast: "Bold claim! But no — pizza is sacred." },
  { label: "Infinity (plus snacks)", correct: true },
];

const WISHES = [
  {
    emoji: "🏆",
    title: "Best Laugh in the Universe",
    note: "Independently measured. Several scientists wept.",
  },
  {
    emoji: "💖",
    title: "Most Patient Girlfriend Ever",
    note: "You put up with me. That's Olympic-level endurance.",
  },
  {
    emoji: "🍰",
    title: "Cake Consumption Champion",
    note: "Defending champion. It's not even close.",
  },
  {
    emoji: "✨",
    title: "Certified Cutie",
    note: "Officially renewed every year on this exact date.",
  },
];

const WISH_TINTS = ["bg-minty/25", "bg-skyblue/25", "bg-sunshine/30", "bg-bubblegum/25"];

function Balloons() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <span className="animate-floaty absolute left-[8%] top-10 text-4xl">🎈</span>
      <span
        className="animate-floaty absolute right-[10%] top-16 text-5xl"
        style={{ animationDelay: "-2s" }}
      >
        🎈
      </span>
      <span
        className="animate-floaty absolute bottom-8 left-[20%] text-3xl"
        style={{ animationDelay: "-4s" }}
      >
        🎈
      </span>
      <span
        className="animate-floaty absolute bottom-14 right-[22%] text-4xl"
        style={{ animationDelay: "-1s" }}
      >
        🎈
      </span>
et    </div>
  );
}

function WishCard({
  emoji,
  title,
  note,
  tint,
  flipped,
  onFlip,
}: {
  emoji: string;
  title: string;
  note: string;
  tint: string;
  flipped: boolean;
  onFlip: () => void;
}) {
  return (
    <div className="flip-scene h-44 cursor-pointer select-none" onClick={onFlip}>
      <div className={`flip-card relative h-full w-full ${flipped ? "flipped" : ""}`}>
        <div
          className={`flip-face flex h-full w-full flex-col items-center justify-center rounded-3xl border-2 border-inkwell/10 p-6 text-center shadow-sm ${tint}`}
        >
          <span className="text-4xl">{emoji}</span>
          <span className="mt-3 font-display text-lg font-semibold text-inkwell">
            Tap to open
          </span>
        </div>
        <div className="flip-back flex h-full w-full flex-col items-center justify-center rounded-3xl bg-candy p-6 text-center">
          <span className="font-display text-xl font-bold leading-snug text-cake">{title}</span>
          <span className="mt-2 text-sm text-cake/90">{note}</span>
        </div>
      </div>
    </div>
  );
}

function BirthdayParty() {
  const [candles, setCandles] = useState<boolean[]>([false, false, false, false, false]);
  const [hits, setHits] = useState(0);
  const [wrongPicks, setWrongPicks] = useState<string[]>([]);
  const [quizSolved, setQuizSolved] = useState(false);
  const [flipped, setFlipped] = useState<boolean[]>(WISHES.map(() => false));

  const candlesLeft = candles.filter((c) => !c).length;

  const blowOut = (i: number) => {
    if (candles[i]) return;
    const next = [...candles];
    next[i] = true;
    setCandles(next);
    void popConfetti(next.every(Boolean));
  };

  const whack = () => {
    if (hits >= 10) return;
    const next = hits + 1;
    setHits(next);
    if (next === 10) void popConfetti(true);
  };

  const answer = (opt: QuizOption) => {
    if (quizSolved || wrongPicks.includes(opt.label)) return;
    if (opt.correct) {
      setQuizSolved(true);
      void popConfetti(true);
    } else {
      setWrongPicks((w) => [...w, opt.label]);
    }
  };

  const flip = (i: number) => {
    setFlipped((f) => {
      const n = [...f];
      n[i] = !n[i];
      return n;
    });
  };

  const replay = () => {
    setCandles([false, false, false, false, false]);
    setHits(0);
    setWrongPicks([]);
    setQuizSolved(false);
    setFlipped(WISHES.map(() => false));
    void popConfetti(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-cake font-body text-inkwell">
      {/* HERO */}
      <header className="relative overflow-hidden">
        <Balloons />
        <div className="relative mx-auto max-w-3xl px-5 pb-16 pt-14 text-center sm:pt-20">
          <span className="animate-wiggle inline-block rounded-full bg-sunshine px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-inkwell">
            Player 1 · it's your day
          </span>
          <h1 className="mt-5 font-display text-5xl font-bold leading-[0.95] sm:text-7xl">
            Happy
            <br />
            Birthday,
            <br />
            <span className="text-candy">Beautiful! 🎈</span>
          </h1>
          <p className="mx-auto mt-5 max-w-md text-lg text-inkwell/70">
            You've unlocked a top-secret birthday mission: blow out the candles, whack a piñata,
            and claim your real gift. No pressure. (Tiny pressure.)
          </p>
          <a
            href="#candles"
            className="wob mt-8 inline-block rounded-full bg-candy px-8 py-4 font-display text-lg font-bold text-cake shadow-[0_8px_0_0_var(--color-inkwell)]"
          >
            Start the party ▶
          </a>
        </div>
      </header>

      {/* LEVEL 1 — CANDLES */}
      <section id="candles" className="mx-auto max-w-3xl px-5 py-16 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-candy">
          Level 1 · warm-up
        </p>
        <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Blow out the candles</h2>
        <p className="mx-auto mt-3 max-w-md text-inkwell/70">
          Five candles, one wish. Tap each flame — with your finger, because blowing at your phone
          won't work. We checked.
        </p>
        <div className="mt-12 flex items-end justify-center gap-4 sm:gap-6">
          {candles.map((out, i) => (
            <button
              key={i}
              onClick={() => blowOut(i)}
              aria-label="Blow out candle"
              className="flex flex-col items-center transition-transform hover:-translate-y-1 active:scale-90"
            >
              {out ? (
                <span className="animate-pop-in text-2xl">💨</span>
              ) : (
                <span className="flame text-2xl">🔥</span>
              )}
              <span className="mt-0.5 h-10 w-2.5 rounded-full bg-skyblue" />
            </button>
          ))}
        </div>
        <div className="mx-auto mt-0 w-60 sm:w-80">
          <div className="h-7 rounded-t-2xl bg-bubblegum" />
          <div className="flex h-16 items-center justify-center rounded-b-2xl bg-candy">
            <span className="font-display text-sm font-bold uppercase tracking-widest text-cake sm:text-base">
              Happy Birthday!
            </span>
          </div>
          <div className="mx-auto h-2 w-4/5 rounded-full bg-sunshine" />
        </div>
        {candlesLeft === 0 ? (
          <p className="animate-pop-in mt-8 font-display text-2xl font-bold text-candy">
            All out! Your wish is officially pending. 🌟
          </p>
        ) : (
          <p className="mt-8 text-inkwell/60">
            {candlesLeft} candle{candlesLeft === 1 ? "" : "s"} to go — tap the flames!
          </p>
        )}
      </section>

      {/* LEVEL 2 — PIÑATA */}
      <section id="pinata" className="border-y-2 border-inkwell/10 bg-sunshine/20">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-candy">
            Level 2 · the mini-game
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Whack the piñata</h2>
          <p className="mx-auto mt-3 max-w-md text-inkwell/70">
            Ten good whacks and the candy is yours. The piñata consented. Probably.
          </p>
          <button
            onClick={whack}
            aria-label="Whack the piñata"
            className="mt-8 select-none text-7xl transition-transform active:scale-90 sm:text-8xl"
          >
            {hits >= 10 ? (
              <span className="animate-pop-in inline-block">🎉</span>
            ) : (
              <span key={hits} className="animate-shake inline-block">
                🪅
              </span>
            )}
          </button>
          <p className="mt-5 min-h-7 font-display text-lg font-semibold">
            {hits === 0
              ? "Ready when you are — give it a whack!"
              : hits >= 10
                ? "IT'S OPEN! Candy everywhere. You absolute monster. 💜"
                : PINATA_MESSAGES[hits - 1]}
          </p>
          <div className="mx-auto mt-4 h-3 w-64 max-w-full overflow-hidden rounded-full border-2 border-inkwell/10 bg-cake">
            <div
              className="h-full rounded-full bg-candy transition-all duration-300"
              style={{ width: `${hits * 10}%` }}
            />
          </div>
          <p className="mt-2 text-sm font-bold text-inkwell/60">{hits} / 10 whacks</p>
        </div>
      </section>

      {/* LEVEL 3 — QUIZ */}
      <section id="quiz" className="mx-auto max-w-3xl px-5 py-16 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-candy">
          Level 3 · final boss
        </p>
        <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">The impossible question</h2>
        <p className="mt-3 text-lg font-semibold text-inkwell/80">How much do I love you?</p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {QUIZ_OPTIONS.map((opt) => {
            const wrong = wrongPicks.includes(opt.label);
            const solved = quizSolved && opt.correct;
            return (
              <button
                key={opt.label}
                onClick={() => answer(opt)}
                disabled={wrong || quizSolved}
                className={`wob rounded-2xl border-2 px-6 py-4 font-display text-lg font-semibold transition-colors ${
                  solved
                    ? "border-minty bg-minty text-cake"
                    : wrong
                      ? "border-inkwell/10 bg-inkwell/5 text-inkwell/40 line-through"
                      : "border-inkwell/15 bg-cake hover:bg-sunshine/30"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
        {wrongPicks.length > 0 && !quizSolved && (
          <p className="animate-pop-in mt-5 font-display text-lg font-bold text-candy">
            {QUIZ_OPTIONS.find((o) => o.label === wrongPicks[wrongPicks.length - 1])?.roast}
          </p>
        )}
        {quizSolved && (
          <p className="animate-pop-in mt-5 font-display text-2xl font-bold text-candy">
            Correct! (It was the only right answer.) 💘
          </p>
        )}
      </section>

      {/* BONUS — TROPHIES */}
      <section id="wishes" className="border-y-2 border-inkwell/10 bg-bubblegum/15">
        <div className="mx-auto max-w-4xl px-5 py-16 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-candy">
            Bonus level · loot
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Your trophy cabinet</h2>
          <p className="mt-3 text-inkwell/70">Tap each one to reveal. Yes, they're all about you.</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {WISHES.map((w, i) => (
              <WishCard
                key={w.title}
                emoji={w.emoji}
                title={w.title}
                note={w.note}
                tint={WISH_TINTS[i]}
                flipped={flipped[i]}
                onFlip={() => flip(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* THE REAL GIFT */}
      <section id="gift" className="bg-candy">
        <div className="mx-auto max-w-2xl px-5 py-20 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-cake/80">
            Level complete · the real gift
          </p>
          <div className="mt-6 rounded-3xl bg-cake p-8 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.3)] sm:p-12">
            <span className="text-5xl">🎁</span>
            <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
              Happy birthday, my love.
            </h2>
            <p className="mt-4 text-lg text-inkwell/80">
              All the games and silly jokes were just wrapping paper. The real gift is simply
              this: I get another year of you — your laugh, your weirdness, your snacks. Here's to
              more adventures, more laughter, and way more cake. You're my favorite person, today
              and every day.
            </p>
            <p className="mt-6 font-display text-xl font-bold text-candy">
              — With all my love ❤️
            </p>
          </div>
          <button
            onClick={replay}
            className="wob mt-8 rounded-full bg-inkwell px-7 py-3.5 font-display text-lg font-bold text-cake"
          >
            Replay the party 🎊
          </button>
        </div>
      </section>

      <footer className="bg-inkwell py-6 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-cake/60">
          Made with too much confetti · no piñatas were permanently harmed
        </p>
      </footer>
    </div>
  );
}
