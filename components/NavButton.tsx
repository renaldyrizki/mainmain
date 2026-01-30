"use client";

type NavButtonProps = {
  icon: string;
  onClick: () => void;
  title?: string;
};

export default function NavButton({ icon, onClick, title }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      title={title}
      aria-label={title}
      className="
        w-9 h-9
        flex items-center justify-center
        rounded-full
        bg-[#fafafa]
        text-[#444]
        border border-[#e0e0e0]

        transition-all duration-200
        shadow-[2px_2px_6px_#d1d1d1,-2px_-2px_6px_#ffffff]

        hover:text-[#111]
        hover:shadow-[1px_1px_4px_#cfcfcf,-1px_-1px_4px_#ffffff]

        active:scale-95
        active:shadow-[inset_1px_1px_3px_#cfcfcf,inset_-1px_-1px_3px_#ffffff]
      "
    >
      <span className="text-lg leading-none">{icon}</span>
    </button>
  );
}
