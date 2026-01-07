import { useState } from 'react';
import { X, Zap, Image as ImageIcon, ScanLine } from 'lucide-react';

interface CameraScanScreenProps {
  onBack: () => void;
  onCapture: (image: string) => void;
}

export function CameraScanScreen({ onBack, onCapture }: CameraScanScreenProps) {
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [autoScan, setAutoScan] = useState(true);

  const handleCapture = () => {
    // Simulate capturing an image
    onCapture('captured-document');
  };

  return (
    <div className="h-screen w-full bg-black relative">
      {/* Camera preview simulation */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <ScanLine className="w-16 h-16 text-white/40 mx-auto mb-4" />
            <p className="text-white/60 text-sm">Camera Preview</p>
            <p className="text-white/40 text-xs mt-1">Position document within frame</p>
          </div>
        </div>

        {/* Document detection frame overlay */}
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="w-full h-[60%] border-2 border-blue-500 rounded-lg relative">
            {/* Corner indicators */}
            <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-blue-500 rounded-tl-lg"></div>
            <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-blue-500 rounded-tr-lg"></div>
            <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-blue-500 rounded-bl-lg"></div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-blue-500 rounded-br-lg"></div>
          </div>
        </div>

        {autoScan && (
          <div className="absolute top-20 left-0 right-0 flex justify-center">
            <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              Auto-Scan Active
            </div>
          </div>
        )}
      </div>

      {/* Top controls */}
      <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-10">
        <button 
          onClick={onBack}
          className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setFlashEnabled(!flashEnabled)}
            className={`w-10 h-10 backdrop-blur-sm rounded-full flex items-center justify-center ${
              flashEnabled ? 'bg-blue-500' : 'bg-black/50'
            }`}
          >
            <Zap className={`w-5 h-5 ${flashEnabled ? 'text-white fill-white' : 'text-white'}`} />
          </button>

          <button
            onClick={() => setAutoScan(!autoScan)}
            className={`px-4 h-10 backdrop-blur-sm rounded-full flex items-center justify-center gap-2 ${
              autoScan ? 'bg-green-500' : 'bg-black/50'
            }`}
          >
            <ScanLine className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-medium">Auto</span>
          </button>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-0 left-0 right-0 p-6 pb-8 flex items-center justify-between z-10">
        {/* Gallery button */}
        <button className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
          <ImageIcon className="w-6 h-6 text-white" />
        </button>

        {/* Capture button */}
        <button
          onClick={handleCapture}
          className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform"
        >
          <div className="w-16 h-16 bg-blue-600 rounded-full"></div>
        </button>

        {/* Placeholder for balance */}
        <div className="w-14 h-14"></div>
      </div>
    </div>
  );
}
