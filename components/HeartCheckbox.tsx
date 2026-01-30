"use client";

type HeartCheckboxProps = {
  checked: boolean;
  onChange: () => void;
  label: string;
};

export default function HeartCheckbox({
  checked,
  onChange,
  label,
}: HeartCheckboxProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      {/* LABEL */}
      <span className="text-left">{label}</span>

      {/* HEART */}
      <label className="relative w-[40px] h-[40px] cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="absolute inset-0 opacity-0 z-10 cursor-pointer"
        />

        <div className="w-full h-full flex items-center justify-center relative">
          {/* OUTLINE */}
          <svg
            viewBox="0 0 24 24"
            className={`absolute transition-transform duration-200 ${
              checked ? "scale-0" : "scale-100"
            }`}
            fill="rgb(255, 91, 137)"
          >
            <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z" />
          </svg>

          {/* FILLED */}
          {checked && (
            <svg
              viewBox="0 0 24 24"
              className="absolute animate-[heart-pop_0.35s_ease-out]"
              fill="rgb(255, 91, 137)"
            >
              <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z" />
            </svg>
          )}
        </div>
      </label>
    </div>
  );
}
