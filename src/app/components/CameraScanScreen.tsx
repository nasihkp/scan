import { useEffect, useRef, useState } from "react";
import { X, Zap, SwitchCamera } from "lucide-react";

interface CameraScanScreenProps {
  onBack: () => void;
  onCapture: (image: string) => void;
}

export function CameraScanScreen({ onBack, onCapture }: CameraScanScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">(
    "environment"
  );
  const [flash, setFlash] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [capturing, setCapturing] = useState(false);

  /* ================= START CAMERA ================= */
  useEffect(() => {
    let activeStream: MediaStream;

    const startCamera = async () => {
      try {
        if (stream) stream.getTracks().forEach(t => t.stop());

        activeStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode },
        });

        setStream(activeStream);

        if (videoRef.current) {
          videoRef.current.srcObject = activeStream;
          videoRef.current.setAttribute("playsinline", "");
          videoRef.current.muted = true;
          await videoRef.current.play();
        }
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Camera access denied or unavailable");
      }
    };

    startCamera();

    return () => {
      activeStream?.getTracks().forEach(t => t.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facingMode]);

  /* ================= TORCH ================= */
  useEffect(() => {
    if (!stream) return;

    const track = stream.getVideoTracks()[0];
    const cap: any = track.getCapabilities?.();

    if (cap?.torch) {
      track
        .applyConstraints({ advanced: [{ torch: flash } as any] })
        .catch(() => { });
    }
  }, [flash, stream]);

  /* ================= CAPTURE ================= */
  const capture = () => {
    if (!videoRef.current || !canvasRef.current) return;

    setCapturing(true);

    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const image = canvas.toDataURL("image/jpeg", 0.95);
    onCapture(image);

    setTimeout(() => setCapturing(false), 150);
  };

  /* ================= UI ================= */
  if (error) {
    return (
      <div className="h-screen bg-black flex items-center justify-center text-white">
        {error}
      </div>
    );
  }

  return (
    <div className="relative h-screen bg-black overflow-hidden">
      <canvas ref={canvasRef} className="hidden" />

      {capturing && (
        <div className="absolute inset-0 bg-white opacity-70 z-50" />
      )}

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* TOP BAR */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between z-20">
        <button
          onClick={onBack}
          className="bg-black/50 p-2 rounded-full"
        >
          <X className="text-white" />
        </button>

        <div className="flex gap-3">
          <button
            onClick={() => setFlash(f => !f)}
            className={`p-2 rounded-full ${flash ? "bg-yellow-400 text-black" : "bg-black/50 text-white"
              }`}
          >
            <Zap />
          </button>

          <button
            onClick={() =>
              setFacingMode(m => (m === "user" ? "environment" : "user"))
            }
            className="bg-black/50 p-2 rounded-full"
          >
            <SwitchCamera className="text-white" />
          </button>
        </div>
      </div>

      {/* CAPTURE BUTTON */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center z-20">
        <button
          onClick={capture}
          disabled={capturing}
          className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center active:scale-95"
        >
          <div className="w-14 h-14 bg-white rounded-full" />
        </button>
      </div>
    </div>
  );
}
