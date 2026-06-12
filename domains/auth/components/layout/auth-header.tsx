import Link from "next/link";

export const AuthHeader = () => {
  return (
    <header className="w-full flex justify-center py-6 bg-white border-b border-zinc-200">
      <Link
        href="/"
        className="text-3xl font-black tracking-tight text-zinc-900"
      >
        Threadly
      </Link>
    </header>
  );
};
