
import  { useState, createContext ,useContext} from 'react';
import { GlobalStyle } from '../global-style';
import { darkTheme, lightTheme } from '../utils/utils';
export const ThemeContext = createContext();

export const AppThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

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