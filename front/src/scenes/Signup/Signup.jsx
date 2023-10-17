// Import de React
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Import des Icons de React Feather
import {
  Camera,
  AlertCircle,
  CheckCircle,
  X,
  Code,
  Briefcase,
  CheckSquare,
} from 'react-feather';

// Import de Redux
import { useSelector, useDispatch } from 'react-redux';
import {
  apiAddress,
  fetchDataFilter,
  selectAddress,
} from '../../services/actions/filterActions';
import {
  checkNewPassword,
  createUser,
  fetchDataSignup,
  getOrCreateSkill,
  getOrCreateTool,
  removeSelectedLanguage,
  removeSelectedSkill,
  removeSelectedTechno,
  removeSelectedTool,
  saveSelectedPhoto,
  setConfirmNewPassword,
  setExperienceDate,
  setFavoriteTechno,
  setIsDev,
  setNewAddress,
  setNewADR,
  setNewDescription,
  setNewFirstname,
  setNewMail,
  setNewName,
  setNewPassword,
  setNewTitle,
  setSelectedAddress,
  setSelectedArea,
  setSelectedCategory,
  setSelectedlanguages,
  setSelectedPhoto,
  setSelectedRemote,
  setSelectedTechnos,
} from '../../services/actions/signupActions';
import './Signup.scss';

const Signup = () => {
  // ------------- datas affichage ----------------
  const isDev = useSelector((state) => state.signup.isDev);
  const error = useSelector((state) => state.signup.error);
  const messageError = useSelector((state) => state.signup.messageError);
  const adressList = useSelector((state) => state.filter.dataFilter.adressList);
  const languagesList = useSelector(
    (state) => state.filter.dataFilter.languagesList
  );
  const technosList = useSelector(
    (state) => state.filter.dataFilter.technosList
  );
  const categoriesList = useSelector(
    (state) => state.filter.dataFilter.categoriesList
  );
  const toolsList = useSelector((state) => state.signup.toolsList);
  const skillsList = useSelector((state) => state.signup.skillsList);

  // ------------- formulaire user ----------------
  const dispatch = useDispatch();
  const inputMail = useSelector((state) => state.signup.inputMail);
  const inputPassword = useSelector((state) => state.signup.inputPassword);
  const checkPassword = useSelector((state) => state.signup.checkPassword);
  const inputName = useSelector((state) => state.signup.inputName);
  const inputFirstname = useSelector((state) => state.signup.inputFirstname);
  const selectedPhoto = useSelector((state) => state.signup.selectedPhoto);
  const navigate = useNavigate();
  const isLogged = useSelector((state) => state.auth.logged);

  // ------------- formulaire dev ----------------
  // const selectedAddress = useSelector((state) => state.signup.selectedAddress);
  const inputAddress = useSelector((state) => state.signup.inputAddress);
  const inputTitle = useSelector((state) => state.signup.inputTitle);
  const inputDescription = useSelector(
    (state) => state.signup.inputDescription
  );
  const selectedTechnos = useSelector((state) => state.signup.selectedTechnos);
  const selectedLanguages = useSelector(
    (state) => state.signup.selectedLanguages
  );
  const selectedADR = useSelector((state) => state.signup.selectedADR);
  const selectedArea = useSelector((state) => state.signup.selectedArea);
  const selectedTools = useSelector((state) => state.signup.selectedTools);
  const selectedSkills = useSelector((state) => state.signup.selectedSkills);
  const xpDate = useSelector((state) => state.signup.xpDate);
  const favoriteTechno = useSelector((state) => state.signup.favoriteTechno);

  // Scroll Up lorsqu'on clique sur un nouveau profil
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [messageError]);

  useEffect(() => {
    if (isDev) {
      dispatch(fetchDataFilter());
      dispatch(fetchDataSignup());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDev]);

  let logoFavoriteTechno = '';
  if (favoriteTechno !== '') {
    logoFavoriteTechno = technosList.find(
      (item) => item.techno === favoriteTechno
    ).logo;
  } else {
    logoFavoriteTechno =
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/langfr-220px-ChatGPT_logo.svg.png';
  }
  // Utilisation de useEffect pour surveiller les changements de isLogged
  useEffect(() => {
    if (isLogged) {
      // Si isLogged devient vrai, on redirige le user vers la carte
      navigate('/carte');
    }
  }, [isLogged, navigate]); // Déclencher ce useEffect lorsque isLogged change

  return (
    <div className="Signup">
      <div className="Signup-container">
        <h1>Parle-nous de toi !</h1>
        <div className="Signup-container-buttons">
          <button
            type="button"
            className={!isDev ? 'selected' : ''}
            onClick={() => dispatch(setIsDev(false))}
          >
            <span>
              <Briefcase size={16} />
            </span>
            Je suis recruteur
          </button>
          <button
            type="button"
            className={isDev ? 'selected' : ''}
            onClick={() => dispatch(setIsDev(true))}
          >
            <span>
              <Code size={16} />
            </span>
            Je suis développeur
          </button>
        </div>

        {messageError.length > 0 ? (
          <ul className="Signup-container-messages">
            {messageError.map((item) => (
              <li key={item}>
                <span>
                  <X size={16} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        ) : (
          ''
        )}

        <form className="Signup-container-form">
          <div className="user-block">
            <div className="user-block-left">
              <fieldset>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Renseigne ton Email"
                  autoComplete="email"
                  value={inputMail}
                  onChange={(event) => dispatch(setNewMail(event.target.value))}
                />
              </fieldset>
              <fieldset>
                <label htmlFor="password">Mot de passe</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Renseigne ton mot de passe"
                  value={inputPassword}
                  autoComplete="new-password"
                  onChange={(event) => {
                    dispatch(setNewPassword(event.target.value));
                    dispatch(checkNewPassword(event.target.value));
                  }}
                />
              </fieldset>
              <fieldset>
                <label htmlFor="password-check">
                  Confirmation de mot de passe
                </label>
                <input
                  id="password-check"
                  name="password-check"
                  type="password"
                  placeholder="Confirme ton mot de passe"
                  value={checkPassword}
                  autoComplete="new-password"
                  onChange={(event) => {
                    dispatch(setConfirmNewPassword(event.target.value));
                    dispatch(checkNewPassword(event.target.value));
                  }}
                />
                {error !== '' && (
                  <p className="error">
                    <span>
                      <AlertCircle size={16} strokeWidth={2} />
                    </span>
                    {error}
                  </p>
                )}
              </fieldset>
              <div className="name">
                <fieldset>
                  <label htmlFor="name">Nom</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Renseigne ton nom"
                    value={inputName}
                    autoComplete="family-name"
                    onChange={(event) =>
                      dispatch(setNewName(event.target.value))
                    }
                  />
                </fieldset>
                <fieldset>
                  <label htmlFor="firstname">Prénom</label>
                  <input
                    id="firstname"
                    name="firstname"
                    type="text"
                    placeholder="Renseigne ton prénom"
                    value={inputFirstname}
                    autoComplete="given-name"
                    onChange={(event) =>
                      dispatch(setNewFirstname(event.target.value))
                    }
                  />
                </fieldset>
              </div>
            </div>
            <div className="user-block-right">
              <fieldset className="image">
                {selectedPhoto !== 'https://i.imgur.com/GlgMGBt.png' ? (
                  <img src={selectedPhoto} alt="Selected Avatar" />
                ) : (
                  <div>
                    <Camera size={64} />
                  </div>
                )}
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/png, image/jpeg"
                  onChange={(e) =>
                    dispatch(
                      setSelectedPhoto(URL.createObjectURL(e.target.files[0]))
                    )
                  }
                />
              </fieldset>
            </div>
          </div>
          {!isDev ? (
            <button
              type="submit"
              className="submit-button"
              onClick={async (event) => {
                event.preventDefault();
                try {
                  await dispatch(saveSelectedPhoto());
                } catch (err) {
                  console.error(
                    "Une erreur s'est produite lors de la création de l'utilisateur : ",
                    err
                  );
                }
              }}
            >
              Valider mon inscription
              <span>
                <CheckSquare size={16} />
              </span>
            </button>
          ) : (
            ''
          )}

          {/* Seconde partie du formulaire isDev = true */}
          {isDev ? (
            <div className="dev-block">
              <h2>Profil de Développeur</h2>
              <fieldset className="address-fieldset">
                <label htmlFor="address">Adresse</label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Renseigne ton adresse"
                  value={inputAddress}
                  autoComplete="street-address"
                  onChange={(event) => {
                    dispatch(apiAddress(event.target.value));
                    dispatch(setNewAddress(event.target.value));
                  }}
                />
                {adressList.length === 0 ? (
                  ''
                ) : (
                  <ul className="autocomplete-address">
                    {adressList.map((item) => (
                      <li
                        key={item.properties.id}
                        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                        role="button"
                        tabIndex={0}
                        onClick={() => {
                          dispatch(
                            selectAddress(
                              item.properties.id,
                              item.properties.label,
                              item.geometry.coordinates[1],
                              item.geometry.coordinates[0]
                            )
                          );
                          dispatch(setNewAddress(item.properties.label));
                          dispatch(setSelectedAddress(item));
                        }}
                        onKeyUp={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            dispatch(
                              selectAddress(
                                item.properties.id,
                                item.properties.label,
                                item.geometry.coordinates[1],
                                item.geometry.coordinates[0]
                              )
                            );
                            dispatch(setNewAddress(item.properties.label));
                            dispatch(setSelectedAddress(item));
                          }
                        }}
                      >
                        {item.properties.label}
                      </li>
                    ))}
                  </ul>
                )}
              </fieldset>
              <fieldset>
                <label htmlFor="title">Titre du profil</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Renseigne un titre d'accroche"
                  value={inputTitle}
                  onChange={(event) =>
                    dispatch(setNewTitle(event.target.value))
                  }
                />
              </fieldset>
              <fieldset>
                <label htmlFor="category">Catégorie de profil</label>
                <select
                  required
                  id="category"
                  name="category"
                  onChange={(event) =>
                    dispatch(
                      setSelectedCategory(parseInt(event.target.value, 10))
                    )
                  }
                >
                  <option value="">-- Sélectionner une catégorie --</option>
                  {categoriesList.map((cat) => (
                    <option key={`cat-${cat.id}`} value={cat.id}>
                      {cat.category}
                    </option>
                  ))}
                </select>
              </fieldset>
              <fieldset>
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  placeholder="Résume qui tu es, ton activité, etc."
                  value={inputDescription}
                  onChange={(event) => {
                    dispatch(setNewDescription(event.target.value));
                  }}
                />
              </fieldset>
              <div className="dev-block-popup">
                <div className="dev-block-left">
                  <fieldset>
                    <label htmlFor="experience">Date d&apos;expérience</label>
                    <input
                      id="experience"
                      name="experience"
                      type="date"
                      value={xpDate}
                      style={
                        xpDate === ''
                          ? { color: '#747474', fontSize: '0.9rem' }
                          : {}
                      }
                      onChange={(e) =>
                        dispatch(setExperienceDate(e.target.value))
                      }
                    />
                  </fieldset>
                  <fieldset>
                    <label htmlFor="remote">Télétravail / Sur site</label>
                    <select
                      id="remote"
                      name="remote"
                      onChange={(event) =>
                        dispatch(setSelectedRemote(event.target.value))
                      }
                    >
                      <option value="Télétravail ou sur site">
                        Télétravail ou sur site
                      </option>
                      <option value="Télétravail uniquement">
                        Télétravail uniquement
                      </option>
                      <option value="Sur site uniquement">
                        Sur site uniquement
                      </option>
                    </select>
                  </fieldset>
                  <fieldset>
                    <label htmlFor="activity-area">
                      Capacité de déplacement<span>(km)</span>
                    </label>
                    <input
                      type="text"
                      id="activity-area"
                      name="activity-area"
                      placeholder="30 km"
                      value={selectedArea}
                      onChange={(event) => {
                        // Regex pour obliger la saisie de numéros
                        const newValue = event.target.value.replace(
                          /[^0-9]/g,
                          ''
                        );
                        if (newValue !== '') {
                          // Si newValue est un nombre
                          dispatch(setSelectedArea(parseInt(newValue, 10)));
                        } else {
                          // Si newValue est vide (empêche la valeur NaN à cause du parseInt)
                          dispatch(setSelectedArea(''));
                        }
                      }}
                    />
                  </fieldset>
                  <fieldset>
                    <label htmlFor="tjm">
                      Taux journalier<span>(€ / jour)</span>
                    </label>
                    <input
                      id="tjm"
                      name="tjm"
                      type="text"
                      placeholder="250 €"
                      value={selectedADR}
                      onChange={(event) => {
                        // Regex pour obliger la saisie de numéros
                        const newValue = event.target.value.replace(
                          /[^0-9]/g,
                          ''
                        );
                        if (newValue !== '') {
                          // Si newValue est un nombre
                          dispatch(setNewADR(parseInt(newValue, 10)));
                        } else {
                          // Si newValue est vide (empêche la valeur NaN à cause du parseInt)
                          dispatch(setNewADR(''));
                        }
                      }}
                    />
                  </fieldset>
                </div>
                <div className="dev-block-right">
                  <div className="container">
                    <div className="container-header">
                      <span className="favorite-techno">
                        <img
                          src={logoFavoriteTechno}
                          alt="Logo de la techno"
                          crossOrigin="anonymous"
                        />
                      </span>
                    </div>
                    <picture>
                      <img
                        src={selectedPhoto}
                        alt="avatar de présentation"
                        crossOrigin="anonymous"
                      />
                      {inputFirstname === '' && inputName === '' ? (
                        ''
                      ) : (
                        <p className="name">{`${inputFirstname} ${inputName}`}</p>
                      )}
                    </picture>
                    <div className="container-info">
                      <p className="title">{inputTitle}</p>
                      <p className="availability">
                        <span>
                          <CheckCircle
                            size={16}
                            strokeWidth={3}
                            color="#00b530"
                          />
                        </span>
                        Disponible
                      </p>
                      <p className="tjm">
                        <span>{selectedADR === '' ? '- ' : selectedADR}€</span>{' '}
                        / jour
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <fieldset>
                <label htmlFor="technos">Liste de tes technos</label>
                <select
                  required
                  id="technos"
                  name="technos"
                  value="0"
                  onChange={(e) =>
                    dispatch(setSelectedTechnos(parseInt(e.target.value, 10)))
                  }
                >
                  <option value="">-- Sélectionner une techno --</option>
                  {technosList.map((tech) => (
                    <option key={`tech-${tech.id}`} value={tech.id}>
                      {tech.techno}
                    </option>
                  ))}
                </select>
                <div className="selected-list">
                  {technosList.map((tech) => {
                    if (selectedTechnos.includes(tech.id)) {
                      return (
                        <button
                          type="button"
                          key={`tags-tech-${tech.id}`}
                          className="selected-tags"
                          onClick={() =>
                            dispatch(removeSelectedTechno(tech.id))
                          }
                        >
                          {tech.techno}
                          <span className="button-tags">
                            <X size="0.8rem" />
                          </span>
                        </button>
                      );
                    }
                    return null;
                  })}
                </div>
              </fieldset>
              <fieldset>
                <label htmlFor="favorite-technos">Une techno préférée ?</label>
                <select
                  required
                  id="favorite-technos"
                  name="favorite-technos"
                  onChange={(e) => dispatch(setFavoriteTechno(e.target.value))}
                >
                  <option value="">
                    -- Sélectionner la techno favorite --
                  </option>
                  {technosList.map((tech) => {
                    if (selectedTechnos.includes(tech.id)) {
                      return (
                        <option
                          key={`fave-tech-${tech.id}`}
                          value={tech.techno}
                        >
                          {tech.techno}
                        </option>
                      );
                    }
                    return null;
                  })}
                </select>
              </fieldset>
              <fieldset>
                <label htmlFor="languages">Langues parlées</label>
                <select
                  required
                  id="languages"
                  name="languages"
                  value="0"
                  onChange={(event) => {
                    dispatch(
                      setSelectedlanguages(parseInt(event.target.value, 10))
                    );
                  }}
                >
                  <option value="">-- Sélectionner une langue --</option>
                  {languagesList.map((lang) => (
                    <option key={`lang-${lang.id}`} value={lang.id}>
                      {lang.language}
                    </option>
                  ))}
                </select>
                <div className="selected-list">
                  {languagesList.map((lang) => {
                    if (selectedLanguages.includes(lang.id)) {
                      return (
                        <button
                          type="button"
                          key={`tags-lang-${lang.id}`}
                          className="selected-tags"
                          onClick={() =>
                            dispatch(removeSelectedLanguage(lang.id))
                          }
                        >
                          {lang.language}
                          <span className="button-tags">
                            <X size="0.8rem" />
                          </span>
                        </button>
                      );
                    }
                    return null;
                  })}
                </div>
              </fieldset>
              <fieldset>
                <label htmlFor="tools">Liste de tes outils</label>
                <input
                  id="tools"
                  name="tools"
                  type="text"
                  placeholder="Renseigne les outils que tu maîtrises"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.target.value) {
                      dispatch(getOrCreateTool(e.target.value));
                      e.target.value = '';
                    }
                  }}
                />
                <div className="selected-list">
                  {toolsList.map((tool) => {
                    if (selectedTools.includes(tool.id)) {
                      return (
                        <button
                          type="button"
                          key={`tool-${tool.id}`}
                          className="selected-tags"
                          onClick={() => dispatch(removeSelectedTool(tool.id))}
                        >
                          {tool.tool}
                          <span type="button" className="button-tags">
                            <X size="0.8rem" />
                          </span>
                        </button>
                      );
                    }
                    return null;
                  })}
                </div>
              </fieldset>
              <fieldset>
                <label htmlFor="softSkills">Liste de tes qualités</label>
                <input
                  id="softSkills"
                  name="softSkills"
                  type="text"
                  placeholder="Renseigne les qualités à mettre en avant"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.target.value) {
                      dispatch(getOrCreateSkill(e.target.value));
                      e.target.value = '';
                    }
                  }}
                />
                <div className="selected-list">
                  {skillsList.map((skill) => {
                    if (selectedSkills.includes(skill.id)) {
                      return (
                        <button
                          type="button"
                          key={`skill-${skill.id}`}
                          className="selected-tags"
                          onClick={() =>
                            dispatch(removeSelectedSkill(skill.id))
                          }
                        >
                          {skill.softSkill}
                          <span className="button-tags">
                            <X size="0.8rem" />
                          </span>
                        </button>
                      );
                    }
                    return null;
                  })}
                </div>
              </fieldset>
              <button
                type="button"
                className="submit-button"
                onClick={async (event) => {
                  event.preventDefault();
                  try {
                    await dispatch(createUser());
                  } catch (err) {
                    console.error(
                      "Une erreur s'est produite lors de la création de l'utilisateur : ",
                      err
                    );
                  }
                }}
              >
                Valider mon inscription
                <span>
                  <CheckSquare size={16} />
                </span>
              </button>
            </div>
          ) : (
            ''
          )}
        </form>
      </div>
    </div>
  );
};

export default Signup;
