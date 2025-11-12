import { useEffect } from "react";

const useTheme = () => {
  
  useEffect(() => {
    theme = localStorage.getItem("theme");
  }, []);
  return theme;
};
export default useTheme;
