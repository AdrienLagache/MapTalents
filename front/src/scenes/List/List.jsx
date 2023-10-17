// Import de React
import { useEffect } from 'react';

// Import de React-Responsive
import { useMediaQuery } from 'react-responsive';

// Import de Redux
import { useDispatch, useSelector } from 'react-redux';
import { changeFilters } from '../../services/actions/filterActions';

// Import des feuilles de style
import './List.scss';

// Import des composants React
import Cards from '../../components/Cards/Cards';
import Loader from '../Loader/Loader';
import NoData from '../NoData/NoData';

function List() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.dev.loading);
  const devsList = useSelector((state) => state.dev.devsList);

  // Gestion du responsive
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  useEffect(() => {
    if (devsList.length === 0) {
      dispatch(changeFilters());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loader />;
  }
  if (devsList.length === 0) {
    return <NoData />;
  }

  return (
    <div className={!isMobile ? 'List' : 'List mobile'}>
      <h1>Découvre les {devsList.length} profils qui te correspondent !</h1>
      <div className="List-devs">
        {devsList.map(
          ({ id, user, title, adr, availability, favorite_techno, techno }) => (
            <Cards
              key={id}
              id={id}
              firstname={user.firstname}
              lastname={user.lastname}
              picture={user.image}
              title={title}
              tjm={adr}
              availability={availability}
              favorite_techno={favorite_techno}
              technos={techno}
            />
          )
        )}
      </div>
    </div>
  );
}

export default List;
