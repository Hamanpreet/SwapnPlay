import React from 'react';
import { Avatar, Button, Card, CardContent, Grid, List, ListItem, ListItemText, Typography } from '@mui/material';

const UserProfile = () => {
  // Sample user data (replace with your actual user data)
  const userData = {
    username: 'JohnDoe',
    profilePicture: 'https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg',
    phone: '123-456-7890',
    emails: ['johndoe@gmail.com'],
    toys: [
      { id: 1, name: 'Toy 1' },
      { id: 2, name: 'Toy 2' },
      { id: 3, name: 'Toy 3' },
      { id: 4, name: 'Toy 4' },
      
    ],
  };

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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div style={{ width: '50%' }}>
        <Card>
          <CardContent>
            <Avatar src={userData.profilePicture} alt="User Profile" sx={{ width: 100, height: 100, margin: '0 auto' }} />
            <Typography variant="h5" gutterBottom>
              {userData.username}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Phone: {userData.phone}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Emails:
            </Typography>
            {userData.emails.map((email, index) => (
              <Typography key={index} variant="body2" color="textSecondary">
                {email}
              </Typography>
            ))}
          </CardContent>
          <Button variant="outlined" onClick={handleEditProfile}>
            Edit Profile
          </Button>
        </Card>
      </div>

      <div style={{ width: '90%' }}>
        <Card style={{ marginTop: '20px' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Uploaded Toys
            </Typography>
            <List>
              {userData.toys.map((toy) => (
                <ListItem key={toy.id}>
                  <ListItemText primary={toy.name} />
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleEditToy(toy.id)}
                    style={{ marginRight: '10px' }}
                  >
                    Edit Toy
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleDeleteToy(toy.id)}
                    style={{ marginRight: '10px' }}
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
