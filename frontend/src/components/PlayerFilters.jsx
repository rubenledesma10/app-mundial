import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

function PlayerFilters({
  q,
  setQ,
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
  minAssists,
  setMinAssists,
  maxAssists,
  setMaxAssists,
  minCards,
  setMinCards,
  maxCards,
  setMaxCards,
  position,
  setPosition,
}) {
  return (
    <>
      <h2>Filtrar</h2>

      <TextField
        label="Busqueda general"
        variant="outlined"
        fullWidth
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      <p>Buscando: {q}</p>

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
          <MenuItem value="">Todos</MenuItem>

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
      <TextField
        label="Asistencias mínimas"
        type="number"
        fullWidth
        sx={{ mt: 3 }}
        value={minAssists}
        onChange={(e) => setMinAssists(e.target.value)}
      />

      <TextField
        label="Asistencias máximas"
        type="number"
        fullWidth
        sx={{ mt: 3 }}
        value={maxAssists}
        onChange={(e) => setMaxAssists(e.target.value)}
      />
      <TextField
        label="Tarjetas mínimas"
        type="number"
        fullWidth
        sx={{ mt: 3 }}
        value={minCards}
        onChange={(e) => setMinCards(e.target.value)}
      />

      <TextField
        label="Tarjetas máximas"
        type="number"
        fullWidth
        sx={{ mt: 3 }}
        value={maxCards}
        onChange={(e) => setMaxCards(e.target.value)}
      />
      <FormControl fullWidth sx={{ mt: 3 }}>
        <InputLabel>Posición</InputLabel>

        <Select
          value={position}
          label="Posición"
          onChange={(e) => setPosition(e.target.value)}
        >
          <MenuItem value="">Todas</MenuItem>

          <MenuItem value="Arquero">Arquero</MenuItem>

          <MenuItem value="Defensor">Defensor</MenuItem>

          <MenuItem value="Mediocampista">Mediocampista</MenuItem>

          <MenuItem value="Delantero">Delantero</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}

export default PlayerFilters;
