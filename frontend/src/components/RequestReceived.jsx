import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
  Button,
  Rating,
  Snackbar,
  Alert,Tooltip
} from "@mui/material";
import Fab from "@mui/material/Fab";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import SwapHorizontalCircleIcon from "@mui/icons-material/SwapHorizontalCircle";
import config from "../config/config";
import { useNavigate } from "react-router-dom";

const RequestReceivedPage = (subId) => {
  const [requestedToy, setRequestedToy] = useState([]);
  // const [value, setValue] = useState(null);
   const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [feedbackRatings, setFeedbackRatings] = useState({});

  useEffect(() => {
    axios
      .get(`${config.baseUrl}/api/matches/requestreceived/${subId.subId}`)
      .then((response) => {
        setRequestedToy(response.data);
      })
      .catch((error) => {
        console.error("Error fetching toys data", error);
      });
  }, [subId.subId]);

  const handleAcceptRequest = async (toy) => {
    axios
      .put(`${config.baseUrl}/api/matches/requestaccept/${toy.match_id}`, {})
      .then((response) => {
        setSuccessMessage("Your request has been accepted successfully!");
        axios
          .get(`${config.baseUrl}/api/matches/requestreceived/${subId.subId}`)
          .then((response) => {
            setRequestedToy(response.data);
          })
          .catch((error) => {
            console.error("Error fetching request data", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching requests", error);
      });
  };

  const handleDeclineRequest = async (toy) => {
    axios
      .put(`${config.baseUrl}/api/matches/requestdecline/${toy.match_id}`, {})
      .then((response) => {
        setSuccessMessage("Your request has been declined successfully!");
        axios
          .get(`${config.baseUrl}/api/matches/requestreceived/${subId.subId}`)
          .then((response) => {
            setRequestedToy(response.data);
          })
          .catch((error) => {
            console.error("Error fetching request data", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching requests", error);
      });
  };

 const handleRatingChange = (feedbackId, newValue) => {
    setFeedbackRatings({
      ...feedbackRatings,
      [feedbackId]: newValue,
    });
  };

  const navigate = useNavigate();
  const handleChatClick = (toy) => {
    // When the chat button is clicked, navigate to the chat route
   navigate(`/chat/${toy.match_id}`);
  };
  return (
    <Container maxWidth="lg">
      <h1
        style={{
          fontSize: "30px",
          paddingBottom: "5%",
          paddingTop: "2%",
          textTransform: "capitalize",
        }}
      >
        Requests Received By Me
      </h1>

      {requestedToy.map((toy) => (
        <Grid
          item
          key={toy.match_id}
          container
          spacing={2}
          style={{
            border: "1px solid #ccc",
            marginBottom: "50px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid item sm={5}>
            <Card>
              <CardContent>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <img
                      src={toy.url}
                      alt={toy.owner_toy_title}
                      style={{
                        width: "200px",
                        height: "200px",
                      }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <Typography variant="h4" color="textSecondary">
                      {toy.owner_toy_title}
                    </Typography>
                    <Typography variant="h7" color="textSecondary">
                      {toy.owner_toy_description}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      Age Group: {toy.owner_toy_agegroup}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      Condition: {toy.owner_toy_condition}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      Location: {toy.owner_toy_location}
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <SwapHorizontalCircleIcon
            fontSize="large"
            style={{
              fontSize: 68,
              color: "#ffc107",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: "5px",
            }}
          />
          <Grid item sm={5}>
            <Card>
              <CardContent>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <img
                      src={toy.url}
                      alt={toy.owner_toy_title}
                      style={{ width: "200px", height: "200px" }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <Typography variant="h4" color="textSecondary">
                      {toy.requester_toy_title}
                    </Typography>
                    <Typography variant="h7" color="textSecondary">
                      {toy.requester_toy_description}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      Age Group: {toy.requester_toy_agegroup}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      Condition: {toy.requester_toy_condition}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      Location: {toy.requester_toy_location}
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                marginTop: "20px",
              }}
            >
              <Button
                variant="contained"
                color="success"
                disabled={toy.match_status !== "Pending"}
                onClick={() => handleAcceptRequest(toy)}
              >
                Accept Request
              </Button>

              <Button
                variant="contained"
                color="error"
                disabled={toy.match_status !== "Pending"}
                onClick={() => handleDeclineRequest(toy)}
              >
                Decline Request
              </Button>

              {/* <Button variant="contained" color="primary">
                Click to Chat
              </Button> */}
              <Tooltip title="Click to chat">
                <Fab color="secondary" aria-label="Chat" onClick={() => handleChatClick(toy)}>
                  <QuestionAnswerIcon />
                </Fab>
              </Tooltip>
            </div>
          </Grid>

          <Snackbar
            open={error !== null || successMessage !== null}
            autoHideDuration={6000}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            onClose={() => {
              setError(null);
              setSuccessMessage(null);
            }}
          >
            {error !== null ? (
              <Alert severity="error" onClose={() => setError(null)}>
                {error}
              </Alert>
            ) : (
              <Alert
                variant="filled"
                severity="info"
                onClose={() => setSuccessMessage(null)}
              >
                {successMessage}
              </Alert>
            )}
          </Snackbar>

          <Grid item xs={12}>
            <Card style={{ border: "none", boxShadow: "none" }}>
              <CardContent>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Rating
                    name={`feedback-rating-${toy.match_id}`}
                    size="large"
                    value={feedbackRatings[toy.match_id] || null}
                    onChange={(event, newValue) => {
                      handleRatingChange(toy.match_id, newValue);
                    }}
                  />
                  <Typography variant="h6">
                    {feedbackRatings[toy.match_id] !== undefined
                      ? `You rated this ${feedbackRatings[toy.match_id]} star${
                          feedbackRatings[toy.match_id] !== 1 ? "s" : ""
                        }.`
                      : "Not rated yet"}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ))}
    </Container>
  );
};

export default RequestReceivedPage;
