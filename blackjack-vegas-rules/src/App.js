import React, {useState} from 'react';
import Dealer from './components/Dealer';
import Deck from './components/Deck';
import Player from './components/Player';
import './App.css';

function App() {
  let standButton = localStorage.getItem("standButton");
  // const [standButton, setStandButton] = useState();
  // setStandButton(stand_button);
  return (
    <div className="App">
      <header className="App-header">
        BLACKJACK
      </header>
      <Deck>
      </Deck>
        <div className="App__players--container">
          <Dealer props={standButton}/>
          <Player />
        </div>
    </div>
  );
}

export default App;
