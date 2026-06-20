import { useEffect, useState } from 'react';
import PlayerFilters from './components/PlayerFilters';

function App() {
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    let url = 'http://127.0.0.1:5000/api/players';

    if (name) {
      url = `http://127.0.0.1:5000/api/players/search?name=${name}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPlayers(data);
      })
      .catch((error) => console.error(error));
  }, [name]);

  return (
    <>
      <h1>Mundial 2026</h1>
      <PlayerFilters name={name} setName={setName} />
      <p>Jugadores: {players.length}</p>
    </>
  );
}

export default App;
