"use client";
import { useSelector } from "react-redux";

const withAuth = (AllowedComponent, IllegalComponent) => {
  return (props) => {
    const user = useSelector((state) => state.auth.user);

    if (!user) {
      return <IllegalComponent {...props} />;
    }

    return <AllowedComponent {...props} />;
  };
};

export default withAuth;
