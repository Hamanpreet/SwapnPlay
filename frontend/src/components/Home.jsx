import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import ToyListPage from './ToyList';
import { useNavigate } from 'react-router-dom';


const images = [
  {
    url: 'https://res.cloudinary.com/dhbnibaze/image/upload/v1699135107/aij4l6qp4sfdeuabddvm.jpg',
    title: 'Train',
    width: '40%',
  },
  {
    url: 'https://res.cloudinary.com/dhbnibaze/image/upload/v1699135051/h3pwoycemffd0n7yp0cg.jpg',
    title: 'Legos',
    width: '30%',
  },
  {
    url: 'https://res.cloudinary.com/dhbnibaze/image/upload/v1698751593/samples/balloons.jpg',
    title: 'Toy Balloon',
    width: '30%',
  },
  {
    url: 'https://res.cloudinary.com/dhbnibaze/image/upload/v1699135026/rlztesanvask45xls7to.jpg',
    title: 'Robot',
    width: '40%',
  },
  {
    url: 'https://res.cloudinary.com/dhbnibaze/image/upload/v1698751598/samples/cup-on-a-table.jpg',
    title: 'Cup',
    width: '30%',
  },
  {
    url: 'https://res.cloudinary.com/dhbnibaze/image/upload/v1698751576/samples/ecommerce/leather-bag-gray.jpg',
    title: 'Bag',
    width: '30%',
  },
  {
    url: 'https://res.cloudinary.com/dhbnibaze/image/upload/v1699134991/zesjz4rzm3oftv1yycgh.jpg',
    title: 'Train Station',
    width: '40%',
  },
  {
    url: 'https://res.cloudinary.com/dhbnibaze/image/upload/v1699134971/ibq97pez5b21tb6vtrfw.jpg',
    title: 'Wooden Blocks',
    width: '30%',
  },
  {
    url: 'https://res.cloudinary.com/dhbnibaze/image/upload/v1699128208/t06vujk8atls3cvq8ybt.jpg',
    title: 'Stacking Rings',
    width: '30%',
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 250,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));



const Home = ({searchResults}) => {
  const navigate = useNavigate();

  // Check if searchResults exist
  if (searchResults) {
    // If searchResults exist, render the ToyList component with searchResults as a prop
    return <ToyListPage searchResults={searchResults} />;
  } else {
    // If searchResults do not exist, render the image grid
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
      {images.map((image) => (
        <ImageButton
          focusRipple
          key={image.title}
          style={{
            width: image.width,
          }}
          onClick={() => navigate('/toys')}
        >
          <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              }}
            >
              {image.title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
      ))}
    </Box>
  );
            }
}


export default Home;
