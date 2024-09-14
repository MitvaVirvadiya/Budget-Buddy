import React from 'react';
import MoneyIcon from '@mui/icons-material/Money';
import LanguageIcon from '@mui/icons-material/Language';
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';

const CategoryIcon = ({ category }) => {
  switch (category) {
    case 'Salary':
      return <WorkIcon />;
    case 'Business':
      return <BusinessIcon />;
    case 'Investments':
      return <MoneyIcon />;
    case 'Freelance':
      return <LanguageIcon />;
    case 'Rental':
      return <MapsHomeWorkIcon />;
    case 'Others':
      return <OtherHouses />;
    default:
      return <OtherHouses />;
  }
};

export default CategoryIcon;
