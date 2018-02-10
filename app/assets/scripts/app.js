var memory = function() {

    // $(".site-header__menu-icon").click(function () {
    //     console.log("right icon was clicked");

    var fieldSize = 16;
    var cardClickCounter = 1;
    var showCardClickCounter = document.getElementById('card-click-counter');
    var showCardRating = document.getElementById('card-star-rating');
    var showCardTimer = document.getElementById('card-timer');
    var showGameField = document.getElementById('field-table');

    var cardClick = document.getElementById('field');
    var openCards = [];
    var strg = "";
    var oldId;
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

    function timeFormat(value) {
        // convert value to string
        var value = value.toString();

        // if only one digit length put 0 before
        if (value.length <= 1) { return ("0" + value); };

        //else go back like it was
        return value;
    }

    function timerUpdate() {
        var currentTime = new Date();
        var diffTime = (currentTime.getTime() - firstClickTime.getTime());

        var diffHours = Math.floor(diffTime / (1000 * 60 * 60));
        diffTime -= diffHours * (1000 * 60 * 60);

        var diffMin = Math.floor(diffTime / (1000 * 60));
        diffTime -= diffMin * 1000 * 60;

        var diffSec = Math.floor(diffTime / 1000);
        if (diffSec == 10) timerStop();
        showCardTimer.innerText = timeFormat(diffHours) + ":" + timeFormat(diffMin) + ":" + timeFormat(diffSec);
    }


    function play() {

        //timerStart = timerStart.bind(this);
        cardClick.addEventListener('click', timerStart);

        cardClick.addEventListener('click', function() { newCardClick() });
    }

    function newCardClick() {
        // verify, that user clicked on td element
        if ((event.target.nodeName).toLowerCase() == 'td') {
            var id = event.target.dataset.id;

            if (cardArr[id].isOpen == false && !cardArr[id].isOpen && oldId != id) {
                console.log("go to check");
                // increment the move-counter of clicks
                // update move-counter on frontend
                showCardClickCounter.innerText = cardClickCounter++;

                checkRating();

                checkCardClickChoice();
            }
            oldId = id;
        }
    }


    function generateCards() {

        for (var i = 0; i < (fieldSize / 2); i++) {
            var card1 = {
                matchingPair: i,
                isOpen: false,
                isMatching: false,
                content: i + 1
            }
            var card2 = {
                matchingPair: i,
                isOpen: false,
                isMatching: false,
                content: i + fieldSize
            }
            cardArr.push(card1);
            cardArr.push(card2);
        }
        shuffleCards();
    }

    function shuffleCards() {
        // fisher-yates shuffle
        let counter = cardArr.length;

        // While there are elements in the arr
        while (counter > 0) {
            // pick a random index
            let index = Math.floor(Math.random() * counter);

            // decrease counter by 1
            counter--;

            // swap the last element with it
            let temp = cardArr[counter];
            cardArr[counter] = cardArr[index];
            // set position in the random order
            cardArr[counter]['position'] = counter;

            cardArr[index] = temp;
        }

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
            case (rating <= 4.25):
                starRating = 3;

                break;
            case (rating <= 5.75):
                starRating = 2;

                break;
            case (rating <= 7.5):
                starRating = 1;

                break;
            default:
                starRating = 0;
        }

        showCardRating.innerText = generateRatingStars(starRating);


    }


    function checkCardClickChoice() {

        var openCard = event.target.dataset.id;
        openCards.push(openCard);
        cardArr[openCard].isOpen = true;

        if ((openCards).length <= 1) {
            event.target.classList.add("open");
        }


        if ((openCards).length == 2) {

            event.target.classList.add("open");

            var cardOneId = openCards[0];
            cardArr[cardOneId].isOpen = true;

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

                setTimeout(function() {
                    var pairs = document.querySelectorAll(".open");
                    for (var i = 0; i < pairs.length; i++) {
                        pairs[i].classList.remove("open");
                    }
                }, 1000);

            }
        }
    }
}();