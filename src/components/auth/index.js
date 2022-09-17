import { Button, Card } from "@material-ui/core";
import React from "react";
import { useStateValue } from "../../context/StateProvider";

const Auth = () => {
  const { handleSignIn } = useStateValue();

  return (
    <div style={{ display: "grid", placeContent: "center", height: "100vh" }}>
      <Card
        style={{
          padding: "20px 50px",
          height: "50vh",
          // width: "40vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/2965/2965358.png"
          height="100px"
          alt="logo"
        />
        <h1>Login with Google</h1>
        <Button variant="contained" color="primary" onClick={handleSignIn}>
          Login
        </Button>
      </Card>
    </div>
  );
};

export default Auth;
