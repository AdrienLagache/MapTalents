// Récupération des données utilisateurs pour la popup
export const SET_POPUP = 'SET_POPUP';
export const setPopup = (devSelected) => {
  return {
    type: SET_POPUP,
    devSelected,
  };
};

// Fermer la popup
export const CLOSE_POPUP = 'CLOSE_POPUP';
export const closePopup = () => {
  return {
    type: CLOSE_POPUP,
  };
};

// Coordonnées de la carte onMove
export const SET_VIEW_STATE = 'SET_VIEW_STATE';
export const setViewState = (viewState) => {
  return {
    type: SET_VIEW_STATE,
    viewState,
  };
};

// Coordonnées de la carte onMove
export const SET_BUTTON_FIND = 'SET_BUTTON_FIND';
export const setButtonFind = () => {
  return {
    type: SET_BUTTON_FIND,
  };
};
