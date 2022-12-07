"use strict";

var _app = _interopRequireDefault(require("./app"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var port = 8080;
_app["default"].listen(port, function () {
  console.log("Server running on port ".concat(port, " "));
});