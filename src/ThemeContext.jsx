import React, { createContext, useContext, useState, useEffect } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const toggleTheme = () => {
    setIsDarkTheme(prev => !prev);
  };

  const theme = createTheme({
    palette: {
      mode: isDarkTheme ? 'dark' : 'light',
    },
  });

  useEffect(() => {
    const body = document.body;
    body.classList.toggle('dark-theme', isDarkTheme);
    body.classList.toggle('light-theme', !isDarkTheme);
  }, [isDarkTheme]);

  return (
    <ThemeContext.Provider value={{ toggleTheme, isDarkTheme }}>
      <MuiThemeProvider theme={theme}> {/* ✅ this fixes MUI buttons/icons */}
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeProvider;
