/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControlLabel,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import './PlayerFormModal.css'

const nationalTeams = [
  { id: 1, country: 'México' },
  { id: 2, country: 'Sudáfrica' },
  { id: 3, country: 'Corea del Sur' },
  { id: 4, country: 'Chequia' },
  { id: 5, country: 'Canadá' },
  { id: 6, country: 'Bosnia y Herzegovina' },
  { id: 7, country: 'Qatar' },
  { id: 8, country: 'Suiza' },
  { id: 9, country: 'Brasil' },
  { id: 10, country: 'Marruecos' },
  { id: 11, country: 'Haití' },
  { id: 12, country: 'Escocia' },
  { id: 13, country: 'Estados Unidos' },
  { id: 14, country: 'Paraguay' },
  { id: 15, country: 'Australia' },
  { id: 16, country: 'Turquía' },
  { id: 17, country: 'Alemania' },
  { id: 18, country: 'Curazao' },
  { id: 19, country: 'Costa de Marfil' },
  { id: 20, country: 'Ecuador' },
  { id: 21, country: 'Países Bajos' },
  { id: 22, country: 'Japón' },
  { id: 23, country: 'Suecia' },
  { id: 24, country: 'Túnez' },
  { id: 25, country: 'Bélgica' },
  { id: 26, country: 'Egipto' },
  { id: 27, country: 'Irán' },
  { id: 28, country: 'Nueva Zelanda' },
  { id: 29, country: 'España' },
  { id: 30, country: 'Cabo Verde' },
  { id: 31, country: 'Arabia Saudita' },
  { id: 32, country: 'Uruguay' },
  { id: 33, country: 'Francia' },
  { id: 34, country: 'Senegal' },
  { id: 35, country: 'Irak' },
  { id: 36, country: 'Noruega' },
  { id: 37, country: 'Argentina' },
  { id: 38, country: 'Argelia' },
  { id: 39, country: 'Austria' },
  { id: 40, country: 'Jordania' },
  { id: 41, country: 'Portugal' },
  { id: 42, country: 'República Democrática del Congo' },
  { id: 43, country: 'Uzbekistán' },
  { id: 44, country: 'Colombia' },
  { id: 45, country: 'Inglaterra' },
  { id: 46, country: 'Croacia' },
  { id: 47, country: 'Ghana' },
  { id: 48, country: 'Panamá' },
]

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
  const [form, setForm] = useState(initialForm)

  useEffect(() => {
      if (playerSelected) {
        setForm({
          ...initialForm,
          ...playerSelected,
          id_national_teams:
            playerSelected.national_team?.id || 1,
        })
      } else {
        setForm(initialForm)
      }
    }, [playerSelected])

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target

    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0]

    if (!file) return

    const imageUrl = URL.createObjectURL(file)

    setForm({
      ...form,
      photo: imageUrl,
    })
  }

  const handleSubmit = () => {
    onSave(form)
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle className="player-form-modal-title">
        {playerSelected ? 'Editar Jugador' : 'Nuevo Jugador'}
      </DialogTitle>

      <DialogContent>
        <div className="player-form-layout">
          <div className="player-form-photo-column">
            <div className="player-photo-panel">
              <div className="player-photo-preview-box">
                {form.photo ? (
                  <img
                    src={form.photo}
                    alt="Vista previa del jugador"
                    className="player-photo-preview"
                  />
                ) : (
                  <span className="player-photo-placeholder">Sin foto</span>
                )}
              </div>

              <Button
                variant="outlined"
                component="label"
                fullWidth
                className="player-photo-button"
              >
                Seleccionar foto
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handlePhotoChange}
                />
              </Button>
            </div>
          </div>

          <div className="player-form-fields-column">
            <div className="player-form-section">
              <h3>DATOS PERSONALES</h3>

              <div className="player-form-fields-grid columns-3">
                <TextField fullWidth label="Nombre" name="first_name" value={form.first_name} onChange={handleChange} />
                <TextField fullWidth label="Apellido" name="last_name" value={form.last_name} onChange={handleChange} />
                <TextField fullWidth label="Fecha de nacimiento" name="birthdate" type="date" value={form.birthdate} onChange={handleChange} slotProps={{ inputLabel: { shrink: true } }} />
              </div>
            </div>

            <div className="player-form-section">
              <h3>DATOS DEPORTIVOS</h3>

              <div className="player-form-fields-grid columns-3">
                <FormControl fullWidth>
                  <InputLabel>Selección</InputLabel>
                  <Select name="id_national_teams" value={form.id_national_teams || 1} label="Selección" onChange={handleChange}>
                    {nationalTeams.map((team) => (
                      <MenuItem key={team.id} value={team.id}>
                        {team.country}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField fullWidth label="Posición" name="position" value={form.position} onChange={handleChange} />

                <TextField fullWidth type="number" label="Número de camiseta" name="tshirt_number" value={form.tshirt_number} onChange={handleChange} />

                <TextField fullWidth label="Club actual" name="current_club" value={form.current_club} onChange={handleChange} />

                <div className="player-captain-field">
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
                </div>
              </div>
            </div>

            <div className="player-form-section">
              <h3>DATOS FÍSICOS</h3>

              <div className="player-form-fields-grid columns-2">
                <TextField fullWidth type="number" label="Altura" name="height" value={form.height} onChange={handleChange} />
                <TextField fullWidth type="number" label="Peso" name="weight" value={form.weight} onChange={handleChange} />
              </div>
            </div>

            <div className="player-form-section">
              <h3>ESTADÍSTICAS</h3>

              <div className="player-form-fields-grid columns-4">
                <TextField fullWidth type="number" label="Goles" name="goals" value={form.goals} onChange={handleChange} />
                <TextField fullWidth type="number" label="Asistencias" name="assists" value={form.assists} onChange={handleChange} />
                <TextField fullWidth type="number" label="Amarillas" name="yellow_card" value={form.yellow_card} onChange={handleChange} />
                <TextField fullWidth type="number" label="Rojas" name="red_card" value={form.red_card} onChange={handleChange} />
              </div>
            </div>
          </div>
        </div>
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