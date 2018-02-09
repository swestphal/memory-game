class Game {
    constructor() {
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

    timerStop() {
        clearInterval(this.refreshIntervalId);
    }

    timerStart() {
        //remove eventlistener after first call of timerStart
        this.cardClick.removeEventListener('click', this.timerStart);

        // save time of first click
        this.firstClickTime = new Date();

        // update timer every second
        this.refreshIntervalId = setInterval(this.timerUpdate.bind(this), 1000);
    }

    timeFormat(value) {
        // convert value to string
        var value = value.toString();

        // if only one digit length put 0 before
        if (value.length <= 1) { return ("0" + value); };

        //else go back like it was
        return value;
    }

    timerUpdate() {
        var currentTime = new Date();
        var diffTime = (currentTime.getTime() - this.firstClickTime.getTime());

        var diffHours = Math.floor(diffTime / (1000 * 60 * 60));
        diffTime -= diffHours * (1000 * 60 * 60);

        var diffMin = Math.floor(diffTime / (1000 * 60));
        diffTime -= diffMin * 1000 * 60;

        var diffSec = Math.floor(diffTime / 1000);
        if (diffSec == 10) this.timerStop();
        this.showCardTimer.innerText = this.timeFormat(diffHours) + ":" + this.timeFormat(diffMin) + ":" + this.timeFormat(diffSec);
    }


    events() {

        this.timerStart = this.timerStart.bind(this);
        this.cardClick.addEventListener('click', this.timerStart);

        this.newCardClick = this.newCardClick.bind(this);
        this.cardClick.addEventListener('click', this.newCardClick);
    }

    newCardClick(event) {

        // verify, that user clicked on td element
        if ((event.target.nodeName).toLowerCase() == 'td') {

            // increment the move-counter of clicks
            // update move-counter on frontend
            this.showCardClickCounter.innerText = this.cardClickCounter++;

            this.checkRating();
            this.checkCardClickChoice();
        }
    }


    generateCards() {}



    generateRatingStars(num) {
        var stars = "";
        for (var i = 0; i < num; i++) {
            stars += "*";
        }
        return stars;
    }


    checkRating() {
        this.rating = (this.cardClickCounter - 1) / this.fieldSize;
        switch (true) {
            case (this.rating <= 4.25):
                this.starRating = 3;

                break;
            case (this.rating <= 5.75):
                this.starRating = 2;

                break;
            case (this.rating <= 7.5):
                this.starRating = 1;

                break;
            default:
                this.starRating = 0;
        }

        this.showCardRating.innerText = this.generateRatingStars(this.starRating);


    }


    checkCardClickChoice() {

    }



}




export default Game;