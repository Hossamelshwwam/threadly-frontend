import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import {
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
  FiHeart,
  FiTrendingUp,
} from "react-icons/fi";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

const trending = [
  {
    id: 1,
    label: "New Season Edit",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuARKhPX1G86pEa8T-gVzIkSqzOIkBn4C3TkRWHCczW4VnvEIg1VFy8A0ytUcX7ANg4O8_j_7pRBRGOjd_1ROgDrsPSMKbQKNzgsjCOIIzuaZIelAyWLmujOSpIGC2Zf_HZCBvCikSViWmCThufsNXUH8UhOBXknyRt_uiO5XTTSFp8V7LLxqBL8a7W1lYzgGRL2q1lh4DvF7_eoY7zK7oPhEqHWhyAm49CLp2aqjcTTU1gkl78M5KDac-MkBVfz0Oew_wkCtIYngOGF",
  },
  {
    id: 2,
    label: "Essential Knits",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnBZb_V2DMLOp_7xtbaP8LSJoDLMIGlZ9pOx2r0G-HzjhOaTWVKC2VNUi1lmPPT41Ci_o6VwtOv_e531GIFE-vlLVG93F1xuqUgfih71X9gZl96vkPe4gSFECl6KCakraOcQ8Er7LkSMpG1npLdfNs7J7CitOS-YkDWGJxj7G0Rw7lswdyJS7heRL_zRIIReQyoYkGJwgeVX7JDt6HlDv-bO6oCBrs6Um9QcrcGfA7TzkSXMYK3yBWPfN_X0NdqQ2y4M14eN6Bm0a2",
  },
  {
    id: 3,
    label: "Modern Suiting",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQNSAUVDAXJBFBi7IvwYR-5vZcdpWRhAdGH-pkR5Wv8KY70XY-SChwybGE7LKNISXsvVKNVhgGPY_Gmcb2X6Lsy-vroE2Tp_xTswuN7c5nlMjZTBWstSJhgYQwdbt639kC3LGkSi2zb0NfMvzmdHyAQLtlTVVWRhis9BojnpSCjL9SujBkh1m5Z_ue-Avkm94H5Jft9ub16hs8AtOAUkfCC-1aO5VJycWEg2NrhJOEAEBrtudOAhFTtpoZTm-b7azvCjYOa5E6-7n1",
  },
  {
    id: 4,
    label: "Denim Theory",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6QhmNuzuElYOrRD21I_YXqfc7jtXgG-V4BctTHZJK_0xekaly3mgHlIUchJEVfeGKWGpEni1lKyb-OWOk79LVMl6sDksSiTXXY7H_YpGHh6SQjz3i98G1RNaAuwU18Oo5Z_jCBM5XNCFo_rIyw1XAtg4GB0Lias-ZJHCq-Wz_v6u1Sq_-A0P5N65UJnIlIBVjCNHE7xw3kUCp-NAvxsb0OD46i3Abpt9j_uagJLeK1Zn1s3vdU3NY3Qwj6DF7eUYlmpkTr3ISs4tE",
  },
  {
    id: 5,
    label: "Modern Suiting",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQNSAUVDAXJBFBi7IvwYR-5vZcdpWRhAdGH-pkR5Wv8KY70XY-SChwybGE7LKNISXsvVKNVhgGPY_Gmcb2X6Lsy-vroE2Tp_xTswuN7c5nlMjZTBWstSJhgYQwdbt639kC3LGkSi2zb0NfMvzmdHyAQLtlTVVWRhis9BojnpSCjL9SujBkh1m5Z_ue-Avkm94H5Jft9ub16hs8AtOAUkfCC-1aO5VJycWEg2NrhJOEAEBrtudOAhFTtpoZTm-b7azvCjYOa5E6-7n1",
  },
];

export default function TrendingSection() {
  return (
    <section className="relative py-20 bg-linear-to-b from-surface to-amber-50/40 overflow-hidden font-sans">
      {/* Decorative Blur Background (يعطي طابع Colorful خفيف في الخلفية) */}
      <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-main opacity-10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-main-warm opacity-5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        {/* Header Section */}
        <div className="flex items-end justify-between mb-10">
          <div className="flex flex-col gap-2">
            <span className="flex items-center gap-2 text-main-warm font-semibold text-sm tracking-wider uppercase">
              <FiTrendingUp size={16} /> Hot this week
            </span>
            <h2 className="text-4xl font-black text-on-surface tracking-tight">
              Trending Now
            </h2>
          </div>

          {/* Custom Navigation Buttons */}
          <div className="hidden sm:flex gap-3">
            <button className="trending-prev w-12 h-12 rounded-full border border-border flex items-center justify-center text-on-surface-muted hover:border-main hover:text-main hover:shadow-main hover:bg-surface transition-all duration-200 bg-surface z-10">
              <FiChevronLeft size={22} />
            </button>
            <button className="trending-next w-12 h-12 rounded-full border border-border flex items-center justify-center text-on-surface-muted hover:border-main hover:text-main hover:shadow-main hover:bg-surface transition-all duration-200 bg-surface z-10">
              <FiChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Autoplay, Navigation]}
          navigation={{
            prevEl: ".trending-prev",
            nextEl: ".trending-next",
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true, // يقف لما اليوزر يقف بالماوس
          }}
          spaceBetween={24}
          breakpoints={{
            400: { slidesPerView: 1 },
            600: { slidesPerView: 2 },
            900: { slidesPerView: 3 },
            1200: { slidesPerView: 4 },
          }}
          className="pb-10!"
        >
          {trending.map((item) => (
            <SwiperSlide key={item.id} className="">
              <div className="group cursor-pointer flex flex-col gap-4">
                {/* Image Container - Edge to Edge */}
                <div className="relative w-full aspect-3/4 rounded-2xl overflow-hidden bg-surface-low border border-border-subtle group-hover:border-border transition-colors duration-300">
                  {/* Subtle Gradient Overlay on Hover (For depth) */}
                  <div className="absolute inset-0 bg-linear-to-t from-zinc-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />

                  {/* Favorite Button (Premium touch) */}
                  <button className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-surface/70 backdrop-blur-md text-on-surface-muted hover:text-error hover:bg-surface transition-all duration-200">
                    <FiHeart size={16} />
                  </button>

                  {/* Editorial Minimal Badge */}
                  <div className="absolute top-3 left-3 z-20">
                    <span className="bg-on-surface text-surface text-[10px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-widest shadow-sm">
                      New In
                    </span>
                  </div>

                  {/* Image with slow, luxurious zoom */}
                  <img
                    src={item.img}
                    alt={item.label}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Content - Editorial Layout */}
                <div className="flex flex-col px-1">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-on-surface group-hover:text-main transition-colors line-clamp-1">
                        {item.label}
                      </h3>
                      <p className="text-sm font-medium text-on-surface-muted mt-0.5">
                        Signature Collection
                      </p>
                    </div>

                    {/* Price */}
                    <span className="text-base font-bold text-on-surface">
                      $120
                    </span>
                  </div>

                  {/* Animated Action Link */}
                  <div className="mt-3 flex items-center gap-1.5 text-sm font-bold text-main-warm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <span>Discover More</span>
                    <FiArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
