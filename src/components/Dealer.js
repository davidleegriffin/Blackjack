import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as gameActions from '../store/gameActions';
import '../App.css';

function Dealer() {
    const dispatch = useDispatch();
    const deckId = localStorage.getItem("deck");
    const reduxDeckId = useSelector(state => state.deckId?.deckId);
    // console.log('reduxDeckId', reduxDeckId);
    // const standButton = localStorage.getItem("standButton");
    const royals = ["KING", "QUEEN", "JACK", "10"];
    const [dealerCards, setDealerCards] = useState([]);
    const [dealerScore, setDealerScore] = useState(0);
    const [cardsRemaining, setCardsRemaining] = useState();
    const [dealerBust, setDealerBust] = useState(false);
    const [dealerNumCards, setDealerNumCards] = useState(1);
    let playerScore = useSelector(state => state.playerScore?.playerScore);
    let gameTurn = useSelector(state => state.gameTurn);
    let gameStatus = useSelector(state => state.gameStatus?.gameStatus);
    // console.log('reduxPlayerScore', playerScore);
    if (gameStatus) {
    // console.log('++++++++++++++++++++++++++++reduxGameStatus', gameStatus);
    };

    //SHUFFLE THE CURRENT DECK---------------------------------------------------------
    function shuffleDeck() {
        fetch('https://deckofcardsapi.com/api/deck/`${deckId}`/shuffle/?deck_count=4')
        .then(response => response.json())
        .then(data => setCardsRemaining(data.remaining))
        .catch((err) => console.error(err));
    };

    //DEAL INITIAL DEALER CARD--------------------------------------------------------------------------
    useEffect(() => {
        const dealDealerCards = async () => {
            let dealer_cards = [];
            const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
            const data = await response.json();
            setCardsRemaining(data.remaining);
            // if (cardsRemaining < 10) {
            //     shuffleDeck();
            // }
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
                // console.log('data', data.remaining);
                setCardsRemaining(data.remaining);
                // if (cardsRemaining <= 10) {
                //     console.log('data is zero');
                //     shuffleDeck();
                // };
                dealer_cards.push(data.cards[0]);
                // dealer_cards.push(data.cards[1]);
                setDealerCards((dealerCards) => [...dealerCards, dealer_cards]);
                setDealerNumCards(dealerNumCards + 1);
            };
            addDealerCards();
        }
    }, [gameTurn]);

    //DEALER AI---------------------------------------------------------
    useEffect(() => {
        if ((gameTurn) && (dealerScore < 17)) {
            // console.log('dealer has less than 21-------------------');
            const addDealerCards = async () => {
                let dealer_cards = [];
                const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
                const data = await response.json();
                // console.log('data', data.remaining);
                setCardsRemaining(data.remaining);
                // if (cardsRemaining <= 10) {
                //     console.log('data is zero');
                //     shuffleDeck();
                // };
                dealer_cards.push(data.cards[0]);
                // dealer_cards.push(data.cards[1]);
                setDealerCards((dealerCards) => [...dealerCards, dealer_cards]);
                setDealerNumCards(dealerNumCards + 1);
            };
            // console.log('dealerScore in effect', dealerScore);
            addDealerCards();
        }
    }, [dealerNumCards]);

    //TALLY DEALER SCORE------------------------------------------------
    useEffect(() => {
        dealerCards.forEach(ele => {
            if (parseInt(ele[0]?.value)) {
                // console.log('number', dealerScore)
                setDealerScore(dealerScore + parseInt(ele[0]?.value));
            } else if (royals.includes(ele[0]?.value)) {
                // console.log('royals');
                setDealerScore(dealerScore + 10);
            } else if (ele[0]?.value === "ACE") {
                setDealerScore(dealerScore + 1);
                if ((dealerScore + 10) <= 21) {
                    // console.log('is alright');
                    setDealerScore(dealerScore + 11);
                }
            };
        });
    }, [dealerCards]);

    //DISPATCH DEALER SCORE--------------------------------------------------
    useEffect(() => {
            // console.log('dealerScore', dealerScore);
            dispatch(gameActions.dealerScore({'dealerScore': dealerScore}))
    }, [dealerScore]);

       //CHECK SCORE AND DETERMINE OUTCOME--------------------
       useEffect(() => {
        function checkScore() {
            if (dealerScore > 21) {
                setDealerBust("true");
                // setDealerCards([]);
                setDealerScore('BUSTED');
                return (
                    <div className="player__card--image">
                        <h2>BUSTED</h2>
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
                // console.log('player score greater than');
                dispatch(gameActions.gameStatus({'gameStatus': 'PLAYER WINS'}));
            } else if (playerScore < dealerScore) {
                // console.log('player is less than dealer');
                dispatch(gameActions.gameStatus({'gameStatus': 'DEALER WINS'}));
            } else {
                // console.log('equal==============');
                dispatch(gameActions.gameStatus({'gameStatus': '<---PUSH--->'}));
            }
        };
    }, [dealerScore]);

    //RETURN----------------------------------------------------------------
    return (
        <div className="dealer__container--main">
            <div className="dealer__container--remaining">
                {gameStatus && <div className="dealer__container--gameStatus"><h1>{ gameStatus }</h1></div>}
                <h3>
                    <h1>{ cardsRemaining }</h1>
                    Cards Remaining in Deck
                </h3>
            </div>
            <div>
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
