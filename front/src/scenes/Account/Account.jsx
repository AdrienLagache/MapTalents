import jwtDecode from 'jwt-decode';
// Import des feuilles de style
import './Account.scss';

// Import de React
import { useEffect } from 'react';

// Import des Icons de React Feather
import { CheckSquare, X } from 'react-feather';

// Import de React-Router-Dom
import { useNavigate, useParams } from 'react-router-dom';

// Import de Redux
import { useSelector, useDispatch } from 'react-redux';
import {
  apiAddress,
  fetchDataFilter,
  selectAddress,
} from '../../services/actions/filterActions';
import { fetchDataSignup } from '../../services/actions/signupActions';
import {
  setNewAddress,
  setNewTjm,
  setNewFirstname,
  setNewMail,
  setNewName,
  setNewTitle,
  changeInputTool,
  changeInputSkill,
  setSelectedCategory,
  removeDevLanguage,
  removeDevTool,
  removeDevSkill,
  setDevLanguage,
  getOrCreateTool,
  getOrCreateSkill,
  changeDevExperience,
  changeDevDescription,
  changeDevAddress,
  updateOneDev,
  toggleEditProfil,
  fetchAccountUser,
  updateOneUser,
  toggleEditSkills,
  changeInputExperience,
} from '../../services/actions/accountActions';

const Account = () => {
  const dispatch = useDispatch();

  // Récupération du token depuis le localStorage
  const token = localStorage.getItem('token');
  // Utilisation de jwt_decode pour décoder le token
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);

  // Extraction de l'userId depuis le token (assumes que le token a une propriété userId)
  const { userId } = decodedToken;
  console.log(userId);
  const userLogged = useSelector((state) => state.auth.userId);

  // --------------------- Profil ---------------------------------------------------------------
  const newFile = useSelector((state) => state.account.newFile);
  const inputAddress = useSelector((state) => state.account.inputAddress);
  const inputTjm = useSelector((state) => state.account.inputTjm);
  const adressList = useSelector((state) => state.filter.dataFilter.adressList);
  // const isAvailable = useSelector((state) => state.account.isAvailable);
  // ---------------------------------------------------------------------------------------------

  // --------------------- Skills ---------------------------------------------------------------
  const isEditingProfil = useSelector((state) => state.account.isEditingProfil);
  const isEditingSkills = useSelector((state) => state.account.isEditingSkills);
  const devId = useSelector((state) => state.account.devId);
  const roleName = useSelector((state) => state.account.roleName);
  const languagesList = useSelector(
    (state) => state.filter.dataFilter.languagesList
  );
  const categoriesList = useSelector(
    (state) => state.filter.dataFilter.categoriesList
  );
  const toolsList = useSelector((state) => state.signup.toolsList);
  const skillsList = useSelector((state) => state.signup.skillsList);
  const devLanguages = useSelector((state) => state.account.devLanguages);
  const devTools = useSelector((state) => state.account.devTools);
  const devSkills = useSelector((state) => state.account.devSkills);
  const devExperience = useSelector((state) => state.account.devExperience);
  const devTjm = useSelector((state) => state.account.devTjm);
  const devPhoto = useSelector((state) => state.account.devPhoto);
  const devName = useSelector((state) => state.account.devName);
  const devFirstname = useSelector((state) => state.account.devFirstname);
  const devMail = useSelector((state) => state.account.devMail);
  const devTitle = useSelector((state) => state.account.devTitle);
  const devAddress = useSelector((state) => state.account.devAddress);
  const devCity = useSelector((state) => state.account.devCity);
  const devZipCode = useSelector((state) => state.account.devZipCode);
  const devDescription = useSelector((state) => state.account.devDescription);
  const devCategory = useSelector((state) => state.account.devCategory);
  const categoryLabel = useSelector((state) => state.account.categoryLabel);
  const inputToolName = useSelector((state) => state.account.inputToolName);
  const inputSkillName = useSelector((state) => state.account.inputSkillName);
  // ---------------------------------------------------------------------------------------------

  useEffect(() => {
    dispatch(fetchDataFilter());
    dispatch(fetchDataSignup());
    dispatch(fetchAccountUser(userId));

    // Vérifie si la personne connectée est bien la personne du compte
    // // TODO: Supprimer ce commentaire pour accéder de nouveau à la vérification du user
    // // if (userLogged !== parseInt(userId, 10)) {
    // //   navigateTo(`/liste`);
    // // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="myaccount-container">
      {/* {isEditingProfil && ( */}
      <div className="profil-section">
        <h2 className="section-title">
          Mon profil
          <button
            type="button"
            className="section-button"
            onClick={(event) => {
              if (!isEditingProfil) {
                dispatch(toggleEditProfil());
              } else {
                event.preventDefault();
                if (roleName === 'dev') {
                  dispatch(updateOneDev(devId));
                  dispatch(updateOneUser(userId));
                } else {
                  dispatch(updateOneUser(userId));
                }
                dispatch(toggleEditProfil());
              }
            }}
          >
            {!isEditingProfil ? 'MODIFIER' : 'VALIDER'}
          </button>
        </h2>
        <div className="avatar-image">
          {isEditingProfil && (
            <input
              type="file"
              id="fileInput" // Identifiant de l'input
              accept="image/*" // Types de fichiers acceptés (images)
              style={{ display: 'none' }} // Cacher l'input
              onChange={() => dispatch(newFile(newFile))} // Gérer le changement de fichier
            />
          )}
          <label htmlFor="fileInput">
            {isEditingProfil && <div className="camera-icon">📷</div>}
            <img
              src={devPhoto} // Source de l'image de la photo
              alt="Avatar"
              className="avatar-photo"
            />
          </label>
        </div>

        <fieldset className="profile-fieldset">
          {!isEditingProfil && <p className="profil-item">{devName}</p>}
          {isEditingProfil && (
            <input
              id="name"
              className="profile-input"
              name="name"
              type="text"
              placeholder="Renseigne ton Nom"
              autoComplete="family-name"
              value={devName}
              onChange={(e) => dispatch(setNewName(e.target.value))}
            />
          )}
        </fieldset>
        <fieldset className="profile-fieldset">
          {!isEditingProfil && <p className="profil-item">{devFirstname}</p>}
          {isEditingProfil && (
            <input
              id="firstname"
              name="firstname"
              type="text"
              placeholder="Renseigne ton Prénom"
              autoComplete="given-name"
              value={devFirstname}
              onChange={(e) => dispatch(setNewFirstname(e.target.value))}
              className="profile-input"
            />
          )}
        </fieldset>
        <fieldset className="profile-fieldset">
          {!isEditingProfil && <p className="profil-item">{devMail}</p>}
          {isEditingProfil && (
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Renseigne ton Email"
              autoComplete="email"
              value={devMail}
              onChange={(e) => dispatch(setNewMail(e.target.value))}
              className="profile-input"
            />
          )}
        </fieldset>

        {roleName === 'dev' && (
          <div className="profile-Dev">
            <fieldset>
              {!isEditingProfil && <p className="profil-item">{devTitle}</p>}
              {isEditingProfil && (
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Renseigne un titre d'accroche"
                  value={devTitle}
                  onChange={(e) => dispatch(setNewTitle(e.target.value))}
                  className="profile-input"
                />
              )}
            </fieldset>
            <fieldset className="profile-fieldset">
              {!isEditingProfil && (
                <p className="profil-item">
                  <span className="address-label">{devAddress}</span>
                  {/* <br /> */}
                  {/* <span className="address-city">{`${devZipCode} ${devCity}`}</span> */}
                </p>
              )}
              {isEditingProfil && (
                <div>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Renseigne ton adresse"
                    value={inputAddress === null ? devAddress : inputAddress}
                    autoComplete="street-address"
                    onChange={(event) => {
                      dispatch(apiAddress(event.target.value));
                      dispatch(setNewAddress(event.target.value));
                    }}
                    className="profile-input"
                  />
                </div>
              )}
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
                        dispatch(changeDevAddress(item.properties));
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
                          dispatch(changeDevAddress(item.properties));
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
              {/* <label htmlFor="description"></label> */}
              {!isEditingProfil && <p>{devDescription}</p>}
              {isEditingProfil && (
                <input
                  id="description"
                  name="description"
                  type="text"
                  value={devDescription}
                  onChange={(e) => {
                    // dispatch(setNewDescription(e.target.value));
                    dispatch(changeDevDescription(e.target.value));
                  }}
                  className="profile-input"
                />
              )}
            </fieldset>
            {/* <div
              className={`availability ${
                isAvailable ? 'available' : 'unavailable'
              }`}
            >
              <div className="availability-indicator">
                <span className="edit-icon">✏️</span>
                {isAvailable ? (
                  <span className="availability-icon green-icon">🟢</span>
                ) : (
                  <span className="availability-icon red-icon">🔴</span>
                )}
                <p>{isAvailable ? 'Disponible' : 'Non disponible'}</p>
              </div>
            </div> */}
          </div>
        )}
      </div>

      {roleName === 'dev' && (
        <div className="skills-section">
          <h2 className="section-title">
            Mes compétences
            <button
              type="button"
              className="section-button"
              onClick={(event) => {
                if (!isEditingSkills) {
                  dispatch(toggleEditSkills());
                } else {
                  event.preventDefault();
                  if (roleName === 'dev') {
                    dispatch(updateOneDev(devId));
                    dispatch(updateOneUser(userId));
                  } else {
                    dispatch(updateOneUser(userId));
                  }
                  dispatch(toggleEditSkills());
                }
              }}
            >
              {!isEditingSkills ? 'MODIFIER' : 'VALIDER'}
            </button>
          </h2>
          <div className="skill-type">
            <h3 className="skill-item">Catégorie de profil :</h3>
            {!isEditingSkills && (
              <label htmlFor="category">{categoryLabel}</label>
            )}
            {isEditingSkills && (
              <select
                required
                id="category"
                name="category"
                value={devCategory}
                onChange={(event) =>
                  dispatch(
                    setSelectedCategory(parseInt(event.target.value, 10))
                  )
                }
              >
                {categoriesList.map((cat) => (
                  <option key={`cat-${cat.id}`} value={cat.id}>
                    {cat.category}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="skill-type">
            <h3 className="skill-item">Taux journalier :</h3>
            {!isEditingSkills && <label htmlFor="tjm">{devTjm}€ / jour</label>}

            {isEditingSkills && (
              <input
                id="tjm"
                name="tjm"
                type="text"
                placeholder="250 €"
                value={devTjm}
                onChange={(event) => {
                  if (event.target.value !== '') {
                    dispatch(setNewTjm(parseInt(event.target.value, 10)));
                  } else {
                    // Si newValue est vide (empêche la valeur NaN à cause du parseInt)
                    dispatch(setNewTjm(''));
                  }
                }}
              />
            )}
          </div>

          <div className="skill-type">
            <h3>Langues : </h3>
            {isEditingSkills && (
              <div className="add-skill">
                <label htmlFor="lang-select">Langues disponibles</label>
                <select
                  className="skill-select"
                  id="lang-select"
                  name="lang-select"
                  onChange={(e) => {
                    dispatch(setDevLanguage(parseInt(e.target.value, 10)));
                  }}
                >
                  <option value="">-- ajoutez des langues --</option>
                  {languagesList.map((lang) => (
                    <option key={`lang-${lang.id}`} value={lang.id}>
                      {lang.language}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="dev-skill">
              {languagesList.map((lang) => {
                if (devLanguages.includes(lang.id)) {
                  return (
                    <div key={`lang-${lang.id}`} className="skill-item">
                      <span>{lang.language}</span>
                      {isEditingSkills && (
                        <button
                          type="button"
                          onClick={() => {
                            dispatch(removeDevLanguage(lang.id));
                          }}
                        >
                          <X size="0.8rem" />
                        </button>
                      )}
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>

          <div className="skill-type">
            <h3>Outils :</h3>
            {isEditingSkills && (
              <div className="add-skill">
                <label htmlFor="tool-input">Ajoutez des outils</label>
                <input
                  className="skill-input"
                  id="tool-input"
                  name="tool-input"
                  type="text"
                  value={inputToolName}
                  onChange={(e) => {
                    dispatch(changeInputTool(e.target.value));
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.target.value) {
                      dispatch(getOrCreateTool(e.target.value));
                    }
                  }}
                />
              </div>
            )}
            <div className="dev-skill">
              {toolsList.map((tool) => {
                if (devTools.includes(tool.id)) {
                  return (
                    <div key={`tool-${tool.id}`} className="skill-item">
                      <span>{tool.tool}</span>
                      {isEditingSkills && (
                        <button
                          type="button"
                          onClick={() => {
                            dispatch(removeDevTool(tool.id));
                          }}
                        >
                          <X size="0.8rem" />
                        </button>
                      )}
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>

          <div className="skill-type">
            <h3>Qualités</h3>
            {isEditingSkills && (
              <div className="add-skill">
                <label htmlFor="softSkill-input">Ajoutez des qualités</label>
                <input
                  className="skill-input"
                  id="softSkill-input"
                  name="softSkill-input"
                  type="text"
                  value={inputSkillName}
                  onChange={(e) => {
                    dispatch(changeInputSkill(e.target.value));
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.target.value) {
                      dispatch(getOrCreateSkill(e.target.value));
                    }
                  }}
                />
              </div>
            )}
            <div className="dev-skill">
              {skillsList.map((skill) => {
                if (devSkills.includes(skill.id)) {
                  return (
                    <div key={`skill-${skill.id}`} className="skill-item">
                      <span>{skill.softSkill}</span>
                      {isEditingSkills && (
                        <button
                          type="button"
                          onClick={() => {
                            dispatch(removeDevSkill(skill.id));
                          }}
                        >
                          <X size="0.8rem" />
                        </button>
                      )}
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>

          <div className="skill-type">
            <h3>Expérience :</h3>
            {isEditingSkills && (
              <div className="add-skill">
                <label htmlFor="experience-input">
                  Modifiez votre date de début
                </label>

                <input
                  className="skill-input"
                  id="experience-input"
                  name="experience-input"
                  type="date"
                  value={new Date(devExperience).toLocaleDateString('fr-CA')}
                  onChange={(e) => {
                    dispatch(changeInputExperience(e.target.value));
                    dispatch(changeDevExperience(e.target.value));
                  }}
                />
              </div>
            )}
            {!isEditingSkills && (
              <p className="dev-skill">
                Date de début d&apos;activité :{' '}
                {new Date(devExperience).toLocaleDateString('fr-FR')}
              </p>
            )}
          </div>
        </div>
      )}
      {isEditingProfil && (
        <div>
          <button
            type="button"
            className="submit-button"
            onClick={(event) => {
              event.preventDefault();
              if (roleName === 'dev') {
                dispatch(updateOneDev(devId));
                dispatch(updateOneUser(userId));
              } else {
                dispatch(updateOneUser(userId));
              }
            }}
          >
            Valider mes modifications
            <span>
              <CheckSquare size={16} />
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Account;
