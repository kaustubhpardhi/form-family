import {
  Typography,
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState, memo } from "react";
import logo from "./meerut.jpg";
import FormInput from "./components/FormInput";
import axios from "axios";
import Footer from "./components/footer";
import bob from "./bob.webp";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Success from "./components/success";
import { useNavigate } from "react-router-dom";
import Form from "./form";
import Drawer from "./components/Drawer";
import { styled } from "@mui/material/styles";
import Login from "./components/login";
import RequireAuth from "./components/RequireAuth";
const drawerWidth = 280;

// const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
//   ({ theme, open }) => ({
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     transition: theme.transitions.create("margin", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginLeft: `-${drawerWidth}px`,
//     ...(open && {
//       transition: theme.transitions.create("margin", {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       marginLeft: 0,
//     }),
//   })
// );

function App() {
  const [sideBar, setSideBar] = useState(false);
  const [receipt, setReceipt] = useState({});
  return (
    <div className="App">
      {/* <Box sx={{ mt: 5 }}>
        <div style={{ display: "flex" }}>
          <Drawer
            sideBar={sideBar}
            setSideBar={setSideBar}
            drawerWidth={drawerWidth}
          /> */}
      {/* <Main open={sideBar} sx={{ pb: 0, pt: 4 }}> */}
      <Routes>
        <Route
          path="/"
          element={
            // <RequireAuth>
            <Form />
            /* </RequireAuth> */
          }
        />
      </Routes>
      <Routes>
        <Route path="/success" element={<Success />} />
      </Routes>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
      {/* </Main> */}
      {/* </div>
      </Box> */}
    </div>
  );
}

export default App;
