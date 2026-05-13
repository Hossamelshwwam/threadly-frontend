"use client";

import { FiHeart, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useState } from "react";
import CustomButton from "@/shared/components/custom-button/custom-button";
import CustomInput from "@/shared/components/custom-input/CustomInput";
import Navbar from "../../components/home-page/navbar";
import Footer from "../../components/home-page/footer";
import PromoBannerSection from "../../components/home-page/promo-banner-section";
import TrendingSection from "../../components/home-page/trending-section";

const products = [
  {
    id: 1,
    category: "OUTERWEAR",
    name: "Structured Wool Overcoat",
    price: "$345.00",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAjSYjdJjcTUuLezuhAN1lCa2D8vN-0npHes3VQ9I92Sox6Y1rofmrkhb4w6Umej0WQyUfyF0XH0OEpACvef03n_wHKspx9ozZ93tBkK8s8hQifGJrCjgNGr6w3w2jFK-f64FKpD6kN0Jc2nKsp3CAGEmbSleqw4KKGezlN63wScWfwycKMFFq77TWVBLxoR7ZPK-slyz5Xif2cURUiJ2rrERBpE0zyt6T_YvoF8k75WXlkl7-oBU7bpc1HGkP52VLMQ9P3BYEzD0LW",
  },
  {
    id: 2,
    category: "ESSENTIALS",
    name: "Heavyweight Cotton Tee",
    price: "$65.00",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1g7fvx5eBYFKKgt4XxwGcI0RpaTNjUd8FG4zLQROFlmfefG7RBpvddFNiLQDnOQh0NUcF7LAYMXGiVxWzxYTFksspZb_Kk6OF4zGQKs_WKCHOvAOjjubfBfiCv6ZKNjtNDOdseUZ834X4tZL1fRwCkB4CPmM6a-Fe53LxYj0P_bQCHKPqtbKbEGnZrgbEbbAGBYUdTYcX_46OUd_rMa31CYaTNgdcp8GIsmnpiwPbxKfoo04VN5D3iv2xWGf1Tzfg6yYPW_b9Mrlw",
  },
  {
    id: 3,
    category: "FOOTWEAR",
    name: "Performance Runner 01",
    price: "$180.00",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDV0SOgutVeBowXoLI-yGons58SqiIvmNLgBv74wgTkWSNvQs1EREoq15RIudUWnhpSU1CyEyzhcQWPkh1fzSJLu89QRaNO1mZ6X4fRwWzIK5dn-F_YC1tvMNPqzgtORkBHztJkDyvT-ZMuojG96jJ2j3j7yIK3bmiJZXBQQSa0u86ZJWETs3Xgo-xN5HqFR_zMzNQNHILB-0wRdy94Sh8b_aE4velR1rCDz7MvKdSWtAVpw8v-bj6hg-CmSQBx7V599BHqTUvStA-L",
  },
  {
    id: 4,
    category: "ACCESSORIES",
    name: "Daily Leather Carryall",
    price: "$210.00",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD7maBhia745doE0FdsEeMiJWGJlgSn3o4M_6wlUuzACtwnme_IdHA53c0MXmjoOgdEWHOIcoJsbnzN2o08-uCv5wvszsQn6nGbpPBh5Jwat9XTtCCCDwZCWPXcomj7FQ4mrVfUIDn1pxfJkZaZ4_I3s7tRrwI5ZBmM6f4FLIsq8hbOpsgBkUn4FHGw8j_PBHaFRUtXXnDpQw9liO5Reermb9b6D1n1PZahUg8c0-UIjU9O_9d7SRGcE9wrY2fUTVICtAH_51_IhFla",
  },
];

export default function Home() {
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (id: number) =>
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 font-sans">
      {/* ── Navbar ─────────────────────────────────────────────── */}
      <Navbar />

      <main className="pt-16">
        {/* ── Hero ───────────────────────────────────────────────── */}
        <section className="relative h-[870px] w-full overflow-hidden">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQM8ASUq7aJ_Tt4AEyuIOX147Qq6GPSzs5EXS3K4yyqfD758BDA8nIcDhWhAORS8hokvySDKbI5No6Km90lOxbTqDeFA9TRSdSvnBTEM9vr-ZshVObOuTWzjzKBn5J1qNgFJRQza6veDbYGu_m197lt2OpqIRw2UgkiTEwzu6O1PCvMyVw6lI5sSdFSXSYtXbO9zoNx-Xadk1j8lwsnu8-dBmrlZgAfTNosVWg8SJsYR18lF0XSBzKoEJmDNYkaCeVO0Wf4U2NbeJV"
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* gradient: dark left + subtle amber tint at bottom */}
          <div className="absolute inset-0 bg-linear-to-r from-zinc-950/70 via-zinc-950/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-amber-400/10 to-transparent" />

          <div className="relative max-w-[1280px] mx-auto h-full flex flex-col justify-center px-4">
            <div className="max-w-xl text-white">
              {/* eyebrow */}
              <span className="inline-flex items-center gap-2 mb-5">
                <span className="w-8 h-px bg-amber-400" />
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-300">
                  Collection 2024
                </span>
              </span>
              <h1 className="text-5xl md:text-6xl font-light leading-tight mb-6">
                Define Your
                <br />
                <span className="font-black">Modern Silhouette</span>
              </h1>
              <p className="text-lg text-white/80 mb-10 leading-relaxed">
                Experience the intersection of high-end functional minimalism
                and editorial clarity. Curated for the discerning individual.
              </p>
              <CustomButton size="lg" theme="primary" variant="solid">
                New Season
              </CustomButton>
            </div>
          </div>
        </section>

        {/* ── Category Bento ─────────────────────────────────────── */}
        <section className="max-w-[1280px] mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Men — large */}
            <div className="md:col-span-8 relative group overflow-hidden rounded-lg cursor-pointer">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHbNOWMDtqNG_wHbo0jL9Kx1AlRFRF2iaKsGGexqhZLfz8sdQOMXxcQVG9-IKsFUesRTFeyawqBZ9ewaeXzHhUq4uKrxbXw2eAVX7nM3X8r6Jc314uHeDGegJkUS7EyCHPV1pBbg16f9rAU8m1_DRyW0BzcyDeVOe9wOQrgtOum2FIITOe3MXvqB5pbwfOmHQtmlcwxxdspPlynncADVrx3aBv8fmIMdBDAZq4t1jJL6XtxwS_L6QyurUd77FqFDRGSHzz4MpCWyM1"
                alt="Men"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-zinc-950/20 transition-colors group-hover:bg-zinc-950/35" />
              {/* amber accent bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-amber-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              <div className="absolute bottom-8 left-8">
                <h2 className="text-3xl font-bold text-white mb-1">Men</h2>
                <span className="text-white/80 text-xs font-semibold tracking-widest uppercase border-b border-amber-400 pb-0.5">
                  Explore Collection
                </span>
              </div>
            </div>

            {/* Women + Accessories — stacked */}
            <div className="md:col-span-4 grid grid-rows-2 gap-4">
              {[
                {
                  label: "Women",
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAyCVFof3d9Glfk8F-OOuPWrx9KId_AQqk20xt0xtA3aJOnCsRCpeOERV3FTjbm0n_s16F1oewaTWk3ynAgZIsrgqejZsZEPH-gvM4ySJx--lIvo7_MGCRFeyJdPYybLg3OIWYc3f38QnkfhYosCy-w1G_sYkm66iqP-8vywQ1a238Aavxb78cm6GGn5oEoUMJC-N7oP7kZk-pRAa35jp2Yu-Kme7WXTPK_iozrw8TH0lmpv3D_G639SaLsstkwlEBkOksRF2id9ptN",
                },
                {
                  label: "Accessories",
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCy2exffNeR_m5g7vWFB9qT-DacQRrh5uI3oWhgOHvxmcuwhMHo8tXPv5IZxIdw9xeJNlmXF73q8aU02DbTWrlkAN-LdNhAmrPWNIl-rPLXqQiHF9rb1Kj_lmf7RAtn-BGvWvwc1Dptha-q3K7BO7yuJttkF69YBN2RguyqEDctT-q7kAW3lFyM3YAPfs_TR5Ku2zgpMLHPp4vQp2mVjU_HIQRXPJAnwgrk5mW9pZZxh855W5pKcuK4eSWhy1I6I43W-8Kv_2qWk6e",
                },
              ].map(({ label, img }) => (
                <div
                  key={label}
                  className="relative group overflow-hidden rounded-lg cursor-pointer"
                >
                  <img
                    src={img}
                    alt={label}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-zinc-950/20 transition-colors group-hover:bg-zinc-950/35" />
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <div className="absolute bottom-5 left-5">
                    <h2 className="text-xl font-bold text-white">{label}</h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Featured Products ───────────────────────────────────── */}
        <section className="max-w-[1280px] mx-auto px-4 py-16">
          <div className="flex items-end justify-between mb-10">
            <div>
              {/* amber eyebrow */}
              <span className="flex items-center gap-2 mb-2">
                <span className="w-5 h-px bg-amber-400" />
                <span className="text-xs font-semibold tracking-widest uppercase text-amber-500">
                  Selected Works
                </span>
              </span>
              <h2 className="text-3xl font-bold text-zinc-950">
                Featured Arrivals
              </h2>
            </div>
            <a
              href="#"
              className="text-xs font-semibold tracking-wider uppercase text-zinc-400 hover:text-amber-500 transition-colors border-b border-zinc-200 pb-1"
            >
              View All
            </a>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <div key={p.id} className="group cursor-pointer">
                <div className="relative aspect-3/4 overflow-hidden rounded-lg mb-3 bg-zinc-100 border border-zinc-200">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* wishlist */}
                  <button
                    onClick={() => toggleWishlist(p.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white transition-all"
                  >
                    <FiHeart
                      size={14}
                      className={
                        wishlist.includes(p.id)
                          ? "text-amber-500 fill-amber-500"
                          : "text-zinc-400"
                      }
                    />
                  </button>
                  {/* hover overlay with amber tint */}
                  <div className="absolute inset-0 bg-amber-400/0 group-hover:bg-amber-400/5 transition-colors duration-300" />
                </div>
                <p className="text-xs font-semibold tracking-widest uppercase text-zinc-400 mb-1">
                  {p.category}
                </p>
                <h3 className="text-sm font-semibold text-zinc-800 group-hover:text-amber-500 transition-colors leading-snug mb-1">
                  {p.name}
                </h3>
                <p className="text-sm font-semibold text-zinc-950">{p.price}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Sale Banner ────────────────────────────────────── */}
        <PromoBannerSection />

        {/* ── Trending Carousel ───────────────────────────────────── */}
        <TrendingSection />
      </main>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
