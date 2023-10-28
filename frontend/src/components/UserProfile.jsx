import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar, Button, Card, CardContent, Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import axios from 'axios';
import '../styles/UserProfile.scss';

const UserProfile = ({ subId }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const subId = 'ONT001';
    // Make an API call to fetch user details based on subId
    axios.get(`http://localhost:8081/api/users/${subId}`)
      .then((response) => {
        if (response.data[0]) {
          axios.get(`http://localhost:8081/api/toys/${subId}`)
            .then((resp) => {
              setUserData({ user: response.data[0], toy: resp.data });
            });
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [subId]);

  const handleEditProfile = () => {
    // Implement the edit profile functionality
  };

  const handleEditToy = (toyId) => {
    // Implement the edit toy functionality for the given toyId
  };

  const handleDeleteToy = (toyId) => {
    // Implement the delete toy functionality for the given toyId
  };

  const handleViewToyDetails = (toyId) => {
    // Implement the view toy details functionality for the given toyId
  };

  const handleLogout = () => {
    // Implement the logout functionality
  };

  return (
    <div className="user-profile-container">
      {userData ? (
        <div style={{ width: '50%' }}>
          <Card sx={{ border: '2px solid #ccc' }}>
            <CardContent>
              <Avatar src="https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg" alt="User Profile" sx={{ width: 100, height: 100, margin: '0 auto' }} />
              <Typography variant="h5" gutterBottom>
                {userData.user.first_name} {userData.user.last_name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Phone: {userData.user.phone_number}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Email: {userData.user.email}
              </Typography>
            </CardContent>
            <Button variant="outlined" onClick={handleEditProfile} sx={{ marginBottom: '10px' }}>
              Edit Profile
            </Button>
          </Card>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      <div style={{ width: '90%' }}>
        <Card sx={{ marginTop: '20px', border: '2px solid #ccc' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Uploaded Toys
            </Typography>
            {/* Table Heading */}
            <List className="toy-table">
              <ListItem>
                <ListItemText primary="Title" />
                <ListItemText primary="Description" />
                <ListItemText primary="Age Group" />
                <ListItemText primary="Value" />
                <ListItemText primary="Address" />
                <ListItemText primary="Condition" />
                <ListItemText primary="Created At" />
                <ListItemText primary="Edit"/>
                <ListItemText primary="Delete"/>
                <ListItemText primary="View Details"/>
              </ListItem>
              {/* Table Rows */}
              {userData?.toy.map((toy) => (
                <ListItem key={toy.id}>
                  <ListItemText primary={toy.title} />
                  <ListItemText primary={toy.description} />
                  <ListItemText primary={toy.age_group} />
                  <ListItemText primary={toy.value} />
                  <ListItemText primary={toy.address} />
                  <ListItemText primary={toy.condition} />
                  <ListItemText primary={new Date(toy.created_at).toLocaleString()} /> {/* Format created_at */}
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleEditToy(toy.id)}
                    sx={{ marginRight: '10px' }}
                  >
                    Edit Toy
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleDeleteToy(toy.id)}
                    sx={{ marginRight: '10px' }}
                    startIcon={<DeleteIcon />}
                  >
                    Delete Toy
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleViewToyDetails(toy.id)}
                  >
                    View Toy Details
                  </Button>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
