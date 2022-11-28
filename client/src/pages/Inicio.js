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
              Nullam vel odio ultrices, euismod tortor sed, placerat felis.
              Maecenas a condimentum lorem. Ut aliquet sollicitudin tincidunt.
              Ut sem justo, aliquet quis ultricies quis, vestibulum eu velit.
              Quisque molestie dignissim dolor ullamcorper mattis. Etiam dapibus
              condimentum felis id ornare. Praesent a arcu est. Integer dictum
              vestibulum porttitor. Sed arcu augue, feugiat id lacinia quis,
              viverra ac orci. Nulla sollicitudin tellus id leo consequat, eget
              pellentesque tellus auctor. Fusce ac pellentesque ipsum, eu rutrum
              erat. Nullam faucibus magna at odio consectetur posuere. Maecenas
              metus purus, elementum at nibh nec, aliquam eleifend quam. Donec
              ultrices efficitur ante, nec congue elit gravida vitae. Quisque
              nec mi scelerisque, feugiat justo quis, varius neque. Maecenas
              dapibus venenatis lacus, at rutrum libero.
            </p>
            <p className="texto-justificado">
              Aenean faucibus placerat bibendum. Donec ornare luctus sodales.
              Maecenas at dui at leo sagittis laoreet a vel augue. Vestibulum
              faucibus orci et dolor tristique tincidunt. Aliquam sit amet
              sodales ante. Nulla vestibulum consectetur nisl eget pretium. Cras
              quis facilisis mauris. Nam iaculis nunc et condimentum molestie.
              Mauris sit amet finibus libero. Fusce tincidunt imperdiet dui
              posuere convallis. Nunc id ullamcorper lorem. Pellentesque eget
              consequat dolor. Curabitur commodo varius mauris non imperdiet.
              Fusce quis nulla quis turpis auctor sodales. Nam laoreet, leo at
              bibendum porttitor, diam magna cursus ex, ac rutrum elit eros
              vitae ipsum. Nullam eget diam ex.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
