import { useEffect, useRef, useState } from "react";
import { LuTrash, LuUpload, LuUser } from "react-icons/lu";

type ProfilePhotoSelectorProps = {
  image?: File | null;
  setImage?: (image: File | null) => void;
  preview?: string | null;
  setPreview?: (image: string | null) => void;
};

const ProfilePhotoSelector = ({
  image,
  setImage,
  preview,
  setPreview,
}: ProfilePhotoSelectorProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage?.(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const removeImage = () => {
    setImage?.(null);
    setPreview?.(null);
    setPreviewUrl(null);
  };

  const onChooseFile = () => {
    inputRef.current?.click();
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!image && !preview ? (
        <div className="size-20 flex items-center justify-center bg-sky-50 rounded-full relative cursor-pointer">
          <LuUser className="text-4xl text-sky-500" />
          <button
            type="button"
            onClick={onChooseFile}
            className="size-8 flex items-center justify-center bg-linear-to-r from-sky-500 to-cyan-400 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer"
          >
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={(image ? previewUrl : preview) || ""}
            alt="profile photo"
            className="size-20 rounded-full object-cover"
          />
          <button
            type="button"
            onClick={removeImage}
            className="size-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer"
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
