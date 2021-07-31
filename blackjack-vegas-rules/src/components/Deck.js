import React, {useState} from 'react';
import { useDispatch } from "react-redux";
import * as gameActions from '../store/gameActions';

function Deck() {
    const [standButton, setStandButton] = useState("");
    const dispatch = useDispatch();

    

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
    };

    const standPlayer = async () => {
        await setStandButton("true");
        await dispatch(gameActions.gameTurn(0))
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
