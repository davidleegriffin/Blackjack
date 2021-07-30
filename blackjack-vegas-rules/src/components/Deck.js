import React, {useState} from 'react';

function Deck() {
    const [standButton, setStandButton] = useState("");

    

    function newDeck() {
        fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=4')
        .then(response => response.json())
        .then(data => localStorage.setItem("deck", data.deck_id))
        .catch((err) => console.error(err));
        // setTimeout(function() { window.location.reload(); }, 1500);
        // newHand();
    };

    function newHand() {
        // localStorage.setItem("standButton", "");
        window.location.reload();
    }

    return (
        <div>
            <button onClick ={newHand}>New Hand</button>
            <button onClick={() => {newDeck()}}>New Deck</button>
        </div>
    )
}

export default Deck;
