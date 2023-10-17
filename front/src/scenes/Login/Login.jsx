import { useEffect } from 'react';
// Import des feuilles de style
import './Login.scss';

// Import de React-Router.
import { Link, useNavigate } from 'react-router-dom';

// Import des Icons de React Feather
import { useSelector, useDispatch } from 'react-redux';
import { AtSign, Lock, LogIn } from 'react-feather';
import {
  submitLogin,
  changeSettingsField,
} from '../../services/actions/authActions';

const Login = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const email = useSelector((state) => state.auth.email);
  const password = useSelector((state) => state.auth.password);
  const role = useSelector((state) => state.auth.role);
  const isLogged = useSelector((state) => state.auth.logged);

  useEffect(() => {
    if (isLogged && role === 'admin') {
      navigateTo('/admin');
    } else if (isLogged && (role === 'user' || role === 'dev')) {
      navigateTo('/carte');
    }
  }, [isLogged, navigateTo, role]);

  return (
    <div className="Login">
      <div className="Login-container">
        <h1 className="Login-title">Se connecter</h1>
        <form
          className="Login-form"
          onSubmit={(event) => {
            event.preventDefault();
            dispatch(submitLogin());
          }}
        >
          <fieldset>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Insérer l'email"
              autoComplete="email"
              value={email}
              onChange={(event) => {
                dispatch(
                  changeSettingsField(event.target.value, event.target.name)
                );
              }}
            />
            <span>
              <AtSign size={16} />
            </span>
          </fieldset>
          <fieldset>
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="off"
              placeholder="Insérer le mot de passe"
              value={password}
              onChange={(event) => {
                dispatch(
                  changeSettingsField(event.target.value, event.target.name)
                );
              }}
            />
            <span>
              <Lock size={16} />
            </span>
          </fieldset>
          <button className="Login-submit-button" type="submit">
            <p>Se connecter</p>
            <span>
              <LogIn size={16} />
            </span>
          </button>
        </form>
        <p className="Login-link-signin">
          Pas encore inscrit ? <Link to="/inscription">Rejoins-nous !</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
