import {
  CHANGE_FILTERS,
  RESET_FILTER,
  SELECT_ADDRESS,
} from '../actions/filterActions';
import {
  CLOSE_POPUP,
  SET_BUTTON_FIND,
  SET_POPUP,
  SET_VIEW_STATE,
} from '../actions/mapActions';

export const initialState = {
  popupInfo: null,
  viewState: {
    // Bergerac par défaut
    latitude: 44.859,
    longitude: 0.483,
    zoom: 12.75,
  },
  moveMap: false,
};

const mapReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    // Met à jour la popup avec un profil
    case SET_POPUP:
      return {
        ...state,
        popupInfo: action.devSelected,
      };
    // Ferme la popup
    case CLOSE_POPUP:
      return {
        ...state,
        popupInfo: null,
      };
    // Met à jour les coordonnées de la map
    case SET_VIEW_STATE:
      return {
        ...state,
        viewState: action.viewState,
      };
    // Affiche un bouton après un déplacement
    case SET_BUTTON_FIND:
      return {
        ...state,
        moveMap: true,
      };
    // Réinitialise le bouton après une nouvelle recherche de filtre
    case CHANGE_FILTERS:
      return {
        ...state,
        moveMap: false,
      };
    // Réinitialise les coordonnées de la map
    case RESET_FILTER:
      return {
        ...state,
        viewState: {
          latitude: 44.859,
          longitude: 0.483,
          zoom: 13.5,
        },
      };
    // Sauvegarde la longitude et la latitude lorsque l'utilisatuer renseigne une adresse
    case SELECT_ADDRESS:
      return {
        ...state,
        viewState: {
          longitude: action.adressLongitude,
          latitude: action.adressLatitude,
          zoom: 12.75,
        },
      };

    default:
      return state;
  }
};

export default mapReducer;
