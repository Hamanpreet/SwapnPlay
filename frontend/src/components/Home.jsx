import React from "react";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FormControl from '@mui/material/FormControl'; // Import FormControl
import InputLabel from '@mui/material/InputLabel'; // Import InputLabel
import NativeSelect from '@mui/material/NativeSelect'; // Import NativeSelect

const Home = () => {
  const dropdownWidth = '33.33%'; // Set the desired width for the dropdown

  const dropdownStyle = {
    width: dropdownWidth,
  };
  return (
    <div>
      <p>Home Page</p>
      <div>
        <Button variant="outlined" startIcon={<DeleteIcon />}>
          Delete
        </Button>
        <Button variant="contained" endIcon={<SendIcon />}>
          Send
        </Button>
        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
          Upload file
          <input type="file" style={{ display: 'none' }} />
        </Button>
        <FormControl style={dropdownStyle}>
          <InputLabel htmlFor="uncontrolled-native">Age</InputLabel>
          <NativeSelect
            defaultValue={30}
            inputProps={{
              name: 'age',
              id: 'uncontrolled-native',
            }}
          >
            <option value={10}>Ten</option>
            <option value={20}>Twenty</option>
            <option value={30}>Thirty</option>
          </NativeSelect>
        </FormControl>
      </div>
    </div>
  );
};

export default Home;