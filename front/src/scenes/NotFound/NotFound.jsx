// Import des feuilles de style
import './NotFound.scss';

// Import de React-Router
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="NotFound">
      <p>404</p>
      <p>Nous n&apos;avons pas trouvé de profils qui te correspondent...</p>

      <Link to="/carte">Rencontre les devs proches de chez toi ! *wink*</Link>
    </div>
  );
}

export default NotFound;
