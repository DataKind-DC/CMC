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
      size: 5,
      fill: "#FF0000",
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
      lineNumber: 50,
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
      lineNumber: 51,
      columnNumber: 17
    }
  }), __jsx(Markers, {
    data: props.data,
    selected: props.selected.index,
    callBack: props.callBack,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 21
    }
  }), __jsx(WqpMarkers, {
    data: props.wqpdata,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 58,
      columnNumber: 21
    }
  })));
}

/* harmony default export */ __webpack_exports__["default"] = (Map);

/***/ })

})
//# sourceMappingURL=1.5ec1bda5b1f0f6592b60.hot-update.js.map