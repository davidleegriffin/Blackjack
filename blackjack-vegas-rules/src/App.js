import React, {useState} from 'react';
import Dealer from './components/Dealer';
import Deck from './components/Deck';
import Player from './components/Player';
import './App.css';

function App() {
  // let standButton = localStorage.getItem("standButton");
  const [standButton, setStandButton] = useState("");
  // setStandButton(stand_button);

  function standPlayer() {
        setStandButton("true");
        // localStorage.setItem("standButton", "true");
        // <Dealer props={standButton} />
    }


  return (
    <div className="App">
      <header className="App-header">
        BLACKJACK
      </header>
      <Deck>
      </Deck>
        <div className="App__players--container">
          <Player props={standButton}/>
          <button className="App__button--stand" disabled={`${standButton}`} onClick={() => standPlayer()}>PLAYER STAND</button>
          <Dealer props={standButton} />
        </div>
    </div>
  );
}

export default App;
