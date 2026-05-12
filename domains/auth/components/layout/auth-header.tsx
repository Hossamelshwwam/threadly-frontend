import Link from "next/link";

export const AuthHeader = () => {
  return (
    <header className="w-full flex justify-center py-6 bg-surface border-b border-border-subtle">
      <Link
        href="/"
        className="font-sans text-3xl font-black tracking-tight text-on-surface"
      >
        Threadly
      </Link>
    </header>
  );
};
