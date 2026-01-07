import { Camera, FileText, Settings, Plus, Clock } from "lucide-react";
import type { Screen } from "../App";

interface ScannedDoc {
  id: string;
  image: string;
  date: string;
}

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
  onScan: () => void;
  scannedDocs: ScannedDoc[];
}

export function HomeScreen({
  onNavigate,
  onScan,
  scannedDocs,
}: HomeScreenProps) {
  return (
    <div className="h-screen w-full bg-gray-50 flex flex-col">
      {/* Top app bar */}
      <div className="bg-white border-b border-gray-200 px-5 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">SmartScan</h1>
          <p className="text-xs text-gray-500">Your scanned images</p>
        </div>
        <button
          onClick={() => onNavigate("settings")}
          className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center"
        >
          <Settings className="w-5 h-5 text-blue-600" />
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto px-5 py-6">
        {/* Scan button */}
        <button
          onClick={onScan}
          className="w-full bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-6 flex items-center justify-center gap-3 shadow-lg mb-6"
        >
          <Camera className="w-7 h-7" />
          <span className="text-lg font-semibold">Scan Document</span>
        </button>

        {/* Recent scans */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-gray-500" />
            <h2 className="text-sm font-semibold text-gray-700 uppercase">
              Recent Scans
            </h2>
          </div>

          {/* EMPTY STATE */}
          {scannedDocs.length === 0 && (
            <div className="bg-white border border-dashed border-gray-300 rounded-xl p-6 text-center text-gray-500">
              No scans yet.  
              <br />
              Tap <strong>Scan Document</strong> to create one.
            </div>
          )}

          {/* SCANNED IMAGES */}
          <div className="space-y-3">
            {scannedDocs.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-xl p-3 flex items-center gap-4 border border-gray-200 hover:shadow-md transition"
              >
                <img
                  src={doc.image}
                  alt="Scanned"
                  className="w-14 h-14 rounded-lg object-cover border"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-sm text-gray-900">
                    Scanned Image
                  </h3>
                  <p className="text-xs text-gray-500">{doc.date}</p>
                </div>

                <FileText className="w-5 h-5 text-blue-600" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating scan button */}
      <button
        onClick={onScan}
        className="absolute bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition"
      >
        <Plus className="w-7 h-7" />
      </button>
    </div>
  );
}
