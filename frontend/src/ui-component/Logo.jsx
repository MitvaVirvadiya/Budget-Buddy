// material-ui
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import logo from "assets/images/logo.png"

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  const theme = useTheme();

  return (
    <Box display="flex" alignItems="end" gap={0.5}>
      <img src={logo} alt="logo" width="28" />
      <Typography variant='h4' color="#274e13">Budget Buddy</Typography>
    </Box>
  );
};

export default Logo;
