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

    var fieldSize = 9;
    var fieldSizeIsOdd = true;
    var cardClickCounter = 0;
    var showCardClickCounter = document.getElementById('card-click-counter');
    var showCardRating = document.getElementById('card-star-rating');
    var showCardTimer = document.getElementById('card-timer');
    var showGameField = document.getElementById('field-table');

    var getRestart = document.getElementById('game-restart');
    var getLevel = document.getElementById('game-level');
    var getLevel = document.getElementById('game-level-input');
    var gameLevel = document.getElementById('game-level');

    var cardClick = document.getElementById('field');
    var myAudio = document.getElementById('myAudio');

    var modalCongrat = document.getElementById('modal-congrat');
    var modalsClose = document.getElementsByClassName('modal__close');
    var modalMoves = document.getElementById('modal-congrat-moves');
    var modalTime = document.getElementById('modal-congrat-time');

    var modalInfoOpen = document.getElementById('header-info');

    var showHitlist = document.getElementById('modal-show-hitlist');

    var matchingCards = 0;
    var gameCompleted = false;

    var flag = 0;
    var clickDisabled = false;
    var refreshIntervalId;
    var firstClickTime;
    var starRating;
    var oldId;
    var level = 0;

    var diffHours, diffMin, diffSec;

    var goToSecondMove = false;
    var cardArr = [];

    document.addEventListener('DOMContentLoaded', listenEvents, false);

    restart();

    function restart() {

        cardClickCounter = 0;
        matchingCards = 0;
        gameCompleted = false;

        flag = 0;
        clickDisabled = false;

        oldId = 999;

        goToSecondMove = false;
        cardArr = [];

        var myNode = document.getElementById("field-table");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
        changeLevelDisableHint();
        modalFadeOutOpened();

        addHitlistToDom();

        timerStop();
        timerRestart();
        showCardClickCounter.innerText = 0;

        showCardRating.innerText = "***";
        generateCards();
    }

    function isLocalStorageNameSupported() {
        var testKey = 'test',
            storage = window.localStorage;
        try {
            storage.setItem(testKey, '1');
            storage.removeItem(testKey);
            return true;
        } catch (error) {
            return false;
        }
    }

    function getFromLocalStorage() {
        if (isLocalStorageNameSupported()) return JSON.parse(localStorage.getItem("hitlist"));
    }

    function writeToLocalStore(obj) {
        if (isLocalStorageNameSupported()) return localStorage.setItem("hitlist", JSON.stringify(obj));
    }

    function pushToLocalStorage(newObj) {
        if (isLocalStorageNameSupported()) {
            // var newData = ({
            //   fieldSize: fieldSize,
            // moves: cardClickCounter,
            //    minutes: diffMin,
            //  seconds: diffSec
            // });

            var oldHitlist = getFromLocalStorage();

            if (oldHitlist == null) {
                oldHitlist = [newObj];
            } else oldHitlist.push(newObj);
            if (oldHitlist.length > 6) oldHitlist.shift();
            writeToLocalStore(oldHitlist);
        }
    }

    function removeNode(node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }

    function addHitlistToDom() {

        removeNode(showHitlist);

        var localHitlist = getFromLocalStorage();
        if (localHitlist) {

            var myFragment = document.createDocumentFragment();

            var nodeUl = document.createElement("ul");

            if (localHitlist) {
                for (var i = localHitlist.length > 6 ? 6 : localHitlist.length; i > 0; i--) {
                    var nodeLi = document.createElement("li");
                    var content = i + 1 + ")" + localHitlist[i].fieldSize + "fields with " + localHitlist[i].moves + " moves in " + localHitlist[i].time;
                    nodeLi.innerText = content;
                    myFragment.appendChild(nodeLi);
                }
            }
            nodeUl.appendChild(myFragment);
            showHitlist.appendChild(nodeUl);
        } else {
            var nodeP = document.createElement("p");
            nodeP.innerText = "Sorry, but there are no games saved.";
            showHitlist.appendChild(nodeP);
        }
    }

    function modalFadeIn(containerId) {

        if (containerId == null) {
            var content = document.getElementById(event.target.parentElement.dataset.modalTarget);
        } else var content = document.getElementById(containerId);

        var openedModal = document.querySelector('.fade-in');

        modalFadeOutOpened();

        content.classList.add("fade-in");
    }

    function modalFadeOutOpened() {
        var modalOpened = document.querySelectorAll('.fade-in');
        console.log(modalOpened);
        for (var i = 0; i < modalOpened.length; i++) {
            modalOpened[i].classList.remove("fade-in");
        }
    }

    function modalFadeOut() {

        var modal = event.target.parentElement.parentElement;

        modal.classList.remove("fade-in");
    }

    function timerStop() {

        clearInterval(refreshIntervalId);
    }

    function timerRestart() {
        clearInterval(refreshIntervalId);
        showCardTimer.innerText = "00:00:00";
        cardClick.addEventListener('click', timerStart);
    }

    function timerStart() {

        //remove eventlistener after first call of timerStart
        cardClick.removeEventListener('click', timerStart);

        // save time of first click
        firstClickTime = new Date();

        // update timer every second
        refreshIntervalId = setInterval(timerUpdate.bind(this), 1000);
    }

    function gameRunning() {

        if (gameCompleted || cardClickCounter == 0) return false;
        return true;
    }

    function changeLevelDisableHint() {
        var hint = document.getElementById('game-level-hint');
        hint.classList.remove('show');
    }

    function changeLevelHint() {
        var hint = document.getElementById('game-level-hint');
        hint.classList.add('show');
        setTimeout(function () {
            hint.classList.remove('show');
        }, 4000);
    }

    function changeLevel() {
        if (!gameRunning()) {

            var levels = ["terrier", "bernese", "puppy"];
            var sizes = [9, 16, 4];
            level++;
            level = level % 3;

            if (sizes[level] % 2 == 0) fieldSizeIsOdd = false;

            gameLevel.innerText = levels[level];
            fieldSize = sizes[level];

            restart();
        } else changeLevelHint();
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

        diffHours = Math.floor(diffTime / (1000 * 60 * 60));
        diffTime -= diffHours * (1000 * 60 * 60);

        diffMin = Math.floor(diffTime / (1000 * 60));
        diffTime -= diffMin * 1000 * 60;

        diffSec = Math.floor(diffTime / 1000);

        showCardTimer.innerText = digitFormat(diffHours) + ":" + digitFormat(diffMin) + ":" + digitFormat(diffSec);
    }

    function listenEvents() {

        //timerStart = timerStart.bind(this);
        cardClick.addEventListener('click', timerStart);

        cardClick.addEventListener('click', function () {
            if (clickDisabled == true) return;else newCardClick();
        });

        getLevel.addEventListener('click', changeLevel);

        getRestart.addEventListener('click', restart);

        for (var i = 0; i < modalsClose.length; i++) {
            modalsClose[i].addEventListener('click', modalFadeOut, false);
        }

        modalInfoOpen.addEventListener('click', function () {
            modalFadeIn(null);
        });
    }

    function newCardClick() {
        var dataSetId = event.target.dataset.id;
        // verify, that user clicked on td element

        if (!gameCompleted) {
            if (event.target.nodeName.toLowerCase() == 'img' && dataSetId) {
                var dataSetId = event.target.dataset.id;

                if (dataSetId != oldId && cardArr[dataSetId].isClickable == true) {

                    myAudio.play();
                    // increment the move-counter of clicks
                    // update move-counter on frontend
                    showCardClickCounter.innerText = cardClickCounter++ + 1;
                    checkRating();
                    checkCardClickChoice(dataSetId);
                }
            }
        }
    }

    function generateCards() {
        if (fieldSize % 2 != 0) fieldSizeIsOdd = true;
        if (fieldSizeIsOdd == true) {

            var dummyCard = {
                matchingPair: 999,
                isOpen: false,
                isMatching: false,
                isClickable: false,
                img: 'odd'
            };
            fieldSizeIsOdd = true;
            cardArr.push(dummyCard);
        }

        for (var i = 0; i < Math.floor(fieldSize / 2); i++) {
            var card1 = {
                matchingPair: i,
                isOpen: false,
                isMatching: false,
                isClickable: true,
                img: 'dog' + digitFormat(i + 1)
            };
            cardArr.push(card1);
            cardArr.push(card1);
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
                var nodeFrontDiv = document.createElement("div");
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
                img.dataset.id = itemId;
                nodeFrontDiv.appendChild(img);
                nodeFrontDiv.classList.add('front');
                var nodeFlipDiv = document.createElement('div');
                nodeFlipDiv.classList.add('field-table__flipContainer');
                nodeFlipDiv.appendChild(nodeFrontDiv);

                nodeCol.appendChild(nodeFlipDiv);

                nodeRow.appendChild(nodeCol);
            }
            showGameField.appendChild(nodeRow);
        }
    }

    function generateRatingStars(num) {
        var stars = "";
        for (var i = 0; i < num; i++) {
            stars += "*";
        }
        return stars;
    }

    function checkRating() {
        var rating = cardClickCounter / fieldSize;
        switch (true) {
            case rating <= 1.3:
                starRating = 3;

                break;
            case rating <= 1.5:
                starRating = 2;

                break;
            case rating <= 1.7:
                starRating = 1;

                break;
            default:
                starRating = 0;
        }

        showCardRating.innerText = generateRatingStars(starRating);
    }

    function checkIfCompleted() {
        matchingCards++;

        if (matchingCards >= Math.floor(fieldSize / 2)) {
            gameCompleted = true;
            timerStop();

            gratulation();
        }
    }

    function gratulation() {
        modalFadeIn("modal-congrat");

        var timeContent = "";

        if (diffMin >= 1) {
            timeContent = diffMin + " minutes and ";
        };
        timeContent += diffSec + " seconds.";

        modalMoves.innerText = cardClickCounter;
        modalTime.innerText = timeContent;
        modalTime.innerText = timeContent;

        var newData = {
            fieldSize: fieldSize,
            moves: cardClickCounter,
            time: timeContent
        };

        pushToLocalStorage(newData);
        addHitlistToDom();
    }

    function flipCard(element, id) {
        element.parentElement.classList.add("open");
        var nodeBackDiv = document.createElement('div');
        nodeBackDiv.classList.add('back');

        var img = document.createElement('IMG');
        img.src = '../../assets/images/pool/1x/' + cardArr[id]['img'] + '.png';
        img.setAttribute("width", "200");
        img.setAttribute("height", "200");
        img.setAttribute("alt", "Train your Brain");

        nodeBackDiv.appendChild(img);
        element.appendChild(nodeBackDiv);
    }

    function checkCardClickChoice(currentCardId) {

        var currentElement = event.target.parentElement.parentElement;

        if (goToSecondMove == true) {

            clickDisabled = true;
            //currentElement.parentElement.classList.add("open");
            flipCard(currentElement, currentCardId);

            if (cardArr[oldId].matchingPair == cardArr[currentCardId].matchingPair) {

                setTimeout(function () {
                    cardArr[oldId].isMatching = true;
                    cardArr[currentCardId].isMatching = true;

                    var matchingPair = document.querySelectorAll(".open");

                    for (var i = 0; i < matchingPair.length; i++) {
                        matchingPair[i].classList.remove("open");
                        matchingPair[i].classList.add("matching");
                    }
                    oldId = 999;
                    clickDisabled = false;
                }, 1000);
                goToSecondMove = false;
                checkIfCompleted();
            } else {
                setTimeout(function () {
                    cardArr[oldId].isOpen = false;
                    cardArr[currentCardId].isOpen = false;

                    var pairs = document.querySelectorAll(".open");
                    for (var i = 0; i < pairs.length; i++) {
                        pairs[i].classList.remove("open");
                    }
                    oldId = 999;
                    clickDisabled = false;
                }, 1500);
                goToSecondMove = false;
            }
        } else {

            cardArr[currentCardId].isOpen = true;
            // currentElement.parentElement.classList.add("open");
            flipCard(currentElement, currentCardId);
            //flipCard(event.target.parentElement);
            oldId = currentCardId;

            goToSecondMove = true;
        }
    }
}();

/***/ })
/******/ ]);