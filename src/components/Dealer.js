import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as gameActions from '../store/gameActions';
import '../App.css';

function Dealer() {
    const dispatch = useDispatch();
    const deckId = localStorage.getItem("deck");
    // const reduxDeckId = useSelector(state => state.deckId?.deckId);
    const royals = ["KING", "QUEEN", "JACK", "10"];
    const [dealerCards, setDealerCards] = useState([]);
    const [dealerScore, setDealerScore] = useState(0);
    const [dealerBust, setDealerBust] = useState(false);
    const [dealerNumCards, setDealerNumCards] = useState(1);
    const [cardsRemaining, setCardsRemaining] = useState();
    let playerScore = useSelector(state => state.playerScore?.playerScore);
    let gameTurn = useSelector(state => state.gameTurn);
    let gameStatus = useSelector(state => state.gameStatus?.gameStatus);

    //DEAL INITIAL DEALER CARD--------------------------------------------------------------------------
    useEffect(() => {
        const dealDealerCards = async () => {
            let dealer_cards = [];
            const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
            const data = await response.json();
            setCardsRemaining(data.remaining);
            // console.log('dealerData', data);
            dealer_cards.push(data?.cards[0]);
            setDealerCards((dealerCards) => [...dealerCards, dealer_cards]);
        };
        dealDealerCards();
    }, []);

    //ADD DEALER CARD(S)--------------------------------------------------------------------------------------
    useEffect(() => {
        if (gameTurn === true) {
            const addDealerCards = async () => {
                let dealer_cards = [];
                const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
                const data = await response.json();
                setCardsRemaining(data.remaining);
                dealer_cards.push(data.cards[0]);
                setDealerCards((dealerCards) => [...dealerCards, dealer_cards]);
                setDealerNumCards(dealerNumCards + 1);
            };
            addDealerCards();
        }
    }, [gameTurn]);

    //DEALER AI---------------------------------------------------------
    useEffect(() => {
        if ((gameTurn) && (dealerScore < 17)) {
            const addDealerCards = async () => {
                let dealer_cards = [];
                const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
                const data = await response.json();
                setCardsRemaining(data.remaining);
                dealer_cards.push(data.cards[0]);
                setDealerCards((dealerCards) => [...dealerCards, dealer_cards]);
                setDealerNumCards(dealerNumCards + 1);
            };
            addDealerCards();
        }
    }, [dealerNumCards]);

    //TALLY DEALER SCORE------------------------------------------------
    useEffect(() => {
        dealerCards.forEach(ele => {
            if (parseInt(ele[0]?.value)) {
                setDealerScore(dealerScore + parseInt(ele[0]?.value));
            } else if (royals.includes(ele[0]?.value)) {
                setDealerScore(dealerScore + 10);
            } else if (ele[0]?.value === "ACE") {
                setDealerScore(dealerScore + 1);
                if ((dealerScore + 10) <= 21) {
                    setDealerScore(dealerScore + 11);
                }
            };
        });
    }, [dealerCards]);

     //DISPATCH DEALER HAND------------------------------------------
     useEffect(() => {
        dispatch(gameActions.dealerHand({'dealerHand': dealerCards}))
    }, [dealerCards]);

    //DISPATCH DEALER SCORE--------------------------------------------------
    useEffect(() => {
            dispatch(gameActions.dealerScore({'dealerScore': dealerScore}))
    }, [dealerScore]);

    //CHECK SCORE AND DETERMINE OUTCOME--------------------
    useEffect(() => {
        function checkScore() {
            if (dealerScore > 21) {
                setDealerBust("true");
                setDealerScore('BUSTED');
                return (
                    <div className="player__card--image">
                        {dealerCards.map((card, index) => {
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
    }, [dealerScore]);

    useEffect(() => {
        if (dealerBust === "true") {
            dispatch(gameActions.gameStatus({'gameStatus': 'PLAYER WINS'}))
        } 
    }, [dealerBust]);

    useEffect(() => {
        if ((gameTurn) && (dealerScore >= 17)) {
            if(playerScore > dealerScore) {
                dispatch(gameActions.gameStatus({'gameStatus': 'PLAYER WINS'}));
            } else if (playerScore < dealerScore) {
                dispatch(gameActions.gameStatus({'gameStatus': 'DEALER WINS'}));
            } else {
                dispatch(gameActions.gameStatus({'gameStatus': 'PUSH'}));
            }
        };
    }, [dealerScore]);

    //RETURN----------------------------------------------------------------
    return (
        <div className="dealer__container--main">
            <div className="dealer__container--remaining">
                {gameStatus && <div className="dealer__container--gameStatus">
                                    <div className="dealer__header--gameStatus">
                                        <span>{ gameStatus }</span>
                                    </div>
                                </div>}
                <h3 className="dealer__header--remaining">
                    <h1>{ cardsRemaining }</h1>
                    Cards Remaining in Deck
                </h3>
            </div>
            <div className="dealer__container--cards">
                <h1>Dealer Score: { dealerScore }</h1>
                <div className="dealer__card--image">
                    {dealerCards.map((card, idx) => {
                        return (
                            <div  key={idx}>
                                <img src={card[0]?.image} width="100" />
                            </div>
                            );})}
                </div>
            </div>
        </div>
    )
}

export default Dealer;