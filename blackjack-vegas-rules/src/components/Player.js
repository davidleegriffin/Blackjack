import React, {useState} from 'react';

function Player() {
    const deckId = localStorage.getItem("deck");
    let cards = [];
    const [playerCards, setPlayerCards] = useState([]);
    
    function addCard() {
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
                .then(response => response.json())
                .then(data => cards.push(data.cards[0]));       
    }
    addCard();
    addCard();
    // setPlayerCards(cards);
    console.log('cards', cards[0]);
    cards.forEach(card => setPlayerCards(card));
    console.log('playerCards', playerCards);


    return (
        <div>
            <h1>PLAYER</h1>
            {/* {playerCards.map((card) => {
                return (
                    <div>
                        {card}
                    </div>         
            );})} */}
        </div>
    )
}

export default Player;