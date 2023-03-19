import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import logo from "../meerut.jpg";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [surveyorId, setSurveyorId] = useState();
  const [surveyorPass, setSurveyorPass] = useState();
  const [change, setChange] = useState();

  //checking whether the user is logged in
  let user = localStorage.getItem("user");
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, change, navigate]);

  const loginHandler = async (event) => {
    event.preventDefault();

    if (!surveyorId) {
      return alert("Please Enter Your Email ID");
    }
    if (!surveyorPass) {
      return alert("Please Enter Your Password");
    }

    try {
      const logindata = {
        surveyorId,
        surveyorPass,
      };
      console.log(logindata);
      const surveyorid = await axios.post("/surveyor/surveyorlogin", logindata);
      if (surveyorid.data.surveyorId) {
        localStorage.setItem(
          "user",
          JSON.stringify({ surveyorId: surveyorid.data.surveyorId })
        );
      } else {
        alert(" Login Failed");
      }
      setChange(!change);
    } catch (error) {
      resetform();
      alert("Login Failed");
      console.log(error);
    }
  };
  const resetform = () => {
    setSurveyorId("");
    setSurveyorPass("");
  };

  return (
    <div>
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: "0",
          left: "0",
          zIndex: "9999",
          backgroundColor: "#fafbfb",
        }}
      >
        <Box sx={{ my: 3 }}>
          <Typography
            variant="h5"
            sx={{
              color: "eighth.main",
              textAlign: "center",
              mb: 2,
            }}
          >
            MEERUT NAGAR NIGAM MERCHANT DATABASE ONBORDING
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { sm: "1fr 1.5fr", xs: "1fr" },
              gap: 2,
              maxWidth: "700px",
              alignItems: "center",
              backgroundColor: "#fff",
              borderRadius: "10px",
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
              overflow: "hidden",
            }}
          >
            <img src={logo} className="logo1" alt="loginImage" />

            <Box component="form" onSubmit={loginHandler}>
              <Box sx={{ p: 4 }}>
                <Typography
                  variant="h5"
                  sx={{
                    color: "eighth.main",
                  }}
                >
                  Surveyor Login
                </Typography>

                <FormControl sx={{ display: "block", my: 2 }}>
                  <TextField
                    required
                    value={surveyorId}
                    onChange={(e) => setSurveyorId(e.target.value)}
                    fullWidth
                    id="id"
                    color="eighth"
                    size="small"
                    placeholder="Username"
                  />
                </FormControl>
                <FormControl sx={{ display: "block", my: 2 }}>
                  <TextField
                    required
                    value={surveyorPass}
                    onChange={(e) => setSurveyorPass(e.target.value)}
                    fullWidth
                    id="password"
                    color="eighth"
                    size="small"
                    type="password"
                    placeholder="Password"
                  />
                </FormControl>

                <Box sx={{ mt: 3, textAlign: "center" }}>
                  <Button
                    variant="contained"
                    sx={{ px: 6, textTransform: "capitalize" }}
                    type="submit"
                    color="eighth"
                    disableElevation
                  >
                    {" "}
                    Login
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Login;
