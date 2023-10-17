// Import des feuilles de style
import './MarkerDev.scss';

// Import de PropTypes
import PropTypes from 'prop-types';

function MarkerDev({ picture, firstname, lastname }) {
  return (
    <div className="MarkerDev">
      <picture>
        <img
          src={picture}
          alt={`avatar ${firstname} ${lastname}`}
          crossOrigin="anonymous"
        />
      </picture>
    </div>
  );
}

MarkerDev.propTypes = {
  picture: PropTypes.string,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
};

MarkerDev.defaultProps = {
  // Image par défaut si non-renseigné par le développeur
  picture:
    'https://www.recia.fr/wp-content/uploads/2018/10/default-avatar-300x300.png',
};
export default MarkerDev;
