export const DECK_ID = 'DECK_ID';
export const PLAYER_SCORE = 'PLAYER_SCORE';
export const PLAYER_HAND = 'PLAYER_HAND';
export const DEALER_SCORE = 'DEALER_SCORE';
export const DEALER_HAND = 'DEALER_HAND';
export const GAME_TURN = 'GAME_TURN';
export const GAME_STATUS = 'GAME_STATUS';
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

export const playerHand = (player_hand) => {
    return {
        type: PLAYER_HAND,
        player_hand,
    }
}

export const dealerScore = (dealer_score) => {
    return {
        type: DEALER_SCORE,
        dealer_score,
    };
};

export const dealerHand = (dealer_hand) => {
    return {
        type: DEALER_HAND,
        dealer_hand,
    }
}

export const gameTurn = (game_turn) => {
    return {
        type: GAME_TURN,
        game_turn,
    };
};

export const gameStatus = (game_status) => {
    return {
        type: GAME_STATUS,
        game_status,
    }
};

export const cardsRemaining = (cards_remaining) => {
    return {
        type: CARDS_REMAINING,
        cards_remaining,
    };
};
