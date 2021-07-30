import Dealer from './components/Dealer';
import Deck from './components/Deck';
import Player from './components/Player';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        BLACKJACK
      </header>
      <Deck>
      </Deck>
        <div className="App__players--container">
          <Dealer />
          <Player />
        </div>
    </div>
  );
}

export default App;
