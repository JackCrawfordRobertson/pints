import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { styled } from "@mui/system";

// Styled container for preload
const PreloadContainer = styled(motion.div)({
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#ffffff", // White background for preload
    zIndex: 10000, // On top of everything
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
});

const Preload = ({ setIsLoaded }) => {
    useEffect(() => {
        // Trigger the fade-out after 3 seconds, and remove after 1 second fade-out
        const timeout = setTimeout(() => {
            setIsLoaded(true); // Remove preload after fade-out completes
        }, 4000); // 3000ms visible, 1000ms fade out

        return () => clearTimeout(timeout); // Clean up the timeout if the component unmounts early
    }, [setIsLoaded]);

    return (
        <PreloadContainer
            initial={{ opacity: 1 }} // Start fully visible
            animate={{ opacity: 1 }} // Remain fully visible for 3 seconds
            exit={{ opacity: 0 }} // Trigger fade out when component is being removed
            transition={{ duration: .5 }} // Fade-out over 1 second
        >
            <motion.img
                src="/Launch_Images/Welcome.svg"
                alt="Loading"
                style={{ maxWidth: "150px" }} // Centered SVG
                initial={{ opacity: 0, scale: 0.8 }} // Start with opacity 0 and smaller scale
                animate={{
                    opacity: 1,
                    scale: [0.8, 1.2, 0.8], // Scale animation
                }}
                transition={{
                    duration: 1.5, // Smooth scale animation over 3000ms
                    ease: "easeInOut",
                }}
            />
        </PreloadContainer>
    );
};

export default Preload;