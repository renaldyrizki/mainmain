"use client";

import styled from "styled-components";
import { useAudio } from "@/contexts/AudioContext";

export default function VinylPlayer() {
  const { isPlaying, togglePlay, volume, setVolume } = useAudio();

  return (
    <Wrapper $playing={isPlaying}>
      <div className="vinyl-box" onClick={togglePlay}>
        {/* Vinyl */}
        <div className="plate">
          <div className="black">
            <div className="border">
              <div className="white">
                <div className="center" />
              </div>
            </div>
          </div>
        </div>

        {/* Tone Arm */}
        <div className="player">
          <div className="rect" />
          <div className="circ" />
        </div>
      </div>

      {/* Volume */}
      <label className="slider">
        <input
          type="range"
          className="level"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
        <svg
          className="volume"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M18.36 19.36a1 1 0 0 1-.705-1.71C19.167 16.148 20 14.142 20 12s-.833-4.148-2.345-5.65a1 1 0 1 1 1.41-1.419C20.958 6.812 22 9.322 22 12s-1.042 5.188-2.935 7.069a.997.997 0 0 1-.705.291z" />
          <path d="M15.53 16.53a.999.999 0 0 1-.703-1.711C15.572 14.082 16 13.054 16 12s-.428-2.082-1.173-2.819a1 1 0 1 1 1.406-1.422A6 6 0 0 1 18 12a6 6 0 0 1-1.767 4.241.996.996 0 0 1-.703.289zM12 22a1 1 0 0 1-.707-.293L6.586 17H4c-1.103 0-2-.897-2-2V9c0-1.103.897-2 2-2h2.586l4.707-4.707A.998.998 0 0 1 13 3v18a1 1 0 0 1-1 1z" />
        </svg>
      </label>
    </Wrapper>
  );
}

const Wrapper = styled.div<{ $playing: boolean }>`
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  z-index: 50;

  .vinyl-box {
    width: 175px;
    height: 175px;
    background: #abc4aa;
    border-radius: 12px;
    position: relative;
    box-shadow: 5px 5px 0 #675d50;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .plate .black {
    width: 150px;
    height: 150px;
    background: #675d50;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: ${({ $playing }) =>
      $playing ? "spin 2.5s linear infinite" : "none"};
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  /* tone arm */
  .player {
    position: absolute;
    bottom: 12px;
    right: 12px;
    transform: rotate(${({ $playing }) => ($playing ? "-30deg" : "-55deg")});
    transition: transform 0.4s ease;
  }

  .rect {
    width: 10px;
    height: 55px;
    background: #f3deba;
    border-radius: 6px;
  }

  .circ {
    width: 25px;
    height: 25px;
    background: #f3deba;
    border-radius: 50%;
    position: absolute;
    top: -10px;
    left: -7px;
  }

  /* slider */
  .slider {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 160px;
  }

  .level {
    appearance: none;
    width: 100%;
    height: 6px;
    background: #525252;
    border-radius: 999px;
    overflow: hidden;
  }

  .level::-webkit-slider-thumb {
    appearance: none;
    width: 0;
    height: 0;
    box-shadow: -200px 0 0 200px #fff;
  }

  .volume {
    width: 22px;
    height: 22px;
    fill: #525252;
  }
`;
