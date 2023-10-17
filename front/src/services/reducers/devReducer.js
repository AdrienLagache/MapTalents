import {
  FROM_PAGE,
  UPDATE_DEVS_LIST,
  UPDATE_SECOND_DEVS_LIST,
} from '../actions/devActions';

import { DISCONNECT } from '../actions/authActions';

export const initialState = {
  loading: true,
  devsList: [],
  secondDevsList: [],
  from: 'carte',
};

const devReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_DEVS_LIST:
      return {
        ...state,
        devsList: action.newDevs,
        loading: false,
      };
    case UPDATE_SECOND_DEVS_LIST:
      return {
        ...state,
        secondDevsList: action.newDevs,
        loading: false,
      };
    // Sauvegarde d'où vient l'utilisateur lorsqu'il accède à la page de détail
    case FROM_PAGE:
      return {
        ...state,
        from: action.from,
      };

    case DISCONNECT:
      return initialState;
    default:
      return state;
  }
};

export default devReducer;
