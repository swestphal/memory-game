class Game {
    constructor() {
        // $(".site-header__menu-icon").click(function () {
        //     console.log("right icon was clicked");

        this.fieldSize = 9;
        this.cardClickCounter = 1;
        this.showCardClickCounter = document.getElementById('card-click-counter');
        this.cardClick = document.getElementById('field');

        this.events();
        this.generateCards();
        this.startTime();

    }


    events() {

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


    generateCards() {

    }

    startTime() {

    }


    checkCardClickChoice() {

    }
}



export default Game;