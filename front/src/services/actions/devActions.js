// Récupération des Devs de l'API
export const FETCH_DEVS = 'FETCH_DEVS';
export const fetchDevs = () => {
  return {
    type: FETCH_DEVS,
  };
};

// Récupération des Devs de l'API
export const SECOND_FETCH_DEVS = 'SECOND_FETCH_DEVS';
export const secondFetchDevs = () => {
  return {
    type: SECOND_FETCH_DEVS,
  };
};

// Mise à jour des Devs dans le state
export const UPDATE_DEVS_LIST = 'UPDATE_DEVS_LIST';
export const updateDevsList = (newDevs) => ({
  type: UPDATE_DEVS_LIST,
  newDevs,
});

// Mise à jour d'une 2ème liste de Devs dans le state (Propositions dans la page Détail)
export const UPDATE_SECOND_DEVS_LIST = 'UPDATE_SECOND_DEVS_LIST';
export const updateSecondDevsList = (newDevs) => ({
  type: UPDATE_SECOND_DEVS_LIST,
  newDevs,
});

// Sauvegarde d'où vient l'utilisateur lorsqu'il accède à la page de détail
export const FROM_PAGE = 'FROM_PAGE';
export const fromPage = (from) => ({
  type: FROM_PAGE,
  from,
});
