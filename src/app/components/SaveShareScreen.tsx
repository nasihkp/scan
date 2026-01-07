import { ArrowLeft, Download, Share2, Printer, Check, FileText } from 'lucide-react';

interface SaveShareScreenProps {
  onBack: () => void;
  onComplete: () => void;
}

export function SaveShareScreen({ onBack, onComplete }: SaveShareScreenProps) {
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
        
        <h2 className="font-semibold text-gray-900">Save & Share</h2>
        
        <button className="w-8"></button>
      </div>

      {/* Success indicator */}
      <div className="bg-white px-5 py-6 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Document Ready</h3>
            <p className="text-sm text-gray-600">Your PDF has been created successfully</p>
          </div>
        </div>
      </div>

      {/* File info */}
      <div className="bg-white mx-5 mt-5 rounded-xl p-4 border border-gray-200">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-900 text-sm mb-1 truncate">Scanned_Document_Jan07.pdf</h4>
            <p className="text-xs text-gray-500">3 pages • 6.3 MB</p>
            <p className="text-xs text-gray-400 mt-1">Created: Jan 7, 2026, 2:30 PM</p>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex-1 px-5 py-6">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Quick Actions</h3>
        
        <div className="space-y-3">
          <button
            onClick={onComplete}
            className="w-full bg-white hover:bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center gap-4 transition-colors"
          >
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <Download className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1 text-left">
              <h4 className="font-semibold text-gray-900 text-sm">Save to Device</h4>
              <p className="text-xs text-gray-500">Download to your phone</p>
            </div>
          </button>

          <button className="w-full bg-white hover:bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center gap-4 transition-colors">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
              <Share2 className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1 text-left">
              <h4 className="font-semibold text-gray-900 text-sm">Share Document</h4>
              <p className="text-xs text-gray-500">Send via email or messaging</p>
            </div>
          </button>

          <button className="w-full bg-white hover:bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center gap-4 transition-colors">
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
              <Printer className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex-1 text-left">
              <h4 className="font-semibold text-gray-900 text-sm">Print Document</h4>
              <p className="text-xs text-gray-500">Send to printer</p>
            </div>
          </button>
        </div>
      </div>

      {/* Done button */}
      <div className="bg-white border-t border-gray-200 px-5 py-4">
        <button
          onClick={onComplete}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );
}
