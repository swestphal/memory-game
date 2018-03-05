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


(function () {
    "use strict";

    var showCardClickCounter = document.getElementById("card-click-counter");
    var showCardRating = document.getElementById("card-star-rating");
    var showCardTimer = document.getElementById("card-timer");
    var showGameField = document.getElementById("field-table");

    var getRestart = document.getElementById("game-restart");
    var hint = document.getElementById("game-level-hint");
    var getLevel = document.getElementById("game-level-input");
    var gameLevel = document.getElementById("game-level");

    var cardClick = document.getElementById("field");
    var myAudio = document.getElementById("myAudio");

    var modalsClose = document.getElementsByClassName("modal__close");
    var modalMoves = document.getElementById("modal-congrat-moves");
    var modalTime = document.getElementById("modal-congrat-time");
    var modalRating = document.getElementById("modal-congrat-rating");
    var modalPlayAgain = document.getElementById("modal-congrat-play-again");

    var modalInfoOpen = document.getElementById("header-info");

    var showHitlist = document.getElementById("modal-show-hitlist");

    var fieldSize = 9;
    var fieldSizeIsOdd = true;

    var cardClickCounter = 0;
    var matchingCards = 0;
    var gameCompleted = false;
    var clickDisabled = false;
    var refreshIntervalId = void 0;
    var firstClickTime = void 0;
    var starRating = void 0;
    var oldId = void 0;
    var level = 0;

    var diffHours = void 0,
        diffMin = void 0,
        diffSec = void 0;

    var goToSecondMove = false;
    var cardArr = [];

    function start() {
        document.addEventListener("DOMContentLoaded", listenEvents, false);

        // on restart set values to zero
        //
        cardClickCounter = 0;
        matchingCards = 0;
        gameCompleted = false;

        clickDisabled = false;
        oldId = 999;

        goToSecondMove = false;
        cardArr = [];

        // remove field table from previous game
        var myNode = document.getElementById("field-table");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }

        // if hint is still open hide it
        changeLevelDisableHint();

        // fade out open modal
        modalFadeOutOpened();

        // add current hitlist to dom
        addHitlistToDom();

        // stop timer and restart it (set it to 00:00:00 on frontend)
        timerStop();
        timerRestart();

        // set frontend values to 0
        showCardClickCounter.innerText = 0;
        showCardRating.innerText = "***";

        // generate a new card array
        generateCards();
    }

    /**
     * check if local storage is supported
     */

    function isLocalStorageNameSupported() {
        try {
            // try to write data on localstorage
            localStorage.setItem("test", "hitlist");
            localStorage.removeItem("test");
            return true;
        } catch (error) {
            // on error return false
            return false;
        }
    }

    /**
     * reads hitlist from local storage
     */

    function getFromLocalStorage() {
        if (isLocalStorageNameSupported()) return JSON.parse(localStorage.getItem("hitlist"));
    }

    /**
     * writes hitlist to local storage
     */

    function writeToLocalStore(obj) {
        if (isLocalStorageNameSupported()) return localStorage.setItem("hitlist", JSON.stringify(obj));
    }

    /**
     * appends current game to hitlist and write it back to local storage
     */

    function pushToLocalStorage(newObj) {
        if (isLocalStorageNameSupported()) {
            var oldHitlist = getFromLocalStorage();
            if (oldHitlist == null) {
                oldHitlist = [newObj];
            } else oldHitlist.push(newObj);
            // remove the oldest entry if there are more than six values stored
            if (oldHitlist.length > 6) oldHitlist.shift();
            writeToLocalStore(oldHitlist);
        }
    }

    /**
     * helper: removes children of given node
     */

    function removeNode(node) {
        // as long as the node has a child ...
        while (node.firstChild) {
            // ... remove from node the first child
            node.removeChild(node.firstChild);
        }
    }

    /**
     * appends the current hitlist to the dom
     */

    function addHitlistToDom() {
        // remove old list
        removeNode(showHitlist);

        // build a new hitlist
        var myFragment = document.createDocumentFragment();

        var nodeUl = document.createElement("ul");

        var localHitlist = getFromLocalStorage();

        if (localHitlist) {
            // if there is is a local storage hitlist build list with it and append to dom
            for (var i = localHitlist.length - 1; i >= 0; i--) {
                // latest value on top

                var nodeLi = document.createElement("li");
                var content = i + 1 + ") " + localHitlist[i].fieldSize + " fields with " + localHitlist[i].moves + " moves in " + localHitlist[i].time + " and earned " + localHitlist[i].rating;
                nodeLi.innerText = content;
                myFragment.appendChild(nodeLi);
            }
            nodeUl.appendChild(myFragment);
            showHitlist.appendChild(nodeUl);
        } else {
            // if there is no list give text info that no games are saved
            var nodeP = document.createElement("p");
            nodeP.innerText = "Sorry, but there are no games saved.";
            showHitlist.appendChild(nodeP);
        }
    }

    /**
     * fade - in modal
     */

    function modalFadeIn(containerId, event) {
        // if containerID is not set
        var content = document.getElementById(containerId);

        if (containerId == null) {
            // set content to the dataset info of the parentElement of click
            content = document.getElementById(event.target.parentElement.dataset.modalTarget);
        }

        // fade out modals that are opened
        modalFadeOutOpened();

        // add class "fade-in" to the element and show it
        content.classList.add("fade-in");
    }

    /**
     * fade-out opened modal windows
     */

    function modalFadeOutOpened() {
        // get all modal that are currently shown
        var modalOpened = document.querySelectorAll(".fade-in");

        // loop through the founded elements
        for (var i = 0; i < modalOpened.length; i++) {
            // and remove the class "fade-in"
            modalOpened[i].classList.remove("fade-in");
        }
    }

    /**
     * fade-out current modal that user click
     */

    function modalFadeOut(event) {
        // get the grandparent of click
        var modal = event.target.parentElement.parentElement;

        // and remove class "fade-in"
        modal.classList.remove("fade-in");
    }

    /**
     * stop timer
     */

    function timerStop() {
        // stop recurring timer from firing
        clearInterval(refreshIntervalId);
    }

    /**
     * restart timer
     */

    function timerRestart() {
        // stop recurring timer from firing
        clearInterval(refreshIntervalId);

        // set on frontend timer on zero
        showCardTimer.innerText = "00:00:00";

        // add eventlistener on cardclick to start the timer on click on card
        // it will then be removed after the first click
        cardClick.addEventListener("click", timerStart);
    }

    /**
     * start timer
     */

    function timerStart() {
        //remove eventlistener after first call of timerStart
        cardClick.removeEventListener("click", timerStart);

        // save time of first click
        firstClickTime = new Date();

        // update timer every second
        refreshIntervalId = setInterval(timerUpdate.bind(this), 1000);
    }

    /**
     * check if game is running
     */

    function gameRunning() {
        if (gameCompleted || cardClickCounter == 0) return false;
        return true;
    }

    /**
     * close the hint
     */

    function changeLevelDisableHint() {
        hint.classList.remove("show");
    }

    /**
     * show the hint for four seconds
     */

    function changeLevelHint() {
        hint.classList.add("show");
        setTimeout(function () {
            hint.classList.remove("show");
        }, 4000);
    }

    /**
     * change the level if game is not running
     */

    function changeLevel() {
        if (!gameRunning()) {
            // if game is not running allow level changing
            showGameField.classList.remove(gameLevel.innerText);
            var levels = [{ name: "terrier", size: 9 }, { name: "bernese", size: 16 }, { name: "puppy", size: 4 }];

            // run through the levels
            level++;
            level = level % 3;

            if (levels[level].size % 2 == 0) fieldSizeIsOdd = false;

            gameLevel.innerText = levels[level].name;
            fieldSize = levels[level].size;
            showGameField.classList.add(gameLevel.innerText);
            start();
        } else changeLevelHint();
        // show hint, that is is not allowed to change level while game is running
    }

    /**
     * remove first 0 from values
     */

    function digitFormat(value) {
        // convert value to string
        var value = value.toString();

        // if only one digit length put 0 before
        if (value.length <= 1) {
            return "0" + value;
        }

        //else go back like it was
        return value;
    }

    /**
     * update the values of running timer
     */

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

    /**
     * add eventlistener
     */

    function listenEvents() {
        cardClick.addEventListener("click", timerStart);

        cardClick.addEventListener("click", function (e) {
            if (clickDisabled == true) return;else newCardClick(e);
        });

        getLevel.addEventListener("click", changeLevel);
        getRestart.addEventListener("click", start);

        for (var i = 0; i < modalsClose.length; i++) {
            modalsClose[i].addEventListener("click", function (e) {
                modalFadeOut(e);
            }, false);
        }
        modalPlayAgain.addEventListener("click", start);
        modalInfoOpen.addEventListener("click", function (e) {
            modalFadeIn(null, e);
        });
    }

    /**
     * handle the click on a card
     */

    function newCardClick(event) {
        var dataSetId = event.target.dataset.id;

        // verify, that game is still running
        if (!gameCompleted) {
            // verify, that user clicked on img and that there is a id to identify the card index
            if (event.target.nodeName.toLowerCase() == "img" && dataSetId) {
                //if clicked card is not the same as the precedent and the card is not the dummy card ...
                if (dataSetId != oldId && cardArr[dataSetId].isClickable == true) {
                    checkRating();
                    checkCardClickChoice(dataSetId, event);
                }
            }
        }
    }

    /**
     * build an array and double it
     */

    function generateCards() {
        if (fieldSize % 2 != 0) fieldSizeIsOdd = true;
        if (fieldSizeIsOdd == true) {
            // input a not clickable dummy card for an odd fieldsize
            var dummyCard = {
                matchingPair: 999,
                isOpen: false,
                isMatching: false,
                isClickable: false,
                img: "odd"
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
                img: "dog" + digitFormat(i + 1)
            };
            cardArr.push(card1);
            cardArr.push(card1); //push again for the second set of cards
        }
        // rearrange order of the card array
        shuffleCards();
    }

    /**
     * shuffle the array
     */

    function shuffleCards() {
        // fisher-yates shuffle
        var counter = cardArr.length;

        // While there are elements in the card array
        while (counter > 0) {
            // pick a random index
            var index = Math.floor(Math.random() * counter);
            counter--;
            // swap the last element with it
            var temp = cardArr[counter];
            cardArr[counter] = cardArr[index];
            cardArr[index] = temp;
        }

        showShuffledCards();
    }

    /**
     * build the table and append it to showGameField
     */

    function showShuffledCards() {
        for (var row = 0; row < Math.sqrt(fieldSize); row++) {
            // build rows
            var nodeRow = document.createElement("tr");
            // build cols
            for (var col = 0; col < Math.sqrt(fieldSize); col++) {
                var nodeFrontDiv = document.createElement("div");
                var nodeCol = document.createElement("td");
                nodeCol.className = "field-table__card";
                var itemId = Math.sqrt(fieldSize) * row + col;

                var img = document.createElement("IMG");

                // if this card is not clickable (because fieldsize is odd) show dummycard
                if (cardArr[itemId].isClickable == false) {
                    img.setAttribute("src", "../../assets/images/pool/1x/odd.png");
                } else {
                    // else show normal frontside
                    img.setAttribute("src", "../../assets/images/pool/1x/paws.png");
                }

                img.setAttribute("alt", "Train your Brain");
                img.dataset.id = itemId;
                nodeFrontDiv.appendChild(img);
                nodeFrontDiv.classList.add("front");
                var nodeFlipDiv = document.createElement("div");
                nodeFlipDiv.classList.add("field-table__flipContainer");
                nodeFlipDiv.appendChild(nodeFrontDiv);
                nodeCol.appendChild(nodeFlipDiv);
                nodeRow.appendChild(nodeCol);
            }
            // show the cards
            showGameField.appendChild(nodeRow);
        }
    }

    /**
     * generate amount of stars
     */

    function generateRatingStars(num) {
        var stars = "";
        for (var i = 0; i < num; i++) {
            stars += "*";
        }
        return stars;
    }

    /**
     * calculate rating
     */

    function checkRating() {
        var rating = cardClickCounter * 3 / fieldSize * 100 - 100;

        // switch on a a span of 30/50/90 percent of additional click in relation to fieldsize
        switch (true) {
            case rating <= 35:
                starRating = 3;

                break;
            case rating <= 110:
                starRating = 2;

                break;

            default:
                starRating = 1;
        }
        // get amount of appropriate count of stars and set it in the frontend
        showCardRating.innerText = generateRatingStars(starRating);
    }

    /**
     * check if all cards are matching and game is finished
     */

    function checkIfCompleted() {
        matchingCards++;

        if (matchingCards >= Math.floor(fieldSize / 2)) {
            gameCompleted = true;
            timerStop();
            gratulation();
        }
    }

    /**
     * set needed time and moves into gratulation modal and push values to localstorage
     */

    function gratulation() {
        modalFadeIn("modal-congrat");

        // build timestring of minutes (if there are) and seconds
        var timeContent = "";

        if (diffMin >= 1) {
            timeContent = diffMin + " minutes and ";
        }
        timeContent += diffSec + " seconds.";

        // set in gratulation modal count of moves and timestring
        modalMoves.innerText = cardClickCounter;
        modalTime.innerText = timeContent;
        modalRating.innerText = showCardRating.innerText.length;
        // fill object for pushing to existing localstorage

        var newData = {
            fieldSize: fieldSize,
            moves: cardClickCounter,
            time: timeContent,
            rating: showCardRating.innerText
        };

        pushToLocalStorage(newData);
        addHitlistToDom();
    }

    /**
     * turn clicked card and show image with index of id
     */

    function flipCard(element, id) {
        // make flip sound
        myAudio.volume = 0.3;
        myAudio.play();

        element.parentElement.classList.add("open");

        // in order to not show solution at first sight in the html code, the backside of card is
        // appended if user clicks on card
        var nodeBackDiv = document.createElement("div");
        nodeBackDiv.classList.add("back");

        var img = document.createElement("IMG");
        img.src = "../../assets/images/pool/1x/" + cardArr[id]["img"] + ".png";
        img.setAttribute("alt", "Train your Brain");

        nodeBackDiv.appendChild(img);
        element.appendChild(nodeBackDiv);
    }

    /**
     * check if clicked card is the first opened card and if not if it matches to precedent
     */

    function checkCardClickChoice(currentCardId, event) {
        var currentElement = event.target.parentElement.parentElement;

        if (goToSecondMove == true) {
            showCardClickCounter.innerText = cardClickCounter++ + 1;
            // if it is the second card which is openend ...
            clickDisabled = true;

            flipCard(currentElement, currentCardId);

            if (cardArr[oldId].matchingPair == cardArr[currentCardId].matchingPair) {
                setTimeout(function () {
                    // cards matching is passed, set to both cards on matched status
                    cardArr[oldId].isMatching = true;
                    cardArr[currentCardId].isMatching = true;

                    // search for opened cards, remove class open and set it to matching
                    var matchingPair = document.querySelectorAll(".open");
                    for (var i = 0; i < matchingPair.length; i++) {
                        matchingPair[i].classList.remove("open");
                        matchingPair[i].classList.add("matching");
                    }
                    oldId = 999;
                    clickDisabled = false;
                }, 1000);

                // pairmatching was passed, next move is again the first of two cards to open
                goToSecondMove = false;
                checkIfCompleted();
            } else {
                setTimeout(function () {
                    if (oldId != 999) {
                        cardArr[oldId].isOpen = false;
                    }
                    cardArr[currentCardId].isOpen = false;

                    // card wasn't matching, remove the class open from both opened cards
                    var pairs = document.querySelectorAll(".open");
                    for (var i = 0; i < pairs.length; i++) {
                        pairs[i].classList.remove("open");
                    }
                    oldId = 999;
                    clickDisabled = false;
                }, 1500);

                // pairmatching was not passed, next move is again the first of two cards to open
                goToSecondMove = false;
            }
        } else {
            // if it is the first card of two which is openen .....
            //
            // set status of current card to open
            cardArr[currentCardId].isOpen = true;

            flipCard(currentElement, currentCardId);

            // store current Id in oldId
            oldId = currentCardId;

            // allow next time to go to test of pairmatching
            goToSecondMove = true;
        }
    }
    start();
})();

/***/ })
/******/ ]);