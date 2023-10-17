import {
  CHANGE_SETTINGS_FIELD,
  HANDLE_SUCCESSFUL_LOGIN,
  DISCONNECT,
} from '../actions/authActions';

export const initialState = {
  logged: false,
  email: '',
  password: '',
  nickname: '',
  role: 'user',
  userId: '',
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_SETTINGS_FIELD:
      return {
        ...state,
        [action.name]: action.value,
      };

    case HANDLE_SUCCESSFUL_LOGIN:
      return {
        ...state,
        logged: true,
        nickname: action.name,
        role: action.role,
        userId: action.id,
        email: '',
        password: '',
      };

    case DISCONNECT:
      localStorage.removeItem('token');
      localStorage.removeItem('appState');
      return {
        logged: false,
        email: '',
        password: '',
        nickname: '',
        role: 'user',
        userId: '',
      };

    default:
      return state;
  }
};

export default reducer;
