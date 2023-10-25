import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Card, CardContent, Typography, Button, Container, Box } from "@mui/material";

const ToyListPage = (props) => {
  const [toyList, setToyList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/toys/")
      .then((response) => {
        console.log("Response Data", response.data);
        setToyList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching toys data", error);
      });
  }, []); // Empty dependency array to run the effect only once

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
                <Button variant="contained" color="primary">
                  Swap
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Container>
  );
};

export default ToyListPage;
