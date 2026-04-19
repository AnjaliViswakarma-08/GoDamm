import { useEffect, useState } from 'react';

const THEME_STORAGE_KEY = 'inventory_theme';

const getInitialDarkMode = (): boolean => {
  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  return saved === 'dark';
};

export const useTheme = () => {
  const [darkMode, setDarkMode] = useState<boolean>(getInitialDarkMode);

  const toggleTheme = () => {
    setDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem(THEME_STORAGE_KEY, next ? 'dark' : 'light');
      return next;
    });
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }
  }, [darkMode]);

  return {
    darkMode,
    toggleTheme,
  };
};
