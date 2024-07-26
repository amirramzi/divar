"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import Message from "../shared/Message";

const TimerStepTwoBtn = ({ mobile }) => {
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds for testing
  const [showButton, setShowButton] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerId);
    } else {
      setShowButton(true);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const remainingSeconds = seconds % 60;
    return `${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleButtonClick = async () => {
    try {
      const result = await axios.post("http://localhost:3000/auth/send-otp", {
        mobile,
      });
      if (result.status === 200) {
        setMessage({ text: result.data.message, variant: "success" });
        setTimeLeft(30);
        setShowButton(false);
      }
    } catch (error) {
      setMessage({ text: "خطا در ارسال کد", variant: "error" });
      console.log("error", error);
    }
  };

  return (
    <div className="flex mx-2">
      {showButton ? (
        <Button
          variant="outlined"
          color="error"
          className="!ml-2"
          onClick={handleButtonClick}>
          درخواست کد
        </Button>
      ) : (
        <>
          <div className="mx-1">درخواست مجدد</div>
          <div>{formatTime(timeLeft)}</div>
        </>
      )}
      {message && <Message message={message.text} variant={message.variant} />}
    </div>
  );
};

export default TimerStepTwoBtn;
