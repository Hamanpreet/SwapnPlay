import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const ToyDetails = ({ open, onClose, toy }) => {
  if (!toy) {
    return null;
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Toy Details</DialogTitle>
      <DialogContent>
        <Typography variant="h6">Title: {toy.title}</Typography>
        <Typography variant="body1">Description: {toy.description}</Typography>
        <Typography variant="body1">Age Group: {toy.age_group}</Typography>
        <Typography variant="body1">Value: {toy.value}</Typography>
        <Typography variant="body1">Address: {toy.address}</Typography>
        <Typography variant="body1">Condition: {toy.condition}</Typography>
        <Typography variant="body1">Created At: {new Date(toy.created_at).toLocaleString()}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ToyDetails;
