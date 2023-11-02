import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar, Button, Card, CardContent, TextField, List, ListItem, ListItemText, Typography } from '@mui/material';
import axios from 'axios';
import '../styles/UserProfile.scss';
import config from '../config/config'
import EditToy from './EditToy'; // Import the EditToy component
import ToyDetails from './ToyDetails';
import CloudinaryUploadWidget from './CloudinaryUploadWidget';

const UserProfile = ({ subId, uwConfig, setPublicId, searchResults }) => {
  const [userData, setUserData] = useState(null);
  const [editToyId, setEditToyId] = useState(null);
  const [editedUserData, setEditedUserData] = useState(null); // Add state for edited user data
  const [viewToyId, setViewToyId] = useState(null); // Add state to store the ID of the toy to be viewed
  const [openToyDetails, setOpenToyDetails] = useState(false); // State to control the visibility of the toy details dialog
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user details based on subId
        const userResponse = await axios.get(`${config.baseUrl}/api/users/${subId}`);
        if (userResponse.data[0]) {
          const ownerId = userResponse.data[0].id;
          // Fetch user's toys
          const toysResponse = await axios.get(`${config.baseUrl}/api/toys?ownerId=${ownerId}`);
          setUserData({ user: userResponse.data[0], toys: toysResponse.data });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [subId, searchResults]);

  const handleEditProfile = () => {
    // Toggle the edit mode by setting editedUserData to userData
    setEditedUserData(userData.user);
  };


  // Add event handlers to update the editedUserData state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData({
      ...editedUserData,
      [name]: value,
    });
  };

  const handleSaveProfile = async () => {
    try {
      // Send a PUT request to update the user's information on the server
      await axios.put(`${config.baseUrl}/api/users/${subId}`, editedUserData);
      // Update the userData state with the edited user data
      setUserData((prevUserData) => ({
        ...prevUserData,
        user: editedUserData,
      }));
      // Close the edit mode
      setEditedUserData(null);
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  

  const handleEditToy = (toyId) => {
    setEditToyId(toyId);
  };

  const handleSaveEditedToy = async (editedToy) => {
    try {
      // Send a PUT request to update the toy details on the server
      await axios.put(`${config.baseUrl}/api/toys/${editedToy.id}`, editedToy);
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
      await axios.delete(`${config.baseUrl}/api/toys/${toyId}`);
  
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
  
  const handleUploadSuccess =async (secure_url) => {
    try {
      // Set the uploaded image URL in the state
      setUploadedImageUrl(secure_url);
      // Update the profile image URL in the editedUserData state (if needed)
      setEditedUserData((prevUserData) => ({
        ...prevUserData,
        profileimage: secure_url,
      }));
    }
    catch{

    }
  };

  const handleViewToyDetails = (toyId) => {
    // Set the ID of the toy to be viewed and open the dialog
    setViewToyId(toyId);
    setOpenToyDetails(true);
  };
  
  return (
    <div className="user-profile-container">
      {userData ? (
        <div style={{ width: '50%' }}>
          <Card sx={{ border: '2px solid #ccc' }}>
            <CardContent>
              {/* <Avatar src= {userData.user.profileimage} alt="User Profile" sx={{ width: 100, height: 100, margin: '0 auto' }} /> */}
              <Avatar src={uploadedImageUrl || userData.user.profileimage} alt="User Profile" sx={{ width: 100, height: 100, margin: '0 auto' }} />
              <Typography variant="h5" gutterBottom>
                {userData.user.first_name} {userData.user.last_name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Phone: {userData.user.phone_number}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Email: {userData.user.email}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                City: {userData.user.city}
              </Typography>
              {editedUserData && (
                <>
                  {/* Display an edit form when in edit mode */}
                  <TextField
                    label="First Name"
                    name="first_name"
                    value={editedUserData.first_name}
                    onChange={handleInputChange}
                    fullWidth
                    sx={{ marginTop: '10px' }}
                  />
                  <TextField
                    label="Last Name"
                    name="last_name"
                    value={editedUserData.last_name}
                    onChange={handleInputChange}
                    fullWidth
                    sx={{ marginTop: '10px' }}
                  />
                  <TextField
                    label="Phone Number"
                    name="phone_number"
                    value={editedUserData.phone_number}
                    onChange={handleInputChange}
                    fullWidth
                    sx={{ marginTop: '10px' }}
                  />
                  <TextField
                    label="Email"
                    name="email"
                    value={editedUserData.email}
                    onChange={handleInputChange}
                    fullWidth
                    sx={{ marginTop: '10px' }}
                  />
                  <TextField
                    label="City"
                    name="city"
                    value={editedUserData.city}
                    onChange={handleInputChange}
                    fullWidth
                    sx={{ marginTop: '10px' }}
                  />
                  <CloudinaryUploadWidget  
                  uwConfig={uwConfig} 
                  setPublicId={setPublicId} 
                  onUploadSuccess={handleUploadSuccess}
                  />
                  <Button variant="outlined" onClick={handleSaveProfile} sx={{ marginTop: '10px' }}>
                    Save Profile
                  </Button>
                </>
              )}
            </CardContent>
            {!editedUserData && (
              <Button variant="outlined" onClick={handleEditProfile} sx={{ marginBottom: '10px' }}>
                Edit Profile
              </Button>
            )}
          </Card>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}

      {/* Render the ToyDetails component when viewToyId is not null */}
      <ToyDetails
        open={openToyDetails}
        onClose={() => setOpenToyDetails(false)}
        toy={userData?.toys.find((toy) => toy.id === viewToyId)}
      />

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
