// EditToy.js
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import {
  TextField,
  Select,
  Button,
  Grid,
  FormControl,
  InputLabel,
} from '@mui/material';

const EditToy = ({ open, onClose, onSave, initialToy }) => {
  const [editedToy, setEditedToy] = useState(initialToy);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedToy({
      ...editedToy,
      [name]: value,
    });
  };

  const handleSave = () => {
    onSave(editedToy);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Toy</DialogTitle>
      <DialogContent>
        <DialogContentText>Edit the details of the toy:</DialogContentText>

        <TextField
          label="Title"
          name="title"
          value={editedToy.title}
          onChange={handleInputChange}
          style={{ margin: '10px' }}
        />
        <TextField
          label="Description"
          name="description"
          value={editedToy.description}
          onChange={handleInputChange}
          style={{ margin: '10px' }}
        />
        {/* Age Group */}
        <Grid item xs={12} sm={6} style={{ margin: '10px' }}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Age Group</InputLabel>
            <Select
              native // Use native rendering for better appearance
              name="age_group"
              value={editedToy.age_group}
              onChange={handleInputChange}
              label="Age Group"
            >
              <option value="0-3 years">0-3 years</option>
              <option value="3-6 years">3-6 years</option>
              <option value="5-8 years">5-8 years</option>
              <option value="7-10 years">7-10 years</option>
            </Select>
          </FormControl>
        </Grid>
        {/* Add margin to other fields */}
        <TextField
          label="Value"
          name="value"
          value={editedToy.value}
          onChange={handleInputChange}
          style={{ margin: '10px' }}
        />
        <TextField
          label="Address"
          name="address"
          value={editedToy.address}
          onChange={handleInputChange}
          style={{ margin: '10px' }}
        />
        <Grid item xs={12} sm={6} style={{ margin: '10px' }}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Condition</InputLabel>
            <Select
              native // Use native rendering for better appearance
              name="condition"
              value={editedToy.condition}
              onChange={handleInputChange}
              label="Condition"
              required
            >
              <option value="New">New</option>
              <option value="Used">Used</option>
              <option value="Like New">Like New</option>
            </Select>
          </FormControl>
        </Grid>
        {/* Add similar fields for other toy details */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditToy;
