import NavBar from './components/NavBar/NavBar.tsx';
import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Home from './containers/Home/Home.tsx';

const App = () => {

  return (
    <>
      <header>
        <NavBar />
      </header>
      <Container maxWidth="xl">
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </Container>
    </>
  );
};

export default App;
