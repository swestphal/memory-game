class Game {
    constructor() {
        // $(".site-header__menu-icon").click(function () {
        //     console.log("right icon was clicked");

        this.cardClickCounter = 1;
        this.showCardClickCounter = document.getElementById('card-click-counter');
        this.cardClick = document.getElementById('field');

        this.events();
        this.generateCards();
        this.startTime();

    }


    events() {

        this.newChoice = this.newChoice.bind(this);
        this.cardClick.addEventListener('click', this.newChoice);


    }

    generateCards() {

    }

    startTime() {

    }

    newChoice() {
        this.updateCardClickCounter();
        this.checkRating();
        this.checkCardClickChoice();
    }

    updateCardClickCounter() {
        // increment the move-counter of clicks
        // update move-counter on frontend
        this.showCardClickCounter.innerText = this.cardClickCounter++;
    }

    checkRating() {

    }

    checkCardClickChoice() {

    }
}



export default MoveCounter;