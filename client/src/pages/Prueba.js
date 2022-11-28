import blankImage from "../assets/img/blank_image.png";
import Preguntas from "../assets/preguntas.json";

const Prueba = () => {
  let contador = 1;
  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <form id="form-prueba">
            {Preguntas.map((dato) => {
              contador += 4;
              return (
                <div className="col-12 mb-5">
                  <div className="row">
                    <div className="col-12 col-sm-3 col-md- text-center w-auto">
                      <img src={blankImage} alt="" />
                    </div>
                    <div className="col-12 col-sm-9 align-items-center">
                      <h3>{dato.pregunta}</h3>
                      <p>{dato.enunciado}</p>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`inlineCheckbox${contador}`}
                          value={`option${contador}`}
                          name="alternativas"
                        />
                        <label
                          className="form-check-label"
                          for={`inlineCheckbox${contador}`}
                        >
                          {dato.a}
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`inlineCheckbox${contador + 1}`}
                          value={`option${contador + 1}`}
                          name="alternativas"
                        />
                        <label
                          className="form-check-label"
                          for={`inlineCheckbox${contador + 1}`}
                        >
                          {dato.b}
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`inlineCheckbox${contador + 2}`}
                          value={`option${contador + 2}`}
                          name="alternativas"
                        />
                        <label
                          className="form-check-label"
                          for={`inlineCheckbox${contador + 2}`}
                        >
                          {dato.c}
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`inlineCheckbox${contador + 3}`}
                          value={`option${contador + 3}`}
                          name="alternativas"
                        />
                        <label
                          className="form-check-label"
                          for={`inlineCheckbox${contador + 3}`}
                        >
                          {dato.d}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="d-flex justify-content-center mb-3">
              <input
                type="submit"
                value="Enviar"
                className="btn btn-primary btn-block btn-lg text-white"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Prueba;
