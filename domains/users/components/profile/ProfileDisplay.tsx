import React from "react";
import { RiMailLine, RiPhoneLine, RiUser3Line } from "react-icons/ri";

export default function ProfileDisplay({ user }: any) {
  return (
    <div className="max-w-2xl space-y-6 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-zinc-50 border border-zinc-100 rounded-xl p-5">
          <div className="flex items-center gap-2 text-zinc-500 mb-1.5">
            <RiUser3Line size={16} />
            <span className="text-xs font-bold uppercase tracking-wider">
              Full Name
            </span>
          </div>
          <p className="text-base font-semibold text-zinc-900">
            {user.data.name}
          </p>
        </div>

        <div className="bg-zinc-50 border border-zinc-100 rounded-xl p-5">
          <div className="flex items-center gap-2 text-zinc-500 mb-1.5">
            <RiMailLine size={16} />
            <span className="text-xs font-bold uppercase tracking-wider">
              Email Address
            </span>
          </div>
          <p className="text-base font-semibold text-zinc-900">
            {user.data.email}
          </p>
        </div>

        <div className="bg-zinc-50 border border-zinc-100 rounded-xl p-5 md:col-span-2">
          <div className="flex items-center gap-2 text-zinc-500 mb-1.5">
            <RiPhoneLine size={16} />
            <span className="text-xs font-bold uppercase tracking-wider">
              Phone Number
            </span>
          </div>
          <p className="text-base font-semibold text-zinc-900">
            {user.data.phone || (
              <span className="text-zinc-400 italic">
                No phone number added
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
