import React, {useState, useEffect} from 'react';
import { useDispatch } from "react-redux";
import * as gameActions from '../store/gameActions';

function Deck() {
    const [standButton, setStandButton] = useState("");
    const dispatch = useDispatch();

    //GET A NEW DECK FROM DECKOFCARDS.API-------------------------------------

        const newDeck = async () => {
            const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=4')
            const data = await response.json();
            localStorage.setItem("deck", data.deck_id);
            newHand();
        };

    let newDeckId = localStorage.getItem("deck");
    // console.log('newDeckId', newDeckId);

    //DISPATCH DECK_ID--------------------------------------
    useEffect(() => {
        dispatch(gameActions.deckId({'deckId': newDeckId}));
    }, [newDeckId]);
    
    //GENERATE NEW HAND/RELOAD-----------------------
    function newHand() {
        setStandButton("");
        setTimeout(function() { window.location.reload(); }, 500);
        // window.location.reload();
    };
    
    useEffect(() => {
        dispatch(gameActions.gameStatus({'gameStatus': ''}));
    }, [standButton]);

    //PLAYER STAND PAT-----------------------------
    const standPlayer = async () => {
        await setStandButton("true");
        await dispatch(gameActions.gameTurn(true))
    };

    return (
        <div>
            <button className="App__button--stand" disabled={`${standButton}`} onClick={() => standPlayer()}>PLAYER STAND</button>
            <button onClick ={newHand}>New Hand</button>
            <button onClick={() => {newDeck()}}>New Deck</button>

        </div>
    )
}

export default Deck;
