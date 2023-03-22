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
  Text,
  CircularProgress,
  Input,
} from "@mui/material";
import React, { useEffect, useState, memo } from "react";
import logo from "./sangh.jpeg";
import FormInput from "./components/FormInput";
import axios from "axios";
import Footer from "./components/footer";
import bob from "./bob.webp";
import "./form.css";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Form() {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [fatherName, setFatherName] = useState();
  const [address, setAddress] = useState();
  const [business, setBusiness] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [email, setEmail] = useState("");
  const [mother, setMother] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState([]);
  const [brother, setBrother] = useState([]);
  const [sister, setSister] = useState([]);
  const [children, setChildren] = useState([]);
  const [name, setName] = useState("");
  const [spouseName, setSpouseName] = useState("");
  const options = ["Brother", "Sister", "Children"];

  const handleAdd = () => {
    if (selectedOption === "Brother") {
      setBrother([...brother, { name, spouseName }]);
    } else if (selectedOption === "Sister") {
      setSister([...sister, { name, spouseName }]);
    } else if (selectedOption === "Children") {
      setChildren([...children, { name }]);
    }

    setName("");
    setSpouseName("");
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  console.log(selectedOption);

  const renderAdditionalFields = () => {
    switch (selectedOption) {
      case "Sister":
      case "Brother":
        return (
          <>
            <FormControl>
              <FormInput
                label="Name"
                value={name}
                onChange={setName}
                placeholder="Name"
              />
            </FormControl>
            <FormControl>
              <FormInput
                label="Spouse Name"
                value={spouseName}
                onChange={setSpouseName}
                placeholder="Spouse's name (optional)"
              />
            </FormControl>
            <Button
              variant="contained"
              sx={{
                mt: 2,
                mr: 0,
                textTransform: "capitalize",
                width: "20px",
                height: "40px",
                fontSize: "15px",
                fontFamily: "Montserrat",
                fontWeight: "600",
              }}
              color="eighth"
              onClick={handleAdd}
            >
              Add
            </Button>

            <Typography sx={{ fontStyle: "italic" }}>
              {brother.length === 0
                ? "No information added yet."
                : `Added ${brother.length} ${selectedOption}(s).`}
            </Typography>
          </>
        );
      case "Children":
        return (
          <>
            <FormControl>
              <FormInput value={name} onChange={setName} placeholder="Name" />
            </FormControl>
            <Button
              variant="contained"
              sx={{
                mt: 5,
                mr: 2,
                textTransform: "capitalize",
                width: "20px",
                height: "40px",
                fontSize: "15px",
                fontFamily: "Montserrat",
                fontWeight: "600",
              }}
              color="eighth"
              onClick={handleAdd}
            >
              Add
            </Button>

            <Typography sx={{ fontStyle: "italic" }}>
              {children.length === 0
                ? "No information added yet."
                : `Added ${children.length} ${selectedOption}(s).`}
            </Typography>
          </>
        );
      default:
        return null;
    }
  };

  const handleForm = async (event) => {
    event.preventDefault();
    if (!username) {
      return alert("Owner Name Not Found");
    }
    if (!fatherName) {
      return alert("Shop Owner Not Found");
    }
    if (!business) {
      return alert("Qualification Not Found");
    }
    if (!businessAddress) {
      return alert("Father/Husband Name Not Found");
    }
    if (!email) {
      return alert("Email Not Found");
    }

    const postdata = {
      username,
      fatherName,
      business,
      businessAddress,
      email,
      brother,
      sister,
      children,
      mother,
    };
    console.log(postdata);
    try {
      const response = await axios.post("/form/saveform", postdata);
      resetForm();
      navigate("/success");
    } catch (error) {
      console.log(error);
      alert("Form submission failed");
    } finally {
      // Set loading back to false after the response is received
    }
  };
  const resetForm = () => {};
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10rem",
          height: "100%",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="App">
      <div className="header">
        <div className="sub">
          <img src={logo} alt="logo" className="logo"></img>

          <Box mb={2} className="logo-title">
            <Typography
              variant="h1"
              sx={{
                fontSize: "25px",
                fontWeight: "700",
                mt: 2,
                ml: 3,
                color: "green",
              }}
              gutterBottom
            >
              SAMTA YUVA SANGH RAIPUR
            </Typography>
          </Box>
        </div>
        <div>
          <img src={bob} alt="bob" className="bob"></img>
        </div>
      </div>

      <Box
        component="form"
        onSubmit={handleForm}
        sx={{
          backgroundColor: "#fff",
          boxShadow: "rgb(90 114 123 / 11%) 0px 7px 30px 0px",
          px: 3,
          py: 2,
          ml: 2,
          mr: 2,
          mt: 2,
          borderRadius: "16px",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { md: "1fr 1fr 1fr ", sm: "1fr 1fr" },
            gap: 1.2,
            mb: 2,
          }}
        >
          <FormInput
            value={username}
            onChange={setUsername}
            label="Name"
            id="name"
            placeholder=""
            type="text"
            disabled={false}
            required={true}
          />
          <FormInput
            value={fatherName}
            onChange={setFatherName}
            label="Father's Name"
            id="name"
            placeholder=""
            type="text"
            disabled={false}
            required={true}
          />
          <FormInput
            value={address}
            onChange={setAddress}
            label="Address"
            id="name"
            placeholder=""
            type="text"
            disabled={false}
            required={true}
          />

          <FormInput
            value={business}
            onChange={setBusiness}
            label="Business"
            id="name"
            placeholder=""
            type="text"
            disabled={false}
            required={true}
          />
          <FormInput
            value={businessAddress}
            onChange={setBusinessAddress}
            label="Business Address"
            id="name"
            placeholder=""
            type="text"
            disabled={false}
            required={true}
          />

          <FormInput
            value={email}
            onChange={setEmail}
            label="Email"
            id="name"
            placeholder=""
            type="text"
            disabled={false}
            required={true}
          />
          <FormInput
            value={mother}
            onChange={setMother}
            label="Mother's Name"
            id="name"
            placeholder=""
            type="text"
            disabled={false}
            required={true}
          />
        </Box>
        <div className="family">
          <div className="family-select">
            <FormControl sx={{ mb: 2 }}>
              <FormLabel sx={{ mb: 1, color: "black" }} htmlFor="for">
                Add Family Details
              </FormLabel>
              <Select
                value={selectedOption}
                onChange={handleOptionChange}
                sx={{ width: "75%", height: "50%" }}
              >
                <MenuItem value={0} disabled>
                  Choose
                </MenuItem>

                {options.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="family-fields">{renderAdditionalFields()}</div>
        </div>
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            sx={{
              mr: 2,
              textTransform: "capitalize",
              width: "120px",
              fontSize: "15px",
              fontFamily: "Montserrat",
              fontWeight: "600",
            }}
            type="submit"
            color="eighth"
            disableElevation
          >
            Submit
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default Form;
