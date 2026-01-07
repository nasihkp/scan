import { Camera, FileText, Settings, Plus, Clock } from 'lucide-react';
import type { Screen } from '../App';

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
  onScan: (image: string | null) => void;
}

const recentDocuments = [
  { id: 1, name: 'Invoice_2025.pdf', date: 'Today, 10:30 AM', pages: 2, thumbnail: '📄' },
  { id: 2, name: 'Receipt_Store.pdf', date: 'Yesterday, 3:45 PM', pages: 1, thumbnail: '📄' },
  { id: 3, name: 'Contract_Signed.pdf', date: 'Jan 5, 2026', pages: 5, thumbnail: '📄' },
  { id: 4, name: 'ID_Document.pdf', date: 'Jan 4, 2026', pages: 2, thumbnail: '📄' },
  { id: 5, name: 'Notes_Meeting.pdf', date: 'Jan 3, 2026', pages: 3, thumbnail: '📄' },
];

export function HomeScreen({ onNavigate, onScan }: HomeScreenProps) {
  return (
    <div className="h-screen w-full bg-gray-50 flex flex-col">
      {/* Top app bar */}
      <div className="bg-white border-b border-gray-200 px-5 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">SmartScan</h1>
          <p className="text-xs text-gray-500">Your documents</p>
        </div>
        <button 
          onClick={() => onNavigate('settings')}
          className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center"
        >
          <Settings className="w-5 h-5 text-blue-600" />
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto px-5 py-6">
        {/* Large scan button */}
        <button
          onClick={() => onScan(null)}
          className="w-full bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl p-6 flex items-center justify-center gap-3 shadow-lg mb-6 transition-all"
        >
          <Camera className="w-7 h-7" strokeWidth={2} />
          <span className="text-lg font-semibold">Scan Document</span>
        </button>

        {/* Recent documents section */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-gray-500" />
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Recent Scans</h2>
          </div>
          
          <div className="space-y-2">
            {recentDocuments.map((doc) => (
              <div 
                key={doc.id}
                className="bg-white rounded-xl p-4 flex items-center gap-4 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm truncate">{doc.name}</h3>
                  <p className="text-xs text-gray-500">{doc.date} • {doc.pages} page{doc.pages > 1 ? 's' : ''}</p>
                </div>

                <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center">
                  <span className="text-lg">{doc.thumbnail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating action button */}
      <button
        onClick={() => onScan(null)}
        className="absolute bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110"
      >
        <Plus className="w-7 h-7" strokeWidth={2.5} />
      </button>
    </div>
  );
}
