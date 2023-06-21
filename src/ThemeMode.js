import React, { useContext } from "react";
import ThemeContext from "./ThemeContext";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const ThemeMode = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <div className={theme === "light" ? "light-mode" : "dark-mode"}></div>
      <div className="d-flex align-items-center gap-3">
        <LightModeIcon />
        <input
          onClick={toggleTheme}
          type="checkbox"
          className="checkbox"
          id="checkbox"
        />
        <label htmlFor="checkbox" className="checkbox-label">
          <span className="ball"></span>
        </label>
        <DarkModeIcon />
      </div>
    </div>
  );
};

export default ThemeMode;
