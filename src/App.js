import React from 'react';
import Dealer from './components/Dealer';
import Deck from './components/Deck';
import Player from './components/Player';
import './App.css';

function App() {

  // localStorage.setItem("test2", "testing2");

  return (
    <div className="App">
      <header className="App-header">
        BLACKJACK
      </header>
      <Deck />
        <div className="App__players--container">
          <Player />
          <Dealer />
        </div>
    </div>
  );
}

export default App;
