import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'

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
        label="Búsqueda general"
        variant="outlined"
        fullWidth
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      <FormControl fullWidth sx={{ mt: 3 }}>
  <InputLabel>Selección</InputLabel>
        <Select
          value={country}
          label="Selección"
          onChange={(e) => setCountry(e.target.value)}
        >
          <MenuItem value="">Todas</MenuItem>

          <MenuItem value="México">México</MenuItem>
          <MenuItem value="Sudáfrica">Sudáfrica</MenuItem>
          <MenuItem value="Corea del Sur">Corea del Sur</MenuItem>
          <MenuItem value="Chequia">Chequia</MenuItem>
          <MenuItem value="Canadá">Canadá</MenuItem>
          <MenuItem value="Bosnia y Herzegovina">Bosnia y Herzegovina</MenuItem>
          <MenuItem value="Qatar">Qatar</MenuItem>
          <MenuItem value="Suiza">Suiza</MenuItem>
          <MenuItem value="Brasil">Brasil</MenuItem>
          <MenuItem value="Marruecos">Marruecos</MenuItem>
          <MenuItem value="Haití">Haití</MenuItem>
          <MenuItem value="Escocia">Escocia</MenuItem>
          <MenuItem value="Estados Unidos">Estados Unidos</MenuItem>
          <MenuItem value="Paraguay">Paraguay</MenuItem>
          <MenuItem value="Australia">Australia</MenuItem>
          <MenuItem value="Turquía">Turquía</MenuItem>
          <MenuItem value="Alemania">Alemania</MenuItem>
          <MenuItem value="Curazao">Curazao</MenuItem>
          <MenuItem value="Costa de Marfil">Costa de Marfil</MenuItem>
          <MenuItem value="Ecuador">Ecuador</MenuItem>
          <MenuItem value="Países Bajos">Países Bajos</MenuItem>
          <MenuItem value="Japón">Japón</MenuItem>
          <MenuItem value="Suecia">Suecia</MenuItem>
          <MenuItem value="Túnez">Túnez</MenuItem>
          <MenuItem value="Bélgica">Bélgica</MenuItem>
          <MenuItem value="Egipto">Egipto</MenuItem>
          <MenuItem value="Irán">Irán</MenuItem>
          <MenuItem value="Nueva Zelanda">Nueva Zelanda</MenuItem>
          <MenuItem value="España">España</MenuItem>
          <MenuItem value="Cabo Verde">Cabo Verde</MenuItem>
          <MenuItem value="Arabia Saudita">Arabia Saudita</MenuItem>
          <MenuItem value="Uruguay">Uruguay</MenuItem>
          <MenuItem value="Francia">Francia</MenuItem>
          <MenuItem value="Senegal">Senegal</MenuItem>
          <MenuItem value="Irak">Irak</MenuItem>
          <MenuItem value="Noruega">Noruega</MenuItem>
          <MenuItem value="Argentina">Argentina</MenuItem>
          <MenuItem value="Argelia">Argelia</MenuItem>
          <MenuItem value="Austria">Austria</MenuItem>
          <MenuItem value="Jordania">Jordania</MenuItem>
          <MenuItem value="Portugal">Portugal</MenuItem>
          <MenuItem value="República Democrática del Congo">
            República Democrática del Congo
          </MenuItem>
          <MenuItem value="Uzbekistán">Uzbekistán</MenuItem>
          <MenuItem value="Colombia">Colombia</MenuItem>
          <MenuItem value="Inglaterra">Inglaterra</MenuItem>
          <MenuItem value="Croacia">Croacia</MenuItem>
          <MenuItem value="Ghana">Ghana</MenuItem>
          <MenuItem value="Panamá">Panamá</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mt: 3 }}>
        <InputLabel>Capitán</InputLabel>
        <Select
          value={captain}
          label="Capitán"
          onChange={(e) => setCaptain(e.target.value)}
        >
          <MenuItem value="">Todos</MenuItem>
          <MenuItem value="true">Sí</MenuItem>
          <MenuItem value="false">No</MenuItem>
        </Select>
      </FormControl>

      <TextField label="Goles mínimos" type="number" fullWidth sx={{ mt: 3 }} value={minGoals} onChange={(e) => setMinGoals(e.target.value)} />
      <TextField label="Goles máximos" type="number" fullWidth sx={{ mt: 3 }} value={maxGoals} onChange={(e) => setMaxGoals(e.target.value)} />
      <TextField label="Altura mínima" type="number" fullWidth sx={{ mt: 3 }} value={minHeight} onChange={(e) => setMinHeight(e.target.value)} />
      <TextField label="Altura máxima" type="number" fullWidth sx={{ mt: 3 }} value={maxHeight} onChange={(e) => setMaxHeight(e.target.value)} />
      <TextField label="Asistencias mínimas" type="number" fullWidth sx={{ mt: 3 }} value={minAssists} onChange={(e) => setMinAssists(e.target.value)} />
      <TextField label="Asistencias máximas" type="number" fullWidth sx={{ mt: 3 }} value={maxAssists} onChange={(e) => setMaxAssists(e.target.value)} />

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
  )
}

export default PlayerFilters