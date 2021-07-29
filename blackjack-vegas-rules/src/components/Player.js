import React, {useEffect, useState} from 'react';

function Player() {
    const deckId = localStorage.getItem("deck");
    // let playerNumCards = 2;

    const [playerCards, setPlayerCards] = useState([]);
    const [playerNumCards, setPlayerNumCards] = useState(2);

    // function addPlayerCard() {
    //     fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    //             .then(response => response.json())
    //             // .then(data=> console.log(data?.cards[0]))
    //             .then(data => playerCards.push(data.cards[0]));
    // }
    // addPlayerCard();

    useEffect(() => {
        const dealPlayerCards = async () => {
            let player_cards = [];
            const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
            const data = await response.json();
            player_cards.push(data.cards[0]);
            // player_cards.push(data.cards[1]);
            setPlayerCards((playerCards) => [...playerCards, player_cards])
        };
        dealPlayerCards();
        dealPlayerCards();
    }, [deckId]);

    console.log('playerCards', playerCards);

    async function hitPlayer() {
        // playerNumCards += 1;
        setPlayerNumCards(playerNumCards + 1);
        let player_cards = [];
        const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
        const data = await response.json();
        player_cards.push(data.cards[0]);
        // player_cards.push(data.cards[1]);
        setPlayerCards((playerCards) => [...playerCards, player_cards])
    }
    console.log('hitPlayer', playerNumCards);

    return (
        <div>
            <h1>PLAYER</h1>
            {/* {playerNumCards} */}
            <button onClick={hitPlayer}>HIT ME!</button>
            <div className="player__card--image">
                {playerCards.map((card) => {
                    return (
                        <div>
                            <img src={card} />
                        </div>
                        );})}
            </div>
        </div>
    )
}

export default Player;
