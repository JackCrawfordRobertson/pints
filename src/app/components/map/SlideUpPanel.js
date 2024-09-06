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
import "../../styles/animations.css"; // Create a CSS file for the animations

const PanelContainer = styled(Box)(({isVisible}) => ({
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#f7fbfc",
    color: "#000",
    boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.3)",
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

    useEffect(() => {
        if (user && pub) {
            logPubClick(pub.id, user.uid);
        }
    }, [pub, user]);

    if (!pub) return null;

    const handleTakeMeButtonClick = () => {
        const coords = `${pub.latitude},${pub.longitude}`;
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
            const pubDoc = doc(firestore, "pubs", pub.id);
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
                        <Typography
                            variant="h4"
                            gutterBottom
                            style={{
                                textAlign: "center",
                                marginTop: "0em",
                                marginBottom: "0em",
                                fontSize: "5em",
                                fontWeight: "bold",
                            }}
                        >
                            {pub.pint_price}
                        </Typography>
                        <Typography variant="h6" gutterBottom style={{marginTop: "1em", textAlign: "center"}}>
                            {pub.pub_name}
                        </Typography>
                        <Box display="flex" alignItems="center" gap="10px" justifyContent="center">
                            <Typography variant="subtitle1" paragraph>
                                <strong style={{color: "#fab613"}}>Pint Type:</strong> {pub.pint_type}
                            </Typography>
                        </Box>
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
                            defaultValue={pub.pub_name}
                            onChange={(e) => handleInputChange("pub_name", e.target.value)}
                            fullWidth
                        />
                        <StyledTextField
                            label="Pint Type"
                            defaultValue={pub.pint_type}
                            onChange={(e) => handleInputChange("pint_type", e.target.value)}
                            fullWidth
                        />
                        <StyledTextField
                            label="Pint Price"
                            defaultValue={pub.pint_price}
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
