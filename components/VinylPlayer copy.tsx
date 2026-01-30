"use client";

import { useAudio } from "@/contexts/AudioContext";
import { FiVolume2 } from "react-icons/fi"; // pakai react-icons

export default function VinylPlayer() {
  const { isPlaying, togglePlay, volume, setVolume } = useAudio();

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-center gap-4">
      {/* VINYL BUTTON */}
      <button
        onClick={togglePlay}
        aria-label="Toggle music"
        className="
          relative
          w-20 sm:w-24 md:w-28
          h-20 sm:h-24 md:h-28
          rounded-xl
          bg-gray-300
          flex items-center justify-center
          transition-all duration-300
          shadow-[4px_4px_8px_#cfcfcf,-4px_-4px_8px_#ffffff]
          hover:shadow-[6px_6px_12px_#cfcfcf,-6px_-6px_12px_#ffffff]
          active:shadow-[inset_3px_3px_6px_#cfcfcf,inset_-3px_-3px_6px_#ffffff]
        "
      >
        {/* VINYL */}
        <div
          className={`
            relative
            w-14 sm:w-16 md:w-20
            h-14 sm:h-16 md:h-20
            rounded-full
            bg-[radial-gradient(circle_at_center,_#222_0%,_#111_40%,_#000_100%)]
            ${isPlaying ? "animate-spin-slow" : ""}
          `}
        >
          {/* GROOVES */}
          <div className="absolute inset-[2px] rounded-full border border-sky-400/40" />
          <div className="absolute inset-[9px] rounded-full border border-sky-400/40" />

          {/* HIGHLIGHT ARC */}
          <div
            className="
              absolute
              inset-[5px]
              rounded-full
              border-2
              border-r
              border-b-transparent
              border-l-transparent
              border-t-sky-400/70
            "
          />

          {/* CENTER + MARKER */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-3 h-3 rounded-full bg-gray-300 shadow-inner">
              <div className="absolute top-0 left-1/2 w-[1px] h-2 bg-gray-500 -translate-x-1/2" />
            </div>
          </div>
        </div>

        {/* TONE ARM */}
        <div
          className={`
            absolute
            bottom-2 right-2
            origin-bottom
            transition-transform duration-500 ease-out
            ${isPlaying ? "rotate-[-25deg]" : "rotate-[0deg]"}
          `}
        >
          <div className="w-[3px] h-8 bg-gray-400 rounded-full" />
          <div className="w-2 h-2 bg-gray-400 rounded-full -mt-1 ml-[-3px]" />
        </div>
      </button>

      {/* VOLUME SLIDER + ICON */}
      <div className="flex items-center gap-1">
        {/* Volume Icon */}
        <FiVolume2 className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
        {/* Slider */}
        <input
          type="range"
          min={0}
          max={1}
          step={0.1}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="
            w-16 sm:w-20 md:w-24
            h-1
            appearance-none
            rounded-full
            bg-gray-300
            overflow-hidden
            cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-3
            [&::-webkit-slider-thumb]:h-3
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-sky-400/70
            [&::-webkit-slider-runnable-track]:bg-gray-300
          "
        />
      </div>
    </div>
  );
}
