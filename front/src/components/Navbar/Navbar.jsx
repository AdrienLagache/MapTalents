// Import des feuilles de style
import './Navbar.scss';

// Import de React
import { useState } from 'react';

// Import de React-Router
import { NavLink } from 'react-router-dom';

// Import de React-Responsive
import { useMediaQuery } from 'react-responsive';

// Import de React-Feather
import { LogIn, LogOut, Menu, User, Users, X } from 'react-feather';

// Import de PropTypes
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { disconnect } from '../../services/actions/authActions';

function Navbar({ admin }) {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.auth.logged);
  const userLogged = useSelector((state) => state.auth.userId);

  // Ouverture du menu en responsive
  const [isOpen, setIsOpen] = useState(false);

  // Gestion du responsive
  const isMobile = useMediaQuery({ query: '(max-width: 799px)' });

  return (
    <nav className="Navbar">
      <ul className="Navbar-list">
        <div className="Navbar-list-logo">
          <NavLink
            to={!admin ? '/' : '/admin'}
            className="Navbar-list-item"
            onClick={() => setIsOpen(false)}
          >
            <li>MapTalents {admin && '| Admin'}</li>
          </NavLink>
        </div>

        {isMobile && (
          <div className="Navbar-list-button">
            <button type="button" onClick={() => setIsOpen(!isOpen)}>
              {!isOpen ? <Menu size={32} /> : <X size={32} />}
            </button>
          </div>
        )}

        <div
          className={
            !isOpen || !isMobile
              ? 'Navbar-list-links'
              : 'Navbar-list-links open'
          }
        >
          <div>
            <NavLink
              to="/carte"
              className="Navbar-list-item dev"
              onClick={() => setIsOpen(false)}
            >
              <li>Chercher un développeur</li>
            </NavLink>
          </div>
          {!isLogged ? (
            <div>
              <NavLink
                to="/connexion"
                className="Navbar-list-item login"
                onClick={() => setIsOpen(false)}
              >
                <li>
                  Se connecter
                  <span>
                    <LogIn size={16} />
                  </span>
                </li>
              </NavLink>
              <NavLink
                to="/inscription"
                className="Navbar-list-item signup"
                onClick={() => setIsOpen(false)}
              >
                <li>
                  S&apos;inscrire
                  <span>
                    <Users size={16} />
                  </span>
                </li>
              </NavLink>
            </div>
          ) : (
            <div>
              {!admin && (
                <NavLink
                  to="/mon-compte/"
                  className="Navbar-list-item account"
                  onClick={() => setIsOpen(false)}
                >
                  <li>
                    Mon compte
                    <span>
                      <User size={16} />
                    </span>
                  </li>
                </NavLink>
              )}
              <NavLink
                to="/"
                className="Navbar-list-item logout"
                onClick={() => {
                  dispatch(disconnect());
                  setIsOpen(false);
                }}
              >
                <li>
                  Déconnexion
                  <span>
                    <LogOut size={16} />
                  </span>
                </li>
              </NavLink>
            </div>
          )}
        </div>
      </ul>
    </nav>
  );
}

Navbar.propTypes = {
  admin: PropTypes.bool.isRequired,
};

export default Navbar;
