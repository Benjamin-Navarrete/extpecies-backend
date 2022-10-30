import blankImage from "../assets/img/blank_image.png";
import Preguntas from "../assets/preguntas.json"


const Prueba =() => {
  return(
    <div className="card">
      <div className="card-body">
        <div className="row">
          <form id="form-prueba">
            {
            Preguntas.map(dato =>{
                return(
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
                            id="inlineCheckbox1"
                            value="option1"
                            name="alternativas"
                          />
                          <label className="form-check-label" for="inlineCheckbox1">
                            {dato.a}
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox2"
                            value="option2"
                            name="alternativas"
                          />
                          <label className="form-check-label" for="inlineCheckbox2">
                            {dato.b}
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox3"
                            value="option3"
                            name="alternativas"
                          />
                          <label className="form-check-label" for="inlineCheckbox3">
                            {dato.c}
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox4"
                            value="option4"
                            name="alternativas"
                          />
                          <label className="form-check-label" for="inlineCheckbox4">
                            {dato.d}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            }
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
  )
}

export default Prueba;