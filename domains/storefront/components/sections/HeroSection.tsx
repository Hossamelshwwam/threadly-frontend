"use client";

import Image from "next/image";
import { RiArrowDownLine } from "react-icons/ri";
import CustomButton from "@/shared/components/custom-button/custom-button";

export function HeroSection() {
  return (
    <section className="relative h-[90vh] min-h-[600px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1800&q=85"
          alt="Fashion collection showcase"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-zinc-950/40 to-zinc-950/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />
      </div>

      <div className="relative h-full container mx-auto px-8 flex flex-col justify-center">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-3 mb-6">
            <span className="w-10 h-[2px] bg-amber-400" />
            <span className="text-sm font-medium tracking-[0.3em] uppercase text-amber-300/90">
              Spring Summer 2026asd
            </span>
          </span>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-light text-white leading-[0.95] mb-6 text-balance">
            Define Your
            <br />
            <span className="font-black text-amber-400">Modern Edge</span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-lg mb-10 font-light text-pretty">
            Curated collections at the intersection of high-end minimalism and
            contemporary street culture.
          </p>

          <div className="flex items-center gap-4">
            <CustomButton
              size="lg"
              theme="primary"
              variant="solid"
              className="px-10 py-4 text-base tracking-wide"
            >
              Explore Collection
            </CustomButton>
            <CustomButton
              size="lg"
              variant="outline"
              theme="primary"
              className="px-10 py-4 text-base tracking-wide"
            >
              Our Story
            </CustomButton>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
        <span className="text-[10px] tracking-widest uppercase font-medium">
          Scroll
        </span>
        <RiArrowDownLine size={16} />
      </div>
    </section>
  );
}
