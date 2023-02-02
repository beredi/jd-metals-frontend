import React from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { Topbar } from "./scenes/global/Topbar";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./scenes/dashboard";
import { Sidebar } from "./scenes/global/Sidebar";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider
      value={colorMode as { toggleColorMode: () => void }}
    >
      <ThemeProvider
        theme={theme as Partial<Theme> | ((outerTheme: Theme) => Theme)}
      >
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className={"content"}>
            <Topbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
