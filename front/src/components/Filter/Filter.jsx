// Import de React
import { useEffect, useState } from 'react';

// Import des feuilles de style
import './Filter.scss';

// Import de React-Responsive
import { useMediaQuery } from 'react-responsive';

// Import de MUI Material
import Slider from '@mui/material/Slider';

// Import des Icons de React Feather
import { X, ChevronsDown, ChevronsUp } from 'react-feather';

// Import de Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  addTechno,
  apiAddress,
  availabilityChecked,
  categoryChecked,
  changeFilters,
  changeSelectRemote,
  deleteTechno,
  experienceChecked,
  fetchDataFilter,
  languageChecked,
  moveSliderTJM,
  resetFilter,
  seeMoreLessCategories,
  seeMoreLessLanguages,
  selectAddress,
  setInputAddress,
} from '../../services/actions/filterActions';
import { secondFetchDevs } from '../../services/actions/devActions';

// Import des composants React
import LoaderInline from '../LoaderInline/LoaderInline';

// Import des expériences / remote
import experienceList from '../../data/experience';
import remoteList from '../../data/remote';

function Filter() {
  const dispatch = useDispatch();
  const secondDevsList = useSelector((state) => state.dev.secondDevsList);

  // Appel à l'API pour récupérer tous les devs
  useEffect(() => {
    if (secondDevsList.length === 0) {
      dispatch(secondFetchDevs());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Récupération du state Filter (dataFilter)
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

  const seeLanguages = useSelector(
    (state) => state.filter.dataFilter.seeLanguages
  );
  const seeCategories = useSelector(
    (state) => state.filter.dataFilter.seeCategories
  );
  const adressList = useSelector((state) => state.filter.dataFilter.adressList);
  const addressInput = useSelector(
    (state) => state.filter.dataFilter.addressInput
  );

  // Récupération du state Filter (toSubmit)
  const technosSelected = useSelector((state) => state.filter.toSubmit.technos);
  const tjmRange = useSelector((state) => state.filter.toSubmit.tjm);
  const experienceCheckState = useSelector(
    (state) => state.filter.toSubmit.experience
  );
  const categoryCheckState = useSelector(
    (state) => state.filter.toSubmit.category
  );
  const remoteCheckState = useSelector((state) => state.filter.toSubmit.remote);
  const languagesCheckState = useSelector(
    (state) => state.filter.toSubmit.languages
  );
  const availabilityCheckState = useSelector(
    (state) => state.filter.toSubmit.availability
  );

  // Déclenche la récupération des données dynamiques des filtres (Technos, Langues)
  useEffect(() => {
    if (loadingFilter) {
      dispatch(fetchDataFilter());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Gestion du responsive
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  // Ouverture des filtres en responsive
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={isOpen || !isMobile ? 'Filter' : 'Filter open'}>
      {isMobile && (
        <button
          type="button"
          className="Filter-button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <p>{!isOpen ? 'Ouvrir' : 'Fermer'} les filtres</p>
          <span>
            {!isOpen ? <ChevronsDown size={16} /> : <ChevronsUp size={16} />}
          </span>
        </button>
      )}
      {!isMobile && <div className="Filter-toggle" />}
      {(isOpen || !isMobile) && (
        <div className="Filter-menu">
          <div className="Filter-menu-header">
            <h1 className="header-title">Filtres</h1>
            <button
              className="header-close-button"
              type="button"
              onClick={() => {
                dispatch(resetFilter());
                dispatch(changeFilters());
              }}
            >
              Réinitialiser les critères
            </button>
          </div>
          <form
            action="submit"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <fieldset className="Filter-menu-fieldset fieldset-adress">
              <label className="Filter-menu-title" htmlFor="adress">
                Adresse
              </label>
              <input
                type="text"
                name="adress"
                id="adress"
                placeholder="Bergerac, Dordogne"
                value={addressInput}
                autoComplete="off"
                onChange={(event) => {
                  dispatch(apiAddress(event.target.value));
                  dispatch(setInputAddress(event.target.value));
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
                        dispatch(changeFilters());
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
                          dispatch(changeFilters());
                        }
                      }}
                    >
                      {item.properties.label}
                    </li>
                  ))}
                </ul>
              )}
            </fieldset>

            <fieldset className="Filter-menu-fieldset fieldset-technos">
              <p className="Filter-menu-title" htmlFor="technos">
                Technos
              </p>
              {loadingFilter ? (
                <LoaderInline />
              ) : (
                <select
                  name="technos"
                  id="technos"
                  value="0"
                  onChange={(event) => {
                    dispatch(addTechno(event.target.value));
                    dispatch(changeFilters());
                  }}
                >
                  <option value="0">-- Sélectionner un language --</option>
                  {technosList.map(({ id, techno }) => (
                    <option key={id} value={id}>
                      {techno}
                    </option>
                  ))}
                </select>
              )}

              {loadingFilter ? (
                <LoaderInline />
              ) : (
                <div className="fieldset-technos-selected">
                  {technosSelected.map((selectedId) => {
                    const selectedTechno = technosList.find(
                      (item) => item.id === parseInt(selectedId, 10)
                    );
                    return selectedTechno ? (
                      <button
                        type="button"
                        className="techno-tag"
                        key={selectedTechno.id}
                        onClick={() => {
                          dispatch(deleteTechno(selectedTechno.id));
                          dispatch(changeFilters());
                        }}
                      >
                        <img
                          src={selectedTechno.logo}
                          alt={`logo ${selectedTechno.techno}`}
                        />
                        <p>{selectedTechno.techno}</p>
                        <span className="delete-button">
                          <X size="0.8rem" />
                        </span>
                      </button>
                    ) : null;
                  })}
                </div>
              )}
            </fieldset>

            <fieldset className="Filter-menu-fieldset fieldset-tjm">
              <p className="Filter-menu-title">Taux journalier</p>
              {loadingFilter ? (
                <LoaderInline />
              ) : (
                <>
                  <Slider
                    min={200}
                    max={900}
                    step={10}
                    value={tjmRange}
                    onChange={(event) => {
                      dispatch(moveSliderTJM(event.target.value));
                      dispatch(changeFilters());
                    }}
                    valueLabelDisplay="off"
                    sx={{
                      '& .MuiSlider-thumb': {
                        boxShadow: 'none',
                      },
                    }}
                  />
                  <div className="fieldset-tjm-info">
                    <p className="tjm-min">
                      {tjmRange[0] === 200
                        ? `${tjmRange[0]}€ et -`
                        : `${tjmRange[0]}€`}
                    </p>
                    <p className="tjm-max">
                      {tjmRange[1] === 900
                        ? `${tjmRange[1]}€ et +`
                        : `${tjmRange[1]}€`}
                    </p>
                  </div>
                </>
              )}
            </fieldset>

            <fieldset className="Filter-menu-fieldset fieldset-experience">
              <p className="Filter-menu-title">Niveau d&apos;expérience</p>
              {experienceList.map((item) => (
                <div
                  className="fieldset-experience-checkbox"
                  key={`xp-${item.id}`}
                >
                  <label htmlFor={item.id}>
                    <input
                      type="checkbox"
                      checked={experienceCheckState.includes(item.id)}
                      id={item.id}
                      name={item.id}
                      onChange={(event) => {
                        dispatch(
                          experienceChecked(
                            event.target.checked,
                            event.target.id
                          )
                        );
                        dispatch(changeFilters());
                      }}
                    />
                    {item.label}
                  </label>
                </div>
              ))}
            </fieldset>

            <fieldset className="Filter-menu-fieldset fieldset-category">
              <p className="Filter-menu-title">Catégorie</p>
              {loadingFilter ? (
                <LoaderInline />
              ) : (
                (!seeCategories
                  ? categoriesList.slice(0, 3)
                  : categoriesList
                ).map((item) => (
                  <div
                    className="fieldset-category-checkbox"
                    key={`cat-${item.category}`}
                  >
                    <label htmlFor={item.id}>
                      <input
                        type="checkbox"
                        checked={categoryCheckState.includes(item.id)}
                        id={item.id}
                        name={item.id}
                        onChange={(event) => {
                          dispatch(
                            categoryChecked(
                              event.target.checked,
                              parseInt(event.target.id, 10)
                            )
                          );
                          dispatch(changeFilters());
                        }}
                      />
                      {item.category}
                    </label>
                  </div>
                ))
              )}
              <button
                type="button"
                className="see-more"
                onClick={() => {
                  dispatch(seeMoreLessCategories());
                }}
              >
                <p>Voir {!seeCategories ? 'plus' : 'moins'}</p>
                <span>
                  {!seeCategories ? (
                    <ChevronsDown size={16} />
                  ) : (
                    <ChevronsUp size={16} />
                  )}
                </span>
              </button>
            </fieldset>

            <fieldset className="Filter-menu-fieldset fieldset-remote">
              <p className="Filter-menu-title">Télétravail</p>
              <select
                defaultValue={remoteCheckState}
                name="remote"
                id="remote"
                onChange={(event) => {
                  dispatch(changeSelectRemote(event.target.value));
                  dispatch(changeFilters());
                }}
              >
                {remoteList.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </fieldset>

            <fieldset className="Filter-menu-fieldset fieldset-language">
              <p className="Filter-menu-title">Langues</p>
              {loadingFilter ? (
                <LoaderInline />
              ) : (
                (!seeLanguages ? languagesList.slice(0, 3) : languagesList).map(
                  (item) => (
                    <div
                      className="fieldset-language-checkbox"
                      key={`lang-${item.id}`}
                    >
                      <label htmlFor={item.language}>
                        <input
                          type="checkbox"
                          checked={languagesCheckState.includes(item.id)}
                          id={item.language}
                          name={item.id}
                          onChange={(event) => {
                            dispatch(
                              languageChecked(
                                event.target.checked,
                                event.target.name
                              )
                            );
                            dispatch(changeFilters());
                          }}
                        />
                        {item.language}
                      </label>
                    </div>
                  )
                )
              )}
              <button
                type="button"
                className="see-more"
                onClick={() => {
                  dispatch(seeMoreLessLanguages());
                }}
              >
                <p>Voir {!seeLanguages ? 'plus' : 'moins'}</p>
                <span>
                  {!seeLanguages ? (
                    <ChevronsDown size={16} />
                  ) : (
                    <ChevronsUp size={16} />
                  )}
                </span>
              </button>
            </fieldset>

            <fieldset className="Filter-menu-fieldset fieldset-availability">
              <p className="Filter-menu-title">Disponibilité</p>
              <div className="fieldset-availability-checkbox">
                <label htmlFor="availability">
                  <input
                    type="checkbox"
                    checked={availabilityCheckState.includes('Disponible')}
                    id="availability"
                    name="availability"
                    onChange={(event) => {
                      dispatch(availabilityChecked(event.target.checked));
                      dispatch(changeFilters());
                    }}
                  />
                  Disponible
                </label>
              </div>
            </fieldset>
          </form>
        </div>
      )}
    </div>
  );
}

export default Filter;
