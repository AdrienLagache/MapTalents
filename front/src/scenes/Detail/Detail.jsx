// NOTE: Désactive la suggestion de convention de nommage
/* eslint-disable @typescript-eslint/naming-convention */
// Import des feuilles de style
import './Detail.scss';

// Import de React
import { useEffect } from 'react';

// Import de React-Router-Dom
import { useParams, Link, useNavigate } from 'react-router-dom';

// Import des Icons de React Feather
import {
  MessageSquare,
  MapPin,
  Navigation,
  Monitor,
  Flag,
  CheckCircle,
  XCircle,
  ArrowLeft,
} from 'react-feather';

// Import de Redux
import { useDispatch, useSelector } from 'react-redux';
import { secondFetchDevs } from '../../services/actions/devActions';
import Loader from '../Loader/Loader';

// Import des images de décorations
import draw1 from '../../assets/draw1.svg';
import draw2 from '../../assets/draw2.svg';
import draw3 from '../../assets/draw3.svg';

function Detail() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const loading = useSelector((state) => state.dev.loading);
  const from = useSelector((state) => state.dev.from);
  const secondDevsList = useSelector((state) => state.dev.secondDevsList);

  // Récupération de l'id dans l'url
  const { devId } = useParams();

  // Appel à l'API pour récupérer tous les devs
  useEffect(() => {
    if (secondDevsList.length === 0) {
      dispatch(secondFetchDevs());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const profileDev = secondDevsList.find(
    (item) => item.id === parseInt(devId, 10)
  );

  // Scroll Up lorsqu'on clique sur un nouveau profil
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    if (profileDev === undefined) {
      navigateTo('/tu-es-perdu');
    }
  });

  if (loading) {
    return <Loader />;
  }

  const {
    user,
    title,
    description,
    category,
    city,
    country,
    adr,
    experience,
    activity_area,
    availability,
    techno,
    tool,
    language,
    softSkill,
    remote,
  } = profileDev;

  const otherDevs = secondDevsList
    // Récupère les devs qui ont la même catégorie sans le profil actuel
    .filter(
      (item) =>
        item.category.id === profileDev.category.id && item.id !== profileDev.id
    )
    // Récupère les 5 premiers devs
    .slice(0, 5);

  const experienceData =
    (new Date() - new Date(experience)) / (365 * 24 * 60 * 60 * 1000);
  let experienceMessage = '';

  switch (true) {
    case experienceData < 3:
      experienceMessage = 'Inférieur à 3 ans';
      break;
    case experienceData < 5:
      experienceMessage = 'Entre 3 et 5 ans';
      break;
    case experienceData < 8:
      experienceMessage = 'Entre 5 et 8 ans';
      break;
    case experienceData >= 8:
    default:
      experienceMessage = 'Supérieur à 8 ans';
      break;
  }

  return (
    <>
      <div className="back">
        <Link to={`/${from}`} className="back-link">
          <span>
            <ArrowLeft size={16} />
          </span>
          Retour à la {from}
        </Link>
      </div>
      <div className="Detail">
        <div className="Detail-profile">
          <picture className="Detail-profile-picture">
            <img className="draw1" src={draw1} alt="Habillage du site" />
            <img
              src={user.image}
              alt={`avatar ${user.firstname} ${user.lastname}`}
              crossOrigin="anonymous"
            />
          </picture>
          <div className="Detail-profile-secondary">
            <h2 className="Detail-title">Localisation</h2>
            <p className="Detail-information">
              <span>
                <MapPin size={20} />
              </span>
              {`${city} | ${country}`}
            </p>
            <p className="Detail-information">
              <span>
                <Navigation size={20} />
              </span>
              {`Déplacement dans une zone de ${activity_area}km`}
            </p>
            <p className="Detail-information">
              <span>
                <Monitor size={20} />
              </span>
              {remote}
            </p>
          </div>
          <div className="Detail-profile-secondary">
            <h2 className="Detail-title">Langues</h2>
            <p className="Detail-information">
              <span>
                <Flag size={20} />
              </span>
              {language.map((item) => item.language).join(', ')}
            </p>
          </div>
          <div className="Detail-profile-secondary">
            <h2 className="Detail-title">{category.category}</h2>
            <ul className="Detail-profile-category">
              {otherDevs.map((item) => {
                return (
                  <Link key={item.id} to={`/detail/${item.id}`}>
                    <li className="Detail-profile-category-dev">
                      <picture className="Detail-profile-category-picture">
                        <img
                          src={item.user.image}
                          alt={`avatar ${item.user.firstname} ${item.user.lastname}`}
                          crossOrigin="anonymous"
                        />
                      </picture>
                      <div className="Detail-profile-category-info">
                        <p>{`${item.user.firstname} ${item.user.lastname}`}</p>
                        <p>{item.title}</p>
                      </div>
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="Detail-main">
          <img className="draw2" src={draw2} alt="Habillage du site" />
          <img className="draw3" src={draw3} alt="Habillage du site" />
          <h1 className="Detail-main-name">{`${user.firstname} ${user.lastname}`}</h1>
          <p className="Detail-main-title">{title}</p>
          <div className="Detail-main-experience-tjm">
            <div className="experience">
              <h3>Expérience</h3>
              <p>{experienceMessage}</p>
            </div>
            <div className="tjm">
              <h3>Tarif Journalier</h3>
              <p>
                <span>{adr}€</span> / jour
              </p>
            </div>
          </div>
          <div className="Detail-main-contact">
            <button type="button">
              Contacter {user.firstname}
              <MessageSquare size={16} />
            </button>
            <p>
              {availability === 'Disponible' ? (
                <>
                  <CheckCircle size={12} />
                  {`${user.firstname} est disponible pour une mission !`}
                </>
              ) : (
                <>
                  <XCircle size={12} />
                  {`${user.firstname} n'accepte pas de mission pour le moment.`}
                </>
              )}
            </p>
          </div>
          <div className="Detail-main-description">
            <h2 className="Detail-title">Description</h2>
            <p>{description}</p>
          </div>
          <div className="Detail-main-skills">
            <h2 className="Detail-title">Compétences</h2>
            <h3 className="Detail-main-skills-title">Technos</h3>
            <ul className="Detail-main-skills-list">
              {techno.map((item) => {
                return (
                  <li className="Detail-main-skills-item" key={item.id}>
                    {item.techno}
                  </li>
                );
              })}
            </ul>
            <h3 className="Detail-main-skills-title">Outils</h3>
            <ul className="Detail-main-skills-list">
              {tool.map((item) => {
                return (
                  <li className="Detail-main-skills-item" key={item.id}>
                    {item.tool}
                  </li>
                );
              })}
            </ul>
            <h3 className="Detail-main-skills-title">Softskills</h3>
            <ul className="Detail-main-skills-list">
              {softSkill.map((item) => {
                return (
                  <li className="Detail-main-skills-item" key={item.id}>
                    {item.softSkill}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Detail;
