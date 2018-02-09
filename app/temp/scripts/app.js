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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Game = __webpack_require__(1);

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _Game2.default();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
    function Game() {
        _classCallCheck(this, Game);

        // $(".site-header__menu-icon").click(function () {
        //     console.log("right icon was clicked");

        this.fieldSize = 4;
        this.cardClickCounter = 1;
        this.showCardClickCounter = document.getElementById('card-click-counter');
        this.showCardRating = document.getElementById('card-star-rating');
        this.showCardTimer = document.getElementById('card-timer');
        this.cardClick = document.getElementById('field');

        this.strg = "";

        this.refreshIntervalId;
        this.firstClickTime;

        this.events();
        this.generateCards();
    }

    _createClass(Game, [{
        key: 'timerStop',
        value: function timerStop() {
            clearInterval(this.refreshIntervalId);
        }
    }, {
        key: 'timerStart',
        value: function timerStart() {
            //remove eventlistener after first call of timerStart
            this.cardClick.removeEventListener('click', this.timerStart);

            // save time of first click
            this.firstClickTime = new Date();

            // update timer every second
            this.refreshIntervalId = setInterval(this.timerUpdate.bind(this), 1000);
        }
    }, {
        key: 'timeFormat',
        value: function timeFormat(value) {
            // convert value to string
            var value = value.toString();

            // if only one digit length put 0 before
            if (value.length <= 1) {
                return "0" + value;
            };

            //else go back like it was
            return value;
        }
    }, {
        key: 'timerUpdate',
        value: function timerUpdate() {
            var currentTime = new Date();
            var diffTime = currentTime.getTime() - this.firstClickTime.getTime();

            var diffHours = Math.floor(diffTime / (1000 * 60 * 60));
            diffTime -= diffHours * (1000 * 60 * 60);

            var diffMin = Math.floor(diffTime / (1000 * 60));
            diffTime -= diffMin * 1000 * 60;

            var diffSec = Math.floor(diffTime / 1000);
            if (diffSec == 10) this.timerStop();
            this.showCardTimer.innerText = this.timeFormat(diffHours) + ":" + this.timeFormat(diffMin) + ":" + this.timeFormat(diffSec);
        }
    }, {
        key: 'events',
        value: function events() {

            this.timerStart = this.timerStart.bind(this);
            this.cardClick.addEventListener('click', this.timerStart);

            this.newCardClick = this.newCardClick.bind(this);
            this.cardClick.addEventListener('click', this.newCardClick);
        }
    }, {
        key: 'newCardClick',
        value: function newCardClick(event) {

            // verify, that user clicked on td element
            if (event.target.nodeName.toLowerCase() == 'td') {

                // increment the move-counter of clicks
                // update move-counter on frontend
                this.showCardClickCounter.innerText = this.cardClickCounter++;

                this.checkRating();
                this.checkCardClickChoice();
            }
        }
    }, {
        key: 'generateCards',
        value: function generateCards() {}
    }, {
        key: 'generateRatingStars',
        value: function generateRatingStars(num) {
            var stars = "";
            for (var i = 0; i < num; i++) {
                stars += "*";
            }
            return stars;
        }
    }, {
        key: 'checkRating',
        value: function checkRating() {
            this.rating = (this.cardClickCounter - 1) / this.fieldSize;
            switch (true) {
                case this.rating <= 4.25:
                    this.starRating = 3;

                    break;
                case this.rating <= 5.75:
                    this.starRating = 2;

                    break;
                case this.rating <= 7.5:
                    this.starRating = 1;

                    break;
                default:
                    this.starRating = 0;
            }

            this.showCardRating.innerText = this.generateRatingStars(this.starRating);
        }
    }, {
        key: 'checkCardClickChoice',
        value: function checkCardClickChoice() {}
    }]);

    return Game;
}();

exports.default = Game;

/***/ })
/******/ ]);