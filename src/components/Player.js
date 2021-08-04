import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as gameActions from '../store/gameActions';

function Player(props) {
    const deckId = localStorage.getItem("deck");
    // const reduxDeckId = useSelector(state => state.deckId?.deckId);
    const royals = ["KING", "QUEEN", "JACK", "10"];
    const dispatch = useDispatch();
    const [playerCards, setPlayerCards] = useState([]);
    const [playerNumCards, setPlayerNumCards] = useState(2);
    const [playerScore, setPlayerScore] = useState(0);
    const [playerBusted, setPlayerBusted] = useState(false);
    const [hitButton, setHitButton] = useState("");
    // const [playerDeckId, setPlayerDeckId] = useState();

    //DETERMINE GAME TURN-----------------------------------
    let gameTurn = useSelector(state => state.gameTurn);
    let dealerScore = useSelector(state => state.dealerScore);
    useEffect(() => {
        if (gameTurn === true) {
            setHitButton("true");
        }
    }, [dealerScore]);

    //DISPATCH GAME STATUS-----------------------------------
    useEffect(() => {
        if(playerBusted === "true") {
            dispatch(gameActions.gameStatus({'gameStatus': 'DEALER WINS'}));
        }
    }, [playerBusted]);

    //DEAL INITIAL PLAYER CARDS--------------------
    useEffect(() => {
        const dealPlayerCards = async () => {
            let player_cards = [];
            const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
            const data = await response.json();
            player_cards.push(data?.cards[0]);
            setPlayerCards((playerCards) => [...playerCards, player_cards])
        };
        dealPlayerCards();
        dealPlayerCards();
    }, []);

    //TALLY PLAYER SCORE-------------------------
    useEffect(() => {
        playerCards.forEach(ele => {
            let aceCount = 0;
            let player_score = playerScore;
            if (parseInt(ele[0]?.value)) {
                // setPlayerScore(playerScore + parseInt(ele[0]?.value));
                player_score =  player_score + parseInt(ele[0]?.value);
            } else if (royals.includes(ele[0]?.value)) {
                // setPlayerScore(playerScore + 10);/
                player_score = player_score + 10;
            } else if (ele[0]?.value === "ACE") {
                aceCount++;
                player_score = player_score + 11;
                // setPlayerScore(playerScore + 11);
                // setPlayerScore(playerScore + 1);
                // if ((playerScore + 10) <= 21) {
                // }
            };
            while ((aceCount > 0) && (player_score > 21)) {
                console.log('ace is the place');
                // setPlayerScore(playerScore - 10);
                player_score = player_score - 10;
            };
            console.log('player_score', player_score);
            console.log('aceCount', aceCount);
            setPlayerScore(player_score);
        });
    }, [playerCards]);

    //DISPATCH PLAYER SCORE--------------------------------------------------
    useEffect(() => {
    dispatch(gameActions.playerScore({'playerScore': playerScore}))
}, [playerScore]);

    //CHECK SCORE AND DETERMINE OUTCOME--------------------
    useEffect(() => {
        function checkScore() {
            if (playerScore > 21) {
                setPlayerBusted("true");
                setHitButton("true");
                setPlayerScore('BUSTED');
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
    }, [playerScore]);

    //ADD PLAYER CARD(S)---------------------------
    async function hitPlayer() {
        setPlayerNumCards(playerNumCards + 1);
        let player_cards = [];
        const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
        const data = await response.json();
        player_cards.push(data.cards[0]);
        setPlayerCards((playerCards) => [...playerCards, player_cards])
    };

    //RETURN-------------------------------------
    return (
        <div className="dealer__container--main">
            <div>
                <h1>Player Score: {playerScore}</h1>
                <button className="player__button--hitMe" disabled={`${hitButton}`} onClick={() => {hitPlayer()}}>HIT ME!</button>
                <div>
                    <div className="player__card--image">
                        {playerCards.map((card, index) => {
                            return (
                                <div key={index} className="player__card--image">
                                    <img src={card[0]?.image} width="100" />
                                </div>
                            );})}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Player;
