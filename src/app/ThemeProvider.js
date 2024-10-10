'use client';

import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fab613',
    },
    secondary: {
      main: '#000333',
    },
  },
  typography: {
    fontFamily: `'Inter', sans-serif`,
  },
});

export default function CustomThemeProvider({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}