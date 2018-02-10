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


var memory = function () {

    // $(".site-header__menu-icon").click(function () {
    //     console.log("right icon was clicked");

<<<<<<< HEAD
    var fieldSize = 16;
    var cardClickCounter = 1;
    var showCardClickCounter = document.getElementById('card-click-counter');
    var showCardRating = document.getElementById('card-star-rating');
    var showCardTimer = document.getElementById('card-timer');
    var showGameField = document.getElementById('field-table');
||||||| merged common ancestors
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
=======
    var fieldSize = 9;
    var cardClickCounter = 1;
    var showCardClickCounter = document.getElementById('card-click-counter');
    var showCardRating = document.getElementById('card-star-rating');
    var showCardTimer = document.getElementById('card-timer');
    var showGameField = document.getElementById('field-table');
>>>>>>> dev

<<<<<<< HEAD
    var cardClick = document.getElementById('field');
    var openCards = [];
    var strg = "";
    var oldId;
    var refreshIntervalId;
    var firstClickTime;
    var rating;
    var starRating;
||||||| merged common ancestors
new _Game2.default();
=======
    var cardClick = document.getElementById('field');
    var openCards = [];
    var strg = "";
    var oldId;
    var clickDisabled = false;
    var refreshIntervalId;
    var firstClickTime;
    var rating;
    var starRating;
>>>>>>> dev

    var cardArr = [];

    generateCards();

    play();

    function timerStop() {
        clearInterval(refreshIntervalId);
    }

    function timerStart() {
        //remove eventlistener after first call of timerStart
        cardClick.removeEventListener('click', timerStart);

        // save time of first click
        firstClickTime = new Date();

        // update timer every second
        refreshIntervalId = setInterval(timerUpdate.bind(this), 1000);
    }

<<<<<<< HEAD
    function timeFormat(value) {
        // convert value to string
        var value = value.toString();
||||||| merged common ancestors
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
=======
    function digitFormat(value) {
        // convert value to string
        var value = value.toString();
>>>>>>> dev

        // if only one digit length put 0 before
        if (value.length <= 1) {
            return "0" + value;
        };

        //else go back like it was
        return value;
    }

    function timerUpdate() {
        var currentTime = new Date();
        var diffTime = currentTime.getTime() - firstClickTime.getTime();

        var diffHours = Math.floor(diffTime / (1000 * 60 * 60));
        diffTime -= diffHours * (1000 * 60 * 60);

        var diffMin = Math.floor(diffTime / (1000 * 60));
        diffTime -= diffMin * 1000 * 60;

<<<<<<< HEAD
        var diffSec = Math.floor(diffTime / 1000);
        if (diffSec == 10) timerStop();
        showCardTimer.innerText = timeFormat(diffHours) + ":" + timeFormat(diffMin) + ":" + timeFormat(diffSec);
||||||| merged common ancestors
        this.refreshIntervalId;
        this.firstClickTime;
        this.arr = [];
        this.generateCards();
        this.events();
=======
        var diffSec = Math.floor(diffTime / 1000);
        if (diffSec == 10) timerStop();
        showCardTimer.innerText = digitFormat(diffHours) + ":" + digitFormat(diffMin) + ":" + digitFormat(diffSec);
>>>>>>> dev
    }

<<<<<<< HEAD
    function play(arr) {
||||||| merged common ancestors
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
=======
    function play() {
>>>>>>> dev

        //timerStart = timerStart.bind(this);
        cardClick.addEventListener('click', timerStart);

<<<<<<< HEAD
        cardClick.addEventListener('click', function () {
            newCardClick();
        });
    }
||||||| merged common ancestors
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
=======
        cardClick.addEventListener('click', function () {
            if (clickDisabled == true) return;else newCardClick();
        });
    }
>>>>>>> dev

<<<<<<< HEAD
    function newCardClick() {
        // verify, that user clicked on td element
        if (event.target.nodeName.toLowerCase() == 'td') {
            var id = event.target.dataset.id;
||||||| merged common ancestors
            //else go back like it was
            return value;
        }
    }, {
        key: 'timerUpdate',
        value: function timerUpdate() {
            var currentTime = new Date();
            var diffTime = currentTime.getTime() - this.firstClickTime.getTime();
=======
    function newCardClick() {
        // verify, that user clicked on td element
        if (event.target.nodeName.toLowerCase() == 'img') {
            var id = event.target.parentElement.dataset.id;
>>>>>>> dev

<<<<<<< HEAD
            if (cardArr[id].isOpen == false && cardArr[id].isOpen && oldId != id) {
                console.log("go to check");
                // increment the move-counter of clicks
                // update move-counter on frontend
                showCardClickCounter.innerText = cardClickCounter++;
||||||| merged common ancestors
            var diffHours = Math.floor(diffTime / (1000 * 60 * 60));
            diffTime -= diffHours * (1000 * 60 * 60);
=======
            if (id != oldId && cardArr[id].isClickable != false) {
                // increment the move-counter of clicks
                // update move-counter on frontend
                showCardClickCounter.innerText = cardClickCounter++;
>>>>>>> dev

                checkRating();

                checkCardClickChoice();
            }
            oldId = id;
        }
    }

    function generateCards() {

<<<<<<< HEAD
        for (var i = 0; i < fieldSize / 2; i++) {
            var card1 = {
                matchingPair: i,
                isOpen: false,
                isMatching: false,
                content: i + 1
            };
            var card2 = {
                matchingPair: i,
                isOpen: false,
                isMatching: false,
                content: i + fieldSize
            };
            cardArr.push(card1);
            cardArr.push(card2);
||||||| merged common ancestors
            this.newCardClick = this.newCardClick.bind(this);
            this.cardClick.addEventListener('click', this.newCardClick);
=======
        for (var i = 0; i < Math.floor(fieldSize / 2); i++) {
            var card1 = {
                matchingPair: i,
                isOpen: false,
                isMatching: false,
                isClickable: true,
                img: 'dog' + digitFormat(i + 1)
            };
            var card2 = card1;
            cardArr.push(card1);
            cardArr.push(card2);
        }
        if (fieldSize % 0 != 0) {
            var card = {
                matchingPair: 999,
                isOpen: true,
                isMatching: false,
                isClickable: false,
                img: 'odd'
            };
            cardArr.push(card);
>>>>>>> dev
        }
        shuffleCards();
    }

    function shuffleCards() {
        // fisher-yates shuffle
        var counter = cardArr.length;

        // While there are elements in the arr
        while (counter > 0) {
            // pick a random index
            var index = Math.floor(Math.random() * counter);

            // decrease counter by 1
            counter--;

<<<<<<< HEAD
            // swap the last element with it
            var temp = cardArr[counter];
            cardArr[counter] = cardArr[index];
            // set position in the random order
            cardArr[counter]['position'] = counter;

            cardArr[index] = temp;
||||||| merged common ancestors
                    this.checkCardClickChoice(event);
                }
            }
        }
    }, {
        key: 'generateCards',
        value: function generateCards() {
            var cardArr = [];
            for (var i = 0; i < this.fieldSize / 2; i++) {
                var card1 = {
                    matchingPair: i,
                    isVisible: false,
                    content: i + 1
                };
                var card2 = {
                    matchingPair: i,
                    isVisible: false,
                    content: i + this.fieldSize
                };
                cardArr.push(card1);
                cardArr.push(card2);
            }
            this.shuffleCards(cardArr);
        }
    }, {
        key: 'shuffleCards',
        value: function shuffleCards(arr) {
            // fisher-yates shuffle
            var counter = arr.length;

            // While there are elements in the arr
            while (counter > 1) {
                // pick a random index
                var index = Math.floor(Math.random() * counter);

                // decrease counter by 1
                counter--;

                // swap the last element with it
                var temp = arr[counter];
                arr[counter] = arr[index];
                // set position in the random order
                arr[counter]['position'] = counter;

                arr[index] = temp;
            }
            this.arr = arr;
            this.showShuffledCards();
=======
            // swap the last element with it
            var temp = cardArr[counter];
            cardArr[counter] = cardArr[index];
            cardArr[index] = temp;
>>>>>>> dev
        }
<<<<<<< HEAD

        showShuffledCards();
    }

    function showShuffledCards() {
        for (var row = 0; row < Math.sqrt(fieldSize); row++) {
            var nodeRow = document.createElement("tr");

            for (var col = 0; col < Math.sqrt(fieldSize); col++) {
                var nodeCol = document.createElement("td");
                var itemId = Math.sqrt(fieldSize) * row + col;
                var content = document.createTextNode(cardArr[itemId]['matchingPair']);
                nodeCol.appendChild(content);
                nodeCol.dataset.id = itemId;
                nodeRow.appendChild(nodeCol);
||||||| merged common ancestors
    }, {
        key: 'showShuffledCards',
        value: function showShuffledCards() {
            for (var row = 0; row < Math.sqrt(this.fieldSize); row++) {
                var nodeRow = document.createElement("tr");

                for (var col = 0; col < Math.sqrt(this.fieldSize); col++) {
                    var nodeCol = document.createElement("td");
                    var itemId = Math.sqrt(this.fieldSize) * row + col;
                    var content = document.createTextNode(this.arr[itemId]['matchingPair']);
                    nodeCol.appendChild(content);
                    nodeCol.dataset.id = itemId;
                    nodeRow.appendChild(nodeCol);
                }
                this.showGameField.appendChild(nodeRow);
=======

        showShuffledCards();
    }

    function showShuffledCards() {
        for (var row = 0; row < Math.sqrt(fieldSize); row++) {
            var nodeRow = document.createElement("tr");

            for (var col = 0; col < Math.sqrt(fieldSize); col++) {
                var nodeCol = document.createElement("td");
                var itemId = Math.sqrt(fieldSize) * row + col;
                console.log(itemId);
                var img = document.createElement('IMG');
                if (cardArr[itemId].isClickable == false) {
                    img.setAttribute("src", '../../assets/images/pool/1x/odd.png');
                } else img.setAttribute("src", '../../assets/images/pool/1x/paws.png');
                img.setAttribute("width", "200");
                img.setAttribute("height", "200");
                img.setAttribute("alt", "Train your Brain");
                nodeCol.appendChild(img);
                nodeCol.dataset.id = itemId;
                nodeRow.appendChild(nodeCol);
>>>>>>> dev
            }
            showGameField.appendChild(nodeRow);
        }
        return;
    }

    function generateRatingStars(num) {
        var stars = "";
        for (var i = 0; i < num; i++) {
            stars += "*";
        }
<<<<<<< HEAD
        return stars;
    }

    function checkRating() {
        rating = (cardClickCounter - 1) / fieldSize;
        switch (true) {
            case rating <= 4.25:
                starRating = 3;

                break;
            case rating <= 5.75:
                starRating = 2;
||||||| merged common ancestors
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
=======
        return stars;
    }

    function checkRating() {
        rating = (cardClickCounter - 1) / fieldSize;
        switch (true) {
            case rating <= 4.25:
                starRating = 3;

                break;
            case rating <= 5.75:
                starRating = 2;

                break;
            case rating <= 7.5:
                starRating = 1;
>>>>>>> dev

<<<<<<< HEAD
                break;
            case rating <= 7.5:
                starRating = 1;

                break;
            default:
                starRating = 0;
||||||| merged common ancestors
            this.showCardRating.innerText = this.generateRatingStars(this.starRating);
=======
                break;
            default:
                starRating = 0;
>>>>>>> dev
        }

        showCardRating.innerText = generateRatingStars(starRating);
    }

<<<<<<< HEAD
    function checkCardClickChoice() {
||||||| merged common ancestors
            if (this.openCards.length <= 1) {
                event.target.classList.add("open");
            }
=======
    function checkCardClickChoice() {

        var openCard = event.target.parentElement.dataset.id;
>>>>>>> dev

<<<<<<< HEAD
        var openCard = event.target.dataset.id;
        openCards.push(openCard);
        cardArr[openCard].isOpen = true;
||||||| merged common ancestors
            if (this.openCards.length == 2) {
=======
        openCards.push(openCard);

        cardArr[openCard].isOpen = true;
        event.target.src = '../../assets/images/pool/1x/' + cardArr[openCard]['img'] + '.png';

        if (openCards.length <= 1) {
            event.target.parentElement.classList.add("open");
        }
>>>>>>> dev

<<<<<<< HEAD
        if (openCards.length <= 1) {
            event.target.classList.add("open");
        }
||||||| merged common ancestors
                event.target.classList.add("open");
=======
        if (openCards.length == 2) {
            clickDisabled = true;
            event.target.parentElement.classList.add("open");
>>>>>>> dev

<<<<<<< HEAD
        if (openCards.length == 2) {
||||||| merged common ancestors
                var cardOneId = this.openCards[0];
                var cardTwoId = this.openCards[1];
                this.openCards = [];
=======
            var cardOneId = openCards[0];
            cardArr[cardOneId].isOpen = true;
>>>>>>> dev

<<<<<<< HEAD
            event.target.classList.add("open");
||||||| merged common ancestors
                if (this.arr[cardOneId].matchingPair == this.arr[cardTwoId].matchingPair) {
=======
            var cardTwoId = openCards[1];
            cardArr[cardTwoId].isOpen = true;
>>>>>>> dev

<<<<<<< HEAD
            var cardOneId = openCards[0];
            cardArr[cardOneId].isOpen = true;
||||||| merged common ancestors
                    var matchingPair = document.querySelectorAll(".open");
=======
            openCards = [];
            if (cardArr[cardOneId].matchingPair == cardArr[cardTwoId].matchingPair) {
>>>>>>> dev

<<<<<<< HEAD
            var cardTwoId = openCards[1];
            cardArr[cardTwoId].isOpen = true;

            openCards = [];
            if (cardArr[cardOneId].matchingPair == cardArr[cardTwoId].matchingPair) {

                var matchingPair = document.querySelectorAll(".open");
                cardArr[cardOneId].isMatching = true;
                cardArr[cardTwoId].isMatching = true;
                for (var i = 0; i < matchingPair.length; i++) {

                    console.log(cardArr);
                    matchingPair[i].classList.remove("open");
                    matchingPair[i].classList.add("matching");
                }
            } else {
                cardArr[cardOneId].isOpen = false;
                cardArr[cardTwoId].isOpen = false;

                setTimeout(function () {
                    var pairs = document.querySelectorAll(".open");
                    for (var i = 0; i < pairs.length; i++) {
                        pairs[i].classList.remove("open");
                    }
                }, 1000);
||||||| merged common ancestors
                    for (var i = 0; i < matchingPair.length; i++) {
                        matchingPair[i].classList.remove("open");
                        matchingPair[i].classList.add("matching");
                    }
                } else {
                    setTimeout(function () {
                        var pairs = document.querySelectorAll(".open");

                        for (var i = 0; i < pairs.length; i++) {
                            pairs[i].classList.remove("open");
                        }
                    }, 1000);
                }
=======
                var matchingPair = document.querySelectorAll(".open");
                cardArr[cardOneId].isMatching = true;
                cardArr[cardTwoId].isMatching = true;
                setTimeout(function () {
                    for (var i = 0; i < matchingPair.length; i++) {

                        matchingPair[i].classList.remove("open");
                        matchingPair[i].classList.add("matching");
                    }
                    clickDisabled = false;
                }, 1000);
            } else {
                cardArr[cardOneId].isOpen = false;
                cardArr[cardTwoId].isOpen = false;

                setTimeout(function () {
                    var pairs = document.querySelectorAll(".open");
                    for (var i = 0; i < pairs.length; i++) {
                        pairs[i].classList.remove("open");
                        pairs[i].childNodes[0].src = '../../assets/images/pool/1x/paws.png';
                    }
                    clickDisabled = false;
                }, 2000);
>>>>>>> dev
            }
        }
    }
}();

/***/ })
/******/ ]);