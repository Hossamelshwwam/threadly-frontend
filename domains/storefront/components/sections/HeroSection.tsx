"use client";

import Image from "next/image";
import { RiArrowDownLine } from "react-icons/ri";
import CustomButton from "@/shared/components/custom-button/custom-button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative h-[85vh] min-h-[500px] sm:h-[90vh] sm:min-h-[600px] w-full overflow-hidden">
      {/* Background Image & Overlays */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1800&q=85"
          alt="Fashion collection showcase"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        {/* Responsive Gradient: Darker on mobile because text spans the whole width, easing off on md+ */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 sm:from-zinc-950/80 md:via-zinc-950/40 md:to-zinc-950/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 sm:from-zinc-950/60 via-transparent to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative h-full container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        {/* Added mt-12 on mobile to prevent the text from clashing with the fixed Navbar */}
        <div className="max-w-2xl mt-12 sm:mt-0">
          {/* Eyebrow */}
          <span className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <span className="w-6 sm:w-10 h-[2px] bg-amber-400" />
            <span className="text-xs sm:text-sm font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-amber-300/90">
              Spring Summer 2026
            </span>
          </span>

          {/* Headline - Scaled fluidly from mobile up to desktop */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white leading-[1.05] sm:leading-[0.95] mb-4 sm:mb-6 text-balance">
            Define Your
            <br />
            <span className="font-black text-amber-400">Modern Edge</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed max-w-sm sm:max-w-lg mb-8 sm:mb-10 font-medium sm:font-light text-pretty">
            Curated collections at the intersection of high-end minimalism and
            contemporary street culture.
          </p>

          {/* CTA Buttons - Stacked on Mobile, Row on Tablet+ */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto pr-4 sm:pr-0">
            <CustomButton
              size="lg"
              theme="primary"
              variant="solid"
              className="px-8 sm:px-10 py-4 text-sm sm:text-base tracking-wide w-full sm:w-auto"
            >
              <Link href={"/products"}>Explore Collection</Link>
            </CustomButton>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 sm:gap-2 text-white/40 animate-bounce">
        <span className="text-[9px] sm:text-[10px] tracking-widest uppercase font-bold">
          Scroll
        </span>
        <RiArrowDownLine size={16} className="sm:w-5 sm:h-5" />
      </div>
    </section>
  );
}
