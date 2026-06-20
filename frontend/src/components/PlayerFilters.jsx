import {TextField,FormControl,InputLabel,Select,MenuItem,} from '@mui/material';

function PlayerFilters({ name, setName, country, setCountry, captain, setCaptain}) {
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

    <FormControl fullWidth sx={{ mt: 3}}>
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
    </>
  );
}

export default PlayerFilters;
