"use client";

import { useState } from "react";
import TypingText from "@/components/TypingText";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { OPENING } from "@/utils/constants";

export default function HomePage() {
  const [showButton, setShowButton] = useState(false);
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      {/* Typing Text */}
      <TypingText
        text={OPENING.runningText}
        onFinished={() => setShowButton(true)}
      />

      {/* Continue Button */}
      {showButton && (
        <div className="mt-8 animate-fade-in">
          <Button onClick={() => router.push("/started")}>
            {OPENING.buttonText}
          </Button>
        </div>
      )}
    </main>
  );
}
