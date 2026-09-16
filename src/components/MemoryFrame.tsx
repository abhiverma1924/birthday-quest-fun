import type { CSSProperties } from "react";

export type FrameStyle = "baked" | "candy" | "beach" | "postcard" | "tropical";

export type Memory = {
  src: string;
  caption: string;
  frame: FrameStyle;
};

const FRAME_DOODLES: Record<Exclude<FrameStyle, "baked">, string[]> = {
  candy: ["🍬", "🍭", "💛", "⭐", "🩷", "💙", "💚", "❤️"],
  beach: ["🐚", "💛", "☀️", "🌊", "❤️", "🦀", "✨"],
  postcard: ["💛", "❤️", "🦀", "😎", "🌴", "💙", "☀️"],
  tropical: ["🌴", "💛", "⭐", "❤️", "🎬", "🎵", "💚"],
};

function doodleStyle(index: number, total: number): CSSProperties {
  const t = index / total;
  const inset = 7;
  if (t < 0.25) {
    return { top: inset, left: `${(t / 0.25) * 100}%`, transform: "translate(-50%, -50%)" };
  }
  if (t < 0.5) {
    return {
      top: `${((t - 0.25) / 0.25) * 100}%`,
      right: inset,
      left: "auto",
      transform: "translate(50%, -50%)",
    };
  }
  if (t < 0.75) {
    return {
      bottom: inset,
      left: `${(1 - (t - 0.5) / 0.25) * 100}%`,
      top: "auto",
      transform: "translate(-50%, 50%)",
    };
  }
  return {
    top: `${(1 - (t - 0.75) / 0.25) * 100}%`,
    left: inset,
    transform: "translate(-50%, -50%)",
  };
}

function DoodleBorder({ doodles }: { doodles: string[] }) {
  const count = 24;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="absolute text-[13px] leading-none drop-shadow-sm sm:text-sm"
          style={doodleStyle(i, count)}
        >
          {doodles[i % doodles.length]}
        </span>
      ))}
    </div>
  );
}

function Washi({ className, tint }: { className: string; tint: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute z-20 h-4 w-14 rounded-[2px] opacity-80 shadow-sm ${tint} ${className}`}
    />
  );
}

function Stickers({ frame }: { frame: Exclude<FrameStyle, "baked"> }) {
  if (frame === "candy") {
    return (
      <>
        <span className="pointer-events-none absolute -right-2 -top-3 z-20 rotate-12 text-5xl drop-shadow-md">
          👑
        </span>
        <span className="pointer-events-none absolute left-3 top-4 z-20 text-lg">✨</span>
        <span className="pointer-events-none absolute left-8 top-8 z-20 text-xs">✨</span>
      </>
    );
  }
  if (frame === "beach") {
    return (
      <>
        <span className="pointer-events-none absolute -bottom-3 -right-2 z-20 -rotate-6 text-5xl drop-shadow-md">
          🏆
        </span>
        <span className="pointer-events-none absolute left-2 top-2 z-20 text-lg">💡</span>
        <span className="pointer-events-none absolute right-8 top-2 z-20 text-lg">💡</span>
      </>
    );
  }
  if (frame === "postcard") {
    return (
      <>
        <span className="pointer-events-none absolute right-2 top-2 z-20 flex h-12 w-10 rotate-6 flex-col items-center justify-center rounded-sm border-2 border-dashed border-inkwell/30 bg-cake/90 text-[8px] font-bold uppercase tracking-wider text-inkwell/50 shadow-sm">
          stamp
          <span className="text-base">📮</span>
        </span>
        <span className="pointer-events-none absolute -bottom-2 right-3 z-20 text-4xl drop-shadow-md">
          🏅
        </span>
      </>
    );
  }
  return (
    <>
      <span className="pointer-events-none absolute right-2 top-10 z-20 text-2xl">🎵</span>
      <span className="pointer-events-none absolute left-3 top-1/3 z-20 text-lg">🐦</span>
      <span className="pointer-events-none absolute bottom-8 right-4 z-20 text-lg">🐦</span>
      <span className="pointer-events-none absolute -bottom-2 -right-1 z-20 rotate-12 text-3xl drop-shadow-md">
        🎬
      </span>
    </>
  );
}

function assetUrl(src: string) {
  if (/^https?:\/\//.test(src)) return src;
  return `${import.meta.env.BASE_URL}${src.replace(/^\//, "")}`;
}

export function MemoryFrame({
  memory,
  tilt,
}: {
  memory: Memory;
  tilt: string;
}) {
  const { src, caption, frame } = memory;
  const imageSrc = assetUrl(src);

  if (frame === "baked") {
    return (
      <figure
        className={`rounded-2xl border-2 border-inkwell/10 bg-cake p-3 shadow-lg transition-transform hover:rotate-0 ${tilt}`}
      >
        <img
          src={imageSrc}
          alt={caption}
          className="mx-auto max-h-[22rem] w-full rounded-xl object-contain sm:max-h-[26rem]"
          draggable={false}
          loading="lazy"
        />
        <figcaption className="mt-3 font-display text-sm font-semibold text-inkwell/80">
          {caption}
        </figcaption>
      </figure>
    );
  }

  return (
    <figure
      className={`relative rounded-2xl border-2 border-inkwell/15 bg-cake px-5 pb-4 pt-6 shadow-lg transition-transform hover:rotate-0 ${tilt}`}
    >
      {frame === "tropical" ? (
        <>
          <Washi className="-left-2 -top-1 -rotate-12" tint="bg-minty" />
          <Washi className="-right-2 -top-1 rotate-12" tint="bg-bubblegum" />
          <Washi className="-bottom-1 -left-2 rotate-12" tint="bg-sunshine" />
          <Washi className="-bottom-1 -right-2 -rotate-12" tint="bg-skyblue" />
        </>
      ) : null}

      {frame === "postcard" ? (
        <p className="relative z-10 mb-1 font-display text-lg font-bold tracking-[0.2em] text-amber-800/80">
          POSTCARD
        </p>
      ) : null}

      <div className="relative px-1 py-2">
        <DoodleBorder doodles={FRAME_DOODLES[frame]} />
        <div className="relative mx-3 my-2 overflow-hidden rounded-md shadow-inner">
          <img
            src={imageSrc}
            alt={caption}
            className="mx-auto max-h-[20rem] w-full object-contain sm:max-h-[24rem]"
            draggable={false}
            loading="lazy"
          />
          <Stickers frame={frame} />
        </div>
      </div>

      {frame === "postcard" ? (
        <p className="relative z-10 mt-1 font-display text-[11px] font-bold tracking-[0.18em] text-amber-800/70">
          TRAVEL MEMORIES
        </p>
      ) : null}

      <figcaption className="relative z-10 mt-3 font-display text-sm font-semibold text-inkwell/80">
        {caption}
      </figcaption>
    </figure>
  );
}
