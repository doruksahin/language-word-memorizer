import {
  FaSearch,
  FaHashtag,
  FaRegBell,
  FaUserCircle,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import useDarkMode from "../../hooks/useDarkMode";

const ModeSwitcher = () => {
  const [darkTheme, setDarkTheme] = useDarkMode();
  const handleMode = () => setDarkTheme(!darkTheme);
  return (
    <span
      onClick={handleMode}
      className="absolute right-0 top-0 mt-2 mr-2 cursor-pointer"
    >
      {darkTheme ? (
        <FaSun
          size="48"
          className="text-yellow-300 hover:text-yellow-500 transition duration-300 ease-in-out "
        />
      ) : (
        <FaMoon
          size="48"
          className="text-gray-600 hover:text-gray-400 transition duration-300 ease-in-out "
        />
      )}
    </span>
  );
};

export default ModeSwitcher;
