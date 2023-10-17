export const FETCH_DATA_SIGNUP = 'FETCH_DATA_SIGNUP';
export const fetchDataSignup = () => ({
  type: FETCH_DATA_SIGNUP,
});

export const UPDATE_TOOLS_LIST = 'UPDATE_TOOLS_LIST';
export const updateToolsList = (tools) => ({
  type: UPDATE_TOOLS_LIST,
  tools,
});

export const ADD_CREATED_TOOL = 'ADD_CREATED_TOOL';
export const addCreatedTool = (tool) => ({
  type: ADD_CREATED_TOOL,
  tool,
});

export const UPDATE_SKILLS_LIST = 'UPDATE_SKILLS_LIST';
export const updateSkillsList = (skills) => ({
  type: UPDATE_SKILLS_LIST,
  skills,
});

export const ADD_CREATED_SKILL = 'ADD_CREATED_SKILL';
export const addCreatedSkill = (skill) => ({
  type: ADD_CREATED_SKILL,
  skill,
});

export const UPDATE_CATEGORIES_LIST = 'UPDATE_CATEGORIES_LIST';
export const updateCategoriesList = (categories) => ({
  type: UPDATE_CATEGORIES_LIST,
  categories,
});

export const GET_OR_CREATE_TOOL = 'GET_OR_CREATE_TOOL';
export const getOrCreateTool = (tool) => ({
  type: GET_OR_CREATE_TOOL,
  tool,
});

export const GET_OR_CREATE_SKILL = 'GET_OR_CREATE_SKILL';
export const getOrCreateSkill = (skill) => ({
  type: GET_OR_CREATE_SKILL,
  skill,
});

export const SET_IS_DEV = 'SET_IS_DEV';
export const setIsDev = (isDev) => ({
  type: SET_IS_DEV,
  isDev,
});

export const SET_NEW_MAIL = 'SET_NEW_MAIL';
export const setNewMail = (newMail) => ({
  type: SET_NEW_MAIL,
  newMail,
});

export const SET_NEW_PASSWORD = 'SET_NEW_PASSWORD';
export const setNewPassword = (newPassword) => ({
  type: SET_NEW_PASSWORD,
  newPassword,
});

export const SET_CONFIRM_NEW_PASSWORD = 'SET_CONFIRM_NEW_PASSWORD';
export const setConfirmNewPassword = (newPassword) => ({
  type: SET_CONFIRM_NEW_PASSWORD,
  newPassword,
});

export const CHECK_NEW_PASSWORD = 'CHECK_NEW_PASSWORD';
export const checkNewPassword = (password) => ({
  type: CHECK_NEW_PASSWORD,
  password,
});

export const SET_NEW_NAME = 'SET_NEW_NAME';
export const setNewName = (newName) => ({
  type: SET_NEW_NAME,
  newName,
});

export const SET_NEW_FIRSTNAME = 'SET_NEW_FIRSTNAME';
export const setNewFirstname = (newFirstname) => ({
  type: SET_NEW_FIRSTNAME,
  newFirstname,
});

export const SET_NEW_ADDRESS = 'SET_NEW_ADDRESS';
export const setNewAddress = (newAddress) => ({
  type: SET_NEW_ADDRESS,
  newAddress,
});

export const SET_SELECTED_ADDRESS = 'SET_SELECTED_ADDRESS';
export const setSelectedAddress = (newAddress) => ({
  type: SET_SELECTED_ADDRESS,
  newAddress,
});

export const SET_NEW_TITLE = 'SET_NEW_TITLE';
export const setNewTitle = (newTitle) => ({
  type: SET_NEW_TITLE,
  newTitle,
});

export const SET_NEW_DESCRIPTION = 'SET_NEW_DESCRIPTION';
export const setNewDescription = (newDescription) => ({
  type: SET_NEW_DESCRIPTION,
  newDescription,
});

export const SET_SELECTED_CATEGORY = 'SET_SELECTED_CATEGORY';
export const setSelectedCategory = (newCategory) => ({
  type: SET_SELECTED_CATEGORY,
  newCategory,
});

export const SET_SELECTED_REMOTE = 'SET_SELECTED_REMOTE';
export const setSelectedRemote = (newRemote) => ({
  type: SET_SELECTED_REMOTE,
  newRemote,
});

export const SET_SELECTED_AREA = 'SET_SELECTED_AREA';
export const setSelectedArea = (newArea) => ({
  type: SET_SELECTED_AREA,
  newArea,
});

export const SET_NEW_ADR = 'SET_NEW_ADR';
export const setNewADR = (newADR) => ({
  type: SET_NEW_ADR,
  newADR,
});

export const SET_SELECTED_TECHNOS = 'SET_SELECTED_TECHNOS';
export const setSelectedTechnos = (newTechno) => ({
  type: SET_SELECTED_TECHNOS,
  newTechno,
});

export const SET_SELECTED_LANGUAGES = 'SET_SELECTED_LANGUAGES';
export const setSelectedlanguages = (newLanguage) => ({
  type: SET_SELECTED_LANGUAGES,
  newLanguage,
});

export const REMOVE_SELECTED_LANGUAGE = 'REMOVE_SELECTED_LANGUAGE';
export const removeSelectedLanguage = (languageToDelete) => ({
  type: REMOVE_SELECTED_LANGUAGE,
  languageToDelete,
});

export const REMOVE_SELECTED_TECHNO = 'REMOVE_SELECTED_TECHNO';
export const removeSelectedTechno = (TechnoToDelete) => ({
  type: REMOVE_SELECTED_TECHNO,
  TechnoToDelete,
});

export const SET_FAVORITE_TECHNO = 'SET_FAVORITE_TECHNO';
export const setFavoriteTechno = (favTech) => ({
  type: SET_FAVORITE_TECHNO,
  favTech,
});

export const SET_NEW_TOOL = 'SET_NEW_TOOL';
export const setNewTool = (newTool) => ({
  type: SET_NEW_TOOL,
  newTool,
});

export const REMOVE_SELECTED_TOOL = 'REMOVE_SELECTED_TOOL';
export const removeSelectedTool = (toolToDelete) => ({
  type: REMOVE_SELECTED_TOOL,
  toolToDelete,
});

export const SET_NEW_SKILL = 'SET_NEW_SKILL';
export const setNewSkill = (newSkill) => ({
  type: SET_NEW_SKILL,
  newSkill,
});

export const REMOVE_SELECTED_SKILL = 'REMOVE_SELECTED_SKILL';
export const removeSelectedSkill = (skillToDelete) => ({
  type: REMOVE_SELECTED_SKILL,
  skillToDelete,
});

export const SET_SELECTED_PHOTO = 'SET_SELECTED_PHOTO';
export const setSelectedPhoto = (newPhoto) => ({
  type: SET_SELECTED_PHOTO,
  newPhoto,
});

export const SET_EXPERIENCE_DATE = 'SET_EXPERIENCE_DATE';
export const setExperienceDate = (newDate) => ({
  type: SET_EXPERIENCE_DATE,
  newDate,
});

export const SAVE_SELECTED_PHOTO = 'SAVE_SELECTED_PHOTO';
export const saveSelectedPhoto = () => ({
  type: SAVE_SELECTED_PHOTO,
});

export const CREATE_USER = 'CREATE_USER';
export const createUser = (photoLink) => ({
  type: CREATE_USER,
  photoLink,
});

export const CREATE_DEV = 'CREATE_DEV';
export const createDev = (userId) => ({
  type: CREATE_DEV,
  userId,
});

export const MESSAGE_ERROR_SIGNUP = 'MESSAGE_ERROR_SIGNUP';
export const messageErrorSignup = (messageError) => ({
  type: MESSAGE_ERROR_SIGNUP,
  messageError,
});
