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

    var fieldSize = 4;
    var cardClickCounter = 1;
    var showCardClickCounter = document.getElementById('card-click-counter');
    var showCardRating = document.getElementById('card-star-rating');
    var showCardTimer = document.getElementById('card-timer');
    var showGameField = document.getElementById('field-table');

    var cardClick = document.getElementById('field');
    var openCards = [];
    var strg = "";
    var clickDisabled = false;
    var refreshIntervalId;
    var firstClickTime;
    var rating;
    var starRating;

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

    function digitFormat(value) {
        // convert value to string
        var value = value.toString();

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

        var diffSec = Math.floor(diffTime / 1000);
        if (diffSec == 10) timerStop();
        showCardTimer.innerText = digitFormat(diffHours) + ":" + digitFormat(diffMin) + ":" + digitFormat(diffSec);
    }

    function play() {

        //timerStart = timerStart.bind(this);
        cardClick.addEventListener('click', timerStart);

        cardClick.addEventListener('click', function () {
            if (clickDisabled == true) return;else newCardClick();
        });
    }

    function newCardClick() {
        // verify, that user clicked on td element
        if (event.target.nodeName.toLowerCase() == 'img') {
            var dataSetId = event.target.parentElement.dataset.id;

            if (!cardArr[dataSetId].isOpen && cardArr[dataSetId].isClickable) {
                var myAudio = document.getElementById('myAudio');
                myAudio.play();
                // increment the move-counter of clicks
                // update move-counter on frontend
                showCardClickCounter.innerText = cardClickCounter++;
                checkRating();
                checkCardClickChoice();
            }
        }
    }

    function generateCards() {

        for (var i = 0; i < 2; i++) {
            var card1 = {
                matchingPair: i,
                isOpen: false,
                isMatching: false,
                isClickable: true,
                img: 'dog' + digitFormat(i + 1)
            };
            var card2 = {
                matchingPair: i,
                isOpen: false,
                isMatching: false,
                isClickable: true,
                img: 'dog' + digitFormat(i + 1)
            };
            cardArr.push(card1);
            cardArr.push(card2);
        }
        if (fieldSize == 9 || fieldSize == 25) {
            var card = {
                matchingPair: 999,
                isOpen: false,
                isMatching: false,
                isClickable: false,
                img: 'odd'
            };
            cardArr.push(card);
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

            // swap the last element with it
            var temp = cardArr[counter];
            cardArr[counter] = cardArr[index];
            cardArr[index] = temp;
        }

        showShuffledCards();
    }

    function showShuffledCards() {
        for (var row = 0; row < Math.sqrt(fieldSize); row++) {
            var nodeRow = document.createElement("tr");

            for (var col = 0; col < Math.sqrt(fieldSize); col++) {
                var nodeCol = document.createElement("td");
                nodeCol.className = "field-table__card";
                var itemId = Math.sqrt(fieldSize) * row + col;

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

                break;
            default:
                starRating = 0;
        }

        showCardRating.innerText = generateRatingStars(starRating);
    }

    function checkCardClickChoice() {

        var currentCard = event.target.parentElement.dataset.id;

        openCards.push(currentCard);

        event.target.src = '../../assets/images/pool/1x/' + cardArr[currentCard]['img'] + '.png';

        if (openCards.length <= 1) {
            cardArr[openCards[0]].isOpen = true;
            event.target.parentElement.classList.add("open");
            return;
        }

        if (openCards.length == 2) {

            clickDisabled = true;
            event.target.parentElement.classList.add("open");

            var cardOneId = openCards[0];
            cardArr[cardOneId].isOpen = true;
            var cardTwoId = openCards[1];
            cardArr[cardTwoId].isOpen = true;
            openCards = [];

            if (cardArr[cardOneId].matchingPair == cardArr[cardTwoId].matchingPair) {

                cardArr[cardOneId].isMatching = true;
                cardArr[cardTwoId].isMatching = true;

                var matchingPair = document.querySelectorAll(".open");
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
            }
        }
    }
}();

/***/ })
/******/ ]);