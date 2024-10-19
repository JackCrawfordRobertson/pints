'use client';

import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#333', // Set the default button background to #333
    },
    secondary: {
      main: '#fab613', // Secondary colour as #fab613
    },
  },
  typography: {
    fontFamily: `'Inter', sans-serif`,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none', // Disable button shadow globally
          backgroundColor: '#333', // Set default button background
          '&:hover': {
            backgroundColor: '#fab613', // Set hover state to #fab613
            boxShadow: 'none', // Ensure no shadow on hover
          },
        },
      },
    },
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