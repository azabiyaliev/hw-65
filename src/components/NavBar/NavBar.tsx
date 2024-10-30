import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
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
          <Button color="inherit" to="/" component={NavLink}>About</Button>
          <Button color="inherit" to="/" component={NavLink}>Contacts</Button>
          <Button color="inherit" to="/" component={NavLink}>Divisions</Button>
          <Button color="inherit" to="/" component={NavLink}>Admin</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
