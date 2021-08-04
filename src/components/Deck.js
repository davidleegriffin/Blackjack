import React, {useState, useEffect} from 'react';
import { useDispatch } from "react-redux";
import * as gameActions from '../store/gameActions';

function Deck() {
    const [cardsRemaining, setCardsRemaining] = useState();
    const [standButton, setStandButton] = useState("");
    const dispatch = useDispatch();

    //INITIAL DECK ON LOAD---------------------------
    useEffect(() => {
        const initialDeck = async () => {
            const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            const data = await response.json();
            // console.log('initialDeckData', data);
            await setCardsRemaining(data.remaining);
            await localStorage.setItem("deck", data?.deck_id);
            dispatch(gameActions.deckId({'deckId': data.deck_id}));
            dispatch(gameActions.cardsRemaining({'deckId': data.remaining}));
        };
        initialDeck();
    }, []);

    //SHUFFLE THE CURRENT DECK---------------------------------------------------------
    function shuffleDeck() {
        fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then(response => response.json())
        .then(data => setCardsRemaining(data.remaining))
        .catch((err) => console.error(err));
        newHand();
    };
    
    //GENERATE NEW HAND/RELOAD-----------------------
    function newHand() {
        setStandButton("");
        setTimeout(function() { window.location.reload(); }, 500);
    };
    
    //DISPATCH GAME STAUS------------------------------
    useEffect(() => {
        dispatch(gameActions.gameStatus({'gameStatus': ''}));
    }, [standButton]);

    //PLAYER STAND PAT-----------------------------
    const standPlayer = async () => {
        await setStandButton("true");
        await dispatch(gameActions.gameTurn(true))
    };

    //RETURN----------------------------------------
    return (
        <div className="deck__container--main">
            <button disabled={`${standButton}`} onClick={standPlayer}>PLAYER STAND</button>
            <button className="deck__button--newHand" onClick ={newHand}>NEW HAND</button>
            <button onClick={() => {shuffleDeck()}}>SHUFFLE DECK</button>
        </div>
    )
}

export default Deck;