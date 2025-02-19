import { ITheme } from "@/interfaces/user";
import { useState, useEffect } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState<ITheme>(() => {
    const savedTheme = localStorage.getItem("theme") as ITheme | null;
    return savedTheme || "light";
  });

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme: ITheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return { theme, toggleTheme };
};

export default useTheme;
