"use client";

import { usePathname, useRouter } from "next/navigation";
import NavButton from "./NavButton";

export default function NavigationButtons() {
  const router = useRouter();
  const pathname = usePathname();

  // 🚫 AUTO HIDE DI HOME / PAGE PERTAMA
  if (pathname === "/") return null;
  if (pathname === "/page1") {
    return (
      <div className="mt-10 flex justify-center gap-4 opacity-80">
        <NavButton icon="🏠" title="Home" onClick={() => router.push("/")} />
      </div>
    );
  }

  return (
    <div className="mt-10 flex justify-center gap-4 opacity-80">
      <NavButton icon="←" title="Back" onClick={() => router.back()} />

      <NavButton icon="🏠" title="Home" onClick={() => router.push("/")} />
    </div>
  );
}
