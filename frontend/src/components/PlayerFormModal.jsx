import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControlLabel,
  Switch,
} from '@mui/material'
import './PlayerFormModal.css'

const initialForm = {
  first_name: '',
  last_name: '',
  birthdate: '',
  photo: '',
  id_national_teams: 1,
  position: '',
  tshirt_number: '',
  current_club: '',
  goals: 0,
  assists: 0,
  yellow_card: 0,
  red_card: 0,
  is_captain: false,
  weight: '',
  height: '',
}

function PlayerFormModal({ open, onClose, onSave, playerSelected }) {
  const [form, setForm] = useState(playerSelected || initialForm)

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target

    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleSubmit = () => {
    onSave(form)
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle className="player-form-modal-title">
        {playerSelected ? 'Editar Jugador' : 'Nuevo Jugador'}
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2} className="player-form-modal-grid">
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Nombre" name="first_name" value={form.first_name} onChange={handleChange} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Apellido" name="last_name" value={form.last_name} onChange={handleChange} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Fecha de nacimiento" name="birthdate" type="date" value={form.birthdate} onChange={handleChange}
                slotProps={{
                inputLabel: {
                    shrink: true,
                },
                }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Foto" name="photo" value={form.photo} onChange={handleChange} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth type="number" label="Selección" name="id_national_teams" value={form.id_national_teams} onChange={handleChange} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Posición" name="position" value={form.position} onChange={handleChange} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth type="number" label="Número de camiseta" name="tshirt_number" value={form.tshirt_number} onChange={handleChange} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Club actual" name="current_club" value={form.current_club} onChange={handleChange} />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField fullWidth type="number" label="Goles" name="goals" value={form.goals} onChange={handleChange} />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField fullWidth type="number" label="Asistencias" name="assists" value={form.assists} onChange={handleChange} />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField fullWidth type="number" label="Amarillas" name="yellow_card" value={form.yellow_card} onChange={handleChange} />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField fullWidth type="number" label="Rojas" name="red_card" value={form.red_card} onChange={handleChange} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth type="number" label="Peso" name="weight" value={form.weight} onChange={handleChange} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth type="number" label="Altura" name="height" value={form.height} onChange={handleChange} />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  name="is_captain"
                  checked={form.is_captain}
                  onChange={handleChange}
                />
              }
              label="Es capitán"
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions className="player-form-modal-actions">
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default PlayerFormModal