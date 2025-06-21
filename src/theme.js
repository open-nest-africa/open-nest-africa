import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            background: {
              default: '#f4f6f8',
              paper: '#ffffff',
            },
            text: {
              primary: '#172b4d',
              secondary: '#6b778c',
            },
          }
        : {
            background: {
              default: '#121212',
              paper: '#1e1e1e',
            },
            text: {
              primary: '#ffffff',
              secondary: '#cccccc',
            },
          }),
      primary: {
        main: '#205295',
      },
    },
  });
