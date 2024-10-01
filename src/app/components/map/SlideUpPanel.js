import React, {useState, useEffect} from "react";
import {Box, Typography, IconButton, Button, TextField} from "@mui/material";
import {styled} from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import {toast} from "react-toastify";
import {updateDoc, doc, setDoc, serverTimestamp} from "firebase/firestore";
import {firestore} from "../../../../config/firebaseConfig"; // Adjust the import path if necessary
import {getAuth} from "firebase/auth";
import {CSSTransition} from "react-transition-group";
import {TransitionGroup} from "react-transition-group";
import SportsBarIcon from "@mui/icons-material/SportsBar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "../../styles/animations.css"; // Create a CSS file for the animations

const PanelContainer = styled(Box)(({isVisible}) => ({
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

const StyledTextField = styled(TextField)({
    "& .MuiInput-underline:before": {
        borderBottomColor: "gray",
    },
    "& .MuiInput-underline:after": {
        borderBottomColor: "#fab613",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
        borderBottomColor: "#fab613",
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "gray",
        },
        "&:hover fieldset": {
            borderColor: "#fab613",
        },
        "&.Mui-focused fieldset": {
            borderColor: "#fab613",
        },
    },
    "& .MuiFormLabel-root": {
        color: "gray",
    },
    "&:hover .MuiFormLabel-root": {
        color: "#fab613",
    },
    "& .Mui-focused .MuiFormLabel-root": {
        color: "#fab613",
    },
});

const logPubClick = async (pubId, userId) => {
    try {
        await setDoc(doc(firestore, "pub_clicks", `${userId}_${pubId}`), {
            pubId,
            userId,
            timestamp: serverTimestamp(),
        });
    } catch (error) {
        console.error("Error logging pub click:", error);
    }
};

const SlideUpPanel = ({pub, isVisible, onClose}) => {
    const [updatedData, setUpdatedData] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [showNonEdit, setShowNonEdit] = useState(true);
    const [showEdit, setShowEdit] = useState(false);
    const auth = getAuth();
    const user = auth.currentUser;

    // Set this to true when working offline
    const isOffline = true;

    // Mock pub data for offline mode
    const mockPub = {
        id: "mockPubId",
        pub_name: "Mock Pub Name",
        pint_type: "Mock Pint Type",
        pint_price: "£5.00",
        latitude: 51.5074,
        longitude: -0.1276,
    };

    // Use mock pub data when offline
    const currentPub = isOffline ? mockPub : pub;

    useEffect(() => {
        if (user && currentPub && !isOffline) {
            logPubClick(currentPub.id, user.uid);
        }
    }, [currentPub, user, isOffline]);

    if (!currentPub) return null;

    const handleTakeMeButtonClick = () => {
        const coords = `${currentPub.latitude},${currentPub.longitude}`;
        navigator.clipboard
        .writeText(coords)
        .then(() => {
            toast.success("Address copied to clipboard!");
        })
        .catch((err) => {
            console.error("Failed to copy: ", err);
            toast.error("Failed to copy address.");
        });
    };

    const handleInputChange = (field, value) => {
        setUpdatedData((prevData) => ({...prevData, [field]: value}));
    };

    const handleSaveChanges = async () => {
        if (!user) {
            toast.error("You must be logged in to update pub information.");
            return;
        }

        try {
            const pubDoc = doc(firestore, "pubs", currentPub.id);
            await updateDoc(pubDoc, updatedData);
            toast.success("Pub information updated successfully!");
            setEditMode(false);
            setShowNonEdit(true);
            setShowEdit(false);
        } catch (error) {
            console.error("Error updating pub information:", error);
            toast.error("Failed to update pub information.");
        }
    };

    const handleUpdateClick = () => {
        setShowNonEdit(false);
        setTimeout(() => {
            setEditMode(true);
            setShowEdit(true);
        }, 300);
    };

    const handleCancelClick = () => {
        setShowEdit(false);
        setTimeout(() => {
            setEditMode(false);
            setShowNonEdit(true);
        }, 300);
    };

    return (
        <TransitionGroup>
            {showNonEdit && (
                <CSSTransition key="nonEdit" timeout={300} classNames="fade">
                    <PanelContainer isVisible={isVisible}>
                        <IconButton onClick={onClose} style={{position: "absolute", top: "10px", right: "10px"}}>
                            <CloseIcon style={{color: "#fab613"}} />
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
                                lineHeight: "1", // Add custom line-height
                            }}
                        >
                            {currentPub.pint_price}

                            <div gutterBottom style={{marginTop: "0.5em", textAlign: "left", fontSize: ".3em"}}>
                                {currentPub.pub_name}
                            </div>
                        </div>

                        {/* Pub Address */}
                        <Box display="flex" alignItems="center" gap="5px" justifyContent="left">
                        <Typography variant="body1" style={{textAlign: "left", marginBottom: "0em", color: "gray", marginLeft: "0"}}>
                            <LocationOnIcon style={{ fontSize: "30px", verticalAlign: "middle", marginLeft: "0", }} />{" "}
                            {currentPub.pub_address || "Mock Pub Address, Central London"}{" "}
                            {/* Mock data or real pub address */}
                        </Typography>
                        </Box>

                        <hr style={{borderTop: "1px solid lightgray", margin: ".2em 0"}} />

                        {/* Beer Icon and Kind of Pint */}
                        <Box display="flex" alignItems="center" gap="5px" justifyContent="left">
                            <SportsBarIcon style={{color: "#fab613", fontSize: "30px"}} />
                            <Typography variant="subtitle1" style={{fontWeight: "bold", color: "#fab613"}}>
                                {currentPub.pint_type}
                            </Typography>
                        </Box>

                        {/* Divider Line */}
                        <hr style={{borderTop: "1px solid lightgray", margin: ".2em 0"}} />

                        {/* Buttons */}
                        <StyledButton
                            variant="contained"
                            onClick={handleTakeMeButtonClick}
                            sx={{marginBottom: "0rem", fontWeight: "bold", borderRadius: "30px"}}
                        >
                            Copy Address
                        </StyledButton>
                        {user && (
                            <UpdateButton
                                style={{marginBottom: "1.5em", borderRadius: "30px"}}
                                onClick={handleUpdateClick}
                            >
                                Update
                            </UpdateButton>
                        )}
                    </PanelContainer>
                </CSSTransition>
            )}
            {showEdit && (
                <CSSTransition key="edit" timeout={300} classNames="fade">
                    <PanelContainer isVisible={isVisible}>
                        <StyledTextField
                            label="Pub Name"
                            defaultValue={currentPub.pub_name}
                            onChange={(e) => handleInputChange("pub_name", e.target.value)}
                            fullWidth
                        />
                        <StyledTextField
                            label="Pint Type"
                            defaultValue={currentPub.pint_type}
                            onChange={(e) => handleInputChange("pint_type", e.target.value)}
                            fullWidth
                        />
                        <StyledTextField
                            label="Pint Price"
                            defaultValue={currentPub.pint_price}
                            onChange={(e) => handleInputChange("pint_price", e.target.value)}
                            fullWidth
                        />
                        <Box
                            display="flex"
                            gap="10px"
                            marginTop="10px"
                            justifyContent="center"
                            style={{width: "100%", marginBottom: "1em"}}
                        >
                            <StyledButton
                                variant="contained"
                                onClick={handleSaveChanges}
                                sx={{fontWeight: "bold", width: "100%", borderRadius: "30px"}}
                            >
                                Save
                            </StyledButton>
                            <StyledButton
                                variant="contained"
                                onClick={handleCancelClick}
                                sx={{
                                    fontWeight: "bold",
                                    backgroundColor: "#e0e0e0",
                                    color: "#000",
                                    "&:hover": {backgroundColor: "#bdbdbd"},
                                    width: "100%",
                                    borderRadius: "30px",
                                }}
                            >
                                Cancel
                            </StyledButton>
                        </Box>
                    </PanelContainer>
                </CSSTransition>
            )}
        </TransitionGroup>
    );
};

export default SlideUpPanel;
