import { Route, Routes } from 'react-router-dom';
import Home from './containers/Home/Home.tsx';
import Typography from '@mui/material/Typography';
import NavBar from './components/NavBar/NavBar.tsx';
import { Container } from '@mui/joy';
import Admin from './containers/Admin/Admin.tsx';

const App = () => {

  return (
    <>
      <header>
        <NavBar/>
      </header>
      <Container maxWidth="xl">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/pages" element={<Home/>}/>
          <Route path="/pages/:pageName" element={<Home/>}/>
          <Route path="/pages/admin" element={<Admin/>}/>
          <Route
            path="*"
            element={<Typography variant="h3">Not found</Typography>}
          />
        </Routes>
      </Container>
    </>
  );
};

export default App;
