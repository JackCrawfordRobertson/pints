import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContentText,
  Button,
  Slide,
  Typography,
  Box,
  MenuItem,
  Select,
} from "@mui/material";
import { styled } from "@mui/system";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} timeout={700} />;
});

// Override styles for the Select component
const CustomSelect = styled(Select)({
  "& .MuiSelect-root": {
    backgroundColor: "transparent",
  },
  "&:before": {
    borderBottom: "2px solid #fab613", // Orange underline when unfocused
  },
  "&:after": {
    borderBottom: "2px solid #fab613", // Orange underline when focused
  },
  "& .Mui-focused": {
    color: "#fab613", // Orange text when focused
  },
});

// Override styles for the MenuItem component
const CustomMenuItem = styled(MenuItem)({
  "&.Mui-selected": {
    backgroundColor: "#fab613", // Orange background when selected
    "&:hover": {
      backgroundColor: "#d35400", // Darker orange when hovered
    },
  },
});

const FullScreenDialog = styled(Dialog)({
  "& .MuiPaper-root": {
    margin: 0,
    paddingLeft: "0px",
    paddingRight: "0px",
    width: "100%",
    maxWidth: "100%",
    height: "90%",
    maxHeight: "90%",
    borderRadius: "30px 30px 0 0", // Rounded top corners
    backgroundColor: "#f7fbfc",
    display: "flex",
    flexDirection: "column",
    position: "fixed", // Position fixed to anchor to bottom
    bottom: 0, // Anchor the dialog to the bottom of the screen
    transform: "none", // Remove the default centering transform
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
  borderRadius: "30px", // Rounded corners
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
  borderRadius: "30px", // Rounded corners
  marginLeft: "0 !important", // Override default margin-left
});

const ContentWrapper = styled(Box)({
  flex: 1,
  overflowY: "auto",
  padding: "30px",
});

const DateOfBirthPopup = ({ open, onClose, onConfirm }) => {
  const [year, setYear] = useState("");

  const handleConfirm = () => {
    if (!year) {
      alert("Please select a year of birth.");
      return;
    }

    const currentYear = new Date().getFullYear();
    const age = currentYear - year;

    if (age >= 18) {
      onConfirm(); // Call the confirm callback if the age is 18 or above
    } else {
      alert("Bad luck. Just a few more years to wait!");
    }
  };

  const renderYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
    return years.map((year) => (
      <CustomMenuItem key={year} value={year}>
        {year}
      </CustomMenuItem>
    ));
  };

  return (
    <FullScreenDialog open={open} onClose={onClose} TransitionComponent={Transition}>
      <ContentWrapper>
        <img
          src="/Launch_Images/DoB.svg"
          alt="Saving Icon"
          style={{ maxWidth: "60%", marginBottom: "2em", marginLeft: "4em" }}
        />
        <Typography variant="h4" gutterBottom>
          Enter Your Year of Birth
        </Typography>
        <DialogContentText>
          To ensure you are of legal drinking age, please enter your year of birth.
        </DialogContentText>
        <Box display="flex" justifyContent="center" marginBottom="1em">
          <CustomSelect
            value={year}
            onChange={(e) => setYear(e.target.value)}
            displayEmpty
            fullWidth
            variant="standard"
          >
            <MenuItem value="" disabled>
              Year
            </MenuItem>
            {renderYearOptions()}
          </CustomSelect>
        </Box>
      </ContentWrapper>
      <DialogActions
        style={{ flexDirection: "column", alignItems: "center", width: "auto", padding: "0 30px 0px" }}
      >
        <FullWidthButton onClick={handleConfirm}>Confirm</FullWidthButton>
        <CancelButton onClick={onClose}>Cancel</CancelButton>
      </DialogActions>
    </FullScreenDialog>
  );
};

export default DateOfBirthPopup;