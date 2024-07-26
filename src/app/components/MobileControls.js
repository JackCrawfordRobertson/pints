import React, {useState, useEffect, useRef} from "react";
import {Button, Typography, Box} from "@mui/material";
import {styled} from "@mui/system";
import Slider from "react-slick";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MobileContainer = styled(Box)(({isFading}) => ({
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
    paddingTop: "40px", // Add padding top to create space for the progress bar
}));

const TitleBox = styled(Box)({
    textAlign: "left",
    width: "100%",
    paddingTop: "30px",
    paddingLeft: "30px",
    paddingRight: "30px",
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
    marginTop: "15em",
});

const ProgressContainer = styled(Box)({
    display: "flex",
    width: "100%",
    padding: "0 10px",
    boxSizing: "border-box",
    justifyContent: "space-between",
    marginBottom: "20px", // Add margin bottom to create space between progress bar and content
});

const ProgressBarSection = styled(Box)(({completed}) => ({
    flex: 1,
    height: "5px", // Set height here
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

const MobileControls = ({fetchPubs}) => {
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
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (oldIndex, newIndex) => handleSlideChange(newIndex),
    };

    const handleTouchEnd = (event) => {
        const screenWidth = window.innerWidth;
        const touchX = event.changedTouches[0].clientX;
        if (touchX < screenWidth / 2) {
            sliderRef.current.slickPrev();
        } else {
            sliderRef.current.slickNext();
        }
    };

    if (!isVisible) return null;

    return (
        <MobileContainer isFading={isFading} onTouchEnd={handleTouchEnd}>
            <ProgressContainer>
                {progress.map((completed, index) => (
                    <ProgressBarSection key={index} completed={completed} />
                ))}
            </ProgressContainer>
            <Slider {...settings} ref={sliderRef} style={{width: "100%", height: "100%"}}>
                <div>
                    <TitleBox>
                        <Typography variant="h4" gutterBottom>
                            Welcome to <b style={{color: "#fab613"}}>PINTS!</b>
                        </Typography>
                        <Typography
                            variant="body1"
                            style={{
                                fontWeight: 400,
                                lineHeight: "1.5",
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
                        <LocationOnIcon style={{fontSize: 50, color: "#fab613"}} />
                        <Typography variant="h4" gutterBottom>
                            Share Your Location
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Enable location services so we can find the best pub deals near you.
                        </Typography>
                    </TitleBox>
                </div>
                <div>
                    <TitleBox>
                        <LocalBarIcon style={{fontSize: 50, color: "#fab613"}} />
                        <Typography variant="h4" gutterBottom>
                            Find Pubs
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Discover great pubs around you with the best deals on drinks.
                        </Typography>
                    </TitleBox>
                </div>
                <div>
                    <TitleBox>
                        <MoneyOffIcon style={{fontSize: 50, color: "#fab613"}} />
                        <Typography variant="h4" gutterBottom>
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
        </MobileContainer>
    );
};

export default MobileControls;
