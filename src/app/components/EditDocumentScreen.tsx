import { useState } from "react";
import {
  ArrowLeft,
  Crop,
  RotateCw,
  Filter,
  Sun,
  Check,
} from "lucide-react";
import ReactCrop, { type Crop as ReactCropType, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface EditDocumentScreenProps {
  image: string;
  onBack: () => void;
  onNext: (editedImage: string) => void;
}

export function EditDocumentScreen({
  image,
  onBack,
  onNext,
}: EditDocumentScreenProps) {
  const [editedImage, setEditedImage] = useState(image);
  const [rotation, setRotation] = useState(0);
  const [activeTool, setActiveTool] = useState<"none" | "adjust" | "crop">("none");
  const [brightness, setBrightness] = useState(100);

  /* CROP STATE */
  const [crop, setCrop] = useState<ReactCropType>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [imgRef, setImgRef] = useState<HTMLImageElement | null>(null);

  /* APPLY MANUAL CROP */
  const applyManualCrop = () => {
    if (!completedCrop || !imgRef) return;

    const canvas = document.createElement("canvas");
    const scaleX = imgRef.naturalWidth / imgRef.width;
    const scaleY = imgRef.naturalHeight / imgRef.height;

    canvas.width = completedCrop.width * scaleX;
    canvas.height = completedCrop.height * scaleY;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(
      imgRef,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height
    );

    setEditedImage(canvas.toDataURL("image/jpeg", 0.95));
    setActiveTool("none");
    setCrop(undefined); // Reset crop
  };

  /* ROTATE IMAGE */
  const rotateImage = () => {
    const img = new Image();
    img.src = editedImage;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      const angle = (rotation + 90) % 360;

      canvas.width = img.height;
      canvas.height = img.width;

      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((90 * Math.PI) / 180);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);

      setRotation(angle);
      setEditedImage(canvas.toDataURL("image/jpeg", 0.95));
    };
  };

  /* APPLY FILTER */
  const applyFilter = (filterType: "grayscale" | "magic" | "bw") => {
    const img = new Image();
    img.src = editedImage;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      canvas.width = img.width;
      canvas.height = img.height;

      if (filterType === "grayscale") {
        ctx.filter = "grayscale(100%)";
        ctx.drawImage(img, 0, 0);
      } else if (filterType === "magic") {
        ctx.filter = "contrast(1.2) saturate(1.5)";
        ctx.drawImage(img, 0, 0);
      } else if (filterType === "bw") {
        ctx.filter = "grayscale(100%) contrast(1.5)";
        ctx.drawImage(img, 0, 0);
      }

      setEditedImage(canvas.toDataURL("image/jpeg", 0.95));
    };
  };

  return (
    <div className="h-screen w-full bg-gray-900 flex flex-col">
      {/* TOP BAR */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-gray-800">
        <button onClick={onBack} className="text-white flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <h2 className="text-white font-semibold">Edit Document</h2>
        <button
          onClick={() => onNext(editedImage)}
          className="text-blue-400 font-semibold"
        >
          Done
        </button>
      </div>

      {/* TOOL CONTROLS */}
      {activeTool === "adjust" && (
        <div className="bg-gray-800 px-6 py-4">
          <div className="flex items-center justify-between text-white text-sm mb-2">
            <span>Brightness</span>
            <span>{brightness}%</span>
          </div>
          <input
            type="range"
            min="50"
            max="150"
            value={brightness}
            onChange={(e) => {
              const val = Number(e.target.value);
              setBrightness(val);
            }}
            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      )}

      {/* IMAGE PREVIEW */}
      <div className="flex-1 flex items-center justify-center p-6 overflow-hidden bg-black/40">
        {activeTool === 'crop' ? (
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={undefined}
          >
            <img
              src={editedImage}
              onLoad={(e) => setImgRef(e.currentTarget)}
              className="max-h-[70vh] max-w-full rounded shadow-2xl"
            />
          </ReactCrop>
        ) : (
          <img
            src={editedImage}
            className="max-h-full max-w-full rounded-lg shadow-2xl transition duration-100"
            style={{
              filter: `brightness(${brightness}%)`
            }}
          />
        )}
      </div>

      {/* TOOLS */}
      <div className="border-t border-gray-800 px-4 py-6">
        {activeTool === "none" ? (
          <div className="flex justify-around text-white">
            <Tool icon={Crop} label="Crop" onClick={() => setActiveTool("crop")} />
            <Tool icon={RotateCw} label="Rotate" onClick={rotateImage} />
            <Tool icon={Filter} label="Magic Color" onClick={() => applyFilter("magic")} />
            <Tool icon={Sun} label="Adjust" onClick={() => setActiveTool("adjust")} />
          </div>
        ) : activeTool === "crop" ? (
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setActiveTool("none")}
              className="text-white bg-gray-600 px-6 py-2 rounded-full font-medium"
            >
              Cancel
            </button>
            <button
              onClick={applyManualCrop}
              className="text-white bg-blue-600 px-6 py-2 rounded-full font-medium"
            >
              Apply Crop
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <button
              onClick={() => setActiveTool("none")}
              className="text-white bg-blue-600 px-6 py-2 rounded-full font-medium"
            >
              Done Adjusting
            </button>
          </div>
        )}
      </div>

      {/* APPLY */}
      <div className="px-4 pb-6">
        <button
          onClick={() => onNext(editedImage)}
          className="w-full bg-blue-600 py-4 rounded-xl font-semibold flex items-center justify-center gap-2"
        >
          <Check className="w-5 h-5" />
          Apply Changes
        </button>
      </div>
    </div>
  );
}

/* TOOL BUTTON */
function Tool({
  icon: Icon,
  label,
  onClick,
  disabled,
}: any) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`flex flex-col items-center gap-2 ${disabled ? "opacity-40" : "hover:text-blue-400"
        }`}
    >
      <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center">
        <Icon className="w-6 h-6" />
      </div>
      <span className="text-xs">{label}</span>
    </button>
  );
}
