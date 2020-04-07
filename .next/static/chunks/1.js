(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./components/map.js":
/*!***************************!*\
  !*** ./components/map.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_map_gl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-map-gl */ "./node_modules/react-map-gl/dist/esm/index.js");
/* harmony import */ var _components_pin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/pin */ "./components/pin.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");

var _jsxFileName = "/home/dan/github/CMC/components/map.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;





function Markers(props) {
  var _this = this;

  var data = props.data;
  return data.map(function (city) {
    return __jsx(react_map_gl__WEBPACK_IMPORTED_MODULE_2__["Marker"], {
      key: city.index,
      longitude: city.Longitude,
      latitude: city.Latitude,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 12,
        columnNumber: 8
      }
    }, __jsx(_components_pin__WEBPACK_IMPORTED_MODULE_3__["default"], {
      size: props.selected === city.index ? 40 : 15,
      fill: props.selected === city.index ? '#397FC4' : '#FF9E01',
      opacity: props.selected === city.index ? 1 : 0.8,
      onClick: function onClick() {
        return props.callBack(city);
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 13,
        columnNumber: 12
      }
    }));
  });
}

function WqpMarkers(props) {
  var _this2 = this;

  var data = props.data;
  return data.map(function (city) {
    return __jsx(react_map_gl__WEBPACK_IMPORTED_MODULE_2__["Marker"], {
      key: city.index,
      longitude: city.Longitude,
      latitude: city.Latitude,
      __self: _this2,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 28,
        columnNumber: 9
      }
    }, __jsx(_components_pin__WEBPACK_IMPORTED_MODULE_3__["default"], {
      size: 7,
      fill: "#FF0000",
      opacity: 0.5,
      __self: _this2,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 29,
        columnNumber: 13
      }
    }));
  });
}

function Map(props) {
  var default_viewport = {
    width: "100%",
    height: "100%",
    latitude: 38.188830663131526,
    longitude: -77.96888714127523,
    zoom: 6
  };

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(default_viewport),
      viewport = _useState[0],
      setViewport = _useState[1];

  var handleViewport = function handleViewport(viewport) {
    return setViewport(viewport);
  };

  return __jsx(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Row"], {
    style: props.style,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51,
      columnNumber: 13
    }
  }, __jsx(react_map_gl__WEBPACK_IMPORTED_MODULE_2__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    mapStyle: "mapbox://styles/mapbox/outdoors-v9",
    mapboxApiAccessToken: "pk.eyJ1IjoiZGFuYmVybnN0ZWluIiwiYSI6ImNrNXM4ZGZuYzA1eGUzbnA0eGdveHZuZ2kifQ.7atp6EfK9Hp958HvKcDFKA",
    onViewportChange: handleViewport
  }, viewport, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52,
      columnNumber: 17
    }
  }), props.show_wqp ? __jsx(WqpMarkers, {
    data: props.wqpdata,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 58,
      columnNumber: 27
    }
  }) : __jsx("div", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 27
    }
  }), __jsx(Markers, {
    data: props.data,
    selected: props.selected.index,
    callBack: props.callBack,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61,
      columnNumber: 21
    }
  })));
}

/* harmony default export */ __webpack_exports__["default"] = (Map);

/***/ }),

/***/ "./components/pin.js":
/*!***************************!*\
  !*** ./components/pin.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);






var _jsxFileName = "/home/dan/github/CMC/components/pin.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { return function () { var Super = Object(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = Object(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return Object(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }


var ICON = "M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3\n  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9\n  C20.1,15.8,20.2,15.8,20.2,15.7z";
var pinStyle = {
  cursor: 'pointer',
  ///fill: '#FF9E01',
  stroke: 'none'
};

var CityPin = /*#__PURE__*/function (_PureComponent) {
  Object(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__["default"])(CityPin, _PureComponent);

  var _super = _createSuper(CityPin);

  function CityPin() {
    Object(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, CityPin);

    return _super.apply(this, arguments);
  }

  Object(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(CityPin, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          _this$props$size = _this$props.size,
          size = _this$props$size === void 0 ? 10 : _this$props$size,
          onClick = _this$props.onClick;
      return __jsx("svg", {
        height: size,
        viewBox: "0 0 24 24",
        style: _objectSpread({}, pinStyle, {
          fill: this.props.fill,
          opacity: this.props.opacity,
          transform: "translate(".concat(-size / 2, "px,").concat(-size, "px)")
        }),
        onClick: this.props.onClick,
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 19,
          columnNumber: 7
        }
      }, __jsx("path", {
        d: ICON,
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 25,
          columnNumber: 9
        }
      }));
    }
  }]);

  return CityPin;
}(react__WEBPACK_IMPORTED_MODULE_6__["PureComponent"]);

/* harmony default export */ __webpack_exports__["default"] = (CityPin);

/***/ })

}]);
//# sourceMappingURL=1.js.map