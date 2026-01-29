import { createPortal } from "react-dom";
import { useEffect } from "react";

type ModalProps = {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  hideHeader?: boolean;
  children: React.ReactNode;
};

const Modal = ({
  isOpen,
  title,
  onClose,
  hideHeader,
  children,
}: ModalProps) => {
  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center size-full bg-black/40"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col bg-white shadow-lg rounded-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {!hideHeader && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="md:text-lg font-medium text-gray-900">{title}</h3>
          </div>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          type="button"
          className="text-gray-400 bg-transparent hover:bg-sky-100 hover:text-gray-900 rounded-lg text-sm size-8 flex justify-center items-center absolute top-3.5 right-3.5 cursor-pointer"
        >
          <svg
            className="size-3"
            aria-hidden
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>

        <div className="flex-1">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
