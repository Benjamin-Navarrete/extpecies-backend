// import mapa from "../assets/img/mapa.png";
import MapComponent from "../components/MapComponent";

const Mapa = () => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col-12 col-lg-6">
            <MapComponent />
          </div>
          <div className="col-12 col-lg-6">
            <h1 className="text-center">Info especie seleccionada</h1>
            <p className="texto-justificado">
              En esta seccion se encuentra un mapa interactivo. En él, aparecerá
              un circulo rojo con un numero como se ve en la imagen, el número
              significa que en tal área existe esa cantidad de especies en
              peligro. Al hacer zoom en el area, los circulos se dividirán en
              nuevas zonas y con una nueva cantidad de especies en peligro. Se
              puede continuar haciendo zoom hasta encontrar una única especie en
              un area determinada, al hacerle click, se mostrará información
              relacionada a dicha especie en esta sección...Integer dictum
              vestibulum porttitor. Sed arcu augue, feugiat id lacinia quis,
              viverra ac orci. Nulla sollicitudin tellus id leo consequat, eget
              pellentesque tellus auctor. Fusce ac pellentesque ipsum, eu rutrum
              erat. Nullam faucibus magna at odio consectetur posuere. Maecenas
              metus purus, elementum at nibh nec, aliquam eleifend quam.
            </p>
            <p>
              Aenean faucibus placerat bibendum. Donec ornare luctus sodales.
              Maecenas at dui at leo sagittis laoreet a vel augue. Vestibulum
              faucibus orci et dolor tristique tincidunt. Aliquam sit amet
              sodales ante. Nulla vestibulum consectetur nisl eget pretium. Cras
              quis facilisis mauris. Nam iaculis nunc et condimentum molestie.
              Mauris sit amet finibus libero.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mapa;
