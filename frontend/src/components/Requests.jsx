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
  Alert,
  Tooltip,
} from "@mui/material";
import Fab from "@mui/material/Fab";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import DeleteIcon from "@mui/icons-material/Delete";
import SwapHorizontalCircleIcon from "@mui/icons-material/SwapHorizontalCircle";
import config from "../config/config";
import { useNavigate } from "react-router-dom";

const RequestPage = (subId) => {
  const [requestReceived, setRequestReceived] = useState([]);
  const [requestSend, setRequestSend] = useState([]);
  // const [value, setValue] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [feedbackRatings, setFeedbackRatings] = useState({});

  useEffect(() => {
    axios
      .get(`${config.baseUrl}/api/matches/requestreceived/${subId.subId}`)
      .then((response) => {
        setRequestReceived(response.data);
      })
      .catch((error) => {
        console.error("Error fetching toys data", error);
      });
    axios
      .get(`${config.baseUrl}/api/matches/requestsend/${subId.subId}`)
      .then((response) => {
        setRequestSend(response.data);
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
            setRequestReceived(response.data);
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
            setRequestReceived(response.data);
          })
          .catch((error) => {
            console.error("Error fetching request data", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching requests", error);
      });
  };

  const handleCancelRequest = async (toy) => {
    axios
      .put(`${config.baseUrl}/api/matches/requestcancel/${toy.match_id}`, {})
      .then((response) => {
        setSuccessMessage("Your request has been cancelled successfully!");
        axios
          .get(`${config.baseUrl}/api/matches/requestsend/${subId.subId}`)
          .then((response) => {
            setRequestSend(response.data);
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
    <Container maxWidth="xl">
      {/* Requests received by me       */}
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

      {requestReceived.map((toy) => (
        <Grid
          item
          key={toy.match_id}
          container
          spacing={4}
          style={{
            border: "1px solid #ccc",
            marginBottom: "50px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Logged in user toy information */}
          <Grid item sm={5}>
            <Card style={{ backgroundColor: "#f0f0f0" }}>
              <CardContent>
                <Typography
                  variant="h5"
                  color="textSecondary"
                  style={{ marginBottom: "15px" }}
                >
                  {toy.owner_toy_title}
                </Typography>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <img
                      src={toy.owner_toy_url}
                      alt={toy.owner_toy_title}
                      style={{
                        width: "200px",
                        height: "200px",
                      }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
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
                <Typography variant="h7" color="textSecondary">
                  {toy.owner_toy_description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Swap icon */}
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
          {/* Other user's toy information */}
          <Grid item sm={5}>
            <Card style={{ backgroundColor: "#f0f0f0" }}>
              <CardContent>
                <Typography
                  variant="h5"
                  color="textSecondary"
                  style={{ marginBottom: "15px" }}
                >
                  {toy.requester_toy_title}
                </Typography>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <img
                      src={toy.requester_toy_url}
                      alt={toy.requester_toy_title}
                      style={{ width: "200px", height: "200px" }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
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
                <Typography variant="h7" color="textSecondary">
                  {toy.requester_toy_description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Button row */}
          <Grid item xs={12}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                marginTop: "20px",
              }}
            >
              <Typography variant="h7" color="textSecondary">
                <strong>Status: {toy.match_status}</strong>
              </Typography>

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

              <Tooltip title="Click to chat">
                <Fab
                  color="secondary"
                  aria-label="Chat"
                  onClick={() => handleChatClick(toy)}
                >
                  <QuestionAnswerIcon />
                </Fab>
              </Tooltip>
            </div>
          </Grid>

          {/* Rating */}
          <Grid item xs={12} style={{ paddingLeft: "1px" }}>
            <Card
              style={{
                border: "none",
                boxShadow: "none",
                backgroundColor: "#f0f0f0",
              }}
            >
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

          {/* Alert messages */}
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
        </Grid>
      ))}

      {/* Requests sent by me*/}
      <h1
        style={{
          fontSize: "30px",
          paddingBottom: "5%",
          paddingTop: "2%",
          textTransform: "capitalize",
        }}
      >
        Requests Sent By Me
      </h1>

      {requestSend.map((toy) => (
        <Grid
          item
          key={toy.match_id}
          container
          spacing={4}
          style={{
            border: "1px solid #ccc",
            marginBottom: "50px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Logged in user toy information for requested toys */}
          <Grid item sm={5}>
            <Card style={{ backgroundColor: "#f0f0f0" }}>
              <CardContent>
                <Typography
                  variant="h5"
                  color="textSecondary"
                  style={{ marginBottom: "15px" }}
                >
                  {toy.requester_toy_title}
                </Typography>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <img
                      src={toy.requester_toy_url}
                      alt={toy.requester_toy_title}
                      style={{
                        width: "200px",
                        height: "200px",
                      }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <Typography variant="h6" color="textSecondary">
                      Age Group: {toy.requester_toy_agegroup}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      Condition: {toy.requester_toy_condition}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      Location: {toy.requestertoy_location}
                    </Typography>
                  </div>
                </div>
                <Typography variant="h7" color="textSecondary">
                  {toy.requester_toy_description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Swap icon */}
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

          {/* Other user's toy information */}
          <Grid item sm={5}>
            <Card style={{ backgroundColor: "#f0f0f0" }}>
              <CardContent>
                <Typography
                  variant="h5"
                  color="textSecondary"
                  style={{ marginBottom: "15px" }}
                >
                  {toy.owner_toy_title}
                </Typography>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <img
                      src={toy.owner_toy_url}
                      alt={toy.owner_toy_title}
                      style={{ width: "200px", height: "200px" }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
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
                <Typography variant="h7" color="textSecondary">
                  {toy.owner_toy_description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Button row */}
          <Grid item xs={12}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                marginTop: "20px",
              }}
            >
              <Typography variant="h7" color="textSecondary">
                <strong>Status: {toy.match_status}</strong>
              </Typography>

              <Button
                variant="contained"
                color="warning"
                disabled={toy.match_status !== "Pending"}
                onClick={() => handleCancelRequest(toy)}
                startIcon={<DeleteIcon />}
              >
                Cancel Request
              </Button>
              <Tooltip title="Click to chat">
                <Fab color="secondary" aria-label="Chat" onClick={() => handleChatClick(toy)}>
                  <QuestionAnswerIcon />
                </Fab>
              </Tooltip>
            </div>
          </Grid>

          {/* Rating */}
          <Grid item xs={12} style={{ paddingLeft: "1px" }}>
            <Card
              style={{
                border: "none",
                boxShadow: "none",
                backgroundColor: "#f0f0f0",
              }}
            >
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

          {/* Alert messages */}
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
        </Grid>
      ))}
    </Container>
  );
};

export default RequestPage;
