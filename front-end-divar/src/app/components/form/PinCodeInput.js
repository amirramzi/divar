"use client";
import React, { useRef } from "react";
import { Grid, TextField } from "@mui/material";

const PinCodeInput = ({ value, onChange, onBlur, error }) => {
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const val = e.target.value;
    if (/^[0-9]*$/.test(val) && val.length <= 1) {
      const newPin = value.split("");
      newPin[index] = val;
      onChange(newPin.join(""));
      if (val && index < 4) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <Grid container spacing={3} justifyContent="center">
      {[...Array(5)].map((_, index) => (
        <Grid item key={index} xs={2}>
          <TextField
            inputRef={(el) => (inputRefs.current[4 - index] = el)}
            id={`pin-${index}`}
            type="text"
            inputProps={{
              maxLength: 1,
              style: {
                textAlign: "center",
                width: "1rem",
                height: "1rem",
                fontSize: "1rem",
                direction: "ltr",
              },
            }}
            placeholder="&#9737;"
            value={value[4 - index] || ""}
            onChange={(e) => handleChange(e, 4 - index)}
            onKeyDown={(e) => handleKeyDown(e, 4 - index)}
            onBlur={onBlur}
            error={error}
          
            variant="outlined"
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default PinCodeInput;
