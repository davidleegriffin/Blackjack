import React, {useState} from 'react';
import { useDispatch } from "react-redux";
import * as gameActions from '../store/gameActions';

function Deck() {
    const [standButton, setStandButton] = useState("");
    const dispatch = useDispatch();

    //GET A NEW DECK FROM DECKOFCARDS.API-------------------------------------
    function newDeck() {
        fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=2')
        .then(response => response.json())
        .then(data => localStorage.setItem("deck", data.deck_id))
        .catch((err) => console.error(err));
        // setTimeout(function() { window.location.reload(); }, 1500);
        // newHand();
    };

    //GENERATE NEW HAND/RELOAD-----------------------
    function newHand() {
        window.location.reload();
    };

    //PLAYER STAND PAT-----------------------------
    const standPlayer = async () => {
        await setStandButton("true");
        await dispatch(gameActions.gameTurn(true))
    };

    return (
        <div>
            <button onClick ={newHand}>New Hand</button>
            <button onClick={() => {newDeck()}}>New Deck</button>
            <button className="App__button--stand" disabled={`${standButton}`} onClick={() => standPlayer()}>PLAYER STAND</button>

        </div>
    )
}

export default Deck;
