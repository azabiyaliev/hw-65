import { PAGES } from '../../constants.ts';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';

const PAGES_LIST = PAGES;

const NavBar = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1, mb: 5, boxShadow: 10 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              color="inherit"
              to="/"
              variant="h5"
              component={NavLink}
              sx={{flexGrow: 1, textDecoration: 'none', fontSize: '18px'}}
            >Static pages</Typography>
            <Button color="inherit" to="/" component={NavLink}>
              Home
            </Button>
            {PAGES_LIST.map((page) => (
              <div key={page.id}>
                <Button color="inherit" to={`/pages/${page.id}`} component={NavLink}>{page.title}</Button>
              </div>
            ))}
            <Button color="inherit" to="/pages/admin" component={NavLink}>Admin</Button>
          </Toolbar>
        </AppBar>
      </Box>

    </>
  );
};

export default NavBar;