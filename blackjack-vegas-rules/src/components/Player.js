import React, {useEffect, useState} from 'react';

function Player(props) {
    const deckId = localStorage.getItem("deck");
    const royals = ["KING", "QUEEN", "JACK", "10"];
    const [playerCards, setPlayerCards] = useState([]);
    const [playerNumCards, setPlayerNumCards] = useState(2);
    const [playerScore, setPlayerScore] = useState(0);
    const [hitButton, setHitButton] = useState("");

    //CHECK SCORE AND DETERMINE OUTCOME--------------------
    function checkScore() {
        // console.log('playernumcards', playerNumCards);
        if (playerNumCards >= 5) {
            setPlayerNumCards(0);
            return (
                <div className="player__card--image">
                    {playerCards.map((card, index) => {
                        return (
                            <div key={index}>
                                <img src={card[0]?.image} />
                            </div>
                            );})}
                </div>
            )
        }
        if (playerScore > 21) {
            setHitButton("true");
            setTimeout(function() { window.location.reload(); }, 1500);
            setPlayerScore(0);
            return (
                <div className="player__card--image">
                {playerCards.map((card, index) => {
                    return (
                        <div key={index}>
                            <img src={card[0]?.image} />
                        </div>
                    );})}
                </div>
            )
        };
    };
    checkScore();

    //DEAL INITIAL PLAYER CARDS--------------------
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

    //TALLY PLAYER SCORE-------------------------
    useEffect(() => {
        playerCards.forEach(ele => {
            // console.log('ele', parseInt(ele[0].value))
            if (parseInt(ele[0]?.value)) {
                // console.log('number', playerScore)
                setPlayerScore(playerScore + parseInt(ele[0]?.value));
            } else if (royals.includes(ele[0]?.value)) {
                // console.log('royals');
                setPlayerScore(playerScore + 10);
            } else if (ele[0]?.value === "ACE") {
                setPlayerScore(playerScore + 1);
                if ((playerScore + 10) <= 21) {
                    // console.log('is alright');
                    setPlayerScore(playerScore + 10);
                }
            }
            // checkScore();
        });
    }, [playerCards]);

    //ADD PLAYER CARD(S)---------------------------
    async function hitPlayer() {
        setPlayerNumCards(playerNumCards + 1);
        let player_cards = [];
        const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
        const data = await response.json();
        player_cards.push(data.cards[0]);
        setPlayerCards((playerCards) => [...playerCards, player_cards])
    }

    return (
        <div>
            <div className="player__card--image">
                {playerCards.map((card, index) => {
                    return (
                        <div key={index} className="player__card--image">
                            <img src={card[0]?.image} width="100" />
                        </div>
                        );})}
            </div>
            <h1>Player Score: {playerScore}</h1>
            <button disabled={`${hitButton}`} onClick={hitPlayer}>HIT ME!</button>
        </div>
    )
}

export default Player;
