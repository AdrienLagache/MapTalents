// Récupération des paramètres de filtres
export const FETCH_DATA_FILTER = 'FETCH_DATA_FILTER';
export const fetchDataFilter = () => {
  return {
    type: FETCH_DATA_FILTER,
  };
};

// Loading pour indiquer la fin du chargement des filtres
export const LOADING_FILTER = 'LOADING_FILTER';
export const loadingFilter = () => {
  return {
    type: LOADING_FILTER,
  };
};

// Update de la liste des Technos
export const UPDATE_TECHNOS = 'UPDATE_TECHNOS';
export const updateTechnos = (technosList) => {
  return {
    type: UPDATE_TECHNOS,
    technosList,
  };
};

// Update de la liste des Langues
export const UPDATE_LANGUAGES = 'UPDATE_LANGUAGES';
export const updateLanguages = (languagesList) => {
  return {
    type: UPDATE_LANGUAGES,
    languagesList,
  };
};

// Update de la liste des Catégories
export const UPDATE_CATEGORIES = 'UPDATE_CATEGORIES';
export const updateCategories = (categoriesList) => {
  return {
    type: UPDATE_CATEGORIES,
    categoriesList,
  };
};

// Ajout de la techno sélectionné dans le Select
export const ADD_TECHNO = 'ADD_TECHNO';
export const addTechno = (techno) => {
  return {
    type: ADD_TECHNO,
    techno,
  };
};

// Suppression de la techno dans le state
export const DELETE_TECHNO = 'DELETE_TECHNO';
export const deleteTechno = (techno) => {
  return {
    type: DELETE_TECHNO,
    techno,
  };
};

// Update du TJM Min et Max avec le slider
export const MOVE_SLIDER_TJM = 'MOVE_SLIDER_TJM';
export const moveSliderTJM = (newRangeTJM) => {
  return {
    type: MOVE_SLIDER_TJM,
    newRangeTJM,
  };
};

// onChange des Checkboxs Expérience
export const EXPERIENCE_CHECKED = 'EXPERIENCE_CHECKED';
export const experienceChecked = (checkStatus, range) => {
  return {
    type: EXPERIENCE_CHECKED,
    checkStatus,
    range,
  };
};

// onChange des Checkboxs Category
export const CATEGORY_CHECKED = 'CATEGORY_CHECKED';
export const categoryChecked = (checkStatus, category) => {
  return {
    type: CATEGORY_CHECKED,
    checkStatus,
    category,
  };
};

// onChange du Select Remote
export const CHANGE_SELECT_REMOTE = 'CHANGE_SELECT_REMOTE';
export const changeSelectRemote = (remote) => {
  return {
    type: CHANGE_SELECT_REMOTE,
    remote,
  };
};

// onChange des Checkboxs Language
export const LANGUAGE_CHECKED = 'LANGUAGE_CHECKED';
export const languageChecked = (checkStatus, language) => {
  return {
    type: LANGUAGE_CHECKED,
    checkStatus,
    language,
  };
};

// onChange de la Checkbox Availability
export const AVAILABILITY_CHECKED = 'AVAILABILITY_CHECKED';
export const availabilityChecked = (checkStatus) => {
  return {
    type: AVAILABILITY_CHECKED,
    checkStatus,
  };
};

// Changement dans les filtres vers l'API
export const CHANGE_FILTERS = 'CHANGE_FILTERS';
export const changeFilters = () => {
  return {
    type: CHANGE_FILTERS,
  };
};

// Déplier/Replier la liste des languages
export const SEE_MORE_LESS_LANGUAGES = 'SEE_MORE_LESS_LANGUAGES';
export const seeMoreLessLanguages = () => {
  return {
    type: SEE_MORE_LESS_LANGUAGES,
  };
};

// Déplier/Replier la liste des catégories
export const SEE_MORE_LESS_CATEGORIES = 'SEE_MORE_LESS_CATEGORIES';
export const seeMoreLessCategories = () => {
  return {
    type: SEE_MORE_LESS_CATEGORIES,
  };
};

// API Adresse (https://adresse.data.gouv.fr/api-doc/adresse)
export const API_ADRESS = 'API_ADRESS';
export const apiAddress = (adress) => {
  return {
    type: API_ADRESS,
    adress,
  };
};

// Update les Adresses dans le state
export const UPDATE_ADRESS_LIST = 'UPDATE_ADRESS_LIST';
export const updateAdressList = (adressList) => {
  return {
    type: UPDATE_ADRESS_LIST,
    adressList,
  };
};

// Sélectionne une adresse pour filtrer les devs
export const SELECT_ADDRESS = 'SELECT_ADDRESS';
export const selectAddress = (
  adressId,
  adressLabel,
  adressLatitude,
  adressLongitude
) => {
  return {
    type: SELECT_ADDRESS,
    adressId,
    adressLabel,
    adressLatitude,
    adressLongitude,
  };
};

// Met à jour l'input Adresse
export const SET_INPUT_ADDRESS = 'SET_INPUT_ADDRESS';
export const setInputAddress = (addressInput) => {
  return {
    type: SET_INPUT_ADDRESS,
    addressInput,
  };
};

// Reset tous les critères de recherche
export const RESET_FILTER = 'RESET_FILTER';
export const resetFilter = () => {
  return {
    type: RESET_FILTER,
  };
};
