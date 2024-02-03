"use client";

import ThemeContext from "@/context/themeContext";
import { useEffect, useState } from "react";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const themeFromStorage =
    typeof localStorage !== "undefined" && localStorage.getItem("app-theme")
      ? JSON.parse(localStorage.getItem("app-theme")!)
      : false;

  const [darkTheme, setDarkTheme] = useState<boolean>(themeFromStorage);
  const [renderComponent, setRenderComponent] = useState<boolean>(false);

  useEffect(() => {
    setRenderComponent(true);
  }, []);

  if (!renderComponent) return <></>;

  return (
    <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
      <div className={`${darkTheme ? "dark" : ""} min-h-screen`}>
        <div className="dark:text-white dark:bg-black text-[#1E1E1E]">
          {children}
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
