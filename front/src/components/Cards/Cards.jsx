// Import des feuilles de style
import './Cards.scss';

// Import de PropTypes
import PropTypes from 'prop-types';

// Import de React-Router
import { Link } from 'react-router-dom';

// Import des Icons de React Feather
import { CheckCircle, XCircle } from 'react-feather';

// Import de Redux
import { useDispatch } from 'react-redux';
import { fromPage } from '../../services/actions/devActions';

function Cards({
  id,
  firstname,
  lastname,
  picture,
  title,
  tjm,
  availability,
  // favorite_techno,
  technos,
}) {
  const dispatch = useDispatch();

  return (
    <Link
      onClick={() => dispatch(fromPage('liste'))}
      to={`/detail/${id}`}
      className="Cards"
    >
      <div className="Cards-container-top">
        <img
          className="Cards-picture"
          src={picture}
          alt={`${firstname} ${lastname}`}
          crossOrigin="anonymous"
        />
        <p className="Cards-name">
          {firstname} {lastname}
        </p>
      </div>
      <div className="Cards-container-bottom">
        <p className="Cards-title">{title}</p>
        {/* <p className="Cards-favorite_techno">{favorite_techno}</p> */}
        <ul className="Cards-tags-list">
          {technos.slice(0, 6).map((techno) => (
            <li className="Cards-tags-item" key={techno.id}>
              {techno.techno}
            </li>
          ))}
        </ul>
        <p className="Cards-availability">
          <span>
            {availability === 'Disponible' ? (
              <CheckCircle size={16} strokeWidth={3} color="#00b530" />
            ) : (
              <XCircle size={16} strokeWidth={3} color="#eb3939" />
            )}
          </span>
          {availability === 'Disponible' ? 'Disponible' : 'Indisponible'}
        </p>
        <p className="Cards-tjm">
          <span>{tjm}€</span> / jour
        </p>
      </div>
    </Link>
  );
}

Cards.propTypes = {
  id: PropTypes.number.isRequired,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tjm: PropTypes.string.isRequired,
  availability: PropTypes.string.isRequired,
  // favorite_techno: PropTypes.string.isRequired,
  technos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      techno: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Cards;
