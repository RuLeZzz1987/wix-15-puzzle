/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/engine.js":
/*!***********************!*\
  !*** ./src/engine.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = class Engine {\n\n  constructor(view, options = {}) {\n    this.boardState = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', '0'];\n    this.defaultRandomMovesCount = 200;\n    this.randomMovesCount = options.randomMovesCount || this.defaultRandomMovesCount;\n    this.move = this.move.bind(this);\n    this.shuffle = this.shuffle.bind(this);\n    this.view =  view;\n    this.view.setup({move: this.move, shuffle: this.shuffle});\n  }\n\n  shuffle() {\n    for (let i = 0; i < this.randomMovesCount; i++) {\n      const randomBox = this._pickRandomBox();\n      this.move(randomBox);\n    }\n    this.view.render(this.boardState);\n  }\n\n  move(boxId) {\n    const emptyBoxIdx = this._findEmptyBoxIdx();\n    const emptyBoxX = emptyBoxIdx / 4 | 0;\n    const emptyBoxY = emptyBoxIdx % 4;\n\n    const topMoveIdx = (emptyBoxX - 1) * 4 + emptyBoxY;\n    if (emptyBoxX > 0 && this.boardState[topMoveIdx] === boxId) {\n      this.boardState[topMoveIdx] = '0';\n      this.boardState[emptyBoxIdx] = boxId;\n\n      return {\n        idx: emptyBoxIdx,\n        isCompleted: this._isCompleted()\n      };\n    }\n\n    const bottomMoveIdx = (emptyBoxX + 1) * 4 + emptyBoxY;\n    if (emptyBoxX < 3 && this.boardState[bottomMoveIdx] === boxId) {\n      this.boardState[bottomMoveIdx] = '0';\n      this.boardState[emptyBoxIdx] = boxId;\n\n      return {\n        idx: emptyBoxIdx,\n        isCompleted: this._isCompleted()\n      };\n    }\n\n\n    const leftMoveIdx = emptyBoxX * 4 + emptyBoxY - 1;\n    if (emptyBoxY > 0 && this.boardState[leftMoveIdx] === boxId) {\n      this.boardState[leftMoveIdx] = '0';\n      this.boardState[emptyBoxIdx] = boxId;\n\n      return {\n        idx: emptyBoxIdx,\n        isCompleted: this._isCompleted()\n      };\n    }\n\n    const rightMoveIdx = emptyBoxX * 4 + emptyBoxY + 1;\n    if (emptyBoxY < 3 && this.boardState[rightMoveIdx] === boxId) {\n      this.boardState[rightMoveIdx] = '0';\n      this.boardState[emptyBoxIdx] = boxId;\n\n      return {\n        idx: emptyBoxIdx,\n        isCompleted: this._isCompleted()\n      };\n    }\n\n    return {\n      idx: null,\n      isCompleted: false\n    }\n  }\n\n  _findEmptyBoxIdx() {\n    return this.boardState.findIndex(box => box === '0');\n  }\n\n  _isCompleted() {\n    return this.boardState.join('') === '123456789ABCDEF0';\n  }\n\n  _pickRandomBox() {\n    const emptyBoxIdx = this._findEmptyBoxIdx();\n    const emptyBoxX = emptyBoxIdx / 4 | 0;\n    const emptyBoxY = emptyBoxIdx % 4;\n    const availableMoves = [];\n    if (emptyBoxX > 0) {\n      availableMoves.push((emptyBoxX - 1) * 4 + emptyBoxY);\n    }\n    if (emptyBoxX < 3) {\n      availableMoves.push((emptyBoxX + 1) * 4 + emptyBoxY);\n    }\n    if (emptyBoxY > 0) {\n      availableMoves.push(emptyBoxX * 4 + emptyBoxY - 1)\n    }\n    if (emptyBoxY < 3) {\n      availableMoves.push(emptyBoxX * 4 + emptyBoxY + 1)\n    }\n    return this.boardState[availableMoves[Math.floor(Math.random() * availableMoves.length)]];\n  }\n};\n\n//# sourceURL=webpack:///./src/engine.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst Engine = __webpack_require__(/*! ./engine */ \"./src/engine.js\");\nconst View = __webpack_require__(/*! ./view */ \"./src/view.js\");\n\nnew Engine(new View());\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/view.js":
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = class HTMLView {\n\n  setup({move, shuffle}) {\n    const buttons = document.querySelectorAll('.box');\n    for (const button of buttons) {\n      button.onclick = () => {\n        const {idx, isCompleted} = move(button.getAttribute('data-item'));\n        if (idx === null) return;\n\n        this._moveBox(button, idx);\n\n        if (isCompleted) {\n          this.showOverlay();\n        }\n      }\n    }\n\n    const shuffleBtn = document.querySelector('.shuffle');\n    shuffleBtn.onclick = () => {\n      this.hideOverlay();\n      shuffle();\n    }\n  }\n\n  render(currentState) {\n    const buttons = document.querySelectorAll('.box');\n    for (const button of buttons) {\n      const num = button.getAttribute('data-item');\n      this._moveBox(button, currentState.indexOf(num))\n    }\n  }\n\n  _moveBox(box, position) {\n    box.className = String.prototype\n      .split\n      .call(box.className, ' ')\n      .filter(name => name.startsWith('box'))\n      .join(' ');\n    box.classList.add(`item-${this._transformPositionToClassIdx(position)}`);\n  }\n\n  _transformPositionToClassIdx(idx) {\n    return this._isLastIdx(idx) ? '0' : (idx + 1).toString(16).toLocaleUpperCase();\n  }\n\n  _isLastIdx(idx) {\n    return idx === 15;\n  }\n\n  showOverlay() {\n    const overlay = document.querySelector('.overlay');\n    overlay.classList.remove('hidden');\n    const source = document.querySelector('.source');\n    source.classList.remove('hidden');\n  }\n\n  hideOverlay() {\n    const overlay = document.querySelector('.overlay');\n    overlay.classList.add('hidden');\n    const source = document.querySelector('.source');\n    source.classList.add('hidden');\n  }\n\n};\n\n//# sourceURL=webpack:///./src/view.js?");

/***/ })

/******/ });