import { removeTypeDuplicates } from '@babel/types';
import React, { useState, useEffect } from 'react';

function Dealer() {
    const deckId = localStorage.getItem("deck");
    const royals = ["KING", "QUEEN", "JACK", "10"];
    const [dealerCards, setDealerCards] = useState([]);
    const [dealerScore, setDealerScore] = useState(0);
    const [cardsRemaining, setCardsRemaining] = useState();

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
            console.log('data', data.remaining);
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

    console.log('dealerCards', dealerCards);
    
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

    console.log('dealerScore', dealerScore);

    return (
        <div>
            <h3><h1>{ cardsRemaining }</h1> Cards Remaining in Deck</h3>
            <h1>Dealer Score: { dealerScore }</h1>
            <div className="player__card--image">
                {dealerCards.map((card, idx) => {
                    return (
                        <div>
                            <img key={idx} src={card[0]?.image} />
                        </div>
                        );})}
            </div>
        </div>
    )
}

export default Dealer;
