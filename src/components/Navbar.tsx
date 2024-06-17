import React, { FC } from "react";
import { Box, Button } from "@mui/material";
import { NavLink } from "react-router-dom";

import Logo from "../logo.png";
import styled from "@emotion/styled";
import useModal from "../hooks/useModal";
import SignupForm, { SignupFormFieldsType } from "./SignupForm";
import Popup from "./Popup";
import LoginForm, { LoginFormFieldsType } from "./LoginForm";

const CreateAccountButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  backgroundColor: "orange",
  borderColor: "orange",
  "&:active": {
    boxShadow: "none",
    backgroundColor: "orange",
  },
  // "&:focus": {
  //   boxShadow: "0 0 0 0.2rem orange",
  // },
  "&:hover": {
    backgroundColor: "darkorange",
    borderColor: "darkorange",
  },
});

const LoginButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  borderColor: "orange",
  color: "orange",
  "&:active": {
    boxShadow: "none",
    backgroundColor: "inherit",
  },
  "&:hover": {
    borderColor: "darkorange",
    backgroundColor: "inherit",
  },
});

const Navbar: FC = () => {
  const signupPopup = useModal();
  const loginPupup = useModal();

  const handleSignup = (data: SignupFormFieldsType) => {
    console.log("Form data:", data);
    signupPopup.closeModal();
  };

  const handleLogin = (data: LoginFormFieldsType) => {
    console.log("Form data:", data);
    loginPupup.closeModal();
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg px-3 sticky-top"
        style={{
          backgroundColor: "white",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box component="div" className="container">
          <NavLink className="navbar-brand" to="/">
            <img
              src={Logo}
              alt="logo"
              height="40rem"
              width="40rem"
              className="me-2"
            />
            <span>React JS</span>
          </NavLink>
          <button
            className="navbar-toggler collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-4">
              <li className="nav-item ">
                <NavLink
                  to="/"
                  className="nav-link active"
                  aria-current="page"
                  style={{ color: "black" }}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/About">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Practice">
                  Practice
                </NavLink>
              </li>
              <li className="nav-item">
                <LoginButton variant="outlined" onClick={loginPupup.openModal}>
                  Login
                </LoginButton>
              </li>
              <li className="nav-item">
                <CreateAccountButton
                  variant="contained"
                  onClick={signupPopup.openModal}
                >
                  Create Account
                </CreateAccountButton>
              </li>
            </ul>
          </div>
        </Box>
      </nav>
      <Popup
        isOpen={signupPopup.isOpen}
        handleClose={signupPopup.closeModal}
        title="Create Account"
      >
        <SignupForm onSubmit={handleSignup} onCancel={signupPopup.closeModal} />
      </Popup>
      <Popup
        isOpen={loginPupup.isOpen}
        handleClose={loginPupup.closeModal}
        title="Login"
      >
        <LoginForm onSubmit={handleLogin} onCancel={loginPupup.closeModal} />
      </Popup>
    </>
  );
};

export default Navbar;
