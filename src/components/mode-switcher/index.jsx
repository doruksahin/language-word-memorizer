import useDarkMode from "../../hooks/useDarkMode";

const ModeSwitcher = () => {
  const [darkTheme, setDarkTheme] = useDarkMode();
  const handleMode = () => setDarkTheme(!darkTheme);
  return <span onClick={handleMode}>{darkTheme ? "dark" : "light"}</span>;
};

export default ModeSwitcher;
