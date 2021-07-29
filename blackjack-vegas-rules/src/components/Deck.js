import React from 'react';

function Deck() {

    function newDeck() {
        fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=4')
        .then(response => response.json())
        .then(data => localStorage.setItem("deck", data.deck_id))
        // .catch((err) => console.error(err));
        window.location.reload();
    };

    return (
        <div>
            <button onClick={() => {newDeck()}}>Shuffle Deck</button>

        </div>
    )
}

export default Deck;
