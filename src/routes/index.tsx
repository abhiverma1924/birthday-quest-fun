import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Birthday, Shivani! 🎉" },
      {
        name: "description",
        content:
          "A tiny, silly birthday game built with love — blow out the candles, whack the piñata, and claim your real gift.",
      },
      { property: "og:title", content: "Happy Birthday, Shivani! 🎉" },
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

type Memory = { src?: string; caption: string };

const MEMORIES: Memory[] = [
  { caption: "Memory #1" },
  { caption: "Memory #2" },
  { caption: "Memory #3" },
  { caption: "Memory #4" },
  { caption: "Memory #5" },
  { caption: "Memory #6" },
];

const MEMORY_TILTS = ["-rotate-2", "rotate-2", "-rotate-1", "rotate-1", "rotate-2", "-rotate-2"];

type QuizOption = { label: string; roast?: string; correct?: boolean };

const QUIZ_OPTIONS: QuizOption[] = [
  { label: "A lot", roast: "Cute guess. Wrong. Try again 💅" },
  { label: "To the moon and back", roast: "Adorable. Still not enough. Again!" },
  { label: "More than pizza", roast: "Bold claim! But no — pizza is sacred." },
  { label: "Infinity (plus snacks)", correct: true },
];

const CANDLE_WISHES = [
  "🍕 All the pizza dates you want — my treat, forever.",
  "🛍️ Unlimited shopping trips with zero complaining from me.",
  "🛏️ First pick of the blanket, every single night — and no Paddu sneaking in.",
  "🛡️ For all your life, I'll be your shield — nothing gets past me.",
  "❤️ Me — for the rest of your life. Non-refundable.",
];

const CANDLE_WISH_TINTS = ["bg-minty/25", "bg-skyblue/25", "bg-sunshine/30", "bg-bubblegum/25", "bg-candy/15"];

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
    </div>
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
            Shivani · it's your day
          </span>
          <h1 className="mt-5 font-display text-5xl font-bold leading-[0.95] sm:text-7xl">
            Happy
            <br />
            Birthday,
            <br />
            <span className="text-candy">Shivani! 🎈</span>
          </h1>
          <p className="mx-auto mt-5 max-w-md text-lg text-inkwell/70">
            Congratulations! You've been officially selected as the girlfriend of the world's
            smartest boyfriend. 🏆
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
          Five candles, five wishes — all yours. Tap each flame to blow it out and unwrap a wish.
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
        {candles.some(Boolean) && (
          <ul className="mx-auto mt-8 grid max-w-xl gap-3">
            {candles.map((out, i) =>
              out ? (
                <li
                  key={i}
                  className={`animate-pop-in rounded-2xl px-5 py-3 font-display text-base font-semibold text-inkwell shadow-sm ${
                    CANDLE_WISH_TINTS[i] ?? "bg-sunshine/30"
                  }`}
                >
                  Wish {i + 1} unlocked: {CANDLE_WISHES[i] ?? ""}
                </li>
              ) : null,
            )}
          </ul>
        )}
        {candlesLeft === 0 ? (
          <p className="animate-pop-in mt-8 font-display text-2xl font-bold text-candy">
            All 5 wishes are yours. Happy birthday, Shivani! 🌟
          </p>
        ) : (
          <p className="mt-8 text-inkwell/60">
            {candlesLeft} candle{candlesLeft === 1 ? "" : "s"} to go — tap the flames!
          </p>
        )}
      </section>

      {/* LEVEL 2 — MEMORIES */}
      <section id="memories" className="border-y-2 border-inkwell/10 bg-sunshine/20">
        <div className="mx-auto max-w-4xl px-5 py-16 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-candy">
            Level 2 · the memory lane
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Us, framed 🖼️</h2>
          <p className="mx-auto mt-3 max-w-md text-inkwell/70">
            A little wall of our favourite moments — the ones I'll never stop talking about.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3">
            {MEMORIES.map((m, i) => (
              <div
                key={m.caption}
                className={`animate-pop-in rounded-2xl border-2 border-inkwell/10 bg-cake p-3 shadow-lg transition-transform hover:scale-105 hover:rotate-0 ${MEMORY_TILTS[i % MEMORY_TILTS.length]}`}
              >
                {m.src ? (
                  <img
                    src={m.src}
                    alt={m.caption}
                    className="aspect-square w-full rounded-xl object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex aspect-square w-full items-center justify-center rounded-xl border-2 border-dashed border-inkwell/20 bg-candy/10 text-4xl">
                    📷
                  </div>
                )}
                <p className="mt-3 font-display text-sm font-semibold text-inkwell/80">
                  {m.caption}
                </p>
              </div>
            ))}
          </div>
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
                tint={WISH_TINTS[i] ?? "bg-sunshine/30"}
                flipped={flipped[i] ?? false}
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
          <div className="mt-6 rounded-3xl bg-cake p-8 text-left shadow-[0_16px_40px_-16px_rgba(0,0,0,0.3)] sm:p-12">
            <h2 className="text-center font-display text-3xl font-bold sm:text-4xl">
              Happy birthday, Shivani. ❤️
            </h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-inkwell/85">
              <p>
                Happy Birthday to my favourite person, my childhood friend, my partner, and
                hopefully, the person I get to grow old with. ❤️
              </p>
              <p>
                Sometimes I think about how crazy it is that we've known each other for so long.
                We were just kids when our story started, and neither of us probably imagined
                that all these years later, you would still be such a huge part of my life.
              </p>
              <p>
                We've literally grown up together. We've seen different versions of each other —
                the childish ones, the annoying ones, the emotional ones, the ambitious ones, and
                all the versions in between. 😂❤️ And somehow, with every year, every experience,
                every little fight and every beautiful memory, our bond has only become stronger.
              </p>
              <p>
                You're not just someone I love. You're someone who has been there through so many
                phases of my life that it's hard to separate my memories from you. When I think
                about my past, you're there. When I think about my present, you're there. And
                when I imagine my future, somehow, it's always you standing next to me.
              </p>
              <p>
                I don't know exactly what life will look like for us years from now. But I know
                what I want — I want us to keep choosing each other. I want more random
                conversations, stupid fights, late-night talks, travelling together, celebrating
                little things, making memories, annoying each other, laughing at things nobody
                else understands, and growing old together.
              </p>
              <p>
                I want to be there when you achieve the things you dream about. I want to hold
                your hand when life gets difficult. I want to celebrate every little success with
                you. And honestly, I want to be the person you can always come home to.
              </p>
              <p>
                We started this journey as kids, and I feel incredibly lucky that life gave me
                the chance to grow up with you. ❤️
              </p>
              <p>
                On your birthday, more than anything, I just want you to know that I still choose
                you, and I want to keep choosing you for the rest of my life.
              </p>
              <p>
                Here's to everything we've already lived together, and to all the years,
                adventures, memories and birthdays that are still waiting for us.
              </p>
            </div>
            <div className="mt-8 border-t-2 border-dashed border-candy/30 pt-6 text-center">
              <p className="font-display text-2xl font-bold text-candy">
                I love you more than I can put into words. And I hope I get to spend a lifetime
                showing you. ❤️🥹
              </p>
              <p className="mt-4 font-display text-xl font-bold text-inkwell">
                — With all my love ❤️
              </p>
            </div>
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
