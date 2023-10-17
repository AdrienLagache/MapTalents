// Import des feuilles de style
import './Home.scss';

// Import de React-Router
import { Link } from 'react-router-dom';

// Import de React-Responsive
import { useMediaQuery } from 'react-responsive';

// Import des Icons de React Feather
import { Check, CheckCircle } from 'react-feather';

// Import de Redux
import { useDispatch, useSelector } from 'react-redux';

// Import des images
import draw1 from '../../assets/draw1.svg';
import draw4 from '../../assets/draw4.svg';
import screenMap from '../../assets/screenMap.png';
import {
  apiAddress,
  changeFilters,
  selectAddress,
  setInputAddress,
} from '../../services/actions/filterActions';

const Home = () => {
  const dispatch = useDispatch();
  const addressInput = useSelector(
    (state) => state.filter.dataFilter.addressInput
  );
  const adressList = useSelector((state) => state.filter.dataFilter.adressList);

  // Gestion du responsive
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isDesktop = useMediaQuery({ query: '(min-width: 1100px)' });

  return (
    <div className="Home">
      <section className="Home-section Home-search">
        <div className="Home-search-container">
          <h1>Trouve les talents à proximité !</h1>
          <div className="Home-search-input">
            <input
              type="text"
              id="address"
              name="address"
              autoComplete="street-address"
              placeholder="Bergerac, Dordogne"
              value={addressInput}
              onChange={(event) => {
                dispatch(apiAddress(event.target.value));
                dispatch(setInputAddress(event.target.value));
              }}
            />
            {adressList.length !== 0 && (
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
                            item.geometry.latitude,
                            item.geometry.longitude
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
            <Link to="/carte">
              <button type="button">
                <Check />
              </button>
            </Link>
          </div>
          <div className="Home-search-cta">
            <p>Besoin de visibilité ?</p>
            <Link to="/inscription">Crée ton profil de développeur !</Link>
          </div>

          <div className="Home-search-popup">
            <div className="header">
              <span className="header-favorite-techno">
                <img
                  src="https://i.imgur.com/5ldWTDC.png"
                  alt="logo de React"
                  crossOrigin="anonymous"
                />
              </span>
            </div>
            <picture>
              <img
                src="https://i.imgur.com/hDUhoJo.jpg"
                alt="avatar de Imed Ben Amor"
                crossOrigin="anonymous"
              />
              <p className="name">Imed Ben Amor</p>
            </picture>
            <div className="infos">
              <p className="title">Développeur AI</p>
              <p className="availability">
                <span>
                  <CheckCircle size={16} strokeWidth={3} color="#00b530" />
                </span>
                Disponible
              </p>
              <p className="tjm">
                <span>450€</span> / jour
              </p>
            </div>
          </div>

          {!isMobile && (
            <>
              <img className="draw1" src={draw1} alt="Habillage du site" />
              <img className="draw4" src={draw4} alt="Habillage du site" />
            </>
          )}
        </div>
      </section>

      <section className="Home-section Home-map">
        <div className="Home-map-container">
          <img
            className="image-map"
            src={screenMap}
            alt="Présentation de la carte"
          />
          <div className="Home-map-description">
            <h1>Découvrez la révolution du recrutement informatique !</h1>
            <p>
              Connectez-vous instantanément avec les développeurs de talent dans
              votre région.
            </p>
            <p>
              Fini les recherches fastidieuses et les collaborations à distance
              incertaines.
            </p>
            <p>
              Plongez dans un réseau local de compétences, stimulez
              l&apos;innovation et construisez ensemble le futur numérique.
            </p>
            <Link to="/carte">
              Trouver des développeurs {isDesktop && 'dans les environs'}
            </Link>
          </div>
        </div>
      </section>

      <section className="Home-section Home-skill">
        <div className="Home-skill-container">
          <div className="Home-skill-description">
            <h1>Explore de nouvelles opportunités en tant que développeur !</h1>
            <p>
              Mets en avant tes compétences exactement là où elles sont
              recherchées.
            </p>
            <p>
              Des projets passionnants t&apos;attendent, que ce soit localement
              ou à distance. Prépare-toi à rejoindre une communauté dynamique de
              développeurs.
            </p>
            <Link to="/inscription">
              {isDesktop ? 'Crée ton compte et m' : 'M'}ets en avant tes
              compétences !
            </Link>
          </div>

          {!isMobile && (
            <div className="Home-skill-cards">
              <div className="Card">
                <div className="Card-container-top">
                  <img
                    className="Card-picture"
                    src="https://i.imgur.com/9wwP9MN.jpg"
                    alt="Carte de présentation"
                    crossOrigin="anonymous"
                  />
                  <p className="Card-name">Martina Santiago</p>
                </div>
                <div className="Card-container-bottom">
                  <p className="Card-title">Développeuse Backend Symfony</p>
                  <ul className="Card-tags-list">
                    <li className="Card-tags-item">PHP</li>
                    <li className="Card-tags-item">Java</li>
                    <li className="Card-tags-item">Ruby</li>
                    <li className="Card-tags-item">Laravel</li>
                    <li className="Card-tags-item">Symfony</li>
                  </ul>
                  <p className="Card-availability">
                    <span>
                      <CheckCircle size={16} strokeWidth={3} color="#00b530" />
                    </span>
                    Disponible
                  </p>
                  <p className="Card-tjm">
                    <span>750€</span> / jour
                  </p>
                </div>
              </div>
              <div className="Card">
                <div className="Card-container-top">
                  <img
                    className="Card-picture"
                    src="https://i.imgur.com/A6friDg.jpg"
                    alt="Carte de présentation"
                    crossOrigin="anonymous"
                  />
                  <p className="Card-name">Sophia Wilson</p>
                </div>
                <div className="Card-container-bottom">
                  <p className="Card-title">Développeuse Backend Java</p>
                  <ul className="Card-tags-list">
                    <li className="Card-tags-item">Java</li>
                    <li className="Card-tags-item">Ruby</li>
                    <li className="Card-tags-item">Swift</li>
                    <li className="Card-tags-item">Symfony</li>
                  </ul>
                  <p className="Card-availability">
                    <span>
                      <CheckCircle size={16} strokeWidth={3} color="#00b530" />
                    </span>
                    Disponible
                  </p>
                  <p className="Card-tjm">
                    <span>800€</span> / jour
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
