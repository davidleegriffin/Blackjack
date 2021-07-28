import React, {useState} from 'react';

function Player() {
    const deckId = localStorage.getItem("deck");
    let playerCards = [];
    // const [playerCards, setPlayerCards] = useState([]);

    async function addCard() {
        const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
                // .then(response => response.json())
                // .then(data => playerCards.push(data.cards[0]));
        // console.log('response', response);
        const data = await response.json();
        console.log('data', data.cards[0]);
        const card = await data.cards[0];
        console.log('card', card);
        playerCards.push(card);
    }
    addCard();
    addCard();
    // setPlayerCards(cards);
    // console.log('cards', cards[0]);
    // cards.forEach(card => setPlayerCards(card));
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
