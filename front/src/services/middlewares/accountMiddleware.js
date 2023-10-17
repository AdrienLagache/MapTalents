import axios from 'axios';
import {
  FETCH_ACCOUNT_USER,
  fetchOneDev,
  FETCH_ONE_DEV,
  GET_OR_CREATE_SKILL,
  GET_OR_CREATE_TOOL,
  setDevInfos,
  setDevSkill,
  setDevTool,
  setIsSetDev,
  setUserInfos,
  toggleEditProfil,
  toggleEditSkills,
  UPDATE_ONE_DEV,
  UPDATE_ONE_USER,
} from '../actions/accountActions';
// import { FETCH_ONE_USER } from '../actions/backOfficeActions';

import { addCreatedSkill, addCreatedTool } from '../actions/signupActions';

const accountMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_ACCOUNT_USER:
      axios
        .get(`${import.meta.env.VITE_API_URL}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((response) => {
          console.log(response.data, localStorage.getItem('token'));
          if (!store.getState().isSetUser) {
            store.dispatch(
              setUserInfos(
                response.data.payload.user.role,
                response.data.payload.user.image,
                response.data.payload.user.lastname,
                response.data.payload.user.firstname,
                response.data.payload.user.mail
              )
            );
            if (response.data.payload.user.role === 'dev') {
              store.dispatch(fetchOneDev(response.data.payload.user.id));
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
      break;

    case FETCH_ONE_DEV:
      axios
        .get(`${import.meta.env.VITE_API_URL}/devs/userId/${action.userId}`)
        .then((response) => {
          if (!store.getState().isSetDev) {
            store.dispatch(
              setDevInfos(
                response.data.id,
                response.data.language.map((lang) => lang.id),
                response.data.tool.map((tool) => tool.id),
                response.data.softSkill.map((skill) => skill.id),
                response.data.experience,
                response.data.category.id,
                response.data.category.category,
                response.data.adr,
                response.data.title,
                response.data.address,
                response.data.city,
                response.data.zip_code,
                response.data.longitude,
                response.data.latitude,
                response.data.description
              )
            );
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          store.dispatch(setIsSetDev());
        });
      break;

    case UPDATE_ONE_DEV:
      axios
        .patch(`${import.meta.env.VITE_API_URL}/devs/${action.devId}`, {
          languageId: store.getState().account.devLanguages,
          toolId: store.getState().account.devTools,
          softSkillId: store.getState().account.devSkills,
          experience: store.getState().account.devExperience,
          categoryId: store.getState().account.devCategory,
          adr: store.getState().account.devTjm,
          title: store.getState().account.devTitle,
          description: store.getState().account.devDescription,
          address: store.getState().account.devAddress,
          city: store.getState().account.devCity,
          zip_code: store.getState().account.devZipCode,
          longitude: store.getState().account.devCoordinates[0],
          lattitude: store.getState().account.devCoordinates[1],
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });

      break;

    case UPDATE_ONE_USER:
      axios
        .patch(`${import.meta.env.VITE_API_URL}/users/${action.userId}`, {
          image: store.getState().account.devPhoto,
          lastname: store.getState().account.devName,
          firstname: store.getState().account.devFirstname,
          mail: store.getState().account.devMail,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });

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
          store.dispatch(setDevTool(response.data.id));
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
          store.dispatch(setDevSkill(response.data.id));
        })
        .catch((error) => {
          console.log(error);
        });
      break;

    // case FETCH_DATA_ACCOUNT:
    //   axios.get(`${import.meta.env.VITE_API_URL}/technos`);

    default:
      break;
  }

  next(action);
};

export default accountMiddleware;
