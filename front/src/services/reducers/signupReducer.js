import {
  ADD_CREATED_SKILL,
  ADD_CREATED_TOOL,
  CHECK_NEW_PASSWORD,
  MESSAGE_ERROR_SIGNUP,
  REMOVE_SELECTED_LANGUAGE,
  REMOVE_SELECTED_SKILL,
  REMOVE_SELECTED_TECHNO,
  REMOVE_SELECTED_TOOL,
  SET_CONFIRM_NEW_PASSWORD,
  SET_EXPERIENCE_DATE,
  SET_FAVORITE_TECHNO,
  SET_IS_DEV,
  SET_NEW_ADDRESS,
  SET_NEW_ADR,
  SET_NEW_DESCRIPTION,
  SET_NEW_FIRSTNAME,
  SET_NEW_MAIL,
  SET_NEW_NAME,
  SET_NEW_PASSWORD,
  SET_NEW_SKILL,
  SET_NEW_TITLE,
  SET_NEW_TOOL,
  SET_SELECTED_ADDRESS,
  SET_SELECTED_AREA,
  SET_SELECTED_CATEGORY,
  SET_SELECTED_LANGUAGES,
  SET_SELECTED_PHOTO,
  SET_SELECTED_REMOTE,
  SET_SELECTED_TECHNOS,
  UPDATE_CATEGORIES_LIST,
  UPDATE_SKILLS_LIST,
  UPDATE_TOOLS_LIST,
} from '../actions/signupActions';

export const initialState = {
  isDev: false,
  selectedPhoto: 'https://i.imgur.com/GlgMGBt.png',
  toolsList: [],
  skillsList: [],
  categoriesList: [],
  inputMail: '',
  inputPassword: '',
  checkPassword: '',
  inputName: '',
  inputFirstname: '',
  inputAddress: '',
  selectedAddress: {},
  inputTitle: '',
  inputDescription: '',
  selectedCategory: '',
  selectedRemote: 'Télétravail ou sur site',
  selectedArea: '',
  selectedADR: '',
  selectedLanguages: [],
  selectedTechnos: [],
  favoriteTechno: '',
  selectedTools: [],
  selectedSkills: [],
  xpDate: '',
  error: '',
  messageError: [],
};

const signupReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_IS_DEV:
      return {
        ...state,
        isDev: action.isDev,
      };

    case UPDATE_TOOLS_LIST:
      return {
        ...state,
        toolsList: action.tools,
      };

    case UPDATE_SKILLS_LIST:
      return {
        ...state,
        skillsList: action.skills,
      };

    case UPDATE_CATEGORIES_LIST:
      return {
        ...state,
        categoriesList: action.categories,
      };

    case ADD_CREATED_TOOL:
      return {
        ...state,
        toolsList: [...state.toolsList, action.tool],
      };

    case ADD_CREATED_SKILL:
      return {
        ...state,
        skillsList: [...state.skillsList, action.skill],
      };

    case SET_NEW_MAIL:
      return {
        ...state,
        inputMail: action.newMail,
      };

    case SET_NEW_PASSWORD:
      return {
        ...state,
        inputPassword: action.newPassword,
      };
    case SET_CONFIRM_NEW_PASSWORD:
      return {
        ...state,
        checkPassword: action.newPassword,
      };

    case CHECK_NEW_PASSWORD:
      if (
        state.checkPassword !== '' &&
        state.checkPassword !== state.inputPassword
      ) {
        // Les mots de passe ne correspondent pas, on déclenche une action d'erreur
        return {
          ...state,
          error: 'Les deux champs doivent être identiques',
        };
      }
      // Les mots de passe correspondent
      return {
        ...state,
        error: '',
      };

    case SET_NEW_NAME:
      return {
        ...state,
        inputName: action.newName,
      };

    case SET_NEW_FIRSTNAME:
      return {
        ...state,
        inputFirstname: action.newFirstname,
      };

    case SET_NEW_ADDRESS:
      return {
        ...state,
        inputAddress: action.newAddress,
      };

    case SET_SELECTED_ADDRESS:
      return {
        ...state,
        selectedAddress: action.newAddress,
      };

    case SET_NEW_TITLE:
      return {
        ...state,
        inputTitle: action.newTitle,
      };

    case SET_NEW_DESCRIPTION:
      return {
        ...state,
        inputDescription: action.newDescription,
      };

    case SET_SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategory: action.newCategory,
      };

    case SET_SELECTED_REMOTE:
      return {
        ...state,
        selectedRemote: action.newRemote,
      };

    case SET_SELECTED_AREA:
      if (action.newArea === '') {
        return {
          ...state,
          selectedArea: '',
        };
      }
      return {
        ...state,
        selectedArea: action.newArea,
      };

    case SET_NEW_ADR:
      if (action.newADR === '') {
        return {
          ...state,
          selectedADR: '',
        };
      }
      return {
        ...state,
        selectedADR: action.newADR,
      };

    case SET_SELECTED_TECHNOS:
      return {
        ...state,
        selectedTechnos: [...state.selectedTechnos, action.newTechno],
      };

    case SET_FAVORITE_TECHNO:
      return {
        ...state,
        favoriteTechno: action.favTech,
      };

    case SET_SELECTED_LANGUAGES:
      return {
        ...state,
        selectedLanguages: [...state.selectedLanguages, action.newLanguage],
      };

    case REMOVE_SELECTED_LANGUAGE:
      return {
        ...state,
        selectedLanguages: state.selectedLanguages.filter(
          (lang) => lang !== action.languageToDelete
        ),
      };

    case REMOVE_SELECTED_TECHNO:
      return {
        ...state,
        selectedTechnos: state.selectedTechnos.filter(
          (tech) => tech !== action.TechnoToDelete
        ),
      };

    case SET_NEW_TOOL:
      return {
        ...state,
        selectedTools: [...state.selectedTools, action.newTool],
      };

    case REMOVE_SELECTED_TOOL:
      return {
        ...state,
        selectedTools: state.selectedTools.filter(
          (tool) => tool !== action.toolToDelete
        ),
      };

    case SET_NEW_SKILL:
      return {
        ...state,
        selectedSkills: [...state.selectedSkills, action.newSkill],
      };

    case REMOVE_SELECTED_SKILL:
      return {
        ...state,
        selectedSkills: state.selectedSkills.filter(
          (skill) => skill !== action.skillToDelete
        ),
      };

    case SET_SELECTED_PHOTO:
      return {
        ...state,
        selectedPhoto: action.newPhoto,
      };

    case SET_EXPERIENCE_DATE:
      return {
        ...state,
        xpDate: action.newDate,
      };

    case MESSAGE_ERROR_SIGNUP:
      return {
        ...state,
        messageError: action.messageError,
      };

    default:
      return state;
  }
};

export default signupReducer;
