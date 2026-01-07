import {
  ArrowLeft,
  Download,
  Share2,
  Printer,
  Check,
  FileText,
} from "lucide-react";

interface SaveShareScreenProps {
  pdfUrl: string;          // real generated PDF URL
  fileName: string;        // dynamic file name
  onBack: () => void;
  onComplete: () => void;
}

export function SaveShareScreen({
  pdfUrl,
  fileName,
  onBack,
  onComplete,
}: SaveShareScreenProps) {
  /* DOWNLOAD */
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = fileName;
    link.click();
  };

  /* SHARE */
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: fileName,
          text: "Scanned document",
          url: pdfUrl,
        });
      } else {
        alert("Sharing not supported on this device");
      }
    } catch (err) {
      console.error("Share failed", err);
    }
  };

  /* PRINT */
  const handlePrint = () => {
    const win = window.open(pdfUrl);
    if (!win) return;
    win.onload = () => win.print();
  };

  return (
    <div className="h-screen w-full bg-gray-50 flex flex-col">
      {/* TOP BAR */}
      <div className="bg-white px-4 py-3 flex items-center border-b">
        <button onClick={onBack}>
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h2 className="flex-1 text-center font-semibold">
          Save & Share
        </h2>
      </div>

      {/* SUCCESS */}
      <div className="bg-white px-5 py-6 border-b">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold">Document Ready</h3>
            <p className="text-sm text-gray-600">
              Your PDF has been created
            </p>
          </div>
        </div>
      </div>

      {/* FILE INFO */}
      <div className="bg-white mx-5 mt-5 rounded-xl p-4 border">
        <div className="flex gap-3">
          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm truncate">
              {fileName}
            </p>
            <p className="text-xs text-gray-500">
              PDF document
            </p>
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex-1 px-5 py-6">
        <h3 className="text-xs font-semibold text-gray-500 mb-3">
          Quick Actions
        </h3>

        <div className="space-y-3">
          <ActionButton
            icon={<Download className="text-blue-600" />}
            title="Save to Device"
            desc="Download PDF"
            onClick={handleDownload}
          />

          <ActionButton
            icon={<Share2 className="text-green-600" />}
            title="Share Document"
            desc="Share via apps"
            onClick={handleShare}
          />

          <ActionButton
            icon={<Printer className="text-purple-600" />}
            title="Print Document"
            desc="Send to printer"
            onClick={handlePrint}
          />
        </div>
      </div>

      {/* DONE */}
      <div className="bg-white border-t px-5 py-4">
        <button
          onClick={onComplete}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold"
        >
          Done
        </button>
      </div>
    </div>
  );
}

/* REUSABLE ACTION BUTTON */
function ActionButton({
  icon,
  title,
  desc,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white border rounded-xl p-4 flex gap-4 hover:bg-gray-50"
    >
      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
        {icon}
      </div>
      <div className="text-left">
        <p className="font-semibold text-sm">{title}</p>
        <p className="text-xs text-gray-500">{desc}</p>
      </div>
    </button>
  );
}
