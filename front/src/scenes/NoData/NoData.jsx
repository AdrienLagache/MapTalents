// Import des feuilles de style
import './NoData.scss';

// Import d'image
import imageNoData from '../../assets/lostInTheDesert.png';

function NoData() {
  return (
    <div className="NoData">
      <div className="NoData-container">
        <p>
          Nos filtres font une pause bien méritée dans le désert numérique, mais
          ne vous inquiétez pas, ils reviendront bientôt avec de nouveaux
          profils !
        </p>
        <img className="NoData-image" src={imageNoData} alt="lostInTheDesert" />
      </div>
    </div>
  );
}

export default NoData;
