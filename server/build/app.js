"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();

// middlewares
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));

//routes
app.use(require("./routes/index"));
var _default = app;
exports["default"] = _default;