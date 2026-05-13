import CustomButton from "@/shared/components/custom-button/custom-button";
import CustomInput from "@/shared/components/custom-input/CustomInput";
import { useState } from "react";
import { FiGlobe, FiMail, FiShare2 } from "react-icons/fi";

const footerShop = ["New Arrivals", "Men", "Women", "Accessories"];
const footerSupport = ["About Us", "Shipping Policy", "Returns", "Privacy"];

export default function Footer() {
  const [email, setEmail] = useState<string>("");

  return (
    <footer className="w-full bg-white border-t border-zinc-200">
      <div className="max-w-[1280px] mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <span className="text-xl font-black tracking-tight text-zinc-950 mb-3 block">
            Thread<span className="text-amber-400">ly</span>
          </span>
          <p className="text-sm text-zinc-500 max-w-xs leading-relaxed">
            Elevating your daily wardrobe with curated essentials and
            avant-garde designs.
          </p>
        </div>

        {/* Shop links */}
        <div className="flex flex-col gap-2">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-950 mb-1">
            Shop
          </h4>
          {footerShop.map((l) => (
            <a
              key={l}
              href="#"
              className="text-sm text-zinc-500 hover:text-amber-500 transition-colors"
            >
              {l}
            </a>
          ))}
        </div>

        {/* Support links */}
        <div className="flex flex-col gap-2">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-950 mb-1">
            Support
          </h4>
          {footerSupport.map((l) => (
            <a
              key={l}
              href="#"
              className="text-sm text-zinc-500 hover:text-amber-500 transition-colors"
            >
              {l}
            </a>
          ))}
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-950 mb-3">
            Newsletter
          </h4>
          <p className="text-sm text-zinc-500 mb-4 leading-relaxed">
            Subscribe to receive updates and exclusive deals.
          </p>
          <div className="flex gap-2">
            <CustomInput
              name="newsletter"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
            />
            <CustomButton theme="primary" variant="solid">
              Join
            </CustomButton>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-[1280px] mx-auto px-4 py-4 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-3">
        <p className="text-xs text-zinc-400">
          © {new Date().getFullYear()} Threadly Marketplace. All rights
          reserved.
        </p>
        <div className="flex gap-4">
          {[FiGlobe, FiShare2, FiMail].map((Icon, i) => (
            <button
              key={i}
              className="text-zinc-400 hover:text-amber-500 transition-colors"
            >
              <Icon size={16} />
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}
