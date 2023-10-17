// Import de Axios
import axios from 'axios';

import {
  API_ADRESS,
  CHANGE_FILTERS,
  FETCH_DATA_FILTER,
  loadingFilter,
  updateAdressList,
  updateCategories,
  updateLanguages,
  updateTechnos,
} from '../actions/filterActions';
import { updateDevsList } from '../actions/devActions';

const filterMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_DATA_FILTER:
      axios
        .get(`${import.meta.env.VITE_API_URL}/technos`)
        .then((response) => {
          store.dispatch(updateTechnos(response.data)); // Update technosList
          return axios.get(`${import.meta.env.VITE_API_URL}/languages`);
        })
        .then((response) => {
          store.dispatch(updateLanguages(response.data)); // Update languagesList
          return axios.get(`${import.meta.env.VITE_API_URL}/categories`);
        })
        .then((response) => {
          store.dispatch(updateCategories(response.data)); // Update categoriesList
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          store.dispatch(loadingFilter()); // Fin de la requête
        });
      break;

    case CHANGE_FILTERS:
      axios
        .post(
          `${import.meta.env.VITE_API_URL}/devs/filters`,
          {
            longitude: store.getState().filter.toSubmit.longitude,
            latitude: store.getState().filter.toSubmit.latitude,
            availability: store.getState().filter.toSubmit.availability,
            adr: store.getState().filter.toSubmit.tjm,
            technos: store.getState().filter.toSubmit.technos,
            languages: store.getState().filter.toSubmit.languages,
            experience: store.getState().filter.toSubmit.experience,
            categories: store.getState().filter.toSubmit.category,
            remote: store.getState().filter.toSubmit.remote,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then((response) => {
          store.dispatch(updateDevsList(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
      break;

    case API_ADRESS:
      // Exécute la recherche lorsque l'adresse comporte 3 caractères != d'espace
      if (action.adress.trim().length >= 3) {
        axios
          .get(`https://api-adresse.data.gouv.fr/search/?q=${action.adress}`)
          .then((response) => {
            store.dispatch(updateAdressList(response.data.features));
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        // Renvoie un tableau vide dans le state si l'input n'est pas suffisamment rempli
        store.dispatch(updateAdressList([]));
      }
      break;

    default:
  }

  next(action);
};

export default filterMiddleware;
