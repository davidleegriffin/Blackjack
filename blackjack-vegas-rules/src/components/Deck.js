import React from 'react';

function Deck() {

    function newDeck() {
        window.location.reload();
        fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=4')
            .then(response => response.json())
            .then(data => console.log(data))
            .then(data => localStorage.setItem("deck", data.deck_id));       
    };

    return (
        <div>
            <button onClick={() => {newDeck()}}>Shuffle Deck</button>

        </div>
    )
}

export default Deck;