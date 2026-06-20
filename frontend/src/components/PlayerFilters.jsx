import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

function PlayerFilters({
  name,
  setName,
  country,
  setCountry,
  captain,
  setCaptain,
  minGoals,
  setMinGoals,
  maxGoals,
  setMaxGoals,
  minHeight,
  setMinHeight,
  maxHeight,
  setMaxHeight,
}) {
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

      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel>Selección</InputLabel>

        <Select
          value={country}
          label="Selección"
          onChange={(e) => setCountry(e.target.value)}
        >
          <MenuItem value="">Todas</MenuItem>

          <MenuItem value="Argentina">Argentina</MenuItem>

          <MenuItem value="Portugal">Portugal</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mt: 3 }}>
        <InputLabel>Capitan</InputLabel>
        <Select
          value={captain}
          label="Captain"
          onChange={(e) => setCaptain(e.target.value)}
        >
          <MenuItem>Todos</MenuItem>

          <MenuItem value="true">Si</MenuItem>

          <MenuItem value="false">No</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Goles minimos"
        type="number"
        fullWidth
        sx={{ mt: 3 }}
        value={minGoals}
        onChange={(e) => setMinGoals(e.target.value)}
      />
      <TextField
        label="Goles maximos"
        type="number"
        fullWidth
        sx={{ mt: 3 }}
        value={maxGoals}
        onChange={(e) => setMaxGoals(e.target.value)}
      />
      <TextField
        label="Altura mínima"
        type="number"
        fullWidth
        sx={{ mt: 3 }}
        value={minHeight}
        onChange={(e) => setMinHeight(e.target.value)}
      />

      <TextField
        label="Altura máxima"
        type="number"
        fullWidth
        sx={{ mt: 3 }}
        value={maxHeight}
        onChange={(e) => setMaxHeight(e.target.value)}
      />
    </>
  );
}

export default PlayerFilters;
