export const DECK_ID = 'DECK_ID';
export const PLAYER_SCORE = 'PLAYER_SCORE';
export const DEALER_SCORE = 'DEALER_SCORE';
export const GAME_TURN = 'GAME_TURN';
export const CARDS_REMAINING = 'CARDS_REMAINING';

export const deckId = (deck_id) => {
    return {
      type: DECK_ID,
      deck_id,
    };
  };

export const playerScore = (player_score) => {
    return {
        type: PLAYER_SCORE,
        player_score,
    };
};

export const dealerScore = (dealer_score) => {
    return {
        type: DEALER_SCORE,
        dealer_score,
    };
};

export const gameTurn = (game_turn) => {
    return {
        type: GAME_TURN,
        game_turn,
    };
};

export const cardsRemaining = (cards_remaining) => {
    return {
        type: CARDS_REMAINING,
        cards_remaining,
    };
};
