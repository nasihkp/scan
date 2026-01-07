import { ArrowLeft, Moon, Image, FileType, HelpCircle, Info } from 'lucide-react';

interface SettingsScreenProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onBack: () => void;
}

export function SettingsScreen({ isDarkMode, onToggleDarkMode, onBack }: SettingsScreenProps) {
  return (
    <div className="h-screen w-full bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Top bar */}
      <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-700 dark:text-gray-200"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        
        <h2 className="font-semibold text-gray-900 dark:text-white">Settings</h2>
        
        <button className="w-8"></button>
      </div>

      {/* Settings list */}
      <div className="flex-1 overflow-y-auto">
        {/* Appearance section */}
        <div className="mt-6 px-5">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">Appearance</h3>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Dark Mode</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Switch to dark theme</p>
                </div>
              </div>
              
              <button
                onClick={onToggleDarkMode}
                className={`relative w-12 h-7 rounded-full transition-colors ${
                  isDarkMode ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    isDarkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                ></div>
              </button>
            </div>
          </div>
        </div>

        {/* Scan settings section */}
        <div className="mt-6 px-5">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">Scan Settings</h3>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <Image className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Scan Quality</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">High quality</p>
                </div>
              </div>
              <span className="text-gray-400">›</span>
            </button>

            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <FileType className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Default PDF Size</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">A4</p>
                </div>
              </div>
              <span className="text-gray-400">›</span>
            </button>
          </div>
        </div>

        {/* About section */}
        <div className="mt-6 px-5 pb-6">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">About</h3>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Help & Support</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Get help using SmartScan</p>
                </div>
              </div>
              <span className="text-gray-400">›</span>
            </button>

            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <Info className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">About SmartScan</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Version 1.0.0</p>
                </div>
              </div>
              <span className="text-gray-400">›</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
