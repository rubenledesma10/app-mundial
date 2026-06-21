import { useState } from 'react'
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Box,
} from '@mui/material'
import './PlayerCard.css'

function PlayerCard({ player, onEdit, onDelete }) {
  const [openStats, setOpenStats] = useState(false)

  return (
    <>
      <Card
        className={`player-card ${
          player.is_captain ? 'player-card-captain-border' : ''
        }`}
      >
        <CardContent>
          {player.photo ? (
            <img
              src={player.photo}
              alt={`${player.first_name} ${player.last_name}`}
              className="player-card-photo"
            />
          ) : (
            player.is_captain && <div className="player-card-star">⭐</div>
          )}

          <Typography variant="h6">
            {player.first_name} {player.last_name}
          </Typography>

          <Typography>Posición: {player.position}</Typography>
          <Typography>Camiseta: {player.tshirt_number}</Typography>
          <Typography>Club: {player.current_club}</Typography>
          <Typography>Fecha de nacimiento: {player.birthdate || '-'}</Typography>
          <Typography>Peso: {player.weight || '-'}</Typography>
          <Typography>Altura: {player.height || '-'}</Typography>
        </CardContent>

        <CardActions>
          <Button size="small" onClick={() => onEdit(player)}>
            Editar
          </Button>

          <Button size="small" color="error" onClick={() => onDelete(player.id)}>
            Eliminar
          </Button>

          <Button size="small" onClick={() => setOpenStats(true)}>
            Ver estadísticas
          </Button>
        </CardActions>
      </Card>

      <Dialog open={openStats} onClose={() => setOpenStats(false)} fullWidth maxWidth="sm">
          <DialogTitle
            sx={{ color: '#000', fontWeight: 'bold' }}
          >
            Estadísticas de {player.first_name} {player.last_name}
          </DialogTitle>

        <DialogContent>

          <Typography>⚽ Goles: {player.goals || 0}</Typography>
          <Box sx={{ mb: 2 }}>
            <LinearProgress
              variant="determinate"
              value={(player.goals || 0) * 5}
            />
          </Box>

          <Typography>🎯 Asistencias: {player.assists || 0}</Typography>
          <Box sx={{ mb: 2 }}>
            <LinearProgress
              variant="determinate"
              value={(player.assists || 0) * 10}
              color="success"
            />
          </Box>

          <Typography>🟨 Tarjetas amarillas: {player.yellow_card || 0}</Typography>
          <Box sx={{ mb: 2 }}>
            <LinearProgress
              variant="determinate"
              value={(player.yellow_card || 0) * 20}
              color="warning"
            />
          </Box>

          <Typography>🟥 Tarjetas rojas: {player.red_card || 0}</Typography>
          <Box sx={{ mb: 2 }}>
            <LinearProgress
              variant="determinate"
              value={(player.red_card || 0) * 50}
              color="error"
            />
          </Box>

        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenStats(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default PlayerCard