import React from "react";
import {Typography, Box} from "@mui/material";
import {styled} from "@mui/system";

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
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 40px", // Add padding for some space
    boxSizing: "border-box",
});

const MessageContainer = styled(Box)({
    width: "50%", // Adjust to fit the message and illustration layout
    textAlign: "left",
    fontWeight: "bold",
});

const IllustrationContainer = styled(Box)({
    width: "40%", // Set width of the SVG illustration container
    display: "flex",
    justifyContent: "flex-end", // Align the SVG to the right
});

const DesktopControls = () => {
    return (
        <BackgroundContainer>
            {/* Image (SVG) */}
            <IllustrationContainer>
                <img
                    src="/Launch_Images/Welcome.svg"
                    alt="Illustration"
                    style={{maxWidth: "80%", height: "auto"}} // Set the desired width
                />
            </IllustrationContainer>
            {/* Message Box */}
            <MessageContainer>
                <Typography
                    variant="h2"
                    gutterBottom
                    style={{fontWeight: "bold", fontSize: "5rem", color: "#000333", lineHeight:'.9'}} // Adjust the font size and color
                >
                    Oops, looks like you're trying to access us on a desktop!
                </Typography>
                <Typography
                    variant="h5"
                    style={{fontSize: "2rem", color: "#000333"}} // Slightly bigger and apply the same color
                >
                    We’re all about that mobile life. Grab your phone and come hang with us there. 😎📱
                </Typography>
            </MessageContainer>
        </BackgroundContainer>
    );
};

export default DesktopControls;
