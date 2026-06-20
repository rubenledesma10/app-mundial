import { useEffect, useState } from 'react';
import PlayerFilters from './components/PlayerFilters';

function App() {
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [captain, setCaptain] = useState('');
  const [minGoals, setMinGoals] = useState('');
  const [maxGoals, setMaxGoals] = useState('');
  const [minHeight, setMinHeight] = useState('');
  const [maxHeight, setMaxHeight] = useState('');

  useEffect(() => {
    let url = 'http://127.0.0.1:5000/api/players/search';

    const params = [];

    if (name) {
      params.push(`name=${name}`);
    }

    if (country) {
      params.push(`country=${country}`);
    }

    if (captain) {
      params.push(`captain=${captain}`);
    }

    if (minGoals) {
      params.push(`min_goals=${minGoals}`);
    }

    if (maxGoals) {
      params.push(`max_goals=${maxGoals}`);
    }

    if (minHeight) {
      params.push(`min_height=${minHeight}`);
    }

    if (maxHeight) {
      params.push(`max_height=${maxHeight}`);
    }

    if (params.length > 0) {
      url = `http://127.0.0.1:5000/api/players/search?${params.join('&')}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPlayers(data);
      })
      .catch((error) => console.error(error));
  }, [name, country, captain, minGoals, maxGoals, minHeight, maxHeight]);

  return (
    <>
      <h1>Mundial 2026</h1>
      <PlayerFilters
        name={name}
        setName={setName}
        country={country}
        setCountry={setCountry}
        captain={captain}
        setCaptain={setCaptain}
        minGoals={minGoals}
        setMinGoals={setMinGoals}
        maxGoals={maxGoals}
        setMaxGoals={setMaxGoals}
        minHeight={minHeight}
        setMinHeight={setMinHeight}
        maxHeight={maxHeight}
        setMaxHeight={setMaxHeight}
      />
      <p>Jugadores: {players.length}</p>
    </>
  );
}

export default App;
