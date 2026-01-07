import { ArrowLeft, Crop, RotateCw, Filter, Sun, Check } from 'lucide-react';

interface EditDocumentScreenProps {
  image: string | null;
  onBack: () => void;
  onNext: () => void;
}

const tools = [
  { icon: Crop, label: 'Crop', id: 'crop' },
  { icon: RotateCw, label: 'Rotate', id: 'rotate' },
  { icon: Filter, label: 'Filter', id: 'filter' },
  { icon: Sun, label: 'Adjust', id: 'adjust' },
];

export function EditDocumentScreen({ image, onBack, onNext }: EditDocumentScreenProps) {
  return (
    <div className="h-screen w-full bg-gray-900 flex flex-col">
      {/* Top bar */}
      <div className="bg-gray-900 px-4 py-3 flex items-center justify-between border-b border-gray-800">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-white"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
        </button>
        
        <h2 className="text-white font-semibold">Edit Document</h2>
        
        <button 
          onClick={onNext}
          className="text-blue-400 hover:text-blue-300 text-sm font-semibold"
        >
          Done
        </button>
      </div>

      {/* Document preview */}
      <div className="flex-1 flex items-center justify-center p-6 bg-gray-900">
        <div className="relative w-full max-w-[280px] aspect-[8.5/11] bg-white rounded-lg shadow-2xl overflow-hidden">
          {/* Simulated document */}
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 p-6">
            <div className="space-y-3">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              <div className="h-8"></div>
              <div className="h-3 bg-gray-400 rounded w-full"></div>
              <div className="h-3 bg-gray-400 rounded w-full"></div>
              <div className="h-3 bg-gray-400 rounded w-4/5"></div>
              <div className="h-3 bg-gray-400 rounded w-full"></div>
              <div className="h-3 bg-gray-400 rounded w-3/4"></div>
            </div>
          </div>

          {/* Corner drag handles */}
          <div className="absolute top-2 left-2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
          <div className="absolute top-2 right-2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
          <div className="absolute bottom-2 left-2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
          <div className="absolute bottom-2 right-2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
        </div>
      </div>

      {/* Tools toolbar */}
      <div className="bg-gray-900 border-t border-gray-800 px-4 py-6">
        <div className="flex items-center justify-around">
          {tools.map((tool) => (
            <button
              key={tool.id}
              className="flex flex-col items-center gap-2 text-white hover:text-blue-400 transition-colors"
            >
              <div className="w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-xl flex items-center justify-center transition-colors">
                <tool.icon className="w-6 h-6" />
              </div>
              <span className="text-xs">{tool.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Apply button */}
      <div className="bg-gray-900 px-4 pb-6">
        <button
          onClick={onNext}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          <Check className="w-5 h-5" />
          Apply Changes
        </button>
      </div>
    </div>
  );
}
