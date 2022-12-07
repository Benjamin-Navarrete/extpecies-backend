import { Link } from "react-router-dom";
import { useFormik } from "formik";
import React, { useState } from "react";

import "./Login.scss";

const validate = (values) => {
  const errors = {};

  if (!values.correo) {
    errors.correo = "Campo requerido";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.correo)) {
    errors.correo = "Dirección de correo inválida";
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
      correo: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      console.log(values);
      const rawResponse = await fetch("http://localhost:8080/api/auth/signin", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const content = await rawResponse.json();
      console.log(content);

      if (rawResponse.status === 200) {
        alert("Sesión iniciada correctamente");
        window.location.href = "/user";
      }
      if (rawResponse.status === 401) {
        alert("Contraseña invalida");
      }
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
                    <label className="form-label" for="correo">
                      Correo
                    </label>
                    <input
                      id="correo"
                      name="correo"
                      type="correo"
                      className="form-control form-control-lg"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.correo}
                    />
                    {formik.touched.correo && formik.errors.correo ? (
                      <div className="labelError">{formik.errors.correo}</div>
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
                    {formik.touched.password && formik.errors.password ? (
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
                    <u>Regístrate</u>
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
