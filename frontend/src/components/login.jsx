import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Button from '@mui/material/Button';


const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => loginWithRedirect()}>
        Login
      </Button>
    </div>
  );
};

export default LoginButton;
