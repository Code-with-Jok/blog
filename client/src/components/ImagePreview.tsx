import { useEffect, useState } from "react";
import { LuEye } from "react-icons/lu";
import { cn } from "@/utils";
import Modal from "./Modal";

interface ImagePreviewProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  previewSrc?: string;
  wrapperClassName?: string;
  overlayClassName?: string;
}

const ImagePreview = ({
  src,
  alt,
  className,
  wrapperClassName,
  overlayClassName,
  previewSrc,
  ...props
}: ImagePreviewProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  return (
    <>
      <div
        className={cn(
          "relative group cursor-pointer overflow-hidden inline-block rounded-lg",
          wrapperClassName
        )}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
      >
        <img
          src={src}
          alt={alt}
          className={cn("block transition-all rounded-[inherit]", className)}
          {...props}
        />
        {/* Hover Overlay */}
        <div
          className={cn(
            "absolute inset-0 rounded-[inherit] bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center",
            overlayClassName
          )}
        >
          <LuEye className="text-white text-2xl drop-shadow-md" />
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} hideHeader>
        <div className="flex items-center justify-center bg-white p-1 min-h-[200px]">
          <img
            src={previewSrc || src}
            alt={alt || "Preview"}
            className="max-h-[85vh] max-w-full object-contain rounded-md"
          />
        </div>
      </Modal>
    </>
  );
};

export default ImagePreview;
