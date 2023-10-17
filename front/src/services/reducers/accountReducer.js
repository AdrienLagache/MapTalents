// Importez les actions nécessaires
import {
  SET_NEW_MAIL,
  // SET_NEW_PASSWORD,
  SET_NEW_NAME,
  SET_NEW_FIRSTNAME,
  SET_NEW_ADDRESS,
  SET_NEW_TJM,
  SET_NEW_TITLE,
  SET_NEW_DESCRIPTION,
  SET_SELECTED_CATEGORY,
  SET_SELECTED_PHOTO,
  TOGGLE_EDIT_PROFIL,
  SET_DEV_INFOS,
  CHANGE_INPUT_TOOL,
  CHANGE_INPUT_EXPERIENCE,
  CHANGE_INPUT_SKILL,
  REMOVE_DEV_LANGUAGE,
  SET_ISSET_DEV,
  REMOVE_DEV_TOOL,
  REMOVE_DEV_SKILL,
  SET_DEV_LANGUAGE,
  SET_DEV_TOOL,
  SET_DEV_SKILL,
  CHANGE_DEV_EXPERIENCE,
  CHANGE_DEV_DESCRIPTION,
  CHANGE_DEV_ADDRESS,
  SET_USER_INFOS,
  TOGGLE_EDIT_SKILLS,
} from '../actions/accountActions';

// État initial du module "account"
export const initialState = {
  // -------------- Profil ------------------
  inputPassword: '',
  inputFirstname: '',
  inputTjm: '',
  inputTitle: '',
  inputName: '',
  inputDescription: '',
  xpDate: '',
  inputMail: '',
  inputAddress: null,
  checkPassword: '',
  isPhoto: false,
  selectedPhoto: '',
  // ---------------------------------------

  // -------------- Skills ------------------
  isEditingProfil: false,
  isEditingSkills: false,
  isSetDev: false,
  isSetUser: false,
  devId: null,
  roleName: '',
  devLanguages: [],
  devTools: [],
  devSkills: [],
  devExperience: '',
  devCategory: null,
  categoryLabel: '',
  devTjm: '',
  devPhoto: '',
  devName: '',
  devFirstname: '',
  devMail: '',
  devTitle: '',
  devAddress: '',
  devCity: '',
  devZipCode: '',
  devCoordinates: [],
  devDescription: '',
  inputToolName: '',
  inputSkillName: '',
  inputExperience: '',
  // ---------------------------------------
};

// Réducteur pour le module "account"
const accountReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    // ----------------- Datas ---------------------
    case TOGGLE_EDIT_PROFIL:
      return {
        ...state,
        isEditingProfil: !state.isEditingProfil,
      };

    case TOGGLE_EDIT_SKILLS:
      return {
        ...state,
        isEditingSkills: !state.isEditingSkills,
      };

    case SET_USER_INFOS:
      return {
        ...state,
        roleName: action.role,
        devPhoto: action.img,
        devName: action.name,
        devFirstname: action.firstname,
        devMail: action.mail,
      };

    case SET_DEV_INFOS:
      return {
        ...state,
        devId: action.id,
        devLanguages: action.lang,
        devTools: action.tool,
        devSkills: action.skill,
        devExperience: action.xp,
        devCategory: action.cat,
        categoryLabel: action.catLabel,
        devTjm: action.tjm,
        devTitle: action.title,
        devAddress: action.address,
        devCity: action.city,
        devZipCode: action.zip,
        devCoordinates: [action.long, action.lat],
        devDescription: action.desc,
      };

    case SET_ISSET_DEV:
      return {
        ...state,
        isSetDev: true,
      };
    // -----------------------------------------------
    // ----------------- Profil ----------------------
    case SET_NEW_NAME:
      return {
        ...state,
        devName: action.name,
      };

    case SET_NEW_FIRSTNAME:
      return {
        ...state,
        devFirstname: action.firstname,
      };

    case SET_NEW_MAIL:
      return {
        ...state,
        devMail: action.newMail,
      };

    case SET_NEW_TJM:
      return {
        ...state,
        devTjm: action.newTjm,
      };

    // case SET_NEW_PASSWORD:
    //   return {
    //     ...state,
    //     inputPassword: action.inputPassword,
    //   };

    case SET_NEW_TITLE:
      return {
        ...state,
        devtTitle: action.newTitle,
      };

    case SET_NEW_DESCRIPTION:
      return {
        ...state,
        devDescription: action.newDescription,
      };

    case SET_SELECTED_PHOTO:
      return {
        ...state,
        selectedPhoto: action.newPhoto,
        isPhoto: true,
      };

    case SET_SELECTED_CATEGORY:
      return {
        ...state,
        devCategory: action.cat,
      };

    case SET_NEW_ADDRESS:
      return {
        ...state,
        inputAddress: action.newAddress,
      };
    // -----------------------------------------------
    // ----------------- Skills ---------------------
    case CHANGE_INPUT_TOOL:
      return {
        ...state,
        inputToolName: action.tool,
      };

    case CHANGE_INPUT_SKILL:
      return {
        ...state,
        inputSkillName: action.skill,
      };

    case CHANGE_DEV_ADDRESS:
      return {
        ...state,
        devAddress: action.address.label,
        devCity: action.address.city,
        devZipCode: action.address.postCode,
        devCoordinates: [action.address.x, action.address.y],
      };

    case CHANGE_DEV_DESCRIPTION:
      return {
        ...state,
        devDescription: action.desc,
      };

    case CHANGE_DEV_EXPERIENCE:
      return {
        ...state,
        devExperience: action.xp,
      };

    case CHANGE_INPUT_EXPERIENCE:
      return {
        ...state,
        devExperience: action.xp,
      };

    case SET_DEV_LANGUAGE:
      return {
        ...state,
        devLanguages: [...state.devLanguages, action.lang],
      };

    case SET_DEV_TOOL:
      return {
        ...state,
        devTools: [...state.devTools, action.tool],
        inputToolName: '',
      };

    case SET_DEV_SKILL:
      return {
        ...state,
        devSkills: [...state.devSkills, action.skill],
        inputSkillName: '',
      };

    case REMOVE_DEV_LANGUAGE:
      return {
        ...state,
        devLanguages: state.devLanguages.filter((lang) => lang !== action.lang),
      };

    case REMOVE_DEV_TOOL:
      return {
        ...state,
        devTools: state.devTools.filter((tool) => tool !== action.tool),
      };

    case REMOVE_DEV_SKILL:
      return {
        ...state,
        devSkills: state.devSkills.filter((skill) => skill !== action.skill),
      };
    // -----------------------------------------------

    default:
      return state;
  }
};

export default accountReducer;
