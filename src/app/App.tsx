import { useState, useEffect } from "react";
import { SplashScreen } from "./components/SplashScreen";
import { generatePDF } from "./utils/pdfGenerator";
import { OnboardingScreens } from "./components/OnboardingScreens";
import { HomeScreen } from "./components/HomeScreen";
import { CameraScanScreen } from "./components/CameraScanScreen";
import { EditDocumentScreen } from "./components/EditDocumentScreen";
import { PDFPreviewScreen } from "./components/PDFPreviewScreen";
import { SaveShareScreen } from "./components/SaveShareScreen";
import { SettingsScreen } from "./components/SettingsScreen";

export type Screen =
  | "splash"
  | "onboarding"
  | "home"
  | "camera"
  | "edit"
  | "pdf-preview"
  | "save-share"
  | "settings";

interface ScannedDoc {
  id: string;
  image: string;
  date: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("splash");
  const [isDarkMode, setIsDarkMode] = useState(false);

  /* SCANNED DOCUMENTS */
  const [scannedDocs, setScannedDocs] = useState<ScannedDoc[]>(() => {
    const saved = localStorage.getItem("scannedDocs");
    return saved ? JSON.parse(saved) : [];
  });
  const [activeImage, setActiveImage] = useState<string | null>(null);

  /* PERSISTENCE */
  useEffect(() => {
    localStorage.setItem("scannedDocs", JSON.stringify(scannedDocs));
  }, [scannedDocs]);

  /* PDF OUTPUT */
  const [pdfUrl, setPdfUrl] = useState("");
  const [fileName, setFileName] = useState("");

  /* SPLASH AUTO TRANSITION */
  useEffect(() => {
    if (currentScreen !== "splash") return;
    const timer = setTimeout(() => setCurrentScreen("onboarding"), 2500);
    return () => clearTimeout(timer);
  }, [currentScreen]);

  /* HANDLE NEW SCAN */
  const handleNewScan = (image: string) => {
    setActiveImage(image);
    setScannedDocs(prev => [
      {
        id: crypto.randomUUID(),
        image,
        date: new Date().toLocaleString(),
      },
      ...prev,
    ]);
  };

  return (
    <div className={`${isDarkMode ? "dark bg-gray-900" : "bg-gray-50"} min-h-screen`}>
      {/* MOBILE FRAME */}
      <div className="max-w-[360px] mx-auto min-h-screen bg-white dark:bg-gray-900 shadow-2xl relative overflow-hidden">

        {currentScreen === "splash" && (
          <SplashScreen onComplete={() => setCurrentScreen("onboarding")} />
        )}

        {currentScreen === "onboarding" && (
          <OnboardingScreens onComplete={() => setCurrentScreen("home")} />
        )}

        {currentScreen === "home" && (
          <HomeScreen
            onNavigate={setCurrentScreen}
            onScan={() => setCurrentScreen("camera")}
            scannedDocs={scannedDocs}
          />
        )}

        {currentScreen === "camera" && (
          <CameraScanScreen
            onBack={() => setCurrentScreen("home")}
            onCapture={(img) => {
              handleNewScan(img);
              setCurrentScreen("edit");
            }}
          />
        )}

        {currentScreen === "edit" && activeImage && (
          <EditDocumentScreen
            image={activeImage}
            onBack={() => setCurrentScreen("camera")}
            onNext={(editedImage) => {
              setActiveImage(editedImage);
              setCurrentScreen("pdf-preview");
            }}
          />
        )}

        {currentScreen === "pdf-preview" && activeImage && (
          <PDFPreviewScreen
            images={[activeImage]}
            onBack={() => setCurrentScreen("edit")}
            onSave={async (name, images) => {
              const url = await generatePDF(images);
              setPdfUrl(url);
              setFileName(name);
              setCurrentScreen("save-share");
            }}
          />
        )}

        {currentScreen === "save-share" && (
          <SaveShareScreen
            pdfUrl={pdfUrl}
            fileName={fileName}
            onBack={() => setCurrentScreen("pdf-preview")}
            onComplete={() => setCurrentScreen("home")}
          />
        )}

        {currentScreen === "settings" && (
          <SettingsScreen
            isDarkMode={isDarkMode}
            onToggleDarkMode={() => setIsDarkMode(v => !v)}
            onBack={() => setCurrentScreen("home")}
          />
        )}

      </div>
    </div>
  );
}