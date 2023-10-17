// Voir la liste des 10 précédents
export const SEE_LIST_BACKOFFICE = 'SEE_LIST_BACKOFFICE';
export const seeListBackOffice = (direction) => {
  return {
    type: SEE_LIST_BACKOFFICE,
    direction,
  };
};

// Récupérer la liste des Utilisateurs
export const FETCH_USERS = 'FETCH_USERS';
export const fetchUsers = () => {
  return {
    type: FETCH_USERS,
  };
};

// Mettre à jour la liste des Utilisateurs après le fetch
export const UPDATE_USERS_LIST = 'UPDATE_USERS_LIST';
export const updateUsersList = (usersList) => {
  return {
    type: UPDATE_USERS_LIST,
    usersList,
  };
};

// Suppression d'un utilisateur
export const DELETE_USER = 'DELETE_USER';
export const deleteUser = (userId) => {
  return {
    type: DELETE_USER,
    userId,
  };
};

// Suppression d'un dev
export const DELETE_DEV = 'DELETE_DEV';
export const deleteDev = (userId) => {
  return {
    type: DELETE_DEV,
    userId,
  };
};

// Mettre à jour la liste des Utilisateurs après une modification
export const UPDATE_USERS_BACKOFFICE = 'UPDATE_USERS_BACKOFFICE';
export const updateUsersBackOffice = (userId, successMessage) => {
  return {
    type: UPDATE_USERS_BACKOFFICE,
    userId,
    successMessage,
  };
};

// Fermer la popup de Message
export const CLOSE_MESSAGE = 'CLOSE_MESSAGE';
export const closeMessage = () => {
  return {
    type: CLOSE_MESSAGE,
  };
};

// Ouvre la popup de confirmation de Suppression
export const OPEN_POPUP_DELETE = 'OPEN_POPUP_DELETE';
export const openPopupDelete = (userId, userRole) => {
  return {
    type: OPEN_POPUP_DELETE,
    userId,
    userRole,
  };
};

// Ferme la popup de confirmation de Suppression
export const CANCEL_ACTION = 'CANCEL_ACTION';
export const cancelAction = () => {
  return {
    type: CANCEL_ACTION,
  };
};

// Récupération d'un Utilisateur pour modification
export const FETCH_ONE_USER = 'FETCH_ONE_USER';
export const fetchOneUser = (userId) => {
  return {
    type: FETCH_ONE_USER,
    userId,
  };
};

// Stock l'utilisateur à modifier dans le state
export const STORE_USER_TO_UPDATE = 'STORE_USER_TO_UPDATE';
export const storeUserToUpdate = (userData, isDev) => {
  return {
    type: STORE_USER_TO_UPDATE,
    userData,
    isDev,
  };
};

// Modifie une valeur dans le userToUpdate
export const SET_NEW_VALUE = 'SET_NEW_VALUE';
export const setNewValue = (newValue, input, isDev) => {
  return {
    type: SET_NEW_VALUE,
    newValue,
    input,
    isDev,
  };
};

// Supprime un élément dans un tableau dans le userToUpdate
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const removeItem = (itemId, list) => {
  return {
    type: REMOVE_ITEM,
    itemId,
    list,
  };
};

// Récupération ou Création d'un Outil
export const GET_OR_CREATE_TOOL = 'GET_OR_CREATE_TOOL';
export const getOrCreateTool = (tool) => {
  return {
    type: GET_OR_CREATE_TOOL,
    tool,
  };
};

// Récupération ou Création d'une Compétence
export const GET_OR_CREATE_SKILL = 'GET_OR_CREATE_SKILL';
export const getOrCreateSkill = (skill) => {
  return {
    type: GET_OR_CREATE_SKILL,
    skill,
  };
};

// Update d'un Utilisateur
export const UPDATE_USER = 'UPDATE_USER';
export const updateUser = (userId) => {
  return {
    type: UPDATE_USER,
    userId,
  };
};

// Update d'un Dev
export const UPDATE_DEV = 'UPDATE_DEV';
export const updateDev = (devId) => {
  return {
    type: UPDATE_DEV,
    devId,
  };
};

// Reset du state après avoir update un utilisateur
export const RESET_USER_DATA = 'RESET_USER_DATA';
export const resetUserData = () => {
  return {
    type: RESET_USER_DATA,
  };
};

// Création d'un dev si le user devient un dev
export const CREATE_DEV_BACKOFFICE = 'CREATE_DEV_BACKOFFICE';
export const createDevBackoffice = (userId) => ({
  type: CREATE_DEV_BACKOFFICE,
  userId,
});

// Navigation dans le BackOffice
export const NAVIGATION_BACKOFFICE = 'NAVIGATION_BACKOFFICE';
export const navigationBackoffice = (menuSelected) => ({
  type: NAVIGATION_BACKOFFICE,
  menuSelected,
});

// Défini l'action à effectuer (CREATE / UPDATE)
export const SET_ACTION_BACKOFFICE = 'SET_ACTION_BACKOFFICE';
export const setActionBackoffice = (actionSelected) => ({
  type: SET_ACTION_BACKOFFICE,
  actionSelected,
});

// Sauvegarde l'item sélectionné dans le state
export const SAVE_STATE_ITEM = 'SAVE_STATE_ITEM';
export const saveStateItem = (itemId, itemLabel, menuSelected) => ({
  type: SAVE_STATE_ITEM,
  itemId,
  itemLabel,
  menuSelected,
});

// Création d'un Item (Langue / Techno / Catégorie)
export const CREATE_ITEM = 'CREATE_ITEM';
export const createItem = (tableLabel) => ({
  type: CREATE_ITEM,
  tableLabel,
});

// Update d'un Item (Langue / Techno / Catégorie)
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const updateItem = (itemId, tableLabel) => ({
  type: UPDATE_ITEM,
  itemId,
  tableLabel,
});

// Suppression d'un Item (Langue / Techno / Catégorie)
export const DELETE_ITEM = 'DELETE_ITEM';
export const deleteItem = (itemId, tableLabel) => ({
  type: DELETE_ITEM,
  itemId,
  tableLabel,
});

// Réinitialisation des valeurs après un ajout ou un update (Langue / Techno / Catégorie)
export const RESET_ITEM = 'RESET_ITEM';
export const resetItem = () => ({
  type: RESET_ITEM,
});

// Mise à jour des infos à update dans le state (Langue / Techno / Catégorie)
export const SET_UPDATE_ITEM_STATE = 'SET_UPDATE_ITEM_STATE';
export const setUpdateItemState = (itemId, itemLabel) => ({
  type: SET_UPDATE_ITEM_STATE,
  itemId,
  itemLabel,
});
