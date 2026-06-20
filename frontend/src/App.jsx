import { useEffect, useState } from 'react';
import PlayerFilters from './components/PlayerFilters';

function App() {
  const [players, setPlayers] = useState([]);
  const [q, setQ] = useState('');
  const [country, setCountry] = useState('');
  const [captain, setCaptain] = useState('');
  const [minGoals, setMinGoals] = useState('');
  const [maxGoals, setMaxGoals] = useState('');
  const [minHeight, setMinHeight] = useState('');
  const [maxHeight, setMaxHeight] = useState('');
  const [minAssists, setMinAssists] = useState('');
  const [maxAssists, setMaxAssists] = useState('');
  const [minCards, setMinCards] = useState('');
  const [maxCards, setMaxCards] = useState('');
  const [position, setPosition] = useState('');

  useEffect(() => {
    let url = 'http://127.0.0.1:5000/api/players/search';

    const params = [];

    if (q) {
      params.push(`q=${q}`);
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

    if (minAssists) {
      params.push(`min_assists=${minAssists}`);
    }

    if (maxAssists) {
      params.push(`max_assists=${maxAssists}`);
    }

    if (minCards) {
      params.push(`min_cards=${minCards}`);
    }

    if (maxCards) {
      params.push(`max_cards=${maxCards}`);
    }

    if (position) {
      params.push(`position=${position}`);
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
  }, [
    q,
    country,
    captain,
    minGoals,
    maxGoals,
    minHeight,
    maxHeight,
    minAssists,
    maxAssists,
    minCards,
    maxCards,
    position,
  ]);

  return (
    <>
      <h1>Mundial 2026</h1>
      <PlayerFilters
        q={q}
        setQ={setQ}
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
        minAssists={minAssists}
        setMinAssists={setMinAssists}
        maxAssists={maxAssists}
        setMaxAssists={setMaxAssists}
        minCards={minCards}
        setMinCards={setMinCards}
        maxCards={maxCards}
        setMaxCards={setMaxCards}
        position={position}
        setPosition={setPosition}
      />
      <p>Jugadores: {players.length}</p>
    </>
  );
}

export default App;
