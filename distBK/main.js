/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./loaders/less-loader.js!./src/style-loader-entry/index.less":
/*!********************************************************************!*\
  !*** ./loaders/less-loader.js!./src/style-loader-entry/index.less ***!
  \********************************************************************/
/***/ (() => {

throw new Error("Module parse failed: Unexpected token (1:0)\nFile was processed with these loaders:\n * ./loaders/less-loader.js\nYou may need an additional loader to handle the result of these loaders.\n> #root {\n|   color: red;\n| }");

/***/ }),

/***/ "./src/style-loader-entry/index.less":
/*!*******************************************!*\
  !*** ./src/style-loader-entry/index.less ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


      let styleCss = __webpack_require__(/*! !!../../loaders/less-loader.js!./index.less */ "./loaders/less-loader.js!./src/style-loader-entry/index.less");
      let style = document.createElement("style");
      style.innerHTML = styleCss;
      document.head.appendChild(style);
    

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*****************************************!*\
  !*** ./src/style-loader-entry/index.js ***!
  \*****************************************/


__webpack_require__(/*! ./index.less */ "./src/style-loader-entry/index.less");
})();

/******/ })()
;