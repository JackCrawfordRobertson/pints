import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { styled } from '@mui/system';

// Custom styled components
const FullWidthButton = styled(Button)({
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

const CancelButton = styled(Button)({
  backgroundColor: "#e0e0e0", // Light grey background
  color: "#000", // Black text color
  width: "100%", // Full width button
  fontWeight: "bold", // Bold text
  "&:hover": {
    backgroundColor: "#bdbdbd", // Darker grey on hover
  },
  padding: "15px", // Padding inside the button
  borderRadius: "30px", // Fully rounded corners
  marginBottom: "10px", // Space between buttons
});

// Custom styled text field with orange outline
const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#fab613", // Orange outline
    },
    "&:hover fieldset": {
      borderColor: "#fab613", // Orange on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "#fab613", // Orange on focus
    },
  },
  "& .MuiInputLabel-root": {
    color: "#fab613", // Orange label
  },
  "& .MuiInputBase-input": {
    color: "#000", // Black text input
  },
});

const ContactPopup = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    // Handle the submission of the contact form (e.g., send an email or save it to the database)
    alert(`Message sent by ${name}!`);
    onClose(); // Close the popup after submission
  };

  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Contact Us</DialogTitle>
      <DialogContent>
        <CustomTextField
          autoFocus
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          variant="outlined" // Use the outlined variant
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <CustomTextField
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          variant="outlined" // Use the outlined variant
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <CustomTextField
          margin="dense"
          label="Message"
          type="text"
          multiline
          rows={4}
          fullWidth
          variant="outlined" // Use the outlined variant
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </DialogContent>
      <DialogActions style={{ display: "flex", flexDirection: "column", width: "100%", padding: "20px" }}>
        <FullWidthButton onClick={handleSubmit}>
          Submit
        </FullWidthButton>
        <CancelButton onClick={onClose}>
          Cancel
        </CancelButton>
      </DialogActions>
    </Dialog>
  );
};

export default ContactPopup;