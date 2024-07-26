import React, {useState, useEffect, useRef} from "react";
import {Button, Typography, Box, IconButton} from "@mui/material";
import {styled} from "@mui/system";
import Slider from "react-slick";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Flag from "react-world-flags"; // Import the Flag component

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BackgroundContainer = styled(Box)({
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#bdc3c790", // Black background
    zIndex: 999, // Below the widget container
});

const DesktopContainer = styled(Box)(({isFading}) => ({
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    height: "80%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f7fbfc",
    color: "#000",
    padding: "20px",
    zIndex: 1000,
    transition: "opacity 0.5s ease-out",
    opacity: isFading ? 0 : 1,
    pointerEvents: isFading ? "none" : "auto",
    boxSizing: "border-box",
}));

const TitleBox = styled(Box)({
    textAlign: "left",
    width: "100%",
    padding: "30px",
    boxSizing: "border-box",
    flex: 1,
    overflowY: "auto",
});

const FullWidthButton = styled(Button)({
    backgroundColor: "#fab613",
    color: "#000",
    width: "calc(100%)",
    fontWeight: "bold",
    "&:hover": {
        backgroundColor: "#d35400",
    },
    padding: "15px 25px",
    marginBottom: "30px",
    boxSizing: "border-box",
    alignSelf: "center",
});

const ProgressContainer = styled(Box)({
    display: "flex",
    width: "100%",
    padding: "0 10px",
    boxSizing: "border-box",
    justifyContent: "space-between",
    marginBottom: "20px",
});

const ProgressBarSection = styled(Box)(({completed}) => ({
    flex: 1,
    height: "5px",
    margin: "0 2px",
    backgroundColor: "#ddd",
    borderRadius: "2px",
    position: "relative",
    "&::after": {
        content: '""',
        display: "block",
        height: "100%",
        width: `${completed}%`,
        backgroundColor: "#fab613",
        borderRadius: "2px",
        transition: "width 0.5s ease-out",
    },
}));

const ArrowButton = styled(IconButton)({
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 1001, // Above the background, below the container
    backgroundColor: "#fab613",
    color: "#ffffff", // Orange color for the arrows
    "&:hover": {
        backgroundColor: "#d35400",
    },
});

const PrevArrow = ({onClick}) => (
    <ArrowButton style={{left: "10px"}} onClick={onClick}>
        <ArrowBackIosIcon />
    </ArrowButton>
);

const NextArrow = ({onClick}) => (
    <ArrowButton style={{right: "10px"}} onClick={onClick}>
        <ArrowForwardIosIcon />
    </ArrowButton>
);

const DesktopControls = ({fetchPubs}) => {
    const [isFading, setIsFading] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [progress, setProgress] = useState([0, 0, 0, 0]);
    const sliderRef = useRef(null);

    useEffect(() => {
        const updatedProgress = progress.map((value, index) => (index <= currentSlide ? 100 : 0));
        setProgress(updatedProgress);
    }, [currentSlide]);

    const handleButtonClick = () => {
        setIsFading(true);
        setTimeout(() => {
            fetchPubs();
            setIsVisible(false);
        }, 500);
    };

    const handleSlideChange = (index) => {
        setCurrentSlide(index);
    };

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (oldIndex, newIndex) => handleSlideChange(newIndex),
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    if (!isVisible) return null;

    return (
        <>
            <BackgroundContainer />
            <DesktopContainer isFading={isFading}>
                <ProgressContainer>
                    {progress.map((completed, index) => (
                        <ProgressBarSection key={index} completed={completed} />
                    ))}
                </ProgressContainer>
                <Slider {...settings} ref={sliderRef} style={{width: "100%", height: "100%", marginBottom:'2em'}}>
                    <div>
                        <TitleBox>
                            <Typography variant="h3" gutterBottom>
                                Welcome to <b style={{color: "#fab613"}}>PINTS!</b>
                            </Typography>
                            <Typography
                                variant="body1"
                                style={{
                                    fontWeight: 400,
                                    lineHeight: "1.8",
                                }}
                                paragraph
                            >
                                <b>PINTS</b> is your trusty companion for finding the best pub deals around you! If you're
                                in Central London, simply share your location, and <b>PINTS</b> will pinpoint the three
                                cheapest pints in your area. Whether you're exploring a new part of town or enjoying a night
                                out in your favorite area, <b>PINTS</b> ensures you always get the best value for your pint.
                                Discover great pubs and save money with <b>PINTS</b> – cheers to that!
                            </Typography>
                        </TitleBox>
                    </div>
                    <div>
                        <TitleBox>
                            <LocationOnIcon style={{fontSize: 60, color: "#fab613"}} />
                            <Typography variant="h3" gutterBottom>
                                Share Your Location
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Enable location services so we can find the best pub deals near you.
                            </Typography>
                        </TitleBox>
                    </div>
                    <div>
                        <TitleBox>
                            <LocalBarIcon style={{fontSize: 60, color: "#fab613"}} />
                            <Typography variant="h3" gutterBottom>
                                Find Pubs
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Discover great pubs around you with the best deals on drinks.
                            </Typography>
                        </TitleBox>
                    </div>
                    <div>
                        <TitleBox>
                            <MoneyOffIcon style={{fontSize: 60, color: "#fab613"}} />
                            <Typography variant="h3" gutterBottom>
                                Save Money
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Enjoy your time out while saving money on drinks in the process.
                            </Typography>
                            <FullWidthButton variant="contained" onClick={handleButtonClick}>
                                Get me to the pub!
                            </FullWidthButton>
                        </TitleBox>
                    </div>
                </Slider>
            </DesktopContainer>
        </>
    );
};

export default DesktopControls;
