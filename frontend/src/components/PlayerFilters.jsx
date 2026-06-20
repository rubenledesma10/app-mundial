import { TextField } from '@mui/material';

function PlayerFilters({ name, setName }) {
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
