import React, { useState, useEffect, useRef } from "react";
import { Button, Typography, Box } from "@mui/material";
import { styled } from "@mui/system"; 
import Slider from "react-slick";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../../../config/firebaseConfig";
import DateOfBirthPopup from "../../components/DateOfBirthPopup";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./MobileControls.css"; 

const MobileControls = ({ fetchPubs }) => {
  const [isFading, setIsFading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState([0, 0, 0, 0]);
  const [dobPopupOpen, setDobPopupOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    const updatedProgress = progress.map((value, index) =>
      index <= currentSlide ? 100 : 0
    );
    setProgress(updatedProgress);
  }, [currentSlide]);

  const handleButtonClick = () => {
    if (currentSlide === progress.length - 1) {
      setIsFading(true);
      setTimeout(() => {
        fetchPubs(); // This will launch the map
        setIsVisible(false);
      }, 1000); // Add delay to allow for fading transition
    } else if (currentSlide === 2) {
      setDobPopupOpen(true); // Trigger the Date of Birth popup on the third slide
    } else {
      sliderRef.current.slickNext(); // Move to the next slide
    }
  };

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  const handleTouchEnd = (event) => {
    const screenWidth = window.innerWidth;
    const touchX = event.changedTouches[0].clientX;
    if (isLocked) return;
    if (touchX > screenWidth / 2) {
      sliderRef.current.slickNext(); // Only allow forward movement
    }
  };

  const settings = {
    dots: false,
    infinite: false,
    swipe: false, // Disable swipe to prevent backward movement
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (oldIndex, newIndex) => {
      if (newIndex > oldIndex) {
        handleSlideChange(newIndex); // Prevent backward movement
      }
    },
  };

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setIsAuthenticated(true);
      setIsLocked(true);
      // Ensure the slider goes to the final slide after successful login
      sliderRef.current.slickGoTo(3);
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Login failed: " + error.message);
    }
  };

  const handleDobConfirm = () => {
    setDobPopupOpen(false);
    handleLogin();
    sliderRef.current.slickGoTo(3); // Move to final slide after DOB confirmation
  };

  if (!isVisible) return null;

  // Progress Bar Container
  const ProgressContainer = styled(Box)({
    display: "flex",
    width: "100%",
    padding: "0 30px",
    boxSizing: "border-box",
    justifyContent: "space-between",
    marginBottom: "20px",
  });

  // Individual Progress Bar Section
  const ProgressBarSection = styled(Box)(({ completed }) => ({
    flex: 1,
    height: "5px",
    margin: "0 2px",
    backgroundColor: "#333", // Base background for uncompleted sections
    borderRadius: "2px",
    position: "relative",
    "&::after": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      backgroundColor: "#000333", // Progress fill color
      width: `${completed}%`, // The width will change according to the completed percentage
      borderRadius: "2px",
      transition: "width 0.5s ease-out", // Smooth animation for progress
    },
  }));

  return (
    <Box
      className={`mobile-container ${isFading ? "fading" : ""}`}
      onTouchEnd={handleTouchEnd}
    >
      <ProgressContainer>
        {progress.map((completed, index) => (
          <ProgressBarSection
            key={index}
            completed={completed}
            isLast={index === progress.length - 1}
          />
        ))}
      </ProgressContainer>

      <Slider {...settings} ref={sliderRef} style={{ width: "100%", height: "100%" }}>
        <div>
          <Box className="title-box">
            <img
              src="/Launch_Images/Welcome.svg"
              alt="Saving Icon"
              style={{ maxWidth: "80%", marginBottom: "5em" }}
            />
            <div>
              <Typography variant="h4" gutterBottom>
                Welcome to <b style={{ color: "#000333" }}>PINTS!</b>
              </Typography>
              <Typography variant="body1" paragraph>
                <b>PINTS</b> is your trusty companion for finding the best pub deals
                around you!
              </Typography>
            </div>
          </Box>
        </div>
        <div>
          <Box className="title-box">
            <img
              src="/Launch_Images/Location.svg"
              alt="Saving Icon"
              style={{ maxWidth: "80%", marginBottom: "5em" }}
            />
            <div>
              <Typography variant="h4" gutterBottom>
                Share Your Location
              </Typography>
              <Typography variant="body1" paragraph>
                Enable location services so we can find the best pub deals near you.
              </Typography>
            </div>
          </Box>
        </div>
        <div>
          <Box className="title-box">
            <img
              src="/Launch_Images/FindPubs.svg"
              alt="Saving Icon"
              style={{ maxWidth: "80%", marginBottom: "5em", marginLeft: "1em" }}
            />
            <div>
              <Typography variant="h4" gutterBottom>
                Find Pubs
              </Typography>
              <Typography variant="body1" paragraph>
                Discover great pubs around you with the best deals on drinks.
              </Typography>
            </div>
            <Button
              className="full-width-button"
              variant="contained"
              onClick={() => setDobPopupOpen(true)}
            >
              Get started
            </Button>
          </Box>
        </div>
        {isAuthenticated && (
          <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <div style={{ flexGrow: 1, overflowY: "auto" }}>
              <Box className="title-box">
                <img
                  src="/Launch_Images/SaveMoney.svg"
                  alt="Saving Icon"
                  style={{ maxWidth: "80%", marginBottom: "5em" }}
                />
                <div>
                  <Typography variant="h4" gutterBottom>
                    Save Money
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Enjoy your time out while saving money on drinks in the process.
                  </Typography>
                </div>
              </Box>
            </div>
          </div>
        )}
      </Slider>

      <Box className="bottom-container">
        <Button className="bottom-button" variant="contained" onClick={handleButtonClick}>
          {currentSlide === progress.length - 1 ? "Get me to the pub!" : "Next"}
        </Button>
      </Box>

      <DateOfBirthPopup
        open={dobPopupOpen}
        onClose={() => setDobPopupOpen(false)}
        onConfirm={handleDobConfirm}
      />
    </Box>
  );
};

export default MobileControls;