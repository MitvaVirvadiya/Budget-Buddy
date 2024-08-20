// material-ui
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
  <Stack direction="row" justifyContent="space-between">
    <Typography variant="subtitle2" component={Link} href="https://budgetbuddy.io" target="_blank" underline="hover">
      budgetbuddy.io
    </Typography>
    <Typography variant="subtitle2" component={Link} href="https://mvp.com" target="_blank" underline="hover">
      &copy; mvp.com
    </Typography>
  </Stack>
);

export default AuthFooter;
