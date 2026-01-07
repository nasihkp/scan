import { useState } from "react";
import {
  ArrowLeft,
  Edit2,
  Plus,
  Trash2,
  FileText,
} from "lucide-react";

interface PDFPreviewScreenProps {
  images: string[];          // REAL scanned images
  onBack: () => void;
  onSave: (fileName: string, images: string[]) => void;
}

interface Page {
  id: string;
  image: string;
  sizeKB: number;
}

export function PDFPreviewScreen({
  images,
  onBack,
  onSave,
}: PDFPreviewScreenProps) {
  const [fileName, setFileName] = useState("Scanned_Document");
  const [pages, setPages] = useState<Page[]>(
    images.map((img) => ({
      id: crypto.randomUUID(),
      image: img,
      sizeKB: Math.round(img.length / 1024), // rough estimate
    }))
  );

  const totalSizeMB = (
    pages.reduce((sum, p) => sum + p.sizeKB, 0) / 1024
  ).toFixed(2);

  /* DELETE PAGE */
  const deletePage = (id: string) => {
    setPages((prev) => prev.filter((p) => p.id !== id));
  };

  /* ADD PAGE (placeholder – connect camera/gallery later) */
  const addPage = () => {
    alert("Connect Camera or Gallery here");
  };

  return (
    <div className="h-screen w-full bg-gray-50 flex flex-col">
      {/* TOP BAR */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b">
        <button onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </button>

        <h2 className="font-semibold">PDF Preview</h2>
        <div className="w-6" />
      </div>

      {/* FILE NAME */}
      <div className="bg-white px-5 py-4 border-b">
        <label className="text-xs text-gray-500 font-medium mb-1 block">
          File Name
        </label>
        <div className="flex items-center gap-2">
          <input
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="flex-1 border rounded-lg px-3 py-2 text-sm"
          />
          <Edit2 className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* PAGES */}
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4">
        {pages.map((page, index) => (
          <div
            key={page.id}
            className="bg-white border rounded-xl p-3 shadow-sm"
          >
            <div className="flex gap-4">
              {/* THUMBNAIL */}
              <img
                src={page.image}
                alt={`Page ${index + 1}`}
                className="w-20 h-28 object-cover rounded-lg border"
              />

              {/* INFO */}
              <div className="flex-1">
                <h3 className="font-semibold text-sm">
                  Page {index + 1}
                </h3>
                <p className="text-xs text-gray-500 mb-2">
                  A4 • {page.sizeKB} KB
                </p>

                <button
                  onClick={() => deletePage(page.id)}
                  className="text-xs text-red-600 flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* ADD PAGE */}
        <button
          onClick={addPage}
          className="w-full border-2 border-dashed rounded-xl py-6 text-blue-600 flex flex-col items-center gap-2"
        >
          <Plus className="w-6 h-6" />
          Add Page
        </button>
      </div>

      {/* FOOTER */}
      <div className="bg-white border-t px-5 py-4">
        <div className="flex justify-between text-sm text-gray-600 mb-3">
          <span>{pages.length} pages</span>
          <span>Total size: {totalSizeMB} MB</span>
        </div>

        <button
          onClick={() =>
            onSave(fileName, pages.map((p) => p.image))
          }
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2"
        >
          <FileText className="w-5 h-5" />
          Save as PDF
        </button>
      </div>
    </div>
  );
}
