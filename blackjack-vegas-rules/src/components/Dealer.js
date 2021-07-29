import React, { useState, useEffect } from 'react';

function Dealer() {
    const deckId = localStorage.getItem("deck");
    const [dealerCards, setDealerCards] = useState([]);
    
    useEffect(() => {
        const dealDealerCards = async () => {
            let dealer_cards = [];
            const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
            const data = await response.json();
            console.log('data', data);
            dealer_cards.push(data.cards[0]);
            // dealer_cards.push(data.cards[1]);
            setDealerCards(dealer_cards)
        };
        dealDealerCards();
    }, [deckId]);


    console.log('dealerCards', dealerCards);

    return (
        <div>
            <h1>DEALER</h1>
            <div className="player__card--image">
                {dealerCards.map((card) => {
                    return (
                        <div>
                            <img src={card[0].image} />
                        </div>
                        );})}
            </div>
        </div>
    )
}

export default Dealer;