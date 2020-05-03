exports.ids = [0];
exports.modules = {

/***/ "./components/map.js":
/*!***************************!*\
  !*** ./components/map.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_map_gl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-map-gl */ "react-map-gl");
/* harmony import */ var react_map_gl__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_map_gl__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_pin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/pin */ "./components/pin.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reactstrap */ "reactstrap");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(reactstrap__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "/home/dan/github/CMC/components/map.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }






function Markers(props) {
  const {
    data
  } = props;
  return data.map(marker => __jsx(react_map_gl__WEBPACK_IMPORTED_MODULE_1__["Marker"], {
    key: marker.Id,
    longitude: marker.Long,
    latitude: marker.Lat,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12,
      columnNumber: 8
    }
  }, __jsx(_components_pin__WEBPACK_IMPORTED_MODULE_2__["default"], {
    size: props.selected === marker.Id ? 40 : 15,
    fill: props.selected === marker.Id ? '#397FC4' : '#FF9E01',
    opacity: props.selected === marker.Id ? 1 : 0.8,
    onClick: () => props.callBack(marker),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 12
    }
  })));
}

function WqpMarkers(props) {
  const {
    data
  } = props;
  return data.map(marker => __jsx(react_map_gl__WEBPACK_IMPORTED_MODULE_1__["Marker"], {
    key: marker.index,
    longitude: marker.Longitude,
    latitude: marker.Latitude,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28,
      columnNumber: 9
    }
  }, __jsx(_components_pin__WEBPACK_IMPORTED_MODULE_2__["default"], {
    size: 7,
    fill: "#FF0000",
    opacity: 0.5,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 13
    }
  })));
}

function Map(props) {
  const default_viewport = {
    width: "100%",
    height: "100%",
    latitude: 38.188830663131526,
    longitude: -77.96888714127523,
    zoom: 6
  };
  const {
    0: viewport,
    1: setViewport
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(default_viewport);

  const handleViewport = viewport => setViewport(viewport);

  return __jsx(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Row"], {
    style: props.style,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51,
      columnNumber: 13
    }
  }, __jsx(react_map_gl__WEBPACK_IMPORTED_MODULE_1___default.a, _extends({
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
    data: props.stations_data,
    selected: props.selected.Id,
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "/home/dan/github/CMC/components/pin.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;
const pinStyle = {
  cursor: 'pointer',
  ///fill: '#FF9E01',
  stroke: 'none'
};

class CityPin extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
  render() {
    const {
      size = 10,
      onClick
    } = this.props;
    return __jsx("svg", {
      height: size,
      viewBox: "0 0 24 24",
      style: _objectSpread({}, pinStyle, {
        fill: this.props.fill,
        opacity: this.props.opacity,
        transform: `translate(${-size / 2}px,${-size}px)`
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

}

/* harmony default export */ __webpack_exports__["default"] = (CityPin);

/***/ })

};;
//# sourceMappingURL=0.js.map