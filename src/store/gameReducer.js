import {
    DECK_ID,
    PLAYER_SCORE,
    DEALER_SCORE,
    GAME_TURN,
    GAME_STATUS,
    CARDS_REMAINING,
} from './gameActions';

const gameReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case DECK_ID:
            newState = {...state, 'deckId': action.deck_id};
            return newState;
        case PLAYER_SCORE:
            newState = {...state, 'playerScore': action.player_score};
            return newState;
        case DEALER_SCORE:
            newState = {...state, 'dealerScore': action.dealer_score};
            return newState;
        case GAME_TURN:
            newState = {...state, 'gameTurn': action.game_turn};
            return newState;
        case GAME_STATUS:
            newState = {...state, 'gameStatus': action.game_status};
            return newState;
        case CARDS_REMAINING:
            newState = {'cardsRemaining': action.cards_remaining};
            return newState;
        default:
            return state;
    }
};

export default gameReducer;
