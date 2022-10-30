import { Link } from "react-router-dom";
import { useFormik } from "formik";

import "./Login.scss";

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Campo requerido";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Dirección de correo inválida";
  }

  if (!values.password) {
    errors.password = "Campo requerido";
  } else if (values.password.length < 6) {
    errors.password = "La contraseña debe contener al menos 6 caracteres";
  }

  return errors;
};

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      alert("Form enviado, datos: " + JSON.stringify(values, null, 2));
    },
  });
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

                <form onSubmit={formik.handleSubmit}>
                  <div className="form-outline mb-4">
                    <label className="form-label" for="email">
                      Correo
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="form-control form-control-lg"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className="labelError">{formik.errors.email}</div>
                    ) : null}
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" for="password">
                      Contraseña
                    </label>
                    <input
                      id="password"
                      type="password"
                      name="password"
                      className="form-control form-control-lg"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className="labelError">{formik.errors.password}</div>
                    ) : null}
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
