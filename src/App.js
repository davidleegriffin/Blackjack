import React from 'react';
import Dealer from './components/Dealer';
import Deck from './components/Deck';
import Player from './components/Player';
import './App.css';
import Footer from './components/Footer';

function App() {

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
        <Footer />
    </div>
  );
}

export default App;
