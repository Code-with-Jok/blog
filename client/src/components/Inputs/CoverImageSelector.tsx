import { useRef } from "react";
import { LuFileImage, LuTrash } from "react-icons/lu";

interface CoverImageSelectorProps {
  image?: File | null;
  setImage: (image: File | null) => void;
  preview?: string | null;
  setPreview: (preview: string | null) => void;
}

const CoverImageSelector = ({
  setImage,
  preview,
  setPreview,
}: CoverImageSelectorProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const newPreview = URL.createObjectURL(file);
      setPreview(newPreview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
  };

  const onChooseImageClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!preview ? (
        <div
          className="w-full h-56 flex flex-col items-center justify-center gap-2 bg-gray-50/50 rounded-md border border-dashed border-gray-300 cursor-pointer relative hover:bg-gray-100 transition-colors"
          onClick={onChooseImageClick}
        >
          <div className="size-14 flex items-center justify-center bg-sky-50 rounded-full">
            <LuFileImage className="text-sky-500 text-2xl" />
          </div>
          <p className="text-sm text-gray-700 font-medium">
            Click to upload a cover image
          </p>
        </div>
      ) : (
        <div className="relative w-full h-56 group">
          <img
            src={preview}
            alt="preview"
            className="size-full object-contain rounded-md"
          />
          <button
            onClick={handleRemoveImage}
            type="button"
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 shadow-md cursor-pointer hover:bg-red-600 transition-all opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100"
            title="Remove image"
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default CoverImageSelector;
