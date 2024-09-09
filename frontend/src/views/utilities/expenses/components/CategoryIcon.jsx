import React from 'react';
import { ShoppingCart, Fastfood, LocalGasStation, OtherHouses } from '@mui/icons-material';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import SchoolIcon from '@mui/icons-material/School';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

const CategoryIcon = ({ category }) => {
  switch (category) {
    case 'Clothing':
      return <CheckroomIcon />;
    case 'Food':
      return <Fastfood />;
    case 'Education':
      return <SchoolIcon />;
    case 'Medical':
      return <MedicalServicesIcon />;
    case 'Transportation':
      return <LocalGasStation />;
    case 'Utilities':
      return <ShoppingCart />;
    case 'Entertainment':
      return <ConfirmationNumberIcon />;
    case 'Others':
      return <OtherHouses />;
    default:
      return <OtherHouses />;
  }
};

export default CategoryIcon;
