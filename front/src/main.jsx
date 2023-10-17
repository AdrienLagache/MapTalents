import React from 'react';
import ReactDOM from 'react-dom/client';

// Import de React-Router
import { BrowserRouter } from 'react-router-dom';

// Import de Redux
import { Provider } from 'react-redux';
import store from './services/store';

// Import de MapBox
import 'mapbox-gl/dist/mapbox-gl.css';

import App from './App/App';
import './styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
