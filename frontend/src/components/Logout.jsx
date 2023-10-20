import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Button from '@mui/material/Button';

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <Button variant="contained" color="primary" 
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }>
        Log Out
      </Button>
    )
  );
};

export default LogoutButton;
