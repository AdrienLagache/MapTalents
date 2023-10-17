// Import des feuilles de style
import './BackOffice.scss';

// Import de React
import { useEffect } from 'react';

// Import des Icons de React Feather
import {
  Edit,
  Trash2,
  ChevronsLeft,
  ChevronsRight,
  X,
  AlertTriangle,
  CheckSquare,
} from 'react-feather';

// Import de Date-Fns
import { format } from 'date-fns';

// Import de Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  cancelAction,
  closeMessage,
  createDevBackoffice,
  createItem,
  deleteDev,
  deleteItem,
  deleteUser,
  fetchOneUser,
  fetchUsers,
  getOrCreateSkill,
  getOrCreateTool,
  navigationBackoffice,
  openPopupDelete,
  removeItem,
  saveStateItem,
  seeListBackOffice,
  setActionBackoffice,
  setNewValue,
  setUpdateItemState,
  updateDev,
  updateItem,
  updateUser,
} from '../../services/actions/backOfficeActions';
import {
  apiAddress,
  fetchDataFilter,
  selectAddress,
} from '../../services/actions/filterActions';
import { fetchDataSignup } from '../../services/actions/signupActions';

function BackOffice() {
  const dispatch = useDispatch();

  // Pagination
  const limitList = useSelector((state) => state.backOffice.limitList);

  // Liste d'éléments
  const loading = useSelector((state) => state.backOffice.loading);
  const loadingFilter = useSelector((state) => state.filter.dataFilter.loading);
  const technosList = useSelector(
    (state) => state.filter.dataFilter.technosList
  );
  const languagesList = useSelector(
    (state) => state.filter.dataFilter.languagesList
  );
  const categoriesList = useSelector(
    (state) => state.filter.dataFilter.categoriesList
  );
  const toolsList = useSelector((state) => state.signup.toolsList);
  const skillsList = useSelector((state) => state.signup.skillsList);
  const addressList = useSelector(
    (state) => state.filter.dataFilter.adressList
  );
  const usersList = useSelector((state) => state.backOffice.usersList);

  // Eléménts ciblés
  const menuSelected = useSelector((state) => state.backOffice.menuSelected);
  const actionSelected = useSelector(
    (state) => state.backOffice.actionSelected
  );
  const itemId = useSelector((state) => state.backOffice.itemId);
  const itemLabel = useSelector((state) => state.backOffice.itemLabel);

  // Inputs
  const devId = useSelector((state) => state.backOffice.devId);
  const userId = useSelector((state) => state.backOffice.userId);
  const mail = useSelector((state) => state.backOffice.mail);
  const role = useSelector((state) => state.backOffice.role);
  const lastname = useSelector((state) => state.backOffice.lastname);
  const firstname = useSelector((state) => state.backOffice.firstname);
  const address = useSelector((state) => state.backOffice.address);
  const title = useSelector((state) => state.backOffice.title);
  const category = useSelector((state) => state.backOffice.category);
  const description = useSelector((state) => state.backOffice.description);
  const experience = useSelector((state) => state.backOffice.experience);
  const remote = useSelector((state) => state.backOffice.remote);
  const activityArea = useSelector((state) => state.backOffice.activity_area);
  const tjm = useSelector((state) => state.backOffice.tjm);
  const technos = useSelector((state) => state.backOffice.technos);
  const favoriteTechno = useSelector(
    (state) => state.backOffice.favorite_techno
  );
  const languages = useSelector((state) => state.backOffice.languages);
  const tools = useSelector((state) => state.backOffice.tools);
  const skills = useSelector((state) => state.backOffice.skills);

  // Messages
  const successMessage = useSelector(
    (state) => state.backOffice.successMessage
  );
  const popupDelete = useSelector((state) => state.backOffice.popupDelete);
  const idPopup = useSelector((state) => state.backOffice.userIdPopupDelete);
  const rolePopup = useSelector(
    (state) => state.backOffice.userRolePopupDelete
  );

  useEffect(() => {
    // Récupère la liste de tous les utilisateurs
    if (usersList.length === 0) {
      dispatch(fetchUsers());
    }
    if (loadingFilter) {
      // Tools & Skills
      dispatch(fetchDataSignup());
      // Languages & Technos & Categories
      dispatch(fetchDataFilter());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading && loadingFilter) {
    return '';
  }

  return (
    <div className="BackOffice">
      {/* Affichage du message de succès */}
      {successMessage !== '' ? (
        <button
          className="success-message"
          type="button"
          onClick={() => dispatch(closeMessage())}
        >
          <p>{successMessage}</p>
          <span>
            <X />
          </span>
        </button>
      ) : (
        ''
      )}

      {/* Affichage de la popup de confirmation de suppression */}
      {popupDelete ? (
        <div className="popup-delete">
          <div className="popup-delete-container">
            <p>Êtes-vous sûr de vouloir supprimer ce profil ?</p>
            <p>
              <AlertTriangle size={16} /> Cette action est irréversible.
            </p>
            <div className="popup-delete-buttons">
              <button
                type="button"
                onClick={() => {
                  dispatch(
                    rolePopup === 'dev'
                      ? deleteDev(idPopup)
                      : deleteUser(idPopup)
                  );
                }}
              >
                <span>
                  <Trash2 size={16} />
                </span>
                <p>Supprimer</p>
              </button>
              <button
                type="button"
                onClick={() => {
                  dispatch(cancelAction());
                }}
              >
                <span>
                  <X size={16} />
                </span>
                <p>Annuler</p>
              </button>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}

      <nav className="BackOffice-navbar">
        <ul>
          <li>
            <button
              className={menuSelected === 'users' ? 'active' : ''}
              type="button"
              onClick={() => dispatch(navigationBackoffice('users'))}
            >
              Utilisateurs
            </button>
          </li>
          <li>
            <button
              className={menuSelected === 'languages' ? 'active' : ''}
              type="button"
              onClick={() => dispatch(navigationBackoffice('languages'))}
            >
              Langues
            </button>
          </li>
          <li>
            <button
              className={menuSelected === 'technos' ? 'active' : ''}
              type="button"
              onClick={() => dispatch(navigationBackoffice('technos'))}
            >
              Technos
            </button>
          </li>
          <li>
            <button
              className={menuSelected === 'categories' ? 'active' : ''}
              type="button"
              onClick={() => dispatch(navigationBackoffice('categories'))}
            >
              Catégories
            </button>
          </li>
        </ul>
      </nav>

      <div
        className={
          actionSelected === '' && userId === ''
            ? 'BackOffice-container'
            : 'BackOffice-container editor'
        }
      >
        <div className="BackOffice-container-header">
          <h1>
            {/* Titre de la page "sélectionnée" */}
            {menuSelected === 'users' && role === ''
              ? 'Tous les utilisateurs'
              : ''}
            {menuSelected === 'users' && role !== ''
              ? `Modification ${
                  role === 'dev'
                    ? `d'un développeur - Id ${devId} | ${firstname} ${lastname}`
                    : `d'un utilisateur - Id ${userId} | ${firstname} ${lastname}`
                }`
              : ''}

            {menuSelected === 'languages' && actionSelected === ''
              ? 'Toutes les langues'
              : ''}
            {menuSelected === 'languages' && actionSelected === 'create'
              ? "Création d'une langue"
              : ''}
            {menuSelected === 'languages' && actionSelected === 'update'
              ? "Modification d'une langue"
              : ''}

            {menuSelected === 'technos' && actionSelected === ''
              ? 'Toutes les technos'
              : ''}
            {menuSelected === 'technos' && actionSelected === 'create'
              ? "Création d'une techno"
              : ''}
            {menuSelected === 'technos' && actionSelected === 'update'
              ? "Modification d'une techno"
              : ''}

            {menuSelected === 'categories' && actionSelected === ''
              ? 'Toutes les catégories'
              : ''}
            {menuSelected === 'categories' && actionSelected === 'create'
              ? "Création d'une catégorie"
              : ''}
            {menuSelected === 'categories' && actionSelected === 'update'
              ? "Modification d'une catégorie"
              : ''}
          </h1>

          {/* Bouton de création */}
          {menuSelected === 'languages' && actionSelected === '' ? (
            <button
              type="button"
              onClick={() => dispatch(setActionBackoffice('create'))}
            >
              Ajouter une langue
            </button>
          ) : (
            ''
          )}
          {menuSelected === 'technos' && actionSelected === '' ? (
            <button
              type="button"
              onClick={() => dispatch(setActionBackoffice('create'))}
            >
              Ajouter une techno
            </button>
          ) : (
            ''
          )}
          {menuSelected === 'categories' && actionSelected === '' ? (
            <button
              type="button"
              onClick={() => dispatch(setActionBackoffice('create'))}
            >
              Ajouter une catégorie
            </button>
          ) : (
            ''
          )}
        </div>

        {/* Affichage de la liste des Utilisateurs */}
        {menuSelected === 'users' && userId === '' ? (
          <div className="BackOffice-container-list">
            <ul>
              <li>
                <span className="id">Id</span>
                <span className="name">Utilisateur</span>
                <span className="mail">Email</span>
                <span className="role">Rôle</span>
                <span className="date">Créé le</span>
              </li>
              {/* Affiche les 10 éléments en fonction de la range de limitList */}
              {usersList.slice(limitList[0], limitList[1]).map((item) => (
                <li key={item.id}>
                  <div className="block-left">
                    <span className="id">{item.id}</span>
                    <span className="name">{`${item.firstname} ${item.lastname}`}</span>
                    <span className="mail">{`${item.mail}`}</span>
                    <span className="role">{item.role_name}</span>
                    <span className="date">
                      {format(new Date(item.created_at), 'dd/MM/yyyy')}
                    </span>
                  </div>
                  <div className="block-right">
                    <button
                      className="update"
                      type="button"
                      onClick={() => {
                        dispatch(fetchOneUser(item.id));
                      }}
                    >
                      <span>
                        <Edit size={16} />
                      </span>
                      Modifier le profil
                    </button>
                    <button
                      className="delete"
                      type="button"
                      onClick={() => {
                        dispatch(openPopupDelete(item.id, item.role_name));
                      }}
                    >
                      <span>
                        <Trash2 size={16} />
                      </span>
                      Supprimer le profil
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          ''
        )}

        {/* Affichage de la page modification des Utilisateurs */}
        {menuSelected === 'users' && userId !== '' ? (
          <form
            className="BackOffice-container-update"
            onSubmit={(e) => e.preventDefault()}
          >
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
                    value={mail}
                    onChange={(event) =>
                      dispatch(setNewValue(event.target.value, 'mail'))
                    }
                  />
                </fieldset>
                <fieldset>
                  <label htmlFor="role">Rôle</label>
                  <select
                    id="role"
                    name="role"
                    value={role}
                    onChange={(event) =>
                      dispatch(setNewValue(event.target.value, 'role'))
                    }
                  >
                    <option value="user">user</option>
                    <option value="dev">dev</option>
                    <option value="admin">admin</option>
                  </select>
                </fieldset>
              </div>
              <div className="user-block-right">
                <fieldset>
                  <label htmlFor="name">Nom</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Renseigne ton nom"
                    value={lastname}
                    autoComplete="family-name"
                    onChange={(event) =>
                      dispatch(setNewValue(event.target.value, 'lastname'))
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
                    value={firstname}
                    autoComplete="given-name"
                    onChange={(event) =>
                      dispatch(setNewValue(event.target.value, 'firstname'))
                    }
                  />
                </fieldset>
              </div>
            </div>
            {role !== 'dev' ? (
              <button
                type="button"
                className="submit-button"
                onClick={() => {
                  dispatch(updateUser(userId));
                }}
              >
                Modifier le profil
                <span>
                  <CheckSquare size={16} />
                </span>
              </button>
            ) : (
              ''
            )}

            {/* Seconde partie du formulaire si role_name = dev */}
            {role === 'dev' ? (
              <div className="dev-block">
                <h2>Profil de Développeur</h2>
                <fieldset className="address-fieldset">
                  <label htmlFor="address">Adresse</label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Renseigne ton adresse"
                    value={address}
                    autoComplete="street-address"
                    onChange={(event) => {
                      dispatch(apiAddress(event.target.value));
                      dispatch(setNewValue(event.target.value, 'address'));
                    }}
                  />
                  {addressList.length === 0 ? (
                    ''
                  ) : (
                    <ul className="autocomplete-address">
                      {addressList.map((item) => (
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
                            dispatch(setNewValue(item, 'address-full'));
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
                              dispatch(setNewValue(item, 'address-full'));
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
                    value={title}
                    onChange={(event) =>
                      dispatch(setNewValue(event.target.value, 'title'))
                    }
                  />
                </fieldset>
                <fieldset>
                  <label htmlFor="category">Catégorie de profil</label>
                  <select
                    required
                    id="category"
                    name="category"
                    value={category.id}
                    onChange={(event) =>
                      dispatch(
                        setNewValue(
                          event.target.value === ''
                            ? ''
                            : parseInt(event.target.value, 10),
                          'category'
                        )
                      )
                    }
                  >
                    <option value="">-- Sélectionner une catégorie --</option>
                    {categoriesList.map((item) => (
                      <option key={`cat-${item.id}`} value={item.id}>
                        {item.category}
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
                    value={description}
                    onChange={(event) => {
                      dispatch(setNewValue(event.target.value, 'description'));
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
                        value={
                          experience
                            ? format(new Date(experience), 'yyyy-MM-dd')
                            : format(new Date(), 'yyyy-MM-dd')
                        }
                        onChange={(event) =>
                          dispatch(
                            setNewValue(event.target.value, 'experience')
                          )
                        }
                      />
                    </fieldset>
                    <fieldset>
                      <label htmlFor="remote">Télétravail / Sur site</label>
                      <select
                        id="remote"
                        name="remote"
                        value={remote}
                        onChange={(event) =>
                          dispatch(setNewValue(event.target.value, 'remote'))
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
                        value={activityArea}
                        onChange={(event) => {
                          // Regex pour obliger la saisie de numéros
                          const newValue = event.target.value.replace(
                            /[^0-9]/g,
                            ''
                          );
                          if (newValue !== '') {
                            // Si newValue est un nombre
                            dispatch(
                              setNewValue(parseInt(newValue, 10), 'area')
                            );
                          } else {
                            // Si newValue est vide (empêche la valeur NaN à cause du parseInt)
                            dispatch(setNewValue('', 'area'));
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
                        value={tjm === undefined ? '' : tjm}
                        onChange={(event) => {
                          // Regex pour obliger la saisie de numéros
                          const newValue = event.target.value.replace(
                            /[^0-9]/g,
                            ''
                          );
                          if (newValue !== '') {
                            // Si newValue est un nombre
                            dispatch(
                              setNewValue(parseInt(newValue, 10), 'tjm')
                            );
                          } else {
                            // Si newValue est vide (empêche la valeur NaN à cause du parseInt)
                            dispatch(setNewValue('', 'tjm'));
                          }
                        }}
                      />
                    </fieldset>
                  </div>
                </div>
                <fieldset>
                  <label htmlFor="technos">Liste de tes technos</label>
                  <select
                    required
                    id="technos"
                    name="technos"
                    value="0"
                    onChange={(event) =>
                      dispatch(
                        setNewValue(parseInt(event.target.value, 10), 'techno')
                      )
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
                      if (technos.some((item) => item.id === tech.id)) {
                        return (
                          <button
                            type="button"
                            key={`tags-tech-${tech.id}`}
                            className="selected-tags"
                            onClick={() =>
                              dispatch(removeItem(tech.id, 'techno'))
                            }
                          >
                            {tech.techno}
                            <span className="button-tags">
                              <X size="0.8rem" />
                            </span>
                          </button>
                        );
                      }
                      return false;
                    })}
                  </div>
                </fieldset>
                <fieldset>
                  <label htmlFor="favorite-technos">
                    Une techno préférée ?
                  </label>
                  <select
                    required
                    id="favorite-technos"
                    name="favorite-technos"
                    value={favoriteTechno}
                    onChange={(event) =>
                      dispatch(setNewValue(event.target.value, 'f_techno'))
                    }
                  >
                    <option value="">
                      -- Sélectionner la techno favorite --
                    </option>
                    {technosList.map((tech) => {
                      if (technos.some((item) => item.id === tech.id)) {
                        return (
                          <option
                            key={`fave-tech-${tech.id}`}
                            value={tech.techno}
                          >
                            {tech.techno}
                          </option>
                        );
                      }
                      return false;
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
                        setNewValue(
                          parseInt(event.target.value, 10),
                          'language'
                        )
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
                      if (languages.some((item) => item.id === lang.id)) {
                        return (
                          <button
                            type="button"
                            key={`tags-lang-${lang.id}`}
                            className="selected-tags"
                            onClick={() =>
                              dispatch(removeItem(lang.id, 'language'))
                            }
                          >
                            {lang.language}
                            <span className="button-tags">
                              <X size="0.8rem" />
                            </span>
                          </button>
                        );
                      }
                      return false;
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
                      if (tools.some((item) => item.id === tool.id)) {
                        return (
                          <button
                            type="button"
                            key={`tool-${tool.id}`}
                            className="selected-tags"
                            onClick={() =>
                              dispatch(removeItem(tool.id, 'tool'))
                            }
                          >
                            {tool.tool}
                            <span type="button" className="button-tags">
                              <X size="0.8rem" />
                            </span>
                          </button>
                        );
                      }
                      return false;
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
                      if (skills.some((item) => item.id === skill.id)) {
                        return (
                          <button
                            type="button"
                            key={`skill-${skill.id}`}
                            className="selected-tags"
                            onClick={() =>
                              dispatch(removeItem(skill.id, 'skill'))
                            }
                          >
                            {skill.softSkill}
                            <span className="button-tags">
                              <X size="0.8rem" />
                            </span>
                          </button>
                        );
                      }
                      return false;
                    })}
                  </div>
                </fieldset>
                <button
                  type="button"
                  className="submit-button"
                  onClick={() => {
                    dispatch(
                      devId === ''
                        ? createDevBackoffice(userId)
                        : updateDev(devId)
                    );
                  }}
                >
                  Modifier le profil
                  <span>
                    <CheckSquare size={16} />
                  </span>
                </button>
              </div>
            ) : (
              ''
            )}
          </form>
        ) : (
          ''
        )}

        {/* Affichage de la liste des Langues */}
        {menuSelected === 'languages' && actionSelected === '' ? (
          <div className="BackOffice-container-list">
            <ul>
              <li>
                <span className="id">Id</span>
                <span className="language">Langue</span>
              </li>
              {/* Affiche les 10 éléments en fonction de la range de limitList */}
              {languagesList.slice(limitList[0], limitList[1]).map((item) => (
                <li key={item.id}>
                  <div className="block-left">
                    <span className="id">{item.id}</span>
                    <span className="language">{item.language}</span>
                  </div>
                  <div className="block-right">
                    <button
                      className="update"
                      type="button"
                      onClick={() => {
                        dispatch(setActionBackoffice('update'));
                        dispatch(setUpdateItemState(item.id, item.language));
                      }}
                    >
                      <span>
                        <Edit size={16} />
                      </span>
                      Modifier la langue
                    </button>
                    <button
                      className="delete"
                      type="button"
                      onClick={() => {
                        dispatch(deleteItem(item.id, menuSelected));
                      }}
                    >
                      <span>
                        <Trash2 size={16} />
                      </span>
                      Supprimer la langue
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          ''
        )}

        {/* Affichage de la page création / modification des Langues */}
        {menuSelected === 'languages' && actionSelected !== '' ? (
          <form
            className="BackOffice-container-update editor"
            onSubmit={(e) => e.preventDefault()}
          >
            <fieldset>
              <label htmlFor="element-to-edit">Langue</label>
              <input
                id="element-to-edit"
                name="element-to-edit"
                value={itemLabel}
                onChange={(event) =>
                  dispatch(setNewValue(event.target.value, 'itemLabel'))
                }
              />
            </fieldset>
            <button
              type="button"
              className="submit-button"
              onClick={() => {
                if (actionSelected === 'create') {
                  dispatch(createItem(menuSelected));
                } else if (actionSelected === 'update') {
                  dispatch(updateItem(itemId, menuSelected));
                }
              }}
            >
              {actionSelected === 'create' ? 'Ajouter' : 'Modifier'} la langue
              <span>
                <CheckSquare size={16} />
              </span>
            </button>
          </form>
        ) : (
          ''
        )}

        {/* Affichage de la liste des Technos */}
        {menuSelected === 'technos' && actionSelected === '' ? (
          <div className="BackOffice-container-list">
            <ul>
              <li>
                <span className="id">Id</span>
                <span className="techno">Techno</span>
              </li>
              {/* Affiche les 10 éléments en fonction de la range de limitList */}
              {technosList.slice(limitList[0], limitList[1]).map((item) => (
                <li key={item.id}>
                  <div className="block-left">
                    <span className="id">{item.id}</span>
                    <span className="techno">{item.techno}</span>
                  </div>
                  <div className="block-right">
                    <button
                      className="update"
                      type="button"
                      onClick={() => {
                        dispatch(setActionBackoffice('update'));
                        dispatch(setUpdateItemState(item.id, item.techno));
                      }}
                    >
                      <span>
                        <Edit size={16} />
                      </span>
                      Modifier la techno
                    </button>
                    <button
                      className="delete"
                      type="button"
                      onClick={() => {
                        dispatch(deleteItem(item.id, menuSelected));
                      }}
                    >
                      <span>
                        <Trash2 size={16} />
                      </span>
                      Supprimer la techno
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          ''
        )}

        {/* Affichage de la page création / modification des Technos */}
        {menuSelected === 'technos' && actionSelected !== '' ? (
          <form
            className="BackOffice-container-update editor"
            onSubmit={(e) => e.preventDefault()}
          >
            <fieldset>
              <label htmlFor="element-to-edit">Techno</label>
              <input
                id="element-to-edit"
                name="element-to-edit"
                value={itemLabel}
                onChange={(event) =>
                  dispatch(setNewValue(event.target.value, 'itemLabel'))
                }
              />
            </fieldset>
            <button
              type="button"
              className="submit-button"
              onClick={() => {
                if (actionSelected === 'create') {
                  dispatch(createItem(menuSelected));
                } else if (actionSelected === 'update') {
                  dispatch(updateItem(itemId, menuSelected));
                }
              }}
            >
              {actionSelected === 'create' ? 'Ajouter' : 'Modifier'} la techno
              <span>
                <CheckSquare size={16} />
              </span>
            </button>
          </form>
        ) : (
          ''
        )}

        {/* Affichage de la liste des Catégories */}
        {menuSelected === 'categories' && actionSelected === '' ? (
          <div className="BackOffice-container-list">
            <ul>
              <li>
                <span className="id">Id</span>
                <span className="category">Catégorie</span>
              </li>
              {/* Affiche les 10 éléments en fonction de la range de limitList */}
              {categoriesList.slice(limitList[0], limitList[1]).map((item) => (
                <li key={item.id}>
                  <div className="block-left">
                    <span className="id">{item.id}</span>
                    <span className="category">{item.category}</span>
                  </div>
                  <div className="block-right">
                    <button
                      className="update"
                      type="button"
                      onClick={() => {
                        dispatch(setActionBackoffice('update'));
                        dispatch(setUpdateItemState(item.id, item.category));
                      }}
                    >
                      <span>
                        <Edit size={16} />
                      </span>
                      Modifier la catégorie
                    </button>
                    <button
                      className="delete"
                      type="button"
                      onClick={() => {
                        dispatch(deleteItem(item.id, menuSelected));
                      }}
                    >
                      <span>
                        <Trash2 size={16} />
                      </span>
                      Supprimer la catégorie
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          ''
        )}

        {/* Affichage de la page création / modification des Catégories */}
        {menuSelected === 'categories' && actionSelected !== '' ? (
          <form
            className="BackOffice-container-update editor"
            onSubmit={(e) => e.preventDefault()}
          >
            <fieldset>
              <label htmlFor="element-to-edit">Catégorie</label>
              <input
                id="element-to-edit"
                name="element-to-edit"
                value={itemLabel}
                onChange={(event) =>
                  dispatch(setNewValue(event.target.value, 'itemLabel'))
                }
              />
            </fieldset>
            <button
              type="button"
              className="submit-button"
              onClick={() => {
                if (actionSelected === 'create') {
                  dispatch(createItem(menuSelected));
                } else if (actionSelected === 'update') {
                  dispatch(updateItem(itemId, menuSelected));
                }
              }}
            >
              {actionSelected === 'create' ? 'Ajouter' : 'Modifier'} la
              catégorie
              <span>
                <CheckSquare size={16} />
              </span>
            </button>
          </form>
        ) : (
          ''
        )}

        {/* Affichage de la pagination selon la menu sélectionné */}
        {userId === '' && actionSelected === '' && menuSelected === 'users' ? (
          <div className="BackOffice-container-arrow">
            <button
              type="button"
              className={limitList[0] === 0 ? 'inactive' : ''}
              onClick={() => {
                if (limitList[0] !== 0) {
                  dispatch(seeListBackOffice(false));
                }
              }}
            >
              <ChevronsLeft />
            </button>
            <p>{`${limitList[0] + 1} à ${limitList[1]}`}</p>
            <button
              type="button"
              className={limitList[1] >= usersList.length ? 'inactive' : ''}
              onClick={() => {
                if (limitList[1] < usersList.length) {
                  dispatch(seeListBackOffice(true));
                }
              }}
            >
              <ChevronsRight />
            </button>
          </div>
        ) : (
          ''
        )}
        {userId === '' &&
        actionSelected === '' &&
        menuSelected === 'languages' ? (
          <div className="BackOffice-container-arrow">
            <button
              type="button"
              className={limitList[0] === 0 ? 'inactive' : ''}
              onClick={() => {
                if (limitList[0] !== 0) {
                  dispatch(seeListBackOffice(false));
                }
              }}
            >
              <ChevronsLeft />
            </button>
            <p>{`${limitList[0] + 1} à ${limitList[1]}`}</p>
            <button
              type="button"
              className={limitList[1] >= languagesList.length ? 'inactive' : ''}
              onClick={() => {
                if (limitList[1] < languagesList.length) {
                  dispatch(seeListBackOffice(true));
                }
              }}
            >
              <ChevronsRight />
            </button>
          </div>
        ) : (
          ''
        )}
        {userId === '' &&
        actionSelected === '' &&
        menuSelected === 'technos' ? (
          <div className="BackOffice-container-arrow">
            <button
              type="button"
              className={limitList[0] === 0 ? 'inactive' : ''}
              onClick={() => {
                if (limitList[0] !== 0) {
                  dispatch(seeListBackOffice(false));
                }
              }}
            >
              <ChevronsLeft />
            </button>
            <p>{`${limitList[0] + 1} à ${limitList[1]}`}</p>
            <button
              type="button"
              className={limitList[1] >= technosList.length ? 'inactive' : ''}
              onClick={() => {
                if (limitList[1] < technosList.length) {
                  dispatch(seeListBackOffice(true));
                }
              }}
            >
              <ChevronsRight />
            </button>
          </div>
        ) : (
          ''
        )}
        {userId === '' &&
        actionSelected === '' &&
        menuSelected === 'categories' ? (
          <div className="BackOffice-container-arrow">
            <button
              type="button"
              className={limitList[0] === 0 ? 'inactive' : ''}
              onClick={() => {
                if (limitList[0] !== 0) {
                  dispatch(seeListBackOffice(false));
                }
              }}
            >
              <ChevronsLeft />
            </button>
            <p>{`${limitList[0] + 1} à ${limitList[1]}`}</p>
            <button
              type="button"
              className={
                limitList[1] >= categoriesList.length ? 'inactive' : ''
              }
              onClick={() => {
                if (limitList[1] < categoriesList.length) {
                  dispatch(seeListBackOffice(true));
                }
              }}
            >
              <ChevronsRight />
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default BackOffice;
