webpackHotUpdate(1,{

/***/ "./components/map.js":
/*!***************************!*\
  !*** ./components/map.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_map_gl__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-map-gl */ "./node_modules/react-map-gl/dist/esm/index.js");
/* harmony import */ var _components_pin__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../components/pin */ "./components/pin.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");








var _jsxFileName = "/home/dan/github/CMC/components/map.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement;

function _createSuper(Derived) { return function () { var Super = Object(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = Object(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return Object(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }






var Markers = /*#__PURE__*/function (_PureComponent) {
  Object(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_6__["default"])(Markers, _PureComponent);

  var _super = _createSuper(Markers);

  function Markers() {
    var _this;

    Object(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Markers);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(_this), "state", {
      data: _this.props.data
    });

    return _this;
  }

  Object(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Markers, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var data = this.props.data;
      return data.map(function (city) {
        return __jsx(react_map_gl__WEBPACK_IMPORTED_MODULE_9__["Marker"], {
          key: city.index,
          longitude: city.Longitude,
          latitude: city.Latitude,
          __self: _this2,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 18,
            columnNumber: 9
          }
        }, __jsx(_components_pin__WEBPACK_IMPORTED_MODULE_10__["default"], {
          size: _this2.props.selected === city.index ? 40 : 15,
          fill: _this2.props.selected === city.index ? '#397FC4' : '#FF9E01',
          opacity: _this2.props.selected === city.index ? 1 : 0.8,
          onClick: function onClick() {
            return _this2.props.callBack(city);
          },
          __self: _this2,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 19,
            columnNumber: 13
          }
        }));
      });
    }
  }]);

  return Markers;
}(react__WEBPACK_IMPORTED_MODULE_8__["PureComponent"]);

var wqpMarkers = /*#__PURE__*/function (_PureComponent2) {
  Object(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_6__["default"])(wqpMarkers, _PureComponent2);

  var _super2 = _createSuper(wqpMarkers);

  function wqpMarkers() {
    var _this3;

    Object(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, wqpMarkers);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this3 = _super2.call.apply(_super2, [this].concat(args));

    Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(_this3), "state", {
      data: _this3.props.data
    });

    return _this3;
  }

  Object(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(wqpMarkers, [{
    key: "render",
    value: function render() {
      var _this4 = this;

      var data = this.props.data;
      return data.map(function (city) {
        return __jsx(react_map_gl__WEBPACK_IMPORTED_MODULE_9__["Marker"], {
          key: city.index,
          longitude: city.Longitude,
          latitude: city.Latitude,
          __self: _this4,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 41,
            columnNumber: 9
          }
        }, __jsx(_components_pin__WEBPACK_IMPORTED_MODULE_10__["default"], {
          size: 15,
          fill: "#FF0000",
          __self: _this4,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 42,
            columnNumber: 13
          }
        }));
      });
    }
  }]);

  return wqpMarkers;
}(react__WEBPACK_IMPORTED_MODULE_8__["PureComponent"]);

var Map = /*#__PURE__*/function (_PureComponent3) {
  Object(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_6__["default"])(Map, _PureComponent3);

  var _super3 = _createSuper(Map);

  function Map() {
    var _this5;

    Object(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Map);

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    _this5 = _super3.call.apply(_super3, [this].concat(args));

    Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(_this5), "state", {
      viewport: {
        width: "100%",
        height: "100%",
        latitude: 38.188830663131526,
        longitude: -77.96888714127523,
        zoom: 6
      }
    });

    return _this5;
  }

  Object(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Map, [{
    key: "render",
    value: function render() {
      var _this6 = this;

      return __jsx(reactstrap__WEBPACK_IMPORTED_MODULE_11__["Row"], {
        style: this.props.style,
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 64,
          columnNumber: 13
        }
      }, __jsx(react_map_gl__WEBPACK_IMPORTED_MODULE_9__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
        mapStyle: "mapbox://styles/mapbox/outdoors-v9",
        mapboxApiAccessToken: "pk.eyJ1IjoiZGFuYmVybnN0ZWluIiwiYSI6ImNrNXM4ZGZuYzA1eGUzbnA0eGdveHZuZ2kifQ.7atp6EfK9Hp958HvKcDFKA",
        onViewportChange: function onViewportChange(viewport) {
          return _this6.setState({
            viewport: viewport
          });
        }
      }, this.state.viewport, {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 65,
          columnNumber: 17
        }
      }), __jsx(Markers, {
        data: this.props.data,
        selected: this.props.selected.index,
        callBack: this.props.callBack,
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 70,
          columnNumber: 21
        }
      }), __jsx(Markers, {
        data: this.props.wqpdata,
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 71,
          columnNumber: 21
        }
      })));
    }
  }]);

  return Map;
}(react__WEBPACK_IMPORTED_MODULE_8__["PureComponent"]);

/* harmony default export */ __webpack_exports__["default"] = (Map);

/***/ })

})
//# sourceMappingURL=1.5fd220843f7c415921b4.hot-update.js.map