import {
  ADD_TECHNO,
  AVAILABILITY_CHECKED,
  CATEGORY_CHECKED,
  CHANGE_SELECT_REMOTE,
  EXPERIENCE_CHECKED,
  LANGUAGE_CHECKED,
  LOADING_FILTER,
  MOVE_SLIDER_TJM,
  UPDATE_LANGUAGES,
  UPDATE_TECHNOS,
  DELETE_TECHNO,
  SEE_MORE_LESS_LANGUAGES,
  UPDATE_ADRESS_LIST,
  SELECT_ADDRESS,
  SET_INPUT_ADDRESS,
  SEE_MORE_LESS_CATEGORIES,
  RESET_FILTER,
  UPDATE_CATEGORIES,
} from '../actions/filterActions';
import { SET_VIEW_STATE } from '../actions/mapActions';
import { DISCONNECT } from '../actions/authActions';

export const initialState = {
  dataFilter: {
    loading: true,
    technosList: [],
    languagesList: [],
    categoriesList: [],
    seeLanguages: false,
    seeCategories: false,
    adressList: [],
    addressInput: '',
  },
  toSubmit: {
    latitude: 44.859,
    longitude: 0.483,
    technos: [],
    tjm: [200, 900],
    experience: [],
    category: [],
    remote: 'Télétravail / Sur site',
    languages: [],
    availability: '',
  },
};

const filterReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    // Reset tous les critères de recherche
    case RESET_FILTER:
      return {
        ...state,
        dataFilter: {
          ...state.dataFilter,
          seeLanguages: false,
          seeCategories: false,
          adressList: [],
          addressInput: '',
        },
        toSubmit: {
          ...state.toSubmit,
          latitude: 44.859,
          longitude: 0.483,
          technos: [],
          tjm: [200, 900],
          experience: [],
          category: [],
          remote: 'Télétravail / Sur site',
          languages: [],
          availability: '',
        },
      };

    // Chargement des filtres dynamiques (TechnosList & ...)
    case LOADING_FILTER:
      return {
        ...state,
        dataFilter: {
          ...state.dataFilter,
          loading: !state.dataFilter.loading,
        },
      };
    // Mise à jour de la liste des Technos
    case UPDATE_TECHNOS:
      return {
        ...state,
        dataFilter: {
          ...state.dataFilter,
          technosList: action.technosList,
        },
      };
    // Mise à jour de la liste des Langues
    case UPDATE_LANGUAGES:
      return {
        ...state,
        dataFilter: {
          ...state.dataFilter,
          languagesList: action.languagesList,
        },
      };
    // Mise à jour de la liste des Catégories
    case UPDATE_CATEGORIES:
      return {
        ...state,
        dataFilter: {
          ...state.dataFilter,
          categoriesList: action.categoriesList,
        },
      };

    // Ajout d'une Techno dans la liste
    case ADD_TECHNO:
      if (!state.toSubmit.technos.includes(parseInt(action.techno, 10))) {
        return {
          ...state,
          toSubmit: {
            ...state.toSubmit,
            technos: [...state.toSubmit.technos, parseInt(action.techno, 10)],
          },
        };
      }
      return { ...state };
    // Suppression d'une Techno dans la liste
    case DELETE_TECHNO:
      return {
        ...state,
        toSubmit: {
          ...state.toSubmit,
          technos: state.toSubmit.technos.filter(
            (item) => item !== action.techno
          ),
        },
      };

    // Champ contrôlé du Slider
    case MOVE_SLIDER_TJM:
      return {
        ...state,
        toSubmit: {
          ...state.toSubmit,
          tjm: action.newRangeTJM,
        },
      };
    // Champs contrôlés des Checkboxs Expérience
    case EXPERIENCE_CHECKED:
      /// Ajout si true
      if (action.checkStatus) {
        return {
          ...state,
          toSubmit: {
            ...state.toSubmit,
            experience: [...state.toSubmit.experience, action.range],
          },
        };
      }
      /// Suppression si false
      return {
        ...state,
        toSubmit: {
          ...state.toSubmit,
          experience: state.toSubmit.experience.filter(
            (item) => item !== action.range
          ),
        },
      };
    // Champs contrôlés des Checkboxs Category
    case CATEGORY_CHECKED:
      /// Ajout si true
      if (action.checkStatus) {
        return {
          ...state,
          toSubmit: {
            ...state.toSubmit,
            category: [...state.toSubmit.category, action.category],
          },
        };
      }
      /// Suppression si false
      return {
        ...state,
        toSubmit: {
          ...state.toSubmit,
          category: state.toSubmit.category.filter(
            (item) => item !== action.category
          ),
        },
      };
    // Champ contrôlé du Select Remote
    case CHANGE_SELECT_REMOTE:
      return {
        ...state,
        toSubmit: {
          ...state.toSubmit,
          remote: action.remote,
        },
      };
    // Champs contrôlés des Checkboxs Language
    case LANGUAGE_CHECKED:
      /// Ajout si true
      if (action.checkStatus) {
        return {
          ...state,
          toSubmit: {
            ...state.toSubmit,
            languages: [
              ...state.toSubmit.languages,
              parseInt(action.language, 10),
            ],
          },
        };
      }
      /// Suppression si false
      return {
        ...state,
        toSubmit: {
          ...state.toSubmit,
          languages: state.toSubmit.languages.filter(
            (item) => item !== parseInt(action.language, 10)
          ),
        },
      };
    // Champs contrôlés de la Checkbox Availability
    case AVAILABILITY_CHECKED:
      /// Ajout si true
      if (action.checkStatus) {
        return {
          ...state,
          toSubmit: {
            ...state.toSubmit,
            availability: 'Disponible',
          },
        };
      }
      /// Suppression si false
      return {
        ...state,
        toSubmit: {
          ...state.toSubmit,
          availability: '',
        },
      };

    // Afficher plus ou moins de langues dans les filtres
    case SEE_MORE_LESS_LANGUAGES:
      return {
        ...state,
        dataFilter: {
          ...state.dataFilter,
          seeLanguages: !state.dataFilter.seeLanguages,
        },
      };
    // Afficher plus ou moins de catégories dans les filtres
    case SEE_MORE_LESS_CATEGORIES:
      return {
        ...state,
        dataFilter: {
          ...state.dataFilter,
          seeCategories: !state.dataFilter.seeCategories,
        },
      };

    // Autocomplete des adresses dans le state
    case UPDATE_ADRESS_LIST:
      return {
        ...state,
        dataFilter: {
          ...state.dataFilter,
          adressList: action.adressList,
        },
      };
    // Récupère l'objet de l'adresse sélectionnée pour envoie à l'api et réinitialise l'autocomplétion
    case SELECT_ADDRESS:
      return {
        ...state,
        toSubmit: {
          ...state.toSubmit,
          longitude: state.dataFilter.adressList.find(
            (item) => item.properties.id === action.adressId
          ).geometry.coordinates[0],
          latitude: state.dataFilter.adressList.find(
            (item) => item.properties.id === action.adressId
          ).geometry.coordinates[1],
        },
        dataFilter: {
          ...state.dataFilter,
          adressList: [],
          addressInput: action.adressLabel,
        },
      };
    // Champ contrôlé de l'Input Address
    case SET_INPUT_ADDRESS:
      return {
        ...state,
        dataFilter: {
          ...state.dataFilter,
          addressInput: action.addressInput,
        },
      };
    // Met à jour les coordonnées de la map
    case SET_VIEW_STATE:
      return {
        ...state,
        toSubmit: {
          ...state.toSubmit,
          latitude: action.viewState.latitude,
          longitude: action.viewState.longitude,
        },
      };

    case DISCONNECT:
      return initialState;

    default:
      return state;
  }
};

export default filterReducer;
