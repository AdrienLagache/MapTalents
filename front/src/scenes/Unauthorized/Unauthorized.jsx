// Import des feuilles de style
import './Unauthorized.scss';

// Import de React-Router
import { Link } from 'react-router-dom';

function Unauthorized() {
  return (
    <div className="unauthorized">
      <p>401</p>
      <p>tu n&apos;es pas autorisé à accéder à cette page.</p>

      <Link to="/">Retour à la page d&apos;accueil</Link>
      <p>ou</p>
      <Link to="/connexion">
        Connecte toi si tu veux accéder à cette page *wink*
      </Link>
    </div>
  );
}

export default Unauthorized;
