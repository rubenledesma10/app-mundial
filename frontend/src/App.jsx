import { useEffect, useState } from 'react';
import PlayerFilters from './components/PlayerFilters';

function App() {
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [captain, setCaptain] = useState('')
  useEffect(() => {
    let url = 'http://127.0.0.1:5000/api/players';

    const params = [];

    if (name) {
      params.push(`name=${name}`)
    }

    if (country) {
      params.push(`country=${country}`)
    }

    if (params.length > 0){
      url = `http://127.0.0.1:5000/api/players/search?${params.join('&')}`;
    }

    if (captain) {
      params.push(`captain=${captain}`);
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPlayers(data);
      })
      .catch((error) => console.error(error));
    }, [name,country,captain]); 


  return (
    <>
      <h1>Mundial 2026</h1>
      <PlayerFilters name={name} setName={setName} country={country} setCountry={setCountry}
      captain setCaptain={captain}/>
      <p>Jugadores: {players.length}</p>
    </>
  );
}

export default App;
