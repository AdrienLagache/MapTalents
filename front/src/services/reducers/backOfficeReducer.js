import {
  CANCEL_ACTION,
  CLOSE_MESSAGE,
  NAVIGATION_BACKOFFICE,
  OPEN_POPUP_DELETE,
  REMOVE_ITEM,
  RESET_ITEM,
  RESET_USER_DATA,
  SAVE_STATE_ITEM,
  SEE_LIST_BACKOFFICE,
  SET_ACTION_BACKOFFICE,
  SET_NEW_VALUE,
  SET_UPDATE_ITEM_STATE,
  STORE_USER_TO_UPDATE,
  UPDATE_USERS_BACKOFFICE,
  UPDATE_USERS_LIST,
} from '../actions/backOfficeActions';

export const initialState = {
  // Pagination
  limitList: [0, 10],

  // Liste d'éléments
  loading: true,
  usersList: [],

  // Eléments ciblés
  menuSelected: 'users',
  actionSelected: '',
  itemId: '',
  itemLabel: '',

  // Inputs
  devId: '',
  userId: '',
  mail: '',
  role: '',
  lastname: '',
  firstname: '',
  address: '',
  city: '',
  country: 'France',
  // Bergerac par défaut
  latitude: 44.853806,
  longitude: 0.483392,
  zip_code: '',
  title: '',
  category: '',
  description: '',
  experience: '',
  remote: '',
  activity_area: '',
  tjm: '',
  technos: [],
  favorite_techno: '',
  languages: [],
  tools: [],
  skills: [],

  // Messages
  successMessage: '',
  popupDelete: false,
  userIdPopupDelete: '',
  userRolePopupDelete: '',
};

const backOfficeReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    // Mise à jour des infos à update dans le state (Langue / Techno / Catégorie)
    case SET_UPDATE_ITEM_STATE:
      return {
        ...state,
        itemId: action.itemId,
        itemLabel: action.itemLabel,
      };
    // Réinitialisation des valeurs après un ajout ou un update (Langue / Techno / Catégorie)
    case RESET_ITEM:
      return {
        ...state,
        actionSelected: '',
        itemId: '',
        itemLabel: '',
      };
    // Sauvegarde l'item sélectionné dans le state
    case SAVE_STATE_ITEM:
      return {
        ...state,
        itemId: action.itemId,
        itemLabel: action.itemLabel,
      };
    // Défini l'action à effectuer (CREATE / UPDATE)
    case SET_ACTION_BACKOFFICE:
      return {
        ...state,
        actionSelected: action.actionSelected,
      };
    // Navigation dans le BackOffice
    case NAVIGATION_BACKOFFICE:
      return {
        ...state,
        menuSelected: action.menuSelected,
        limitList: [0, 10],
        actionSelected: '',
        itemId: '',
        itemLabel: '',
        devId: '',
        userId: '',
        mail: '',
        role: '',
        lastname: '',
        firstname: '',
        address: '',
        city: '',
        country: 'France',
        // Bergerac par défaut
        latitude: 44.853806,
        longitude: 0.483392,
        zip_code: '',
        title: '',
        category: '',
        description: '',
        experience: '',
        remote: '',
        activity_area: '',
        tjm: '',
        technos: [],
        favorite_techno: '',
        languages: [],
        tools: [],
        skills: [],
      };
    // Reset du state après avoir update un utilisateur
    case RESET_USER_DATA:
      return {
        ...state,
        devId: '',
        userId: '',
        mail: '',
        role: '',
        lastname: '',
        firstname: '',
        address: '',
        city: '',
        country: 'France',
        // Bergerac par défaut
        latitude: 44.853806,
        longitude: 0.483392,
        zip_code: '',
        title: '',
        category: '',
        description: '',
        experience: '',
        remote: '',
        activity_area: '',
        tjm: '',
        technos: [],
        favorite_techno: '',
        languages: [],
        tools: [],
        skills: [],
      };
    // Gestion du défilement des pages
    case SEE_LIST_BACKOFFICE:
      if (action.direction) {
        return {
          ...state,
          limitList: [state.limitList[0] + 10, state.limitList[1] + 10],
        };
      }
      return {
        ...state,
        limitList: [state.limitList[0] - 10, state.limitList[1] - 10],
      };
    // Mise à jour des utilisateurs après le fetch
    case UPDATE_USERS_LIST:
      return {
        ...state,
        usersList: action.usersList,
        loading: false,
      };
    // Mise à jour des utilisateurs après une action du BackOffice
    case UPDATE_USERS_BACKOFFICE:
      return {
        ...state,
        usersList: state.usersList.filter((user) => user.id !== action.userId),
        successMessage: action.successMessage,
        popupDelete: false,
        userIdPopupDelete: '',
      };
    // Fermer la popup de Message
    case CLOSE_MESSAGE:
      return {
        ...state,
        successMessage: '',
      };
    // Ouvre la popup de confirmation de Suppression
    case OPEN_POPUP_DELETE:
      return {
        ...state,
        popupDelete: true,
        userIdPopupDelete: action.userId,
        userRolePopupDelete: action.userRole,
      };
    // Ferme la popup de confirmation de Suppression
    case CANCEL_ACTION:
      return {
        ...state,
        popupDelete: false,
        userIdPopupDelete: '',
      };
    // Stock l'utilisateur à modifier dans le state
    case STORE_USER_TO_UPDATE:
      return {
        ...state,
        devId: action.isDev ? action.userData.id : '',
        userId: action.isDev ? action.userData.user.id : action.userData.id,
        mail: action.isDev ? action.userData.user.mail : action.userData.mail,
        role: action.isDev
          ? action.userData.user.role_name
          : action.userData.role_name,
        lastname: action.isDev
          ? action.userData.user.lastname
          : action.userData.lastname,
        firstname: action.isDev
          ? action.userData.user.firstname
          : action.userData.firstname,
        address: action.isDev ? action.userData.address : '',
        title: action.isDev ? action.userData.title : '',
        category: action.isDev ? action.userData.category : '',
        description: action.isDev ? action.userData.description : '',
        experience: action.isDev ? action.userData.experience : '',
        remote: action.isDev ? action.userData.remote : '',
        activity_area: action.isDev ? action.userData.activity_area : '',
        tjm: action.isDev ? action.userData.adr : '',
        technos: action.isDev ? action.userData.techno : [],
        favorite_techno: action.isDev ? action.userData.favorite_techno : '',
        languages: action.isDev ? action.userData.language : [],
        tools: action.isDev ? action.userData.tool : [],
        skills: action.isDev ? action.userData.softSkill : [],
      };
    // Modifie une valeur dans le userToUpdate
    case SET_NEW_VALUE:
      // Récupération de l'input concerné
      switch (action.input) {
        // Modification de l'email
        case 'mail':
          return {
            ...state,
            mail: action.newValue,
          };
        // Modification du rôle
        case 'role':
          return {
            ...state,
            role: action.newValue,
          };
        // Modification du nom de famille
        case 'lastname':
          return {
            ...state,
            lastname: action.newValue,
          };
        // Modification du nom de famille
        case 'firstname':
          return {
            ...state,
            firstname: action.newValue,
          };
        // Modification de l'adresse
        case 'address':
          return {
            ...state,
            address: action.newValue,
          };
        // Modification de l'adresse complète
        case 'address-full':
          return {
            ...state,
            address: action.newValue.properties.label,
            city: action.newValue.properties.city,
            latitude: action.newValue.geometry.coordinates[1],
            longitude: action.newValue.geometry.coordinates[0],
            zip_code: action.newValue.properties.postcode,
          };
        // Modification du titre de profil
        case 'title':
          return {
            ...state,
            title: action.newValue,
          };
        // Modification de la catégorie de profil
        case 'category':
          return {
            ...state,
            category: {
              ...state.category,
              id: action.newValue,
            },
          };
        // Modification de la description
        case 'description':
          return {
            ...state,
            description: action.newValue,
          };
        // Modification de l'expérience
        case 'experience':
          return {
            ...state,
            experience: action.newValue,
          };
        // Modification du télétravail
        case 'remote':
          return {
            ...state,
            remote: action.newValue,
          };
        // Modification de la zone de déplacement
        case 'area':
          return {
            ...state,
            activity_area: action.newValue,
          };
        // Modification du taux journalier
        case 'tjm':
          return {
            ...state,
            tjm: action.newValue,
          };
        // Ajout d'une techno
        case 'techno':
          return {
            ...state,
            technos: [...state.technos, { id: action.newValue }],
          };
        // Ajout d'une techno préférée
        case 'f_techno':
          return {
            ...state,
            favorite_techno: action.newValue,
          };
        // Ajout d'une langue
        case 'language':
          return {
            ...state,
            languages: [...state.languages, { id: action.newValue }],
          };
        // Ajout d'un outil
        case 'tool':
          return {
            ...state,
            tools: [...state.tools, { id: action.newValue }],
          };
        // Ajout d'une compétence
        case 'skill':
          return {
            ...state,
            skills: [...state.skills, { id: action.newValue }],
          };
        case 'itemLabel':
          return {
            ...state,
            itemLabel: action.newValue,
          };

        default:
          return state;
      }
    // Supprime l'élément d'un tableau dans le userToUpdate
    case REMOVE_ITEM:
      switch (action.list) {
        // Suppression dans techno
        case 'techno':
          return {
            ...state,
            technos: state.technos.filter((item) => item.id !== action.itemId),
          };
        // Suppression dans language
        case 'language':
          return {
            ...state,
            languages: state.languages.filter(
              (item) => item.id !== action.itemId
            ),
          };
        // Suppression dans tool
        case 'tool':
          return {
            ...state,
            tools: state.tools.filter((item) => item.id !== action.itemId),
          };
        // Suppression dans skill
        case 'skill':
          return {
            ...state,
            skills: state.skills.filter((item) => item.id !== action.itemId),
          };

        default:
          return state;
      }

    default:
      return state;
  }
};

export default backOfficeReducer;
