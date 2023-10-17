// Import des feuilles de style
import './TogglePages.scss';

// Import de React-Router
import { NavLink } from 'react-router-dom';

// Import des Icons de React Feather
import { Map, Users } from 'react-feather';

function TogglePages() {
  return (
    <div className="TogglePages">
      <NavLink
        to="/carte"
        className={({ isActive }) =>
          isActive
            ? 'TogglePages-switch-button active'
            : 'TogglePages-switch-button'
        }
      >
        <Map size={16} className="icons" />
        Carte
      </NavLink>
      <NavLink
        to="/liste"
        className={({ isActive }) =>
          isActive
            ? 'TogglePages-switch-button active'
            : 'TogglePages-switch-button'
        }
      >
        <Users size={16} className="icons" />
        Liste
      </NavLink>
    </div>
  );
}

export default TogglePages;
