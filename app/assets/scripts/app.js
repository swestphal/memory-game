var memory = function() {

    // $(".site-header__menu-icon").click(function () {
    //     console.log("right icon was clicked");

    var fieldSize = 9;
    var fieldSizeIsOdd = false;
    var cardClickCounter = 1;
    var showCardClickCounter = document.getElementById('card-click-counter');
    var showCardRating = document.getElementById('card-star-rating');
    var showCardTimer = document.getElementById('card-timer');
    var showGameField = document.getElementById('field-table');

    var cardClick = document.getElementById('field');

    var matchingCards = 0;
    var gameCompleted = false;

    var clickDisabled = false;
    var refreshIntervalId;
    var firstClickTime;
    var rating;
    var starRating;
    var oldId;

    var goToSecondMove = false;
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

        showCardTimer.innerText = digitFormat(diffHours) + ":" + digitFormat(diffMin) + ":" + digitFormat(diffSec);
    }



    function play() {

        //timerStart = timerStart.bind(this);
        cardClick.addEventListener('click', timerStart);

        cardClick.addEventListener('click', function() {
            if (clickDisabled == true) return;
            else newCardClick();
        });
    }

    function newCardClick() {
        var dataSetId = event.target.dataset.id;
        // verify, that user clicked on td element

        if (!gameCompleted) {
            if ((event.target.nodeName).toLowerCase() == 'img' && dataSetId) {
                var dataSetId = event.target.dataset.id;


                if (dataSetId != oldId && cardArr[dataSetId].isClickable == true) {
                    var myAudio = document.getElementById('myAudio');
                    myAudio.play();
                    // increment the move-counter of clicks
                    // update move-counter on frontend
                    showCardClickCounter.innerText = cardClickCounter++;
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
            }
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
            }
            cardArr.push(card1);
            cardArr.push(card1);
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
                if (cardArr[itemId].isClickable == false) { img.setAttribute("src", '../../assets/images/pool/1x/odd.png') } else img.setAttribute("src", '../../assets/images/pool/1x/paws.png');
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
        rating = (cardClickCounter) / fieldSize;
        switch (true) {
            case (rating <= 1):
                starRating = 3;

                break;
            case (rating <= 1.3):
                starRating = 2;

                break;
            case (rating <= 1.6):
                starRating = 1;

                break;
            default:
                starRating = 0;
        }

        showCardRating.innerText = generateRatingStars(starRating);


    }

    function checkIfCompleted() {
        matchingCards++;
        console.log(matchingCards);
        if (matchingCards >= Math.floor(fieldSize / 2)) {
            gameCompleted = true;
            timerStop;
            gratulation();
        }

    }

    function gratulation() {
        console.log("hurrah");
    }

    function flipCard(element, id) {

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
        //event.target.src = '../../assets/images/pool/1x/' + cardArr[currentCard]['img'] + '.png';


        if (goToSecondMove == true) {

            clickDisabled = true;
            currentElement.parentElement.classList.add("open");
            flipCard(currentElement, currentCardId);


            if (cardArr[oldId].matchingPair == cardArr[currentCardId].matchingPair) {

                setTimeout(function() {
                    cardArr[oldId].isMatching = true;
                    cardArr[currentCardId].isMatching = true;

                    var matchingPair = document.querySelectorAll(".open");

                    for (var i = 0; i < matchingPair.length; i++) {
                        matchingPair[i].classList.remove("open");
                        matchingPair[i].classList.add("matching");
                    }

                    clickDisabled = false;
                }, 1000);
                goToSecondMove = false;
                checkIfCompleted();
            } else {
                setTimeout(function() {
                    cardArr[oldId].isOpen = false;
                    cardArr[currentCardId].isOpen = false;


                    var pairs = document.querySelectorAll(".open");

                    for (var i = 0; i < pairs.length; i++) {
                        pairs[i].classList.remove("open");
                    }

                    clickDisabled = false;
                }, 2000);
                goToSecondMove = false;
            }

        } else {

            cardArr[currentCardId].isOpen = true;
            currentElement.parentElement.classList.add("open");
            flipCard(currentElement, currentCardId);
            //flipCard(event.target.parentElement);
            oldId = currentCardId;
            goToSecondMove = true;
        }

    }
}();