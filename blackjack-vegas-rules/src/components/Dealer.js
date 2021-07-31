import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as gameActions from '../store/gameActions';
import '../App.css';

function Dealer() {
    const dispatch = useDispatch();
    const deckId = localStorage.getItem("deck");
    const standButton = localStorage.getItem("standButton");
    const royals = ["KING", "QUEEN", "JACK", "10"];
    const [dealerCards, setDealerCards] = useState([]);
    const [dealerScore, setDealerScore] = useState(0);
    const [cardsRemaining, setCardsRemaining] = useState();


    let gameTurn = useSelector(state => state.gameTurn);
    console.log('gameTurn', gameTurn);
    // let testState = useSelector();
    // useEffect(() => {
    // }, [gameActions.gameTurn]);

    function shuffleDeck() {
        fetch('https://deckofcardsapi.com/api/deck/`${deckId}`/shuffle/?deck_count=4')
        .then(response => response.json())
        .then(data => setCardsRemaining(data.remaining))
        .catch((err) => console.error(err));

    };

    useEffect(() => {
        const dealDealerCards = async () => {
            let dealer_cards = [];
            const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
            const data = await response.json();
            // console.log('data', data.remaining);
            setCardsRemaining(data.remaining)
            if (data.remaining < 10) {
                // console.log('data is zero');
                shuffleDeck();
            }
            dealer_cards.push(data.cards[0]);
            // dealer_cards.push(data.cards[1]);
            setDealerCards((dealerCards) => [...dealerCards, dealer_cards]);
        };
        dealDealerCards();
        // dealDealerCards();
    }, []);

    useEffect(() => {
        if (gameTurn === true) {
            const addDealerCards = async () => {
                let dealer_cards = [];
                const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
                const data = await response.json();
                // console.log('data', data.remaining);
                setCardsRemaining(data.remaining)
                if (data.remaining < 10) {
                    // console.log('data is zero');
                    shuffleDeck();
                }
                dealer_cards.push(data.cards[0]);
                // dealer_cards.push(data.cards[1]);
                setDealerCards((dealerCards) => [...dealerCards, dealer_cards]);
            };
            addDealerCards();
        }
        // dealDealerCards();
    }, [gameTurn]);

//    if (props.props === "true" && dealerScore < 17) {
//     //    addDealerCards();
//     console.log('logic check');
//    }

    // console.log('dealerCards', dealerCards);

    useEffect(() => {
        dealerCards.forEach(ele => {
            if (parseInt(ele[0]?.value)) {
                // console.log('number', dealerScore)
                setDealerScore(dealerScore + parseInt(ele[0]?.value));
            } else if (royals.includes(ele[0]?.value)) {
                // console.log('royals');
                setDealerScore(dealerScore + 10);
            }
        });
    }, [dealerCards]);

    useEffect(() => {
            dispatch(gameActions.dealerScore({'dealerScore': dealerScore}))
    }, [gameTurn]);

    // console.log('dealerScore', dealerScore);
    // console.log('props', props);

    return (
        <div className="dealer__container--main">
            <div className="dealer__container--remaining">
                <h3>
                    <h1>{ cardsRemaining }</h1>
                    Cards Remaining in Deck
                </h3>
            </div>
            <div>
                <h1>Dealer Score: { dealerScore }</h1>
                <div className="player__card--image">
                    {dealerCards.map((card, idx) => {
                        return (
                            <div>
                                <img key={idx} src={card[0]?.image} width="100" />
                            </div>
                            );})}
                </div>
            </div>
        </div>
    )
}

export default Dealer;
