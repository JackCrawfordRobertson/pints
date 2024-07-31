import React, { useState } from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    TextField,
    Button,
    Slide,
    Typography,
    Box,
} from "@mui/material";
import { styled } from "@mui/system";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} timeout={700} />;
});

const FullScreenDialog = styled(Dialog)({
    "& .MuiPaper-root": {
        margin: 0,
        paddingLeft: "20px",
        paddingRight: "20px",
        width: "100%",
        maxWidth: "100%",
        height: "100%",
        maxHeight: "100%",
        borderRadius: "30px 30px 0 0", // Rounded top corners
        backgroundColor: "#f7fbfc",
        display: "flex",
        flexDirection: "column",
    },
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
    marginBottom: "10px",
    boxSizing: "border-box",
    alignSelf: "center",
    borderRadius: "8px", // Rounded corners
});

const CancelButton = styled(Button)({
    backgroundColor: "#e0e0e0",
    color: "#000",
    width: "calc(100%)",
    fontWeight: "bold",
    "&:hover": {
        backgroundColor: "#bdbdbd",
    },
    padding: "15px 25px",
    marginBottom: "30px",
    boxSizing: "border-box",
    alignSelf: "center",
    borderRadius: "8px", // Rounded corners
    marginLeft: "0 !important", // Override default margin-left
});

const ContentWrapper = styled(Box)({
    flex: 1,
    overflowY: "auto",
    padding: "30px",
});

const DateOfBirthPopup = ({ open, onClose, onConfirm }) => {
    const [dob, setDob] = useState("");

    const handleConfirm = () => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (age >= 18) {
            // Assuming legal drinking age is 18
            onConfirm();
        } else {
            alert(
                "You must be over the legal drinking age to use this app. Just a few more years and you’ll be able to join the fun!"
            );
        }
    };

    return (
        <FullScreenDialog open={open} onClose={onClose} TransitionComponent={Transition}>
            <ContentWrapper>
                <CalendarTodayIcon style={{ fontSize: 50, color: "#fab613", marginBottom: '.5em' }} />
                <Typography variant="h4" gutterBottom>
                    Enter Your Date of Birth
                </Typography>
                <DialogContentText>
                    To ensure you are of legal drinking age, please enter your date of birth.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="date"
                    label="Date of Birth"
                    type="date"
                    fullWidth
                    variant="standard"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </ContentWrapper>
            <DialogActions style={{ flexDirection: "column", alignItems: "center", width: "auto", padding: "0 30px 30px" }}>
                <FullWidthButton onClick={handleConfirm}>Confirm</FullWidthButton>
                <CancelButton onClick={onClose}>Cancel</CancelButton>
            </DialogActions>
        </FullScreenDialog>
    );
};

export default DateOfBirthPopup;
