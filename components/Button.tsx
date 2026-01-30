"use client";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

export default function Button({ children, onClick, disabled }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="
        px-6 py-3
        text-[18px] font-medium
        rounded-lg
        bg-[#fafafa]
        text-[#090909]
        border border-[#fafafa]

        transition-all duration-200 ease-out

        /* DEFAULT (TIMBUL) */
        shadow-[6px_6px_12px_#d1d1d1,-6px_-6px_12px_#ffffff]

        /* HOVER → TURUN KE ARAH SHADOW */
        hover:translate-x-[1px]
        hover:translate-y-[1px]
        hover:shadow-[4px_4px_8px_#d1d1d1,-4px_-4px_8px_#ffffff]

        /* ACTIVE → MASUK (INSET) */
        active:translate-x-[2px]
        active:translate-y-[2px]
        active:text-[#666]
        active:shadow-[inset_4px_4px_12px_#d1d1d1,inset_-4px_-4px_12px_#ffffff]

        disabled:opacity-50
        disabled:shadow-none
        disabled:translate-x-0
        disabled:translate-y-0
        disabled:cursor-not-allowed
      "
    >
      {children}
    </button>
  );
}
