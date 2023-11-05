import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Container,
  Modal,
  Box,
  Radio,
} from "@mui/material";
import config from "../config/config";

const ToyListPage = (props) => {
  const { subId, searchResults} = props;
  const [toyList, setToyList] = useState([searchResults]);
  const [toyListLoggedInUser, setToyListLoggedInUser] = useState([]);
  const [selectedToy, setSelectedToy] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedYourToy, setSelectedYourToy] = useState([]);

  //console.log("searchResults",searchResults);
  useEffect(() => {
    axios
      .get(`${config.baseUrl}/api/toys/others/${subId}`)
      .then((response) => {
        setToyList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching toys data", error);
      });
  }, [searchResults, subId]);

  const handleOpenModal = async (toy) => {
    setSelectedToy(toy);
    axios
      .get(`${config.baseUrl}/api/toys/${subId}`)
      .then((response) => {
        setToyListLoggedInUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching logged in user data", error);
      });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = () => {
    if (selectedYourToy === null) {
      alert("Please select a toy to swap.");
    } else {
      axios
        .post(`${config.baseUrl}/api/matches/new`, {
          status: "Pending",
          toy_id: selectedToy.id,
          toy_in_exchange_id: selectedYourToy.id,
          owner_id: selectedToy.user_id,
          requester_id: selectedYourToy.user_id,
        })
        .then((response) => {
          setSelectedYourToy(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user's toys", error);
        });
    }

    handleCloseModal();
  };
  
  return (
    <Container maxWidth="lg">
      <div>
        <h1>Display List of All Toys</h1>
        
        <Grid container spacing={3}>
          {searchResults.length > 0
            ? searchResults.map((toy) => (
                <Grid item key={toy.id} xs={12} sm={6} md={4} lg={4}>
                  <Card style={{ backgroundColor: '#f0f0f0' }}>
                <Grid container>
                  <Grid item xs={4}> {/* Adjust the width of the image column as needed */}
                    <img
                      src={toy.url} // Replace with the actual URL of the toy image
                      alt="Toy"
                      style={{ width: '100%', height: 'auto' }}
                    />
                  </Grid>
                  <Grid item xs={8}> {/* Adjust the width of the details column as needed */}
                     <CardContent>
                      <Typography variant="h6" component="div">
                        {toy.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {toy.age_group}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {toy.value}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {toy.condition}
                      </Typography>
                    </CardContent>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleOpenModal(toy)}
                    >
                      Request to Match
                    </Button>
                    </Grid>
                </Grid>
              </Card>
            </Grid>
              ))
            : toyList.length > 0 && toyList.map((toy) => (
              <Grid item key={toy.id} xs={12} sm={6} md={4} lg={4}>
              <Card style={{ backgroundColor: '#f0f0f0' }}>
                <Grid container>
                <Grid item xs={4}> {/* Adjust the width of the image column as needed */}
                    <img
                      src={toy.url} // Replace with the actual URL of the toy image
                      alt="Toy"
                      style={{ width: '100%', height: 'auto' }}
                    />
                  </Grid>
                  <Grid item xs={8}> {/* Adjust the width of the details column as needed */}
                    <CardContent>
                      <Typography variant="h6" component="div">
                        {toy.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {toy.age_group}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {toy.value}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {toy.condition}
                      </Typography>
                    </CardContent>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleOpenModal(toy)}
                      style={{ margin: 'auto', marginBottom: '16px' }}
                    >
                      Request to Match
                    </Button>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            
              ))}
        </Grid>
      </div>

      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            border: 1,
            borderColor: "grey.500",
            borderRadius: "16px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 900,
            height: 800,
            bgcolor: "background.paper",
            boxShadow: 14,
            p: 4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Toy Details Section */}
          <Box>
            <Typography
              variant="h5"
              component="div"
              sx={{
                padding: "16px",
                textTransform: "uppercase",
                textAlign: "center",
                textDecoration: "underline",
              }}
            >
              Toy Requested to be swaped
            </Typography>

            {/* <Grid item key={selectedToy.id} xs={12} sm={6} md={4} lg={4}> */}
              <Card style={{ backgroundColor: '#f0f0f0' }}>
                <Grid container>
                  <Grid item xs={4}>
                      <img
                        src= {selectedToy && selectedToy.url}
                        alt="Toy"
                        style={{ width: '100%', height: 'auto' }}
                      />
                  </Grid>
                  <Grid item xs={8}>
                    <CardContent>
                    <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "16px",
                    }}
                  >
                  <Typography variant="h6" component="div">
                    {selectedToy && selectedToy.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {selectedToy && selectedToy.age_group}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {selectedToy && selectedToy.value}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {selectedToy && selectedToy.condition}
                  </Typography>
                </div>
                  </CardContent>
                  </Grid>
                </Grid>
              </Card>
            {/* </Grid> */}
            
          </Box>

          {/* Divider */}
          <Box
            sx={{
              borderTop: 1,
              borderColor: "grey.500",
              margin: "16px 0",
            }}
          ></Box>

          {/* Display users own toy */}
          <Box sx={{ maxHeight: 600, overflowY: "auto", padding: "30px" }}>
            <Typography
              variant="h5"
              component="div"
              sx={{
                padding: "16px",
                textTransform: "uppercase",
                textAlign: "center",
                textDecoration: "underline",
              }}
            >
              Select your toy to swap
            </Typography>
            <Grid container spacing={3}>
              {toyListLoggedInUser.map((toy) => (
                <Grid item key={toy.id} xs={12} sm={4} md={4} lg={4}>
                    <Card style={{ backgroundColor: '#f0f0f0' }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Radio
                          value={toy}
                          checked={selectedYourToy === toy}
                          onChange={(e) => {
                            setSelectedYourToy(toy);
                          }}
                        />
                      </div>
                      <CardContent
                        sx={{
                          display: "flex",
                          flexDirection: "column", // row
                          alignItems: "center",
                        }}
                      >
                        <Grid container>
                          <Grid item xs={5}>
                              <img
                                src= {toy && toy.url}
                                alt="Toy"
                                style={{ width: '100%', height: 'auto' }}
                              />
                          </Grid>
                          <Grid item xs={7} padding={2}>
                            <Typography variant="h6" component="div">
                              {toy.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {toy.age_group}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {toy.value}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {toy.condition}
                            </Typography>
                          </Grid>
                        </Grid>

                        
                      </CardContent>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginBottom: "20px",
                        }}
                      ></div>
                    </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Buttons Section */}
          <Box
            display="flex"
            justifyContent="space-around" // center
            marginTop="50px"
          >
            {/* Close button */}
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCloseModal}
            >
              Close
            </Button>

            {/* Submit button */}
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSubmit()}
            >
              Swap Your Toy
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default ToyListPage;
