"use client";
import Link from "next/link";
import { RiInstagramLine, RiTwitterXLine, RiYoutubeLine } from "react-icons/ri";

export function Footer() {
  return (
    <footer className="w-full bg-zinc-50">
      <div className="container mx-auto px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="md:col-span-2 flex flex-col gap-6">
            <span
              className="text-2xl font-black tracking-tight"
              style={{
                background:
                  "linear-gradient(135deg, #d99a4a, #f59e0b, #f97316)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              THREADLY
            </span>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
              The curated marketplace for premium fashion and functional
              minimalism. Discover pieces that define your style.
            </p>
            <div className="flex items-center gap-3">
              {[
                {
                  Icon: RiInstagramLine,
                  label: "Instagram",
                  hoverColor: "#e4405f",
                },
                {
                  Icon: RiTwitterXLine,
                  label: "X (Twitter)",
                  hoverColor: "#1da1f2",
                },
                {
                  Icon: RiYoutubeLine,
                  label: "YouTube",
                  hoverColor: "#ff0000",
                },
              ].map(({ Icon, label, hoverColor }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-600 transition-all duration-300 hover:scale-110 hover:text-white"
                  style={
                    { "--hover-bg": hoverColor } as React.CSSProperties
                  }
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = hoverColor)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "")
                  }
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
          {[
            {
              title: "Shop",
              items: [
                "New Arrivals",
                "Men",
                "Women",
                "Accessories",
                "Sale",
              ],
              href: "/products",
              color: "#d99a4a",
            },
            {
              title: "Support",
              items: ["About Us", "Shipping", "Returns", "FAQ", "Contact"],
              href: "#",
              color: "#f59e0b",
            },
            {
              title: "Legal",
              items: ["Privacy", "Terms", "Cookies"],
              href: "#",
              color: "#f97316",
            },
          ].map((group) => (
            <div key={group.title} className="flex flex-col gap-2.5">
              <span
                className="text-xs font-bold tracking-[0.12em] uppercase mb-2"
                style={{ color: group.color }}
              >
                {group.title}
              </span>
              {group.items.map((item) => (
                <Link
                  key={item}
                  href={group.href}
                  className="text-sm text-zinc-500 transition-all duration-200"
                  style={
                    { "--hover-color": group.color } as React.CSSProperties
                  }
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = group.color)
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                >
                  {item}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-16 pt-8 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-400">
            &copy; {new Date().getFullYear()} Threadly. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />{" "}
              Made with precision
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />{" "}
              Built for style
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
