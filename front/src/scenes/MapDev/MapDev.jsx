// Import des feuilles de style
import './MapDev.scss';

// Import de React
import { useEffect, useMemo } from 'react';

// Import de React-Responsive
import { useMediaQuery } from 'react-responsive';

// Import de React-Map-Gl
import Map, { Marker, Popup } from 'react-map-gl';

// Import des Icons de React Feather
import { Search } from 'react-feather';

// Import de Redux
import { useDispatch, useSelector } from 'react-redux';
import { changeFilters } from '../../services/actions/filterActions';

// Import des composants React
import Loader from '../Loader/Loader';
import MarkerDev from '../../components/MarkerDev/MarkerDev';
import PopupDev from '../../components/PopupDev/PopupDev';
import {
  closePopup,
  setButtonFind,
  setPopup,
  setViewState,
} from '../../services/actions/mapActions';

function MapDev() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.dev.loading);
  const devsList = useSelector((state) => state.dev.devsList);

  const popupInfo = useSelector((state) => state.map.popupInfo);
  const viewState = useSelector((state) => state.map.viewState);
  const moveMap = useSelector((state) => state.map.moveMap);

  useEffect(() => {
    if (devsList.length === 0) {
      dispatch(changeFilters());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Gestion du responsive
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  const markers = useMemo(
    () =>
      devsList
        // Filtre par ordre décroissant de latitude pour que les markers ne se chevauchent pas
        .sort((a, b) => b.latitude - a.latitude)
        // Place le composant Marker de Mapbox sur la carte
        // Appel le composant MarkerDev (style css du Marker)
        .map((item) => (
          <Marker
            key={item.id}
            latitude={item.latitude}
            longitude={item.longitude}
            anchor="bottom"
            onClick={(event) => {
              // Empêche la popup de se fermer quand on clique dessus initialement
              event.originalEvent.stopPropagation();
              dispatch(setPopup(item));
            }}
          >
            <MarkerDev
              picture={item.user.image}
              firstname={item.user.firstname}
              lastname={item.user.lastname}
            />
          </Marker>
        )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [devsList]
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={!isMobile ? 'MapDev' : 'MapDev mobile'}>
      {moveMap ? (
        <button
          className="MapDev-button-find"
          type="button"
          onClick={() => dispatch(changeFilters())}
        >
          <span>
            <Search size={16} />
          </span>
          Rechercher dans cette zone
        </button>
      ) : null}

      <Map
        mapboxAccessToken={`${import.meta.env.VITE_MAPBOX_KEY}`}
        {...viewState}
        // Modifie le state pour le déplacement de la Map
        onMove={(evt) => dispatch(setViewState(evt.viewState))}
        // Affiche le bouton pour lancer une recherche dans la zone
        onMouseUp={() => dispatch(setButtonFind())}
        mapStyle={import.meta.env.VITE_MAPBOX_STYLE}
      >
        {/* // Marqueurs sur la carte */}
        {markers}

        {/* // Popup au dessus des marqueurs au click */}
        {popupInfo && (
          <Popup
            anchor="bottom"
            longitude={Number(popupInfo.longitude)}
            latitude={Number(popupInfo.latitude)}
            onClose={() => dispatch(closePopup())}
            maxWidth="none"
          >
            <PopupDev
              id={popupInfo.id}
              picture={popupInfo.user.image}
              firstname={popupInfo.user.firstname}
              lastname={popupInfo.user.lastname}
              tjm={popupInfo.adr}
              availability={popupInfo.availability}
              favorite_techno={popupInfo.favorite_techno}
              title={popupInfo.title}
              onClose={() => dispatch(closePopup())}
            />
          </Popup>
        )}
      </Map>
    </div>
  );
}

export default MapDev;
