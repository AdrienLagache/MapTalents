import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';

import devMiddleware from '../middlewares/devMiddleware';
import filterMiddleware from '../middlewares/filterMiddleware';
import signupMiddleware from '../middlewares/signupMiddleware';
import authMiddleware from '../middlewares/authMiddleware';
import backofficeMiddleware from '../middlewares/backOfficeMiddleware';
import accountMiddleware from '../middlewares/accountMiddleware';

import devReducer from '../reducers/devReducer';
import filterReducer from '../reducers/filterReducer';
import mapReducer from '../reducers/mapReducer';
import signupReducer from '../reducers/signupReducer';
import backOfficeReducer from '../reducers/backOfficeReducer';
import authReducer from '../reducers/authReducer';
import accountReducer from '../reducers/accountReducer';
// import saveStateMiddleware, {
//   loadStateFromLocalStorage,
// } from '../middlewares/saveStateMiddleware';

// Combiner les middlewares
const middlewareEnhancer = applyMiddleware(
  devMiddleware,
  filterMiddleware,
  signupMiddleware,
  authMiddleware,
  backofficeMiddleware,
  accountMiddleware,
  // saveStateMiddleware
);
const enhancer = composeWithDevTools(middlewareEnhancer);

// Combiner les reducers
const reducer = combineReducers({
  dev: devReducer,
  filter: filterReducer,
  map: mapReducer,
  signup: signupReducer,
  backOffice: backOfficeReducer,
  auth: authReducer,
  account: accountReducer,
});

// const initialState = loadStateFromLocalStorage();

const store = createStore(reducer, enhancer);

export default store;
