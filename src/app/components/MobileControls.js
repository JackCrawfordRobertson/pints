import React, { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

const MobileContainer = styled(Box)(({ isFading }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#f7fbfc', // Higher opacity dark blue
  color: '#000',
  padding: '20px',
  zIndex: 1000,
  transition: 'opacity 0.5s ease-out',
  opacity: isFading ? 0 : 1,
  pointerEvents: isFading ? 'none' : 'auto',
  boxSizing: 'border-box',
}));

const TitleBox = styled(Box)({
  textAlign: 'left',
  width: '100%',
  paddingTop: '30px',
  paddingLeft: '30px',
  paddingRight: '30px',
  boxSizing: 'border-box',
});

const FullWidthButton = styled(Button)({
  backgroundColor: '#e67e22',
  color: '#ffffff',
  width: 'calc(100% - 60px)', // Adjusting to account for padding
  '&:hover': {
    backgroundColor: '#d35400',
  },
  padding: '15px 20px',
  marginBottom: '30px',
  boxSizing: 'border-box',
});

const MobileControls = ({ fetchPubs }) => {
  const [isFading, setIsFading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleButtonClick = () => {
    setIsFading(true);
    setTimeout(() => {
      fetchPubs();
      setIsVisible(false);
    }, 500); // Match this duration to the CSS transition duration
  };

  if (!isVisible) return null;

  return (
    <MobileContainer isFading={isFading}>
      <TitleBox>
        <Typography 
          variant="h4" // Adjusted to fit better on mobile
          gutterBottom 
          style={{ 
            fontWeight: 600, 
            textTransform: 'none', 
            lineHeight: '1.2', 
            letterSpacing: '-0.5px' 
          }}
        >
          Welcome to PINTS!
        </Typography>
        <Typography 
          variant="body1" // Adjusted to fit better on mobile
          style={{ 
            fontWeight: 400, 
            lineHeight: '1.5' 
          }}
          paragraph
        >
          <b>PINTS</b> is your trusty companion for finding the best pub deals around you! If you're in Central London, simply share your location, and PINTS will pinpoint the three cheapest pints in your vicinity. Whether you're exploring a new part of town or enjoying a night out in your favorite area, PINTS ensures you always get the best value for your pint. Discover great pubs and save money with PINTS – cheers to that!
        </Typography>
      </TitleBox>
      <FullWidthButton 
        variant="contained" 
        onClick={handleButtonClick}
      >
        Get me to the pub!
      </FullWidthButton>
    </MobileContainer>
  );
};

export default MobileControls;
