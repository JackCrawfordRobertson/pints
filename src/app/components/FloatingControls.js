// components/FloatingControls.js
import React, { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

// Styled container for FloatingControls with transition
const FloatingContainer = styled(Box)(({ isFading }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#ffffff80', // Very low opacity dark blue
  padding: '20px',
  zIndex: 1000,
  borderRadius: '8px',
  opacity: isFading ? 0 : 1,
  transition: 'opacity 0.5s ease-out',
  pointerEvents: isFading ? 'none' : 'auto',
}));

// Styled box for title, subheading, and button
const InnerBox = styled(Box)({
  textAlign: 'center',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  padding: '30px',
  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
  maxWidth: '400px',
  width: '100%',
});

// Styled button with custom color
const StyledButton = styled(Button)({
  backgroundColor: '#e67e22',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: '#d35400',
  },
  marginTop: '20px',
  padding: '10px 20px',
});

const FloatingControls = ({ fetchPubs, isLoading }) => {
  const [isFading, setIsFading] = useState(false);

  const handleButtonClick = () => {
    setIsFading(true);
    fetchPubs();
    setTimeout(() => {
      setIsFading(false);
    }, 500); // Match this duration to the CSS transition duration
  };

  if (isLoading) {
    return (
      <FloatingContainer>
        <InnerBox>
          <Typography variant="h6" gutterBottom>
            Welcome to Pints!
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" paragraph>
            Loading your location...
          </Typography>
        </InnerBox>
      </FloatingContainer>
    );
  }

  return (
    <FloatingContainer isFading={isFading}>
      <InnerBox>
        <Typography variant="h6" gutterBottom>
          Welcome to Pints!
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" paragraph>
          Share your location to see nearby options!
        </Typography>
        <StyledButton 
          variant="contained" 
          onClick={handleButtonClick}
        >
          Get me to the pub!
        </StyledButton>
      </InnerBox>
    </FloatingContainer>
  );
};

export default FloatingControls;
