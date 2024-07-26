// components/SlideUpPanel.js
import React from 'react';
import { Box, Typography, IconButton, Button } from '@mui/material';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS

// Styled container for the slide-up panel
const PanelContainer = styled(Box)(({ isVisible }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: '#f7fbfc', // Darker background with low opacity
  color: '#000', // White text color
  boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.3)',
  transform: `translateY(${isVisible ? '0' : '100%'})`,
  transition: 'transform 0.3s ease',
  padding: '20px',
  borderTopLeftRadius: '15px',
  borderTopRightRadius: '15px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px', // Gap between elements
}));

const StyledButton = styled(Button)({
  backgroundColor: '#fab613',
  color: '#000000',
  '&:hover': {
    backgroundColor: '#d35400', // Darker shade on hover
  },
  marginTop: 'auto', // Push the button to the bottom of the panel
  borderRadius: '5px', // Rounded button corners
});

// Helper function to create the URL for opening maps
const getMapsUrl = (latitude, longitude) => {
  return `geo:${latitude},${longitude}?q=${latitude},${longitude}`;
};

const SlideUpPanel = ({ pub, isVisible, onClose }) => {
  if (!pub) return null;

  const handleTakeMeButtonClick = () => {
    const coords = `${pub.latitude},${pub.longitude}`;

    // Copy coordinates to clipboard
    navigator.clipboard.writeText(coords)
      .then(() => {
        // Show success notification
        toast.success('Address copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        toast.error('Failed to copy address.');
      });
  };

  return (
    <PanelContainer isVisible={isVisible}>
      <IconButton onClick={onClose} style={{ position: 'absolute', top: '10px', right: '10px' }}>
        <CloseIcon style={{ color: '#fab613' }} />
      </IconButton>
      <Typography variant="h6" gutterBottom style={{ marginTop:'1em'}}>
        {pub.pub_name}
      </Typography>
      <Typography variant="subtitle1" paragraph>
        <strong style={{color:'#fab613'}}>Pint Type:</strong> {pub.pint_type}
      </Typography>
      <Typography variant="body2" paragraph>
        <strong style={{color:'#fab613'}}>Pint Price:</strong> {pub.pint_price}
      </Typography>
      <StyledButton 
        variant="contained"
        onClick={handleTakeMeButtonClick}
        sx={{marginBottom: '1.2rem', fontWeight: 'bold'}}
      >
        Copy Address
      </StyledButton>
    </PanelContainer>
  );
};

export default SlideUpPanel;
