import React, {useState, useEffect} from 'react';
import { useDispatch } from "react-redux";
import * as gameActions from '../store/gameActions';

function Deck() {

    localStorage.setItem("test3", "testing3");

    const [standButton, setStandButton] = useState("");
    const dispatch = useDispatch();

    //INITIAL DECK ON LOAD---------------------------
    useEffect(() => {
        const initialDeck = async () => {
            const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=4')
            const data = await response.json();
            // await console.log('initialDeckData', data);
            await localStorage.setItem("deck", data?.deck_id);
            // newHand();
        };
        initialDeck();
    }, []);

    //GET A NEW DECK FROM DECKOFCARDS.API-------------------------------------
    const newDeck = async () => {
        const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=4')
        const data = await response.json();
        // await console.log('deckData', data);
        await localStorage.setItem("deck", data?.deck_id);
        newHand();
    };

    let localDeckId = localStorage.getItem("deck");
    // console.log('localStorageDeckId', localDeckId);

    //DISPATCH DECK_ID--------------------------------------
    useEffect(() => {
        dispatch(gameActions.deckId({'deckId': localDeckId}));
    }, [localDeckId]);
    
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
        <div className="deck__container--main">
            <button disabled={`${standButton}`} onClick={standPlayer}>PLAYER STAND</button>
            <button className="deck__button--newHand" onClick ={newHand}>NEW HAND</button>
            <button onClick={() => {newDeck()}}>NEW DECK</button>

        </div>
    )
}

export default Deck;
