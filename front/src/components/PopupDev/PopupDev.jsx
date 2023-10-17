// Import des feuilles de style
import './PopupDev.scss';

// Import de React-Router
import { Link } from 'react-router-dom';

// Import des Icons de React Feather
import { X, CheckCircle, XCircle } from 'react-feather';

// Import de PropTypes
import PropTypes from 'prop-types';

// Import de Redux
import { useDispatch, useSelector } from 'react-redux';
import { fromPage } from '../../services/actions/devActions';

function PopupDev({
  id,
  picture,
  firstname,
  lastname,
  tjm,
  availability,
  favorite_techno,
  title,
  onClose,
}) {
  const dispatch = useDispatch();
  // Récupération du state Filter
  const technosList = useSelector(
    (state) => state.filter.dataFilter.technosList
  );
  const logoFavoriteTechno = technosList.find(
    (item) => item.techno === favorite_techno
  ).logo;

  return (
    <div className="PopupDev">
      <Link
        onClick={() => dispatch(fromPage('carte'))}
        to={`/detail/${id}`}
        className="PopupDev-container"
      >
        <div className="PopupDev-container-header">
          <span className="favorite-techno">
            <img
              src={logoFavoriteTechno}
              alt={`logo ${favorite_techno}`}
              crossOrigin="anonymous"
            />
          </span>
        </div>
        <picture>
          <img
            src={picture}
            alt={`avatar ${firstname} ${lastname}`}
            crossOrigin="anonymous"
          />
          <p className="name">{`${firstname} ${lastname}`}</p>
        </picture>
        <div className="PopupDev-container-info">
          <p className="title">{title}</p>
          <p className="availability">
            <span>
              {availability === 'Disponible' ? (
                <CheckCircle size={16} strokeWidth={3} color="#00b530" />
              ) : (
                <XCircle size={16} strokeWidth={3} color="#eb3939" />
              )}
            </span>
            {availability}
          </p>
          <p className="tjm">
            <span>{tjm}€</span> / jour
          </p>
        </div>
      </Link>
      <button type="button" onClick={onClose}>
        <X size={32} />
      </button>
    </div>
  );
}

PopupDev.propTypes = {
  id: PropTypes.number.isRequired,
  picture: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  tjm: PropTypes.string.isRequired,
  availability: PropTypes.string.isRequired,
  favorite_techno: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PopupDev;
