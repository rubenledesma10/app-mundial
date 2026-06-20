import { TextField } from '@mui/material';
import { useState } from 'react';

function PlayerFilters() {
  const [name, setName] = useState('');

  return (
    <>
      <h2>Filtrar</h2>
      <TextField
        label="Buscar jugador"
        variant="outlined"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p>Buscando: {name}</p>
    </>
  );
}

export default PlayerFilters;
