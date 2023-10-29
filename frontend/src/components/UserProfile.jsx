import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar, Button, Card, CardContent, Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import axios from 'axios';
import '../styles/UserProfile.scss';
import EditToy from './EditToy'; // Import the EditToy component

const UserProfile = ({ subId }) => {
  const [userData, setUserData] = useState(null);
  const [editToyId, setEditToyId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user details based on subId
        const userResponse = await axios.get(`http://localhost:8080/api/users/${subId}`);
        if (userResponse.data[0]) {
          const ownerId = userResponse.data[0].id;
          // Fetch user's toys
          const toysResponse = await axios.get(`http://localhost:8080/api/toys?ownerId=${ownerId}`);
          setUserData({ user: userResponse.data[0], toys: toysResponse.data });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [subId]);

  const handleEditProfile = () => {
    // Implement the edit profile functionality
  };

  const handleEditToy = (toyId) => {
    setEditToyId(toyId);
  };

  const handleSaveEditedToy = async (editedToy) => {
    try {
      // Send a PUT request to update the toy details on the server
      await axios.put(`http://localhost:8080/api/toys/${editedToy.id}`, editedToy);
      // Update the user data with the edited toy
      const updatedToyList = userData.toys.map((toy) =>
        toy.id === editedToy.id ? editedToy : toy
      );
      setUserData((prevUserData) => ({
        ...prevUserData,
        toys: updatedToyList,
      }));
      // Close the edit dialog
      setEditToyId(null);
    } catch (error) {
      console.error("Error updating toy:", error);
    }
  };

  const deleteToy = async (toyId) => {
    try {
      // Send a DELETE request to delete the toy by its ID
      await axios.delete(`http://localhost:8080/api/toys/${toyId}`);
  
      // Update the user data to remove the deleted toy
      setUserData((prevUserData) => ({
        ...prevUserData,
        toys: prevUserData.toys.filter((toy) => toy.id !== toyId),
      }));
    } catch (error) {
      console.error("Error deleting toy:", error);
    }
  };  

  const handleDeleteToy = (toyId) => {
    // Confirm the deletion with the user if needed
    const confirmed = window.confirm("Are you sure you want to delete this toy?");
    if (confirmed) {
      deleteToy(toyId);
    }
  };
  

  const handleViewToyDetails = (toyId) => {
    // Implement the view toy details functionality for the given toyId
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
                <ListItemText primary="Edit" />
                <ListItemText primary="Delete" />
                <ListItemText primary="View Details" />
              </ListItem>
              {/* Table Rows */}
              {userData?.toys.map((toy) => (
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
            {/* Render the EditToy component when editToyId is not null */}
            {editToyId !== null && (
              <EditToy
                open={true}
                onClose={() => setEditToyId(null)}
                onSave={handleSaveEditedToy}
                initialToy={userData.toys.find((toy) => toy.id === editToyId)}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
