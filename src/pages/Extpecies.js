import logo from "../assets/img/LOGO.png";

const Extpecies = () => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
            <img src={logo} alt="" width="80%" />
          </div>
          <div className="col-12 col-md-6">
            <h1 className="text-center">Acerca de Extpecies</h1>
            <p className="texto-justificado">
              Extpecies es una organización independiente de desarrollo de
              aplicaciones web. Nuestro fin es concientizar a la población
              respecto a la relevancia del cuidado de las diversas especies en
              peligro de extinción.
            </p>
            <p className="texto-justificado">
              Extpecies pone a su disposición una alternativa visual, educativa
              y de alcance global para que los usuarios puedan aprender acerca
              de las especies de flora y fauna que se encuentran en peligro de
              extinción en la zona de América Latina y el Caribe.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Extpecies;
