import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Payment Gateway System
        </Typography>
        <Button color="inherit" href="/">
          Home
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
