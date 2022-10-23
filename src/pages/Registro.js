import { Link } from "react-router-dom";

const Registro = () => {
  return (
    <div className="d-flex align-items-center h-100">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-9 col-lg-7 col-xl-6">
            <div className="card">
              <div className="card-body p-5">
                <h2 className="text-uppercase text-center mb-5">
                  Crear cuenta
                </h2>

                <form id="form-registro">
                  <div className="form-outline mb-4">
                    <label className="form-label" for="nombre">
                      Nombre
                    </label>
                    <input
                      type="nombre"
                      name="nombre"
                      className="form-control form-control-lg"
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" for="email">
                      Correo
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control form-control-lg"
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" for="password">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="form-control form-control-lg"
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" for="password2">
                      Repetir contraseña
                    </label>
                    <input
                      type="password"
                      name="password2"
                      id="password2"
                      className="form-control form-control-lg"
                    />
                  </div>

                  <div className="form-check d-flex justify-content-center mb-5">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      value=""
                      name="terminos"
                    />
                    <label className="form-check-label" for="terminos">
                      Acepto los{" "}
                      <Link to="#!" className="text-body">
                        <u>terminos de servicio</u>
                      </Link>
                    </label>
                  </div>

                  <div className="d-flex justify-content-center">
                    <input
                      type="submit"
                      value="Registrarse"
                      className="btn btn-primary btn-block btn-lg text-white"
                    />
                  </div>

                  <p className="text-center text-muted mt-5 mb-0">
                    ¿Ya tienes cuenta?{" "}
                    <Link to="/login" className="fw-bold text-body">
                      <u>Inicia sesión</u>
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro;
