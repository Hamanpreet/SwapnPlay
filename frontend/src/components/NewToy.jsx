import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/NewToy.scss";
import config from "../config/config";

import {
  TextField,
  Select,
  MenuItem,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Paper,
  Box,
  Container,
} from "@mui/material";
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";

// Define a functional React component for creating a new toy entry.
const NewToy = ({ subId, uwConfig, setPublicId }) => {
  // State management: Initialize state variables to hold new toys form data and messages
  const [toyInfo, setToyInfo] = useState({
    title: "",
    description: "",
    ageGroup: "0-3 years",
    value: "0",
    address: "",
    longitude: "",
    latitude: "",
    condition: "New",
    user_id: null,
  });

  const [message, setMessage] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState(""); // State to hold uploaded images

  // TODO: Event handler for input field for form
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update the corresponding state property with the new value
    setToyInfo({
      ...toyInfo,
      [name]: value,
    });
  };

  // const enhanceDescription = async () => {
  //   axios
  //     .post(`${config.baseUrl}/api/toys/generate-toy-description`, {
  //       prompt: toyInfo.description,
  //     })
  //     .then((response) => {
  //       console.log("Generated Toy Description:", response.data.data);
  //       setToyInfo({
  //         ...toyInfo,
  //         description: response.data.data,
  //       });
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error.response.data.error);
  //     });
  // };

  const handleToyUploadSuccess = async (secure_url) => {
    try {
        // Set the uploaded image URLs in the state
        setUploadedImageUrl(secure_url);
        setToyInfo({
          ...toyInfo,
          url: secure_url,
        });
    }
    catch(error){
      console.error("Error handling toy upload success:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(`${config.baseUrl}/api/users/${subId}`)
      .then((response) => {
        // Check if loggedInUser is defined and has an 'id' property
        if (response.data && response.data.length > 0) {
          axios
            .post(`${config.baseUrl}/api/toys/new`, {
              ...toyInfo,
              user_id: response.data[0].id, // Use response.data instead of loggedInUser
            })
            .then((response) => {
              console.log("Form data submitted successfully:", response.data);
              setMessage("Request submitted successfully!");

              // Clear the form after successful submission
              setToyInfo({
                title: "",
                description: "",
                ageGroup: "0-3 years",
                value: "0",
                address: "",
                longitude: "",
                latitude: "",
                condition: "New",
                user_id: null,
                url : ""
              });
            })
            .catch((error) => {
              console.error("Error submitting form data:", error);
              setMessage("Error submitting the request.");
            });
        } else {
          console.error("User data not found.");
          setMessage("User data not found.");
        }
      })
      .catch((error) => {
        console.error("Error fetching user by subId", error);
        setMessage("Error fetching user data.");
      });
  };

  return (
    <Container maxWidth="md">
      <div>
        <h1>Create a New Toy</h1>
        <Box>
          <Paper elevation={3} style={{ padding: 16 }}>
            <form onSubmit={handleSubmit} className="form-container">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
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
                <Grid item xs={12} sm={12}>
                  <TextField
                    variant="outlined"
                    label="Description"
                    type="text"
                    name="description"
                    placeholder="Please enter brief description of your toy..."
                    value={toyInfo.description}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={7}
                    required
                  />
                </Grid>
                {/* Button to enhance description */}
                <Grid item xs={12} sm={12}>
                  <Button
                    variant="outlined"
                    color="primary"
                    // onClick={enhanceDescription}
                  >
                    Enhance Description
                  </Button>
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
                <Grid item xs={12} sm={12}>
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
                <Grid
                  container
                  spacing={2}
                  elevation={3}
                  style={{ padding: 16 }}
                >
                  <Grid item xs={12} sm={6}>
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
                  <Grid item xs={12} sm={6}>
                    <CloudinaryUploadWidget  
                    uwConfig={uwConfig} 
                    setPublicId={setPublicId} 
                    onImageUpload={handleToyUploadSuccess}
                    />
                  {/* {renderUploadedImages()} */}
                </Grid>
                </Grid>
                <Grid
                  container
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item xs={12} sm={6}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      elevation={3}
                      style={{ padding: 16 }}
                      disabled={subId == null}
                      fullWidth
                    >
                      Add New Toy
                    </Button>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  {message && <p>{message}</p>}
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Box>
      </div>
    </Container>
  );
};

export default NewToy;
