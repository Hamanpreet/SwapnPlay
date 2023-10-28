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

const ToyListPage = () => {
  const [toyList, setToyList] = useState([]);
  const [selectedToy, setSelectedToy] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedYourToy, setSelectedYourToy] = useState([]);
  const [loggedInUser, setloggedInUser] = useState([]);

  // Function to fetch user's toys
  // const fetchUserToys = (userid) => {
  //   axios
  //     .get(`http://localhost:8080/api/toys/${userid}`)
  //     .then((response) => {
  //       setUserToys(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching user's toys", error);
  //     });
  // };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/toys/")
      .then((response) => {
        setToyList(response.data);
        setloggedInUser(3);
      })
      .catch((error) => {
        console.error("Error fetching toys data", error);
      });
  }, []);
  
  const handleOpenModal = async (toy) => {
    setSelectedToy(toy);
    // await fetchUserToys(toy.userid); // Wait for the user's toys to be fetched
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  
  return (
    <Container maxWidth="lg">
      <div>
        <h1>Display List of All Toys</h1>
        <Grid container spacing={3}>
          {toyList.map((toy) => (
            <Grid item key={toy.id} xs={12} sm={6} md={4} lg={4}>
              <Card>
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
                  color="primary"
                  onClick={() => handleOpenModal(toy)}
                >
                  Request to Match
                </Button>
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
              {toyList.map((toy) => (
                <Grid item key={toy.id} xs={12} sm={4} md={4} lg={4}>
                  <Card>
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

        </Box>
      </Modal>
    </Container>
  );
};

export default ToyListPage;
