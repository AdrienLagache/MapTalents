// Désactivé pour rendre possible l'envoie d'un bool dans Navbar en mode Admin
/* eslint-disable react/jsx-boolean-value */

// Import des feuilles de style
import './App.scss';

// Import de React-Router-Dom
import { Routes, Route, Navigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

// Import des scènes React
import Home from '../scenes/Home/Home';
import MapDev from '../scenes/MapDev/MapDev';
import List from '../scenes/List/List';
import NotFound from '../scenes/NotFound/NotFound';
import Detail from '../scenes/Detail/Detail';
import About from '../scenes/About/About';
import Login from '../scenes/Login/Login';
import Signup from '../scenes/Signup/Signup';
import Account from '../scenes/Account/Account';
import Navbar from '../components/Navbar/Navbar';
import Filter from '../components/Filter/Filter';
import TogglePages from '../components/TogglePages/TogglePages';
import BackOffice from '../scenes/BackOffice/BackOffice';
import Unauthorized from '../scenes/Unauthorized/Unauthorized';

function App() {
  const role = useSelector((state) => state.auth.role);
  const isAdmin = role === 'admin'; // pour la Navbar et pour la page admin
  const isLogged = useSelector((state) => state.auth.logged); // pour les autres pages nécessitant d'être connecté

  return (
    <div className="App">
      <Navbar admin={isAdmin} />
      <div className="App-container-bottom">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/carte"
            element={
              <>
                <Filter />
                <div className="App-container-right">
                  <TogglePages />
                  <MapDev />
                </div>
              </>
            }
          />
          <Route path="/About" element={<About />} />
          <Route
            path="/liste"
            element={
              <>
                <Filter />
                <div className="App-container-right">
                  <TogglePages />
                  <List />
                </div>
              </>
            }
          />
          <Route
            path="/detail/:devId"
            element={isLogged ? <Detail /> : <Navigate to="/connexion" />}
          />
          <Route path="/connexion" element={<Login />} />
          <Route path="/inscription" element={<Signup />} />
          <Route
            path="/admin"
            element={isAdmin ? <BackOffice /> : <Navigate to="/unauthorized" />}
          />
          <Route
            path="/mon-compte/"
            element={isLogged ? <Account /> : <Navigate to="/unauthorized" />}
          />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
