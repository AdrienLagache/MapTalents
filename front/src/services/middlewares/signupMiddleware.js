import axios from 'axios';
import {
  addCreatedSkill,
  addCreatedTool,
  createDev,
  createUser,
  CREATE_DEV,
  CREATE_USER,
  FETCH_DATA_SIGNUP,
  GET_OR_CREATE_SKILL,
  GET_OR_CREATE_TOOL,
  messageErrorSignup,
  SAVE_SELECTED_PHOTO,
  setNewSkill,
  setNewTool,
  updateCategoriesList,
  updateSkillsList,
  updateToolsList,
} from '../actions/signupActions';
import { submitLogin } from '../actions/authActions';

const signupMiddleware = (store) => (next) => (action) => {
  // Variables pour les CREATE_USER/DEV
  let messageError = [];
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  const {
    inputMail,
    inputPassword,
    checkPassword,
    inputFirstname,
    inputName,
    isDev,
    inputAddress,
    inputTitle,
    selectedCategory,
    inputDescription,
    xpDate,
    selectedRemote,
    selectedADR,
    selectedArea,
    selectedTechnos,
    favoriteTechno,
    selectedLanguages,
    selectedTools,
    selectedSkills,
  } = store.getState().signup;

  const formData = new FormData();
  // Les informations d'authentification OAuth 2.0
  const clientId = 'f3b6551095efe5a';
  const token = 'c9f20861c03cc7b820100d446d26f59d4e251e11';

  const headers = {
    Authorization: [`Bearer ${token}`, `Client-ID ${clientId}`],
    'Content-Type': 'multipart/form-data',
  };

  switch (action.type) {
    case FETCH_DATA_SIGNUP:
      axios.get(`${import.meta.env.VITE_API_URL}/tools`).then((response) => {
        store.dispatch(updateToolsList(response.data));
      });

      axios
        .get(`${import.meta.env.VITE_API_URL}/softSkills`)
        .then((response) => {
          store.dispatch(updateSkillsList(response.data));
        });

      // axios.get(`${import.meta.env.VITE_API_URL}/categories`).then((response) => {
      //   store.dispatch(updateCategoriesList(response.data));
      // });
      break;

    case GET_OR_CREATE_TOOL:
      axios
        .post(`${import.meta.env.VITE_API_URL}/tools`, {
          tool: action.tool,
        })
        .then((response) => {
          const toolsListIds = store
            .getState()
            .signup.toolsList.map((tool) => tool.id);

          if (!toolsListIds.includes(response.data.id)) {
            store.dispatch(addCreatedTool(response.data));
          }
          store.dispatch(setNewTool(response.data.id));
        })
        .catch((error) => {
          console.log(error);
        });
      break;

    case GET_OR_CREATE_SKILL:
      axios
        .post(`${import.meta.env.VITE_API_URL}/softSkills`, {
          softSkill: action.skill,
        })
        .then((response) => {
          const skillsListIds = store
            .getState()
            .signup.skillsList.map((skill) => skill.id);

          if (!skillsListIds.includes(response.data.id)) {
            store.dispatch(addCreatedSkill(response.data));
          }
          store.dispatch(setNewSkill(response.data.id));
        })
        .catch((error) => {
          console.log(error);
        });
      break;

    case SAVE_SELECTED_PHOTO:
      formData.append('image', store.getState().signup.selectedPhoto);

      axios
        .post('https://api.imgur.com/3/image', formData, {
          headers,
        })
        .then((response) => {
          console.log(response.data);
          store.dispatch(createUser(response.data.link));
        })
        .catch((error) => {
          console.log(error);
        });
      break;

    case CREATE_USER:
      // Vérification de l'email
      if (!emailRegex.test(inputMail) && inputMail !== '') {
        messageError = [...messageError, "L'email est invalide"];
      }
      if (inputMail === '') {
        messageError = [...messageError, "L'email n'est pas renseigné"];
      }

      // Vérification du mot de passe
      if (!passwordRegex.test(inputPassword) && inputPassword !== '') {
        messageError = [...messageError, 'Le mot de passe est invalide'];
      }
      if (inputPassword === '') {
        messageError = [...messageError, "Le mot de passe n'est pas renseigné"];
      }
      if (inputPassword !== checkPassword && checkPassword !== '') {
        messageError = [
          ...messageError,
          'Les deux champs mot de passe doivent être identiques',
        ];
      }
      if (checkPassword === '') {
        messageError = [
          ...messageError,
          "La confirmation de mot de passe n'est pas renseigné",
        ];
      }

      // Vérification du prénom et du nom
      if (inputFirstname === '') {
        messageError = [...messageError, "Le prénom n'est pas renseigné"];
      }
      if (inputName === '') {
        messageError = [...messageError, "Le nom n'est pas renseigné"];
      }

      // -------- PARTIE DEV --------
      // Vérification de l'adresse
      if (inputAddress === '' && isDev) {
        messageError = [...messageError, "L'adresse n'est pas renseignée"];
      }
      // Vérification du titre
      if (inputTitle === '' && isDev) {
        messageError = [...messageError, "Le titre n'est pas renseigné"];
      }
      // Vérification de la catégorie
      if (selectedCategory === '' && isDev) {
        messageError = [...messageError, "La catégorie n'est pas renseignée"];
      }
      // Vérification de la description
      if (inputDescription === '' && isDev) {
        messageError = [...messageError, "La description n'est pas renseignée"];
      }
      // Vérification de la date de début d'expérience
      if (xpDate === '' && isDev) {
        messageError = [
          ...messageError,
          "La date de début d'expérience n'est pas renseignée",
        ];
      }
      // Vérification du remote
      if (selectedRemote === '' && isDev) {
        messageError = [
          ...messageError,
          "La possibilité de remote n'est pas renseignée",
        ];
      }
      // Vérification de la capacité de déplacement
      if ((selectedArea === '' || selectedArea <= 0) && isDev) {
        messageError = [
          ...messageError,
          'La capacité de déplacement ne peut pas être égale à 0km',
        ];
      }
      // Vérification du tjm
      if ((selectedADR === '' || selectedADR <= 0) && isDev) {
        messageError = [
          ...messageError,
          'Le taux journalier ne peut pas être égal à 0€',
        ];
      }
      // Vérification des technos sélectionnées
      if (selectedTechnos.length === 0 && isDev) {
        messageError = [
          ...messageError,
          'La liste des technos ne peut pas être vide',
        ];
      }
      // Vérification de la techno favorite
      if (favoriteTechno === '' && isDev) {
        messageError = [
          ...messageError,
          'Une techno préférée doit être renseignée',
        ];
      }
      // Vérification des langues sélectionnées
      if (selectedLanguages.length === 0 && isDev) {
        messageError = [
          ...messageError,
          'La liste des langues ne peut pas être vide',
        ];
      }
      // Vérification des outils sélectionnées
      if (selectedTools.length === 0 && isDev) {
        messageError = [
          ...messageError,
          'La liste des outils ne peut pas être vide',
        ];
      }
      // Vérification des compétences sélectionnées
      if (selectedSkills.length === 0 && isDev) {
        messageError = [
          ...messageError,
          'La liste des compétences ne peut pas être vide',
        ];
      }

      // Envoie à la BDD pour créer l'utilisateur
      if (messageError.length === 0) {
        axios
          .post(
            `${import.meta.env.VITE_API_URL}/users`,
            {
              mail: store.getState().signup.inputMail,
              password: store.getState().signup.inputPassword,
              firstname: store.getState().signup.inputFirstname,
              lastname: store.getState().signup.inputName,
              image: action.photoLink,
              role_name: store.getState().signup.isDev ? 'dev' : 'user',
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
          .then((response) => {
            if (store.getState().signup.isDev) {
              store.dispatch(createDev(response.data.id));
            }
            store.dispatch(submitLogin());
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        store.dispatch(messageErrorSignup(messageError));
      }
      break;

    case CREATE_DEV:
      axios
        .post(
          `${import.meta.env.VITE_API_URL}/devs`,
          {
            title: store.getState().signup.inputTitle,
            description: store.getState().signup.inputDescription,
            categoryId: store.getState().signup.selectedCategory,
            address: store.getState().signup.selectedAddress.properties.label,
            zip_code:
              store.getState().signup.selectedAddress.properties.postcode,
            city: store.getState().signup.selectedAddress.properties.city,
            country: 'France',
            adr: store.getState().signup.selectedADR,
            experience: store.getState().signup.xpDate,
            longitude:
              store.getState().signup.selectedAddress.geometry.coordinates[0],
            latitude:
              store.getState().signup.selectedAddress.geometry.coordinates[1],
            activity_area: store.getState().signup.selectedArea,
            availability: 'disponible',
            remote: store.getState().signup.selectedRemote,
            favorite_techno: store.getState().signup.favoriteTechno,
            userId: action.userId,
            technoId: store.getState().signup.selectedTechnos,
            languageId: store.getState().signup.selectedLanguages,
            softSkillId: store.getState().signup.selectedSkills,
            toolId: store.getState().signup.selectedTools,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.log(error);
        });
      break;

    default:
      break;
  }

  next(action);
};

export default signupMiddleware;
