import React from 'react';
import useDarkMode from 'use-dark-mode';
import {useDispatch} from 'react-redux';
import {setIsDarkMode} from './slices/useThemeSlice';

const lightTheme = 'light-mode';
const darkTheme = 'dark-mode';

export const useTheme = () => {
  const darkMode = useDarkMode();
  const dispatch = useDispatch();

  const [theme, setTheme] = React.useState(darkTheme);

  React.useEffect(() => {
    setTheme(darkMode?.value ? darkTheme : lightTheme);
    dispatch(setIsDarkMode(darkMode.value));
  }, [darkMode.value, dispatch]);

  return theme;
};
