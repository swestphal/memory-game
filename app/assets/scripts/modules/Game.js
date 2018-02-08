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

        this.num = 0;
        this.strg = "";
        this.events();
        this.generateCards();
        this.interval;
        this.offset;
    }

    timerStart() {
        //remove eventlistener after first call of timerStart
        this.cardClick.removeEventListener('click', this.timerStart);

        this.offset = new Date();


        this.interval = setInterval(this.timerUpdate.bind(this), 1000);
    }

    timeFormat(value) {
        var text = value.toString();
        console.log(text.length);

        if (text.length <= 1) {
            return ("0" + text);
        };
        return text;
    }

    timerUpdate() {
        var current = new Date();
        var diff = (current.getTime() - this.offset.getTime());

        var diffHours = Math.floor(diff / (1000 * 60 * 60));
        diff -= diffHours * (1000 * 60 * 60);

        var diffMin = Math.floor(diff / (1000 * 60));
        diff -= diffMin * 1000 * 60;

        var diffSec = Math.floor(diff / 1000);

        this.showCardTimer.innerText = this.timeFormat(diffHours) + ":" + this.timeFormat(diffMin) + ":" + this.timeFormat(diffSec);
    }


    events() {

        this.newCardClick = this.newCardClick.bind(this);
        this.cardClick.addEventListener('click', this.newCardClick);

        this.timerStart = this.timerStart.bind(this);
        this.cardClick.addEventListener('click', this.timerStart);
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


    generateCards() {

    }





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
        console.log("rating: " + this.rating);

        this.showCardRating.innerText = this.generateRatingStars(this.starRating);


    }


    checkCardClickChoice() {

    }



}




export default Game;