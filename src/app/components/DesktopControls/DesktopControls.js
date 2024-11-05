import React from "react";
import { Typography, Box } from "@mui/material";
import { styled } from "@mui/system";

// Styled components
const BackgroundContainer = styled(Box)({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "#fab613", // Solid yellow background
  zIndex: 999,
  display: "flex",
  alignItems: "center",
  boxSizing: "border-box",
});

const MessageContainer = styled(Box)({
  width: "50%", // Adjust to take up half the width
  textAlign: "left",
  fontWeight: "bold",
  padding: "5em", // Optional: Add some padding
});

const IllustrationContainer = styled(Box)({
  width: "50%", // Adjust to take up half the width
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end", // Align the SVG to the right
  alignItems: "center",
  padding: "0 20px", // Optional: Add some padding
});

const Divider = styled(Box)({
  width: "2px",
  height: "80%",
  backgroundColor: "#000333",
  margin: "0", // Remove margin to ensure it's centered
});

const FooterContainer = styled(Box)({
  width: "100%", // Full width
  height: "5vh", // Fixed height for the footer
  display: "flex",
  justifyContent: "space-between", // Space out items
  alignItems: "center",
  backgroundColor: "#fab613", // Match background color
  padding: "0 10px", // Add some padding
  position: "absolute", // Position it at the bottom
  bottom: 0, // Stick to the bottom of the background
  boxSizing: "border-box",
});

const FooterLink = styled(Typography)({
  fontSize: "1rem",
  color: "#000333",
  textDecoration: "none",
  cursor: "pointer",
  margin: "0 10px", // Space between links
});

const DesktopControls = () => {
  return (
    <BackgroundContainer>
      <MessageContainer>
        <Typography
          variant="h2"
          gutterBottom
          style={{
            fontWeight: "bold",
            fontSize: "5rem",
            color: "#000333",
            lineHeight: ".9",
          }} // Adjust the font size and color
        >
          Oops, looks like you're trying to access us on a desktop!
        </Typography>
        <Typography
          variant="h5"
          style={{ fontSize: "2rem", color: "#000333" }} // Slightly bigger and apply the same color
        >
          We’re all about that mobile life. Grab your phone and come hang with us there. 😎📱
        </Typography>
        <Typography
          variant="h6"
          style={{ fontSize: "1.2rem", color: "#000333", marginTop: "1em" }} // Adjust the font size and color    
        >
          Pints is your guide to finding the cheapest pints in Central London, helping you discover affordable pubs and bars within 1000 meters. With our user-friendly app, you can quickly compare prices and enjoy your favorite drinks at the best deals, whether you’re out for a casual evening or unwinding after work.
        </Typography>
      </MessageContainer>

      <Divider />

      <IllustrationContainer>
        <img
          src="/Launch_Images/Welcome.svg"
          alt="Illustration"
          style={{ maxWidth: "70%", height: "auto" }} // Set the desired width
        />
      </IllustrationContainer>

      <FooterContainer>
        <Box display="flex" alignItems="center">
          <FooterLink component="a" href="/terms">Terms and Conditions</FooterLink>
          <FooterLink component="a" href="/privacy">Privacy Policy</FooterLink>
          <FooterLink component="a" href="mailto:me@jack-robertson.co.uk">Contact Us</FooterLink>
        </Box>
      </FooterContainer>
    </BackgroundContainer>
  );
};

export default DesktopControls;