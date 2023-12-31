import './Loader.scss';

const Loader = () => {
  return (
    <div className="loader">
      <div className="loader_container">
        <svg
          className="map"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="#303030"
          viewBox="0 0 16 16"
        >
          <path d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.502.502 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103zM10 1.91l-4-.8v12.98l4 .8V1.91zm1 12.98 4-.8V1.11l-4 .8v12.98zm-6-.8V1.11l-4 .8v12.98l4-.8z" />
        </svg>
        <svg
          className="pins"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="#303030"
          viewBox="0 0 16 16"
        >
          <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
        </svg>
        <svg
          className="pins"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="#303030"
          viewBox="0 0 16 16"
        >
          <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
        </svg>
      </div>
      <p>Recherche des talents à proximité...</p>
    </div>
  );
};

export default Loader;
