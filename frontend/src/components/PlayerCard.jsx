import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from '@mui/material'
import './PlayerCard.css'

function PlayerCard({ player, onEdit, onDelete }) {
  return (
    <Card className={`player-card ${player.is_captain ? 'player-card-captain-border' : ''}`}
>
      <CardContent>
        <Typography variant="h6">
          {player.first_name} {player.last_name}
          {player.is_captain && ' ⭐'}
        </Typography>

        <Typography>Posición: {player.position}</Typography>
        <Typography>Camiseta: {player.tshirt_number}</Typography>
        <Typography>Club: {player.current_club}</Typography>
        <Typography>Goles: {player.goals}</Typography>
        <Typography>Asistencias: {player.assists}</Typography>
      </CardContent>

      <CardActions>
        <Button size="small" onClick={() => onEdit(player)}>
          Editar
        </Button>

        <Button size="small" color="error" onClick={() => onDelete(player.id)}>
          Eliminar
        </Button>
      </CardActions>
    </Card>
  )
}

export default PlayerCard