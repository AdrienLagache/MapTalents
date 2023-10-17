import axios from 'axios';

import {
  FETCH_DEVS,
  SECOND_FETCH_DEVS,
  updateDevsList,
  updateSecondDevsList,
} from '../actions/devActions';

const devMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_DEVS:
      axios
        .get(`${import.meta.env.VITE_API_URL}/devs`)
        .then((response) => {
          store.dispatch(updateDevsList(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
      break;

    case SECOND_FETCH_DEVS:
      axios
        .get(`${import.meta.env.VITE_API_URL}/devs`)
        .then((response) => {
          store.dispatch(updateSecondDevsList(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
      break;

    default:
  }

  next(action);
};

export default devMiddleware;
