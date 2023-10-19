import axios from 'axios';
import { SUBMIT_LOGIN, handleSuccessfulLogin } from '../actions/authActions';

const authMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case SUBMIT_LOGIN: {
      let email;
      let password;

      const authState = store.getState().auth;
      const signupState = store.getState().signup;

      // On vérifie si email et password sont vides dans le state auth sinon on utilise les valeurs de signup ;)
      if (authState.email === '' && authState.password === '') {
        email = signupState.inputMail;
        password = signupState.checkPassword;
      } else {
        email = authState.email;
        password = authState.password;
      }

      axios
        .post(`${import.meta.env.VITE_API_URL}/auth/login`, {
          email,
          password,
        })
        .then((response) => {
          store.dispatch(
            handleSuccessfulLogin(
              response.data.payload.user.name,
              response.data.payload.user.role,
              response.data.payload.user.id
            )
          );
          localStorage.setItem('token', response.data.access_token);
          localStorage.setItem('payload', [
            response.data.payload.user.name,
            response.data.payload.user.role,
            response.data.payload.user.id
          ])
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    }

    default:
  }
  next(action);
};

export default authMiddleware;
