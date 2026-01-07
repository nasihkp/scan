import { useState } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { OnboardingScreens } from './components/OnboardingScreens';
import { HomeScreen } from './components/HomeScreen';
import { CameraScanScreen } from './components/CameraScanScreen';
import { EditDocumentScreen } from './components/EditDocumentScreen';
import { PDFPreviewScreen } from './components/PDFPreviewScreen';
import { SaveShareScreen } from './components/SaveShareScreen';
import { SettingsScreen } from './components/SettingsScreen';

export type Screen = 
  | 'splash' 
  | 'onboarding' 
  | 'home' 
  | 'camera' 
  | 'edit' 
  | 'pdf-preview' 
  | 'save-share' 
  | 'settings';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scannedImage, setScannedImage] = useState<string | null>(null);

  // Auto-transition from splash to onboarding
  useState(() => {
    const timer = setTimeout(() => {
      if (currentScreen === 'splash') {
        setCurrentScreen('onboarding');
      }
    }, 2500);
    return () => clearTimeout(timer);
  });

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Mobile container - optimized for 360x800 */}
      <div className="max-w-[360px] mx-auto min-h-screen bg-white dark:bg-gray-900 relative overflow-hidden shadow-2xl">
        {currentScreen === 'splash' && (
          <SplashScreen onComplete={() => setCurrentScreen('onboarding')} />
        )}
        
        {currentScreen === 'onboarding' && (
          <OnboardingScreens onComplete={() => setCurrentScreen('home')} />
        )}
        
        {currentScreen === 'home' && (
          <HomeScreen 
            onNavigate={setCurrentScreen}
            onScan={(img) => {
              setScannedImage(img);
              setCurrentScreen('camera');
            }}
          />
        )}
        
        {currentScreen === 'camera' && (
          <CameraScanScreen 
            onBack={() => setCurrentScreen('home')}
            onCapture={(img) => {
              setScannedImage(img);
              setCurrentScreen('edit');
            }}
          />
        )}
        
        {currentScreen === 'edit' && (
          <EditDocumentScreen 
            image={scannedImage}
            onBack={() => setCurrentScreen('camera')}
            onNext={() => setCurrentScreen('pdf-preview')}
          />
        )}
        
        {currentScreen === 'pdf-preview' && (
          <PDFPreviewScreen 
            onBack={() => setCurrentScreen('edit')}
            onSave={() => setCurrentScreen('save-share')}
          />
        )}
        
        {currentScreen === 'save-share' && (
          <SaveShareScreen 
            onBack={() => setCurrentScreen('pdf-preview')}
            onComplete={() => setCurrentScreen('home')}
          />
        )}
        
        {currentScreen === 'settings' && (
          <SettingsScreen 
            isDarkMode={isDarkMode}
            onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
            onBack={() => setCurrentScreen('home')}
          />
        )}
      </div>
    </div>
  );
}
