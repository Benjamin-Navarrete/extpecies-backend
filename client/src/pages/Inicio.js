import video from "../assets/img/video.jpg";

const Inicio = () => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col-12 col-md-6">
            <img src={video} alt="" width="100%" />
          </div>
          <div className="col-12 col-md-6">
            <h1 className="text-center">Bienvenido</h1>
            <p className="texto-justificado">
              ¡Bienvenido a Extpecies! Una aplicación web en la que podrás
              visualizar las especies de una forma entretenida. Observa la
              distribución de las especies de América Latina en nuestro mapa
              interactivo o pon a prueba tus conocimientos acerca de las
              especies en nuestra sección "Ponte a prueba". También puedes crear
              una cuenta de usuario y guardar tus especies favoritas o a las que
              desees hacerles seguimiento.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
