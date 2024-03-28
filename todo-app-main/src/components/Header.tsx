import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

function Header() {
  const [isDarkTheme, setIsDarkTheme] = useLocalStorage("dark-theme", false);

  useEffect(() => {
    const htmlElement = document.documentElement;

    if (isDarkTheme) {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }

    return () => {
      htmlElement.classList.remove("dark");
    };
  }, [isDarkTheme]);

  return (
    <div className="flex justify-between items-center">
      <h1 className="uppercase text-3xl md:text-4xl tracking-[0.3em] md:tracking-[0.45em] text-white font-bold leading-[0]">
        todo
      </h1>
      <button
        onClick={() => setIsDarkTheme((prev) => !prev)}
        className="transform scale-105"
      >
        {isDarkTheme ? (
          <img src="images/icon-sun.svg" alt="set dark theme" />
        ) : (
          <img src="images/icon-moon.svg" alt="set light theme" />
        )}
      </button>
    </div>
  );
}

export default Header;
