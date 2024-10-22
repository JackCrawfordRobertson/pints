import React from "react";
import { Box, Typography, IconButton, Button } from "@mui/material";
import { styled } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import SportsBarIcon from "@mui/icons-material/SportsBar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { toast } from "react-toastify";

const PanelContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isVisible', // Ensure isVisible is not passed down
})(({ isVisible }) => ({
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "#f7fbfc",
  color: "#000",
  boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
  transform: `translateY(${isVisible ? "0" : "100%"})`,
  transition: "transform 0.3s ease",
  padding: "20px",
  borderTopLeftRadius: "15px",
  borderTopRightRadius: "15px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
}));

const StyledButton = styled(Button)({
  backgroundColor: "#fab613",
  color: "#000",
  "&:hover": {
    backgroundColor: "#d35400",
  },
  marginTop: "auto",
  borderRadius: "5px",
});

const UpdateButton = styled(Button)({
  backgroundColor: "#e0e0e0",
  color: "#000",
  "&:hover": {
    backgroundColor: "#bdbdbd",
  },
  marginTop: "10px",
  fontWeight: "bold",
});

const summarizeAddress = (address) => {
  if (!address) return "Address not available";

  // Split the address into parts
  const addressParts = address.split(',');

  // Extract the useful parts (e.g., street name and postcode)
  const streetName = addressParts[2] ? addressParts[2].trim() : '';
  const postcode = addressParts[addressParts.length - 2] ? addressParts[addressParts.length - 2].trim() : '';

  // Join the useful parts back into a string
  return `${streetName}, ${postcode}`;
};

const PubDetailsPanel = ({ currentPub, isVisible, onClose, handleUpdateClick, user }) => {
  if (!currentPub) return null;

  const handleTakeMeButtonClick = () => {
    const coords = `${currentPub.latitude},${currentPub.longitude}`;
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${coords}`;
    window.location.href = mapsUrl;
  };

  return (
    <PanelContainer isVisible={isVisible}>
      <IconButton onClick={onClose} style={{ position: "absolute", top: "10px", right: "10px" }}>
        <CloseIcon style={{ color: "#fab613" }} />
      </IconButton>

      {/* Pint Price */}
      <div
        style={{
          textAlign: "left",
          marginTop: "0em",
          marginBottom: "0em",
          fontSize: "5em",
          fontWeight: "bold",
          letterSpacing: "-0.01em",
          lineHeight: "1",
        }}
      >
        {currentPub.pint_price}

        <div style={{ marginTop: "0.5em", textAlign: "left", fontSize: ".3em" }}>
          {currentPub.pub_name}
        </div>
      </div>

      {/* Pub Address */}
      <Box display="flex" alignItems="center" gap="5px" justifyContent="left">
        <Typography variant="body1" style={{ textAlign: "left", marginBottom: "0em", color: "gray", marginLeft: "0" }}>
          <LocationOnIcon style={{ fontSize: "30px", verticalAlign: "middle", marginLeft: "0" }} />{" "}
          {summarizeAddress(currentPub.pub_address) || "Mock Pub Address, Central London"}
        </Typography>
      </Box>

      <hr style={{ borderTop: "1px solid lightgray", margin: ".2em 0" }} />

      {/* Beer Icon and Pint Type */}
      <Box display="flex" alignItems="center" gap="5px" justifyContent="left">
        <SportsBarIcon style={{ color: "#fab613", fontSize: "30px" }} />
        <Typography variant="subtitle1" style={{ fontWeight: "bold", color: "#fab613" }}>
          {currentPub.pint_type}
        </Typography>
      </Box>

      <hr style={{ borderTop: "1px solid lightgray", margin: ".2em 0" }} />

      {/* Buttons */}
      <StyledButton
        variant="contained"
        onClick={handleTakeMeButtonClick}
        sx={{ marginBottom: "0rem", fontWeight: "bold", borderRadius: "30px" }}
      >
        Open in Maps
      </StyledButton>
      {user && (
        <UpdateButton
          style={{ marginBottom: "1.5em", borderRadius: "30px" }}
          onClick={handleUpdateClick}
        >
          Update
        </UpdateButton>
      )}
    </PanelContainer>
  );
};

export default PubDetailsPanel;