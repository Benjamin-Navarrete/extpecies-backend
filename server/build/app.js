"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _usuarios = _interopRequireDefault(require("./routes/usuarios.routes"));
var _ubicaciones = _interopRequireDefault(require("./routes/ubicaciones.routes"));
var _especies = _interopRequireDefault(require("./routes/especies.routes"));
var _auth = _interopRequireDefault(require("./routes/auth.routes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();

// middlewares
app.use((0, _morgan["default"])("dev"));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));

//routes
app.use("/api/usuarios", _usuarios["default"]);
app.use("/api/ubicaciones", _ubicaciones["default"]);
app.use("/api/especies", _especies["default"]);
app.use("/api/auth", _auth["default"]);
var _default = app;
exports["default"] = _default;