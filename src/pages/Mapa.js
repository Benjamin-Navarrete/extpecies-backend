import MapComponent from "../components/MapComponent";
import Especies from "../assets/especies.json";
import "./Mapa.scss";

const Mapa = () => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col-12 col-lg-6">
            <MapComponent />
          </div>
          <div className="col-12 col-lg-6">
          {Especies.map((dato) => {
              return(
                <div className="row">
                  <div className="col-4 col-lg-6 mb-3">
                    <img src={dato.img} alt={dato.nombreComun} width="200px" className="img-fluid"/>
                  </div>
                  <div className="col-8 col-lg-6 mb-3">
                    <h3>Nombre Especie: {dato.nombreComun}</h3>
                    <h6 className="fst-italic">Nombre Científico: "{dato.nombreCientifico}"</h6>
                    <p>
                      Categoría de Conservación: {dato.categoriaConservacion}
                    </p>
                    <p>
                      Rango Geográfico: {dato.rangoGeografico}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mapa;
