import { useRef, useState, type DragEvent, type ChangeEvent } from "react";
import { Upload, Loader2 } from "lucide-react";
import { useUploadImageMutation } from "../../redux/features/uploadApi";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const UploadImage = ({
  thumbnail,
  setThumbnail,
}: {
  thumbnail: string;
  setThumbnail: (link: string) => void;
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [uploadImage, { isLoading }] = useUploadImageMutation();

  const handleFile = async (file: File) => {
    setError(null);

    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError("Image must be 5MB or smaller.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await uploadImage(formData).unwrap();
      setThumbnail(res?.data?.url);
    } catch {
      setError("Upload failed. Please try again.");
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // required, otherwise the browser opens the file
    if (!isLoading) setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (isLoading) return;

    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = ""; // allow re-selecting the same file
  };

  return (
    <div>
      <label className="block text-xs font-semibold text-slate-300">
        Thumbnail Image
      </label>

      <div className="mt-1.5 flex flex-col gap-3 sm:flex-row sm:items-center">
        {thumbnail && (
          <div className="relative h-20 w-32 overflow-hidden rounded-xl border border-slate-700 bg-slate-950">
            <img
              src={thumbnail}
              alt="Thumbnail preview"
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div className="flex-1">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !isLoading && inputRef.current?.click()}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed bg-slate-950 p-4 text-center transition-colors ${
              isDragging
                ? "border-indigo-500 bg-indigo-500/10"
                : "border-slate-800"
            } ${isLoading ? "cursor-wait opacity-70" : ""}`}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin text-indigo-400" />
            ) : (
              <Upload className="h-5 w-5 text-indigo-400" />
            )}

            <p className="mt-1 text-xs text-slate-300">
              {isLoading
                ? "Uploading..."
                : "Drag & drop cover image here, or click to browse"}
            </p>

            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleInputChange}
              disabled={isLoading}
            />

            <input
              type="text"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              disabled={isLoading}
              placeholder="https://images.unsplash.com/..."
              className="mt-2 w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default UploadImage;
