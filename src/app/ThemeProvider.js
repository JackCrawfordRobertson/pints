'use client';

import { createTheme, ThemeProvider, CssBaseline, Button } from '@mui/material';
import { styled } from '@mui/system';

// Create a custom styled button using the theme colors
export const StyledButton = styled(Button)({
  backgroundColor: '#333', // Default background color from primary.main
  color: '#fff',
  '&:hover': {
    backgroundColor: '#fab613', // Hover background color from secondary.main
    boxShadow: 'none', // No shadow on hover
  },
  borderRadius: '5px', // Example button styling
});

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