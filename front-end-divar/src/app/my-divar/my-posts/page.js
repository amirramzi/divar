"use client";

import callApi from "@/services/callApi";
import { Button } from "@mui/material";

export default function MyPost() {
  const user = async () => {
    try {
      const result = await callApi().get("/user/users");
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full h-full text-white">
      <Button variant="contained" onClick={user}>
        click
      </Button>
    </div>
  );
}
