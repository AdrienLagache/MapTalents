// Import de Axios
import axios from 'axios';

// Import de Redux
import {
  CREATE_DEV_BACKOFFICE,
  CREATE_ITEM,
  DELETE_DEV,
  DELETE_ITEM,
  DELETE_USER,
  FETCH_ONE_USER,
  FETCH_USERS,
  GET_OR_CREATE_SKILL,
  GET_OR_CREATE_TOOL,
  UPDATE_DEV,
  UPDATE_ITEM,
  UPDATE_USER,
  fetchUsers,
  resetItem,
  resetUserData,
  setNewValue,
  storeUserToUpdate,
  updateUser,
  updateUsersBackOffice,
  updateUsersList,
} from '../actions/backOfficeActions';
import { addCreatedSkill, addCreatedTool } from '../actions/signupActions';
import { fetchDataFilter } from '../actions/filterActions';

const backofficeMiddleware = (store) => (next) => (action) => {
  let successMessage = '';

  switch (action.type) {
    // Récupération de tous les Utilisateurs
    case FETCH_USERS:
      axios
        .get(`${import.meta.env.VITE_API_URL}/users`)
        .then((response) => {
          store.dispatch(updateUsersList(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    // Récupération des données de l'Utilisateur à Update
    case FETCH_ONE_USER:
      axios
        .get(`${import.meta.env.VITE_API_URL}/users/${action.userId}`)
        .then((responseUser) => {
          // Récupération d'un profil de Dev
          if (responseUser.data.role_name === 'dev') {
            axios
              .get(
                `${import.meta.env.VITE_API_URL}/devs/userId/${action.userId}`
              )
              .then((responseDev) => {
                store.dispatch(storeUserToUpdate(responseDev.data, true));
              });
          }
          // Récupération d'un profil Utilisateur
          else {
            store.dispatch(storeUserToUpdate(responseUser.data, false));
          }
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    // Suppression d'un Utilisateur
    case DELETE_USER:
      axios
        .delete(`${import.meta.env.VITE_API_URL}/users/${action.userId}`)
        .then((response) => {
          successMessage = `L'utilisateur ${action.userId} a bien été supprimé`;
          store.dispatch(updateUsersBackOffice(action.userId, successMessage));
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    // Suppression d'un Dev
    case DELETE_DEV:
      axios
        // Récupération du profil dev depuis le userId
        .get(`${import.meta.env.VITE_API_URL}/devs/userId/${action.userId}`)
        .then((responseDev) => {
          axios
            // Suppression du profil dev grâce au devId récupéré
            .delete(
              `${import.meta.env.VITE_API_URL}/devs/${responseDev.data.id}`
            )
            .then((response) => {
              successMessage = `Le dev ${action.userId} a bien été supprimé`;
              // Met à jour la liste des devs pour éviter un nouveau fetch
              store.dispatch(
                updateUsersBackOffice(action.userId, successMessage)
              );
            });
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    // Récupération ou Création d'un Outil
    case GET_OR_CREATE_TOOL:
      axios
        .post(`${import.meta.env.VITE_API_URL}/tools`, {
          tool: action.tool,
        })
        .then((response) => {
          const { toolsList } = store.getState().signup;
          const { id } = response.data;

          // Mise à jour de toolsList dans le state de Signup
          if (!toolsList.some((item) => item.id === id)) {
            store.dispatch(addCreatedTool(response.data));
          }
          // Mise à jour de l'affichage dans le backOffice
          store.dispatch(setNewValue(response.data.id, 'tool'));
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    // Récupération ou Création d'une Compétence
    case GET_OR_CREATE_SKILL:
      axios
        .post(`${import.meta.env.VITE_API_URL}/softSkills`, {
          softSkill: action.skill,
        })
        .then((response) => {
          const { skillsList } = store.getState().signup;
          const { id } = response.data;

          // Mise à jour de skillsList dans le state de Signup
          if (!skillsList.some((item) => item.id === id)) {
            store.dispatch(addCreatedSkill(response.data));
          }
          // Mise à jour de l'affichage dans le backOffice
          store.dispatch(setNewValue(response.data.id, 'skill'));
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    // Update d'un Dev
    case UPDATE_DEV:
      axios
        .patch(
          `${import.meta.env.VITE_API_URL}/devs/${action.devId}`,
          {
            title: store.getState().backOffice.title,
            description: store.getState().backOffice.description,
            address: store.getState().backOffice.address,
            zip_code: store.getState().backOffice.zip_code,
            city: store.getState().backOffice.city,
            country: store.getState().backOffice.country,
            adr: store.getState().backOffice.tjm,
            experience: store.getState().backOffice.experience,
            longitude: store.getState().backOffice.longitude,
            latitude: store.getState().backOffice.latitude,
            activity_area: store.getState().backOffice.activity_area,
            // availability: store.getState().backOffice.availability,
            remote: store.getState().backOffice.remote,
            favorite_techno: store.getState().backOffice.favorite_techno,
            categoryId: store.getState().backOffice.category.id,
            technoId: store
              .getState()
              .backOffice.technos.map((item) => item.id),
            languageId: store
              .getState()
              .backOffice.languages.map((item) => item.id),
            softSkillId: store
              .getState()
              .backOffice.skills.map((item) => item.id),
            toolId: store.getState().backOffice.tools.map((item) => item.id),
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then((response) => {
          // Mise à jour de User
          store.dispatch(updateUser(store.getState().backOffice.userId));
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    // Update d'un Utilisateur
    case UPDATE_USER:
      axios
        .patch(
          `${import.meta.env.VITE_API_URL}/users/${action.userId}`,
          {
            mail: store.getState().backOffice.mail,
            firstname: store.getState().backOffice.firstname,
            lastname: store.getState().backOffice.lastname,
            role_name: store.getState().backOffice.role,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then((response) => {
          // Réinitialise les données dans le state
          store.dispatch(resetUserData());
          // Gain de temps, mais pas top de rappeler un fetch
          store.dispatch(fetchUsers());
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    // Création d'un dev si le user devient un dev
    case CREATE_DEV_BACKOFFICE:
      axios
        .post(
          `${import.meta.env.VITE_API_URL}/devs`,
          {
            title: store.getState().backOffice.title,
            description: store.getState().backOffice.description,
            categoryId: store.getState().backOffice.category.id,
            address: store.getState().backOffice.address,
            zip_code: store.getState().backOffice.zip_code,
            city: store.getState().backOffice.city,
            country: 'France',
            adr: store.getState().backOffice.tjm,
            experience: store.getState().backOffice.experience,
            longitude: store.getState().backOffice.longitude,
            latitude: store.getState().backOffice.latitude,
            activity_area: store.getState().backOffice.activity_area,
            availability: 'disponible',
            remote: store.getState().backOffice.remote,
            favorite_techno: store.getState().backOffice.favorite_techno,
            userId: action.userId,
            technoId: store.getState().backOffice.technos,
            languageId: store.getState().backOffice.languages,
            softSkillId: store.getState().backOffice.skills,
            toolId: store.getState().backOffice.tools,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then((response) => {
          store.dispatch(updateUser(action.userId));
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    // Création d'un Item (Langue / Techno / Catégorie)
    case CREATE_ITEM:
      // eslint-disable-next-line no-case-declarations
      let labelCreate = '';

      switch (action.tableLabel) {
        case 'languages':
          labelCreate = 'language';
          break;
        case 'technos':
          labelCreate = 'techno';
          break;
        case 'categories':
          labelCreate = 'category';
          break;
        default:
      }

      axios
        .post(
          `${import.meta.env.VITE_API_URL}/${action.tableLabel}`,
          {
            [labelCreate]: store.getState().backOffice.itemLabel,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then((response) => {
          // A améliorer (prévoir l'ajout du nouvel objet dans le state)
          store.dispatch(fetchDataFilter());
          store.dispatch(resetItem());
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    // Update d'un Item (Langue / Techno / Catégorie)
    case UPDATE_ITEM:
      // eslint-disable-next-line no-case-declarations
      let labelUpdate = '';

      switch (action.tableLabel) {
        case 'languages':
          labelUpdate = 'language';
          break;
        case 'technos':
          labelUpdate = 'techno';
          break;
        case 'categories':
          labelUpdate = 'category';
          break;
        default:
      }

      axios
        .patch(
          `${import.meta.env.VITE_API_URL}/${action.tableLabel}/${
            action.itemId
          }`,
          {
            [labelUpdate]: store.getState().backOffice.itemLabel,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then((response) => {
          // A améliorer (prévoir l'ajout du nouvel objet dans le state)
          store.dispatch(fetchDataFilter());
          store.dispatch(resetItem());
        })
        .catch((error) => {
          console.log(error);
        });
      break;

    // Suppression d'un Item (Langue / Techno / Catégorie)
    case DELETE_ITEM:
      axios
        .delete(
          `${import.meta.env.VITE_API_URL}/${action.tableLabel}/${
            action.itemId
          }`
        )
        .then((response) => {
          // A améliorer (prévoir l'ajout du nouvel objet dans le state)
          store.dispatch(fetchDataFilter());
        })
        .catch((error) => {
          console.log(error);
        });
      break;

    default:
  }

  next(action);
};

export default backofficeMiddleware;
