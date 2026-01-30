"use client";

type ModalMessageProps = {
  message: string;
  confirmationButton?: string;
  onClose: () => void;
  onConfirm?: () => void;
};

export default function ModalMessage({
  message,
  confirmationButton,
  onClose,
}: ModalMessageProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="
        relative
        z-10
        bg-[#fafafa]
        rounded-2xl
        px-6 py-5
        w-[90%] max-w-sm
        text-center
        shadow-[8px_8px_16px_#d1d1d1,-8px_-8px_16px_#ffffff]
      "
      >
        <p className="text-lg mb-6">{message}</p>

        <button
          onClick={onClose}
          className="
            px-5 py-2
            rounded-lg
            bg-[#e8e8e8]
            shadow-[4px_4px_10px_#cfcfcf,-4px_-4px_10px_#ffffff]
            active:shadow-[inset_3px_3px_8px_#c5c5c5,inset_-3px_-3px_8px_#ffffff]
          "
        >
          {confirmationButton || "Close"}
        </button>
      </div>
    </div>
  );
}
