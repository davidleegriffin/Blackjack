import React, {useState} from 'react';
import Dealer from './Dealer';

function Deck() {
    const [standButton, setStandButton] = useState("");

    function standPlayer() {
        setStandButton("true");
        localStorage.setItem("standButton", "true");
    }

    function newDeck() {
        fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=4')
        .then(response => response.json())
        .then(data => localStorage.setItem("deck", data.deck_id))
        .catch((err) => console.error(err));

    };

    function newHand() {
        localStorage.setItem("standButton", "");
        window.location.reload();
    }

    return (
        <div>
            <button onClick ={newHand}>New Hand</button>
            <button onClick={() => {newDeck()}}>New Deck</button>
            <button disabled={`${standButton}`} onClick={standPlayer}>STAND</button>
        </div>
    )
}

export default Deck;
