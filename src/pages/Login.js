import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="d-flex align-items-center h-100">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-9 col-lg-7 col-xl-6">
            <div className="card">
              <div className="card-body p-5">
                <h2 className="text-uppercase text-center mb-5">
                  Iniciar Sesión
                </h2>

                <form id="form-login">
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
                      className="form-control form-control-lg"
                    />
                  </div>

                  <div className="d-flex justify-content-center">
                    <input
                      type="submit"
                      value="Iniciar Sesión"
                      className="btn btn-primary btn-block btn-lg text-white"
                    />
                  </div>
                </form>

                <p className="text-center text-muted mt-5 mb-0">
                  ¿No tienes cuenta?{" "}
                  <Link to="/registro" className="fw-bold text-body">
                    <u>Registrate</u>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
