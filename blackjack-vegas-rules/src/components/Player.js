import React, {useEffect, useState} from 'react';

function Player() {
    const deckId = localStorage.getItem("deck");
    const royals = ["KING", "QUEEN", "JACK", "10"];
    const [playerCards, setPlayerCards] = useState([]);
    const [playerNumCards, setPlayerNumCards] = useState(2);
    const [playerScore, setPlayerScore] = useState(0);

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
    }, []);

    useEffect(() => {
        playerCards.forEach(ele => {
            // console.log('ele', parseInt(ele[0].value))
            if (parseInt(ele[0]?.value)) {
                // console.log('number', playerScore)
                setPlayerScore(playerScore + parseInt(ele[0]?.value));
            } else if (royals.includes(ele[0]?.value)) {
                // console.log('royals');
                setPlayerScore(playerScore + 10);
            }
            checkScore(playerScore);
        });
    }, [playerCards]);

    console.log('playerCards', playerCards);
    console.log('playerScore', playerScore);

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
    // console.log('hitPlayer', playerNumCards);

    function checkScore(playerScore) {
        if (playerScore > 21) {
            window.alert("BUSTED!!");
            window.location.reload();
        };
    };

    return (
        <div>
            <h1>PLAYER</h1>
            {/* {playerNumCards} */}
            <button onClick={hitPlayer}>HIT ME!</button>
            <div className="player__card--image">
                {playerCards.map((card, index) => {
                    return (
                        <div key={index}>
                            <img src={card[0]?.image} />
                        </div>
                        );})}
            </div>
        </div>
    )
}

export default Player;
