"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import NavigationButtons from "@/components/NavigationButtons";
import Button from "@/components/Button";
import ModalMessage from "@/components/ModalMessage";
import { MEETUP_INVITATION } from "@/utils/constants";
import { useFormData } from "@/contexts/FormContext";

export default function Page1() {
  const router = useRouter();
  const { update } = useFormData();

  const [showModal, setShowModal] = useState(false);

  // posisi tombol NO (null = posisi awal)
  const [noPos, setNoPos] = useState<{ x: number; y: number } | null>(null);
  const [escapeCount, setEscapeCount] = useState(0);

  const maxEscapeCount = 10;
  const wleTextsCount = 3;

  const handleYes = () => {
    update({ meetupAnswer: true });
    router.push("/dates");
  };

  const isClickablePhase =
    escapeCount !== 0 && escapeCount % maxEscapeCount === 0;

  const moveNoButton = () => {
    // kalau sudah boleh diklik → JANGAN kabur
    if (isClickablePhase) return;

    const nextCount = escapeCount + 1;

    // masuk fase boleh klik
    if (nextCount % maxEscapeCount === 0) {
      setEscapeCount(nextCount);
      setNoPos(null); // balik ke posisi awal
      return;
    }

    getRandomPosition(nextCount);
  };

  const getRandomPosition = (nextCount: number) => {
    const padding = 16;
    const buttonWidth = 140;
    const buttonHeight = 56;

    const maxX = window.innerWidth - buttonWidth - padding;
    const maxY = window.innerHeight - buttonHeight - padding;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    setNoPos({ x: randomX, y: randomY });
    setEscapeCount(nextCount);
  };

  const handleNoClick = () => {
    if (!isClickablePhase) return;

    setShowModal(true);

    // reset supaya habis ini kabur lagi
    setEscapeCount(0);
    setNoPos(null);
  };

  const noText = isClickablePhase
    ? "yaudah 😳"
    : escapeCount >= maxEscapeCount - wleTextsCount
      ? "wlee 😛"
      : MEETUP_INVITATION.noButton;

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      {/* CARD */}
      <div className="bg-[#fafafa] rounded-3xl p-6 w-full max-w-sm text-center shadow-[10px_10px_20px_#d1d1d1,-10px_-10px_20px_#ffffff] relative">
        {/* IMAGE */}
        <div className="relative h-40 mb-4 rounded-xl overflow-hidden shadow-[inset_3px_3px_6px_#c5c5c5,inset_-3px_-3px_6px_#ffffff]">
          <Image
            src="/images/started.webp"
            alt="Started Image"
            fill
            className="object-cover"
            priority
          />
        </div>

        <p className="text-lg mb-6">{MEETUP_INVITATION.question}</p>

        {/* BUTTON AREA */}
        <div className="flex justify-center gap-4">
          <Button onClick={handleYes}>{MEETUP_INVITATION.yesButton}</Button>

          {/* NO BUTTON – posisi awal */}
          {!noPos && (
            <div
              onMouseEnter={!isClickablePhase ? moveNoButton : undefined}
              onTouchStart={
                !isClickablePhase
                  ? (e) => {
                      e.preventDefault();
                      moveNoButton();
                    }
                  : undefined
              }
            >
              <Button onClick={handleNoClick}>{noText}</Button>
            </div>
          )}
        </div>

        <NavigationButtons />
      </div>

      {/* NO BUTTON – MODE KABUR (DI LUAR CARD) */}
      {noPos && (
        <div
          className="fixed z-50 transition-transform duration-200 touch-none"
          style={{
            left: noPos.x,
            top: noPos.y,
          }}
          onMouseEnter={!isClickablePhase ? moveNoButton : undefined}
          onTouchStart={
            !isClickablePhase
              ? (e) => {
                  e.preventDefault();
                  moveNoButton();
                }
              : undefined
          }
        >
          <Button onClick={handleNoClick}>{noText}</Button>
        </div>
      )}

      {showModal && (
        <ModalMessage
          message={MEETUP_INVITATION.noMessage}
          confirmationButton={MEETUP_INVITATION.noMessageConfirmButton}
          onClose={() => setShowModal(false)}
        />
      )}
    </main>
  );
}
