import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";
import logo from "../assets/logoWealthwise.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Load initial dark mode preference from local storage or default to system preference
    const storedPreference = localStorage.getItem("darkMode");
    if (storedPreference !== null) return storedPreference === "true";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Sync dark mode state with `html` element and local storage
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <nav className="py-4 shadow-md bg-financial-primary dark:bg-gray-800">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center">
          <Link to="/home">
            <img src={logo} alt="Logo" className="h-10 inline pr-1 rounded-md" />
          </Link>
          <h1 className="text-3xl font-bold text-white dark:text-gray-200">
            WealthWise
          </h1>
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          className="block md:hidden text-white dark:text-gray-300 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation Links */}
        <ul
          className={`md:flex items-center space-y-4 md:space-y-0 md:space-x-4 absolute md:static top-[4rem] left-0 w-full md:w-auto p-5 md:p-0 transition-all duration-300
            bg-financial-primary dark:bg-gray-800 ${menuOpen ? "block" : "hidden"}`}
        >
          {[
            [1, "/home", "Home"],
            [2, "/transaction-details", "Transactions"],
            [3, "/investments", "Investments"],
          ].map(([id, url, title]) => (
            <li key={id}>
              <Link
                to={url}
                className="text-lg hover:text-gray-300 text-white dark:text-gray-300 dark:hover:text-gray-400 duration-300 block"
              >
                {title}
              </Link>
            </li>
          ))}

          {/* Dark Mode Toggle */}
          <li>
            <button
              onClick={toggleDarkMode}
              className="text-lg hover:text-gray-300 text-white dark:text-gray-300 dark:hover:text-gray-400 duration-300 block"
            >
              {darkMode ? (
                <FaSun className="text-yellow-400" />
              ) : (
                <FaMoon className="text-blue-500" />
              )}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
