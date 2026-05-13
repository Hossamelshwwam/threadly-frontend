"use client";
import CustomButton from "@/shared/components/custom-button/custom-button";
import useCountdown from "../../hooks/useCountdown";

// ── countdown logic ────────────────────────────────────────
const SALE_END = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // 3 days from now

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 bg-zinc-950/40 backdrop-blur-sm border border-amber-400/20 rounded-lg flex items-center justify-center">
        <span className="text-2xl font-black text-white tabular-nums">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="mt-1.5 text-xs font-medium uppercase tracking-widest text-amber-300/70">
        {label}
      </span>
    </div>
  );
}

// ── section ───────────────────────────────────────────────
export default function PromoBannerSection() {
  const { days, hours, minutes, seconds } = useCountdown(SALE_END);

  return (
    <section className="relative overflow-hidden bg-zinc-950 py-20">
      {/* background texture — amber radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-amber-400/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-amber-600/8 rounded-full blur-[80px]" />
      </div>

      {/* subtle grid lines */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#d99a4a 1px, transparent 1px), linear-gradient(90deg, #d99a4a 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-4 flex flex-col items-center text-center gap-8">
        {/* badge */}
        <span className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 rounded-full px-4 py-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs font-semibold tracking-widest uppercase text-amber-400">
            Limited Time Offer
          </span>
        </span>

        {/* headline */}
        <div>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight">
            End of Season
            <br />
            <span className="text-amber-400">Sale — Up to 40% Off</span>
          </h2>
          <p className="mt-4 text-sm text-zinc-400 max-w-sm mx-auto leading-relaxed">
            Premium pieces at rare prices. Once the timer hits zero, the sale
            ends — no extensions.
          </p>
        </div>

        {/* countdown */}
        <div className="flex items-start gap-3 md:gap-5">
          <TimeUnit value={days} label="Days" />
          <span className="text-2xl font-black text-amber-400/50 mt-3.5">
            :
          </span>
          <TimeUnit value={hours} label="Hours" />
          <span className="text-2xl font-black text-amber-400/50 mt-3.5">
            :
          </span>
          <TimeUnit value={minutes} label="Minutes" />
          <span className="text-2xl font-black text-amber-400/50 mt-3.5">
            :
          </span>
          <TimeUnit value={seconds} label="Seconds" />
        </div>

        {/* divider */}
        <div className="w-px h-6 bg-zinc-700" />

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <CustomButton size="lg" theme="primary" variant="solid">
            Shop the Sale
          </CustomButton>
          <CustomButton size="lg" theme="primary" variant="outline">
            View All Deals
          </CustomButton>
        </div>

        {/* fine print */}
        <p className="text-xs text-zinc-600">
          Selected styles only. While stocks last. No code needed.
        </p>
      </div>
    </section>
  );
}
