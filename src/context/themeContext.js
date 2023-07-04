// Theme.js

import React, { useState, createContext ,useContext} from 'react';

import { GlobalStyle } from '../global-style';

// themes.js

 const lightTheme = {
    primaryBg: '#f5f5f5',
    secondaryBg: '#ffffff',
    primaryText: '#333333',
    secondaryText: '#778189',
    mainPrimary: '#ff3d64',
    mainSecondary: '#c3385b',
    iconPrimary: '#333333',
    iconSecondary: '#ef3b60',
    iconTertiary: '#19826a',
  };
  
   const darkTheme = {
    primaryBg: '#102b3f',
    secondaryBg: '#001527',
    primaryText: '#fcedf0',
    secondaryText: '#778189',
    mainPrimary: '#ff3d64',
    mainSecondary: '#c3385b',
    iconPrimary: '#fcedf0',
    iconSecondary: '#ef3b60',
    iconTertiary: '#19826a',
  };
  


export const ThemeContext = createContext();

export const AppThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  const rootStyles = `
  :root {
    --primary-bg: ${theme.primaryBg};
    --secondary-bg: ${theme.secondaryBg};
    --primary-text: ${theme.primaryText};
    --secondary-text: ${theme.secondaryText};
    --main-primary: ${theme.mainPrimary};
    --main-secondary: ${theme.mainSecondary};
    --icon-primary: ${theme.iconPrimary};
    --icon-secondary: ${theme.iconSecondary};
    --icon-tertiary: ${theme.iconTertiary};
    --border-radius:5px;
  }
`;


  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
        <GlobalStyle rootStyles={rootStyles} />
        {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);