import CustomInput from "@/shared/components/custom-input/CustomInput";
import Link from "next/link";
import { FiSearch, FiShoppingBag, FiUser, FiMenu } from "react-icons/fi";

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-zinc-50/95 backdrop-blur-sm border-b border-zinc-200 shadow-xs">
      <div className="max-w-[1280px] mx-auto px-4 py-3 md:py-0 md:h-16 flex flex-wrap md:grid md:grid-cols-3 items-center justify-between gap-y-3 md:gap-y-0">
        <div className="flex items-center gap-2 order-1 md:order-0 md:col-span-1">
          <button className="md:hidden p-2 -ml-2 text-zinc-600 hover:text-amber-400 transition-colors rounded-full hover:bg-zinc-100">
            <FiMenu size={22} />
          </button>

          <Link
            href="/"
            className="text-2xl font-black tracking-tight text-zinc-950 w-fit"
          >
            Thread<span className="text-amber-400">ly</span>
          </Link>
        </div>

        {/* Search — Center (ينزل لصف جديد ويأخذ 100% من العرض على الموبايل) */}
        <div className="w-full order-3 md:order-0 md:col-span-1 flex items-center justify-center">
          <div className="w-full max-w-lg">
            <CustomInput
              type="text"
              placeholder="Search for products..."
              name="search"
              Icon={FiSearch}
            />
          </div>
        </div>

        {/* Icons — Right */}
        <div className="flex items-center gap-1 justify-end order-2 md:col-span-1">
          <button className="p-2 rounded-full hover:bg-zinc-100 transition-colors text-zinc-600 hover:text-amber-400 relative">
            <FiShoppingBag size={20} />
            {/* Optional Notification Badge */}
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400 border border-zinc-50"></span>
          </button>
          <button className="p-2 rounded-full hover:bg-zinc-100 transition-colors text-zinc-600 hover:text-amber-400 flex">
            <FiUser size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
