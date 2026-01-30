"use client";

import { useEffect } from "react";
import { Typewriter } from "react-simple-typewriter";

type Props = {
  text: string;
  onFinished: () => void;
};

export default function TypingText({ text, onFinished }: Props) {
  useEffect(() => {
    // estimasi durasi typing (ms)
    const typingDuration = text.length * 70 + 500;

    const timer = setTimeout(() => {
      onFinished();
    }, typingDuration);

    return () => clearTimeout(timer);
  }, [text, onFinished]);

  return (
    <h1 className="text-xl text-center font-medium">
      <Typewriter
        words={[text]}
        typeSpeed={70}
        deleteSpeed={0}
        delaySpeed={1000}
        cursor
        cursorStyle="_"
        loop={1}
      />
    </h1>
  );
}
