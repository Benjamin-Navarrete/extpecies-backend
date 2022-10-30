import { Link } from "react-router-dom";
import { useFormik } from "formik";

const validate = (values) => {
  const errors = {};

  if (!values.nombre) {
    errors.nombre = "Campo requerido";
  } else if (!/^[A-ZñÑáéíóúÁÉÍÓÚ]{1,55}$/i.test(values.nombre)) {
    errors.nombre = "Nombre contiene caracteres inválidos";
  }

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

  if (!values.repeatPassord) {
    errors.repeatPassord = "Campo requerido";
  } else if (values.repeatPassord.length < 6) {
    errors.repeatPassord = "La contraseña debe contener al menos 6 caracteres";
  } else if (values.repeatPassord != values.password) {
    errors.repeatPassord = "Las contraseñas no coinciden";
  }

  if (values.terminos) {
    errors.terminos = "Campo requerido";
  }

  return errors;
};

const Registro = () => {
  const formik = useFormik({
    initialValues: {
      nombre: "",
      email: "",
      password: "",
      repeatPassord: "",
      terminos: false,
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
                  Crear cuenta
                </h2>

                <form onSubmit={formik.handleSubmit}>
                  <div className="form-outline mb-4">
                    <label className="form-label" for="nombre">
                      Nombre
                    </label>
                    <input
                      type="nombre"
                      name="nombre"
                      className="form-control form-control-lg"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.nombre}
                    />
                    {formik.touched.nombre && formik.errors.nombre ? (
                      <div className="labelError">{formik.errors.nombre}</div>
                    ) : null}
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" for="email">
                      Correo
                    </label>
                    <input
                      type="email"
                      name="email"
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
                      type="password"
                      name="password"
                      id="password"
                      className="form-control form-control-lg"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <div className="labelError">{formik.errors.password}</div>
                    ) : null}
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" for="repeatPassord">
                      Repetir contraseña
                    </label>
                    <input
                      type="password"
                      name="repeatPassord"
                      id="repeatPassord"
                      className="form-control form-control-lg"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.repeatPassord}
                    />
                    {formik.touched.repeatPassord &&
                    formik.errors.repeatPassord ? (
                      <div className="labelError">
                        {formik.errors.repeatPassord}
                      </div>
                    ) : null}
                  </div>

                  <div className="form-check d-flex justify-content-center mb-5">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      name="terminos"
                      id="checkbox"
                      onChange={formik.handleChange}
                      value={formik.values.repeatPassord}
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
