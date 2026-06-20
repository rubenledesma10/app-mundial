import { useEffect, useState } from 'react';
import PlayerFilters from './components/PlayerFilters';
function App() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/players') // Hacemos el metodo GET, para traer a todos los jugadores cargados
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPlayers(data);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <>
      <h1>Mundial 2026</h1>
      <PlayerFilters />
      <p>Jugadores: {players.length}</p>
    </>
  );
}

export default App;
