import {
    DECK_ID,
    PLAYER_SCORE,
    DEALER_SCORE,
    GAME_TURN,
} from './gameActions';

const gameReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case DECK_ID:
            newState = Object.assign({}, action.deck_id);
            return newState;
        case PLAYER_SCORE:
            newState = Object.assign({}, action.player_score);
            return newState;
        case DEALER_SCORE:
            newState = Object.assign({}, action.dealer_score);
            return newState;
        case GAME_TURN:
            newState = {'gameTurn': action.game_turn};
            return newState;
        default:
            return state;
    }
};

export default gameReducer;
