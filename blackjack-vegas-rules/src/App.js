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
      <Deck />
      <Dealer />
      <Player />
    </div>
  );
}

export default App;
