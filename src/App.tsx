import React, { Suspense } from "react";
import { ColorModeContext, useMode } from "./theme";
import { ThemeProvider } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { AuthProvider } from "./scenes/Login/AuthProvider";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "./locales/en";
import { rs } from "./locales/rs";
import { Auth } from "./scenes/Auth/Auth";
import { SiteConfigProvider } from "./scenes/SiteConfig/SiteConfigProvider";
import { NotificationsProvider } from "./components/NotificationsProvider";

i18next.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    rs: { translation: rs },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

function App() {
  const [theme, colorMode] = useMode();

  return (
    <Suspense fallback="Loading...">
      <ColorModeContext.Provider
        value={colorMode as { toggleColorMode: () => void }}
      >
        <ThemeProvider
          theme={theme as Partial<Theme> | ((outerTheme: Theme) => Theme)}
        >
          <NotificationsProvider>
            <AuthProvider>
              <SiteConfigProvider>
                <Auth />
              </SiteConfigProvider>
            </AuthProvider>
          </NotificationsProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Suspense>
  );
}

export default App;
