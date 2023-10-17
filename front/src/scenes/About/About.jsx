import React from 'react';
import './About.scss';

function About() {
  return (
    <section className="About-container">
      <div className="intro-container-fluid">
        <h1>L'histoire de MapTalents</h1>

        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius ex
          officia fuga qui harum accusantium quae sapiente nulla culpa quibusdam
          ipsam aut, nisi nihil amet sit similique iste. Ut, amet consectetur
          adipisicing elit. Eius ex officia fuga qui harum accusantium quae
          sapiente nulla culpa quibusdam ipsam aut,temporibus.Eius ex officia
          fuga qui harum accusantium?
        </p>
      </div>

      <div className="profil-container-fluid">
        <h2>Qui sommes nous ?</h2>
      </div>

      <div className="photos-container-fluid">
        <div className="photo">
          <img src="AnonymousDev.png" alt="Portrait" />
          <p>Thomas Warin</p>
          <p>Product Owner</p>
        </div>
        <div className="photo">
          <img src="AnonymousDev.png" alt="Portrait" />
          <p>Adrien Agache</p>
          <p>Scrum Master</p>
        </div>
        <div className="photo">
          <img src="AnonymousDev.png" alt="Portrait" />
          <p>Julien Tan</p>
          <p>Lead Dev</p>
        </div>
        <div className="photo">
          <img src="AnonymousDev.png" alt="Portrait" />
          <p>Louis Chabaud</p>
          <p>Lead Front</p>
        </div>
      </div>
    </section>
  );
}
export default About;
