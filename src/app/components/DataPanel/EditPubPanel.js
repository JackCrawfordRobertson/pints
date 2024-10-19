import React, { useState } from "react";
import { Box, Button, TextField, Typography, Slider, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { CSSTransition } from "react-transition-group";

const PanelContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isVisible',
})(({ isVisible }) => ({
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
  maxHeight: "90vh",
  overflowY: "auto",
}));

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

const StyledButton = styled(Button)({
  backgroundColor: "#fab613",
  color: "#000",
  "&:hover": {
    backgroundColor: "#d35400",
  },
  marginTop: "auto",
  borderRadius: "5px",
});

const EditPubPanel = ({ currentPub, isVisible, handleInputChange, handleSaveChanges, handleCancelClick }) => {
  const [pintPrice, setPintPrice] = useState(currentPub ? parseFloat(currentPub.pint_price.replace('£', '')) : 0);

  if (!currentPub) return null;

  const handleSliderChange = (event, newValue) => {
    setPintPrice(newValue);
    handleInputChange("pint_price", `£${newValue.toFixed(2)}`);
  };

  return (
    <CSSTransition in={isVisible} timeout={300} classNames="fade" unmountOnExit>
      <PanelContainer isVisible={isVisible}>
        <IconButton onClick={handleCancelClick} style={{ position: "absolute", top: "10px", right: "10px" }}>
          <CloseIcon style={{ color: "#fab613" }} />
        </IconButton>

        {/* Pint Price Display */}
        <div
          style={{
            textAlign: "left",
            marginTop: "0em",
            marginBottom: "0em",
            fontSize: "5em",
            fontWeight: "bold",
            letterSpacing: "-0.01em",
            lineHeight: "1",
          }}
        >
          £{pintPrice.toFixed(2)}
        </div>


        <Box display="flex" alignItems="center" gap="5px" justifyContent="left" style={{ marginBottom: "1em" }}>
          <LocationOnIcon style={{ fontSize: "30px", verticalAlign: "middle", color: "gray" }} />
          <Typography variant="h6" style={{ fontWeight: "bold", color: "gray" }}>
            {currentPub.pub_name}
          </Typography>
        </Box>

        <StyledTextField
          label="Pint Type"
          defaultValue={currentPub.pint_type}
          onChange={(e) => handleInputChange("pint_type", e.target.value)}
          fullWidth
          placeholder={currentPub.pint_type}
          style={{ marginBottom: "1em" }}
        />

        <Box display="flex" alignItems="center" gap="10px" justifyContent="center" style={{ width: "100%", marginBottom: "1em" }}>
          <Typography variant="body1" style={{ color: "gray" }}>
            £2
          </Typography>
          <Slider
            value={pintPrice}
            min={2}
            max={10}
            step={0.05}
            onChange={handleSliderChange}
            aria-labelledby="pint-price-slider"
            style={{ color: "#fab613" }}
          />
          <Typography variant="body1" style={{ color: "gray" }}>
            £10
          </Typography>
        </Box>

        <Box display="flex" gap="10px" marginTop="10px" justifyContent="center" style={{ width: "100%", marginBottom: "1em" }}>
          <StyledButton
            variant="contained"
            onClick={handleSaveChanges}
            sx={{ fontWeight: "bold", width: "100%", borderRadius: "30px" }}
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
              "&:hover": { backgroundColor: "#bdbdbd" },
              width: "100%",
              borderRadius: "30px",
            }}
          >
            Cancel
          </StyledButton>
        </Box>
      </PanelContainer>
    </CSSTransition>
  );
};

export default EditPubPanel;