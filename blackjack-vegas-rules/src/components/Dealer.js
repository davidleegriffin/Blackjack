import React from 'react';

function Dealer() {
    const deckId = localStorage.getItem("deck");
    const dealerCards = [];
    
    function addCard() {
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
                .then(response => response.json())
                .then(data => dealerCards.push(data.cards[0]));       
    }
    addCard();
    addCard();
   console.log('dealerCards', dealerCards);

    return (
        <div>
            <h1>DEALER</h1>
            {/* <img source={`${dealerCards[0].image}`} /> */}
        </div>
    )
}

export default Dealer;