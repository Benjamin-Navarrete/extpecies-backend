import Especies from "../assets/especies.json";
import user from "../assets/img/user.png";
import "./User.scss";
import { Link } from "react-router-dom";
import { useFormik } from "formik";

const validate = (values) => {
  const errors = {};

  if (!values.nombre) {
    errors.nombre = "Campo requerido";
  } else if (!/^[A-ZñÑáéíóúÁÉÍÓÚ]{1,55}$/i.test(values.nombre)) {
    errors.nombre = "Nombre contiene caracteres inválidos";
  }

  if (!values.apellido) {
    errors.apellido = "Campo requerido";
  } else if (!/^[A-ZñÑáéíóúÁÉÍÓÚ]{1,55}$/i.test(values.apellido)) {
    errors.apellido = "Apellido contiene caracteres inválidos";
  }

  if (!values.email) {
    errors.email = "Campo requerido";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Dirección de correo inválida";
  }

  if (!values.telefono) {
    errors.telefono = "Campo requerido";
  } else if (!/^[+0-9]{8,12}$/i.test(values.telefono)) {
    errors.telefono = "Teléfono inválido";
  }

  if (!values.password) {
    errors.password = "Campo requerido";
  } else if (values.password.length < 6) {
    errors.password = "La contraseña debe contener al menos 6 caracteres";
  }

  if (!values.newPassword) {
    errors.newPassword = "Campo requerido";
  } else if (values.newPassword.length < 6) {
    errors.newPassword = "La nueva contraseña debe contener al menos 6 caracteres";
  } else if (values.newPassword == values.password) {
    errors.newPassword = "La nueva contraseña no puede ser igual a la anterior"
  }

  if (!values.repeatPassword) {
    errors.repeatPassword = "Campo requerido";
  } else if (values.repeatPassword.length < 6) {
    errors.repeatPassword = "La contraseña debe contener al menos 6 caracteres";
  } else if (values.repeatPassword !== values.newPassword) {
    errors.repeatPassword = "Las contraseñas no coinciden";
  }

  return errors;
};

const User = () => {
    const formik = useFormik({
        initialValues: {
          nombre: "",
          email: "",
          password: "",
          newPassword: "",
          repeatPassword: "",
          actualizaciones: true,
        },
        validate,
        onSubmit: (values) => {
          alert("Form enviado, datos: " + JSON.stringify(values, null, 2));
        },
      });
    return (
    <div className="card">
        <div className="card-body">
            <div className="row">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Mi cuenta</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Mis Especies</button>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    {/* SECCION MI CUENTA */}
                    <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
                        <h3 className="text-center mb-4">Mi cuenta</h3>
                        <div className="row">
                            {/* DATOS PERSONALES */}
                            <div className="col-12 col-lg-6">
                                <h5 className="text-center mb-3">Datos Personales</h5>
                                <div className="row">
                                    <div className="col-12 col-md-5 mb-3">
                                        <img src={user} alt="user" width="225px" className="circulo"/>
                                    </div>                                   
                                    <div className="col-12 col-md-7">
                                        <div className="row">
                                            <div className="col-4 text-end">
                                                <label className="fw-semibold mb-3" for="nombre">Nombres :</label>
                                            </div>
                                            <div className="col-8 col-md-8">
                                                <input id="nombre" name="nombre" type="text" className="form-control" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.nombre}/>
                                                {formik.touched.nombre && formik.errors.nombre ? (
                                                    <div className="labelError">{formik.errors.nombre}</div>) : null}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-4 col-lg-4 text-end">
                                                <label className="fw-semibold mb-3" for="apellido">Apellidos :</label>
                                            </div>
                                            <div className="col-8 col-lg-8">
                                                <input id="apellido" name="apellido" type="text" className="form-control" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.apellido}/>
                                                {formik.touched.apellido && formik.errors.apellido ? (
                                                    <div className="labelError">{formik.errors.apellido}</div>) : null}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-4 col-lg-4 text-end">
                                                <label className="fw-semibold mb-3" for="email">Correo :</label>
                                            </div>
                                            <div className="col-8 col-lg-8">
                                                <input id="email" name="email" type="email" className="form-control" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}/>
                                                {formik.touched.email && formik.errors.email ? (
                                                    <div className="labelError">{formik.errors.email}</div>) : null}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-4 col-lg-4 text-end">
                                                <label className="fw-semibold mb-3" for="telefono">Teléfono :</label>
                                            </div>
                                            <div className="col-8 col-lg-8">                                          
                                                <input id="telefono" name="telefono" type="text" className="form-control" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.telefono}/>
                                                    {formik.touched.telefono && formik.errors.telefono ? (
                                                    <div className="labelError">{formik.errors.telefono}</div>) : null}
                                            </div>
                                        </div>
                                        <div className="row justify-content-end form-check">
                                            <div className="col-10 col-lg-10 m-3">
                                                <input className="form-check-input" type="checkbox" name="actualizaciones" id="checkbox"/>
                                                <label className="form-check-label" for="flexCheckChecked">
                                                    Deseo recibir actualizaciones de las especies en mi correo.
                                                </label>
                                            </div>
                                        </div>
                                    </div>                                       
                                    <div className="row justify-content-center mb-3">
                                        <div className="col-10 col-lg-10">
                                          <input className="form-control" type="file" id="formFile"m/>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div className="row justify-content-center mb-3">
                                    <div className="col-3 col-lg-3 mb-3">
                                        <input className="btn btn-primary" type="submit" value="Guardar Cambios"/>
                                    </div>
                                </div>
                            </div>
                            {/* CAMBIAR CONTRASEÑA */}
                            <div className="col-12 col-lg-6">
                                <h5 className="text-center mb-3">Cambiar Contraseña</h5>
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="row form outline mb-4">
                                        <div className="row">
                                            <div className="col-4 col-lg-4 text-end">
                                                <label className="form-label mb-3 fw-semibold" for="password">Contraseña Actual</label>
                                            </div>
                                            <div className="col-8 col-lg-8">
                                                <input id="password" name="password" type="password" className="form-control" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}/>
                                                {formik.touched.password && formik.errors.password ? (
                                                    <div className="labelError">{formik.errors.password}</div>) : null}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-4 col-lg-4 text-end">
                                                <label className="form-label mb-3 fw-semibold" for="newPassword">Nueva Contraseña</label>
                                            </div>
                                            <div className="col-8 col-lg-8">
                                                <input id="newPassword" name="newPassword" type="password" className="form-control" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.newPassword}/>
                                                {formik.touched.newPassword && formik.errors.newPassword ? (
                                                    <div className="labelError">{formik.errors.newPassword}</div>) : null}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-4 col-lg-4 text-end">
                                                <label className="form-label mb-3 fw-semibold" for="repeatPassword">Confirmar Contraseña</label>
                                            </div>
                                            <div className="col-8 col-lg-8">
                                                <input id="repeatPassword" name="repeatPassword" type="password" className="form-control" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.repeatPassword}/>
                                                {formik.touched.repeatPassword && formik.errors.repeatPassword ? (
                                                    <div className="labelError">{formik.errors.repeatPassword}</div>) : null}
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <div className="row justify-content-center">
                                    <div className="col-3 col-lg-3">
                                        <input className="btn btn-primary" type="submit" value="Actualizar Contraseña"/>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>

                    {/* SECCION ESPECIES*/}
                    <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">
                        <h3 className="text-center mb-5">Mis Especies Guardadas</h3> 
                        {Especies.map((dato) => {
                            return(
                                <div className="row justify-content-center">
                                    <div className="col-2 col-lg-2 mb-3">
                                        <img src={dato.img} alt={dato.nombreComun} width="200px" className="img-fluid"/>
                                    </div>
                                    <div className="col-5 col-lg-5 mb-3">
                                        <h3>Nombre Especie: {dato.nombreComun}</h3>
                                        <h6 className="fst-italic">Nombre Científico: "{dato.nombreCientifico}"</h6>
                                        <p>Categoría de Conservación: {dato.categoriaConservacion}</p>
                                        <p>Rango Geográfico: {dato.rangoGeografico}</p>
                                    </div>
                                    <div className="col-3 col-lg-3 mb-3">
                                        <button type="button" className="btn btn-danger">Eliminar {dato.nombreComun} de Mis Especies</button>
                                    </div>
                                </div>
                            );
                        })} 
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default User;
