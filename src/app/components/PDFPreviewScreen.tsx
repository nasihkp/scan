import { useState } from 'react';
import { ArrowLeft, Edit2, Plus, Trash2, FileText } from 'lucide-react';

interface PDFPreviewScreenProps {
  onBack: () => void;
  onSave: () => void;
}

export function PDFPreviewScreen({ onBack, onSave }: PDFPreviewScreenProps) {
  const [fileName, setFileName] = useState('Scanned_Document_Jan07');
  const [pages] = useState([1, 2, 3]);

  return (
    <div className="h-screen w-full bg-gray-50 flex flex-col">
      {/* Top bar */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-200">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-700"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        
        <h2 className="font-semibold text-gray-900">PDF Preview</h2>
        
        <button className="w-8"></button>
      </div>

      {/* File name input */}
      <div className="bg-white px-5 py-4 border-b border-gray-200">
        <label className="block text-xs text-gray-500 mb-2 font-medium">File Name</label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="flex-1 bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Edit2 className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Page thumbnails */}
      <div className="flex-1 overflow-y-auto px-5 py-6">
        <div className="space-y-4">
          {pages.map((page) => (
            <div key={page} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-start gap-4">
                {/* Thumbnail */}
                <div className="w-20 h-28 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                  <div className="w-full h-full p-2">
                    <div className="space-y-1">
                      <div className="h-1 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-1 bg-gray-300 rounded w-full"></div>
                      <div className="h-1 bg-gray-300 rounded w-2/3"></div>
                      <div className="h-2"></div>
                      <div className="h-0.5 bg-gray-400 rounded w-full"></div>
                      <div className="h-0.5 bg-gray-400 rounded w-full"></div>
                      <div className="h-0.5 bg-gray-400 rounded w-4/5"></div>
                    </div>
                  </div>
                </div>

                {/* Page info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">Page {page}</h3>
                  <p className="text-xs text-gray-500 mb-3">A4 • 2.1 MB</p>
                  
                  <div className="flex items-center gap-2">
                    <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                      Edit
                    </button>
                    <span className="text-gray-300">•</span>
                    <button className="text-xs text-red-600 hover:text-red-700 font-medium">
                      Delete
                    </button>
                  </div>
                </div>

                {/* Drag handle */}
                <div className="flex flex-col gap-1 cursor-move">
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}

          {/* Add page button */}
          <button className="w-full bg-blue-50 hover:bg-blue-100 border-2 border-dashed border-blue-300 rounded-xl py-6 flex flex-col items-center justify-center gap-2 text-blue-600 transition-colors">
            <Plus className="w-6 h-6" />
            <span className="text-sm font-medium">Add Page</span>
          </button>
        </div>
      </div>

      {/* Bottom info and button */}
      <div className="bg-white border-t border-gray-200 px-5 py-4">
        <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
          <span>{pages.length} page{pages.length > 1 ? 's' : ''}</span>
          <span>Total size: 6.3 MB</span>
        </div>

        <button
          onClick={onSave}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          <FileText className="w-5 h-5" />
          Save as PDF
        </button>
      </div>
    </div>
  );
}
