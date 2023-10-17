// Action types
export const FETCH_ONE_DEV = 'FETCH_ONE_DEV';
export const FETCH_ACCOUNT_USER = 'FETCH_ACCOUNT_USER';
export const UPDATE_ONE_DEV = 'UPDATE_ONE_DEV';
export const UPDATE_ONE_USER = 'UPDATE_ONE_USER';
export const GET_OR_CREATE_TOOL = 'GET_OR_CREATE_TOOL';
export const GET_OR_CREATE_SKILL = 'GET_OR_CREATE_SKILL';
export const SET_DEV_INFOS = 'SET_DEV_INFOS';
export const SET_USER_INFOS = 'SET_USER_INFOS';
export const TOGGLE_EDIT_PROFIL = 'TOGGLE_EDIT_PROFIL';
export const TOGGLE_EDIT_SKILLS = 'TOGGLE_EDIT_SKILLS';
export const CHANGE_INPUT_TOOL = 'CHANGE_INPUT_TOOL';
export const CHANGE_INPUT_SKILL = 'CHANGE_INPUT_SKILL';
export const CHANGE_DEV_ADDRESS = 'CHANGE_DEV_ADDRESS';
export const CHANGE_INPUT_EXPERIENCE = 'CHANGE_INPUT_EXPERIENCE';
export const CHANGE_DEV_EXPERIENCE = 'CHANGE_DEV_EXPERIENCE';
export const CHANGE_DEV_DESCRIPTION = 'CHANGE_DEV_DESCRIPTION';
export const SET_INPUT_MAIL = 'SET_INPUT_MAIL';
export const SET_NEW_MAIL = 'SET_NEW_MAIL';
export const SET_NEW_PASSWORD = 'SET_NEW_PASSWORD';
export const SET_NEW_NAME = 'SET_NEW_NAME';
export const SET_NEW_FIRSTNAME = 'SET_NEW_FIRSTNAME';
export const SET_NEW_ADDRESS = 'SET_NEW_ADDRESS';
export const SET_SELECTED_ADDRESS = 'SET_SELECTED_ADDRESS';
export const SET_NEW_TITLE = 'SET_NEW_TITLE';
export const SET_NEW_DESCRIPTION = 'SET_NEW_DESCRIPTION';
export const SET_SELECTED_CATEGORY = 'SET_SELECTED_CATEGORY';
export const SET_NEW_CATEGORY = 'SET_NEW_CATEGORY';
export const SET_SELECTED_PHOTO = 'SET_SELECTED_PHOTO';
export const SET_EXPERIENCE_DATE = 'SET_EXPERIENCE_DATE';
export const SET_NEW_TJM = 'SET_NEW_TJM';
export const REMOVE_DEV_LANGUAGE = 'REMOVE_DEV_LANGUAGE';
export const SET_ISSET_DEV = 'SET_ISSET_DEV';
export const REMOVE_DEV_TOOL = 'REMOVE_DEV_TOOL';
export const REMOVE_DEV_SKILL = 'REMOVE_DEV_SKILL';
export const SET_DEV_LANGUAGE = 'SET_DEV_LANGUAGE';
export const SET_DEV_TOOL = 'SET_DEV_TOOL';
export const SET_DEV_SKILL = 'SET_DEV_SKILL';

// ------------------- Actions Datas ----------------------------
export const fetchOneDev = (userId) => ({
  type: FETCH_ONE_DEV,
  userId,
});
export const fetchAccountUser = (userId) => ({
  type: FETCH_ACCOUNT_USER,
  userId,
});

export const updateOneDev = (devId) => ({
  type: UPDATE_ONE_DEV,
  devId,
});

export const updateOneUser = (userId) => ({
  type: UPDATE_ONE_USER,
  userId,
});

export const getOrCreateTool = (tool) => ({
  type: GET_OR_CREATE_TOOL,
  tool,
});

export const getOrCreateSkill = (skill) => ({
  type: GET_OR_CREATE_SKILL,
  skill,
});

export const setUserInfos = (role, img, name, firstname, mail) => ({
  type: SET_USER_INFOS,
  role,
  img,
  name,
  firstname,
  mail,
});

export const setDevInfos = (
  id,
  lang,
  tool,
  skill,
  xp,
  cat,
  catLabel,
  tjm,
  title,
  address,
  city,
  zip,
  long,
  lat,
  desc
) => ({
  type: SET_DEV_INFOS,
  id,
  lang,
  tool,
  skill,
  xp,
  cat,
  catLabel,
  tjm,
  title,
  address,
  city,
  zip,
  long,
  lat,
  desc,
});

export const setIsSetDev = () => ({
  type: SET_ISSET_DEV,
});

export const toggleEditProfil = () => ({
  type: TOGGLE_EDIT_PROFIL,
});

export const toggleEditSkills = () => ({
  type: TOGGLE_EDIT_SKILLS,
});
// ---------------------------------------------------------------

// -------------------- Actions Profil ---------------------------

export const setNewName = (name) => ({
  type: SET_NEW_NAME,
  name,
});

export const setNewFirstname = (firstname) => ({
  type: SET_NEW_FIRSTNAME,
  firstname,
});

export const setNewTitle = (newTitle) => ({
  type: SET_NEW_TITLE,
  newTitle,
});

export const setSelectedPhoto = (newPhoto) => ({
  type: SET_SELECTED_PHOTO,
  newPhoto,
});

export const setSelectedCategory = (cat) => ({
  type: SET_SELECTED_CATEGORY,
  cat,
});

export const setExperienceDate = (newDate) => ({
  type: SET_EXPERIENCE_DATE,
  newDate,
});

export const setNewAddress = (newAddress) => ({
  type: SET_NEW_ADDRESS,
  newAddress,
});

export const setSelectedAddress = (newAddress) => ({
  type: SET_SELECTED_ADDRESS,
  newAddress,
});

export const setNewDescription = (newDescription) => ({
  type: SET_NEW_DESCRIPTION,
  newDescription,
});

export const setNewMail = (newMail) => ({
  type: SET_NEW_MAIL,
  newMail,
});

// export const setNewPassword = (newPassword) => ({
//   type: SET_NEW_PASSWORD,
//   newPassword,
// });

export const setNewTjm = (newTjm) => ({
  type: SET_NEW_TJM,
  newTjm,
});
// ---------------------------------------------------------------

// -------------------- Actions Skills ---------------------------
export const changeInputTool = (tool) => ({
  type: CHANGE_INPUT_TOOL,
  tool,
});

export const changeInputSkill = (skill) => ({
  type: CHANGE_INPUT_SKILL,
  skill,
});

export const changeDevAddress = (address) => ({
  type: CHANGE_DEV_ADDRESS,
  address,
});

export const changeDevExperience = (xp) => ({
  type: CHANGE_DEV_EXPERIENCE,
  xp,
});

export const changeInputExperience = (xp) => ({
  type: CHANGE_INPUT_EXPERIENCE,
  xp,
});

export const changeDevDescription = (desc) => ({
  type: CHANGE_DEV_DESCRIPTION,
  desc,
});

export const setDevLanguage = (lang) => ({
  type: SET_DEV_LANGUAGE,
  lang,
});

export const setDevTool = (tool) => ({
  type: SET_DEV_TOOL,
  tool,
});

export const setDevSkill = (skill) => ({
  type: SET_DEV_SKILL,
  skill,
});

export const removeDevLanguage = (lang) => ({
  type: REMOVE_DEV_LANGUAGE,
  lang,
});

export const removeDevTool = (tool) => ({
  type: REMOVE_DEV_TOOL,
  tool,
});

export const removeDevSkill = (skill) => ({
  type: REMOVE_DEV_SKILL,
  skill,
});
// ---------------------------------------------------------------
