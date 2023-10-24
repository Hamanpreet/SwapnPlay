import React, { useState } from "react";
import axios from "axios";
// import newtoy.css css page 

import {
  TextField,
  Select,
  MenuItem,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Paper, 
} from "@mui/material";
import "../styles/NewToy.css";


// Define a functional React component for creating a new toy entry.
const NewToy = () => {
  // State management: Initialize state variables to hold new toys form data and messages
  const [toyInfo, setToyInfo] = useState({
    title: "",
    description: "",
    ageGroup: "0-3 years",
    value: "$0",
    address: "",
    longitude: "",
    latitude: "",
    condition: "New",
  });

  const [message, setMessage] = useState("");
  // TODO: Event handler for input field for form
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update the corresponding state property with the new value
    setToyInfo({
      ...toyInfo,
      [name]: value,
    });
  };

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a POST request to create a new toy entry on the server using Axios
    axios
      .post("http://localhost:8080/api/toys/new", toyInfo)
      .then((response) => {
        console.log("Form data submitted successfully:", response.data);
        setMessage("Request submitted successfully!");
        // Clear the form after successful submission
        setToyInfo({
          title: "",
          description: "",
          ageGroup: "0-3 years",
          value: "$0",
          address: "",
          longitude: "",
          latitude: "",
          condition: "New",
        });
      })
      .catch((error) => {
        console.error("Error submitting form data:", error);
        setMessage("Error submitting the request.");
      });
  };

  return (
    <div>
      <h1>Create a New Toy</h1>
      <Paper elevation={3} style={{ padding: 16 }}>
        <form onSubmit={handleSubmit} className="form-container">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                label="Title"
                type="text"
                name="title"
                value={toyInfo.title}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                label="Description"
                type="text"
                name="description"
                value={toyInfo.description}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Age Group</InputLabel>
                <Select
                  name="ageGroup"
                  value={toyInfo.ageGroup}
                  onChange={handleChange}
                  label="Age Group"
                >
                  <MenuItem value="0-3 years">0-3 years</MenuItem>
                  <MenuItem value="3-6 years">3-6 years</MenuItem>
                  <MenuItem value="5-8 years">5-8 years</MenuItem>
                  <MenuItem value="7-10 years">7-10 years</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                label="Value"
                type="number"
                name="value"
                value={toyInfo.value}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                label="Address"
                type="text"
                name="address"
                value={toyInfo.address}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                label="Longitude"
                type="text"
                name="longitude"
                value={toyInfo.longitude}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                label="Latitude"
                type="text"
                name="latitude"
                value={toyInfo.latitude}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Condition</InputLabel>
                <Select
                  name="condition"
                  value={toyInfo.condition}
                  onChange={handleChange}
                  label="Condition"
                  required
                >
                  <MenuItem value="New">New</MenuItem>
                  <MenuItem value="Used">Used</MenuItem>
                  <MenuItem value="Like New">Like New</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Add New Toy
              </Button>
            </Grid>
            <Grid item xs={12}>
              {message && <p>{message}</p>}
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};

export default NewToy;