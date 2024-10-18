import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';

// Custom styled button for the close action
const CloseButton = styled(Button)({
  backgroundColor: "#fab613", // Orange background
  color: "#000", // Black text color
  width: "100%", // Full width button
  fontWeight: "bold", // Bold text
  "&:hover": {
    backgroundColor: "#d35400", // Darker orange on hover
  },
  padding: "15px", // Padding inside the button
  borderRadius: "30px", // Fully rounded corners
  marginBottom: "10px", // Space between buttons
});

// AboutPopup Component
const AboutPopup = ({ onClose }) => {
  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>About PINTS</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          <strong>PINTS</strong> is your trusty companion for discovering the best pub deals around you.
          Whether you're looking for discounted drinks, a great atmosphere, or a place to catch up with friends,
          PINTS helps you find the perfect spot.
        </Typography>
        <Typography variant="body1" gutterBottom>
          With real-time pub data and special offers, PINTS ensures that you make the most of your night out.
          Save money while enjoying good times at the best pubs near you.
        </Typography>
      </DialogContent>
      <DialogActions style={{ display: "flex", flexDirection: "column", width: "100%", padding: "20px" }}>
        <CloseButton onClick={onClose}>
          Close
        </CloseButton>
      </DialogActions>
    </Dialog>
  );
};

export default AboutPopup;