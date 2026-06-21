/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import {
  Button,
  Container,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material'
import PlayerFormModal from '../components/PlayerFormModal'
import PlayerCard from '../components/PlayerCard'
import {
  createPlayer,
  updatePlayer,
  updatePlayerStatus,
} from '../services/playerService'
import './AdminPlayersPage.css'

function AdminPlayersPage() {
  const [openModal, setOpenModal] = useState(false)
  const [players, setPlayers] = useState([])
  const [selectedPlayer, setSelectedPlayer] = useState(null)
  const [status, setStatus] = useState('all')
  const [country, setCountry] = useState('')

  const loadPlayers = async () => {
    let url = `http://127.0.0.1:5000/api/players/search?status=${status}`

    if (country) {
      url += `&country=${country}`
    }

    const response = await fetch(url)
    const data = await response.json()

    setPlayers(data)
  }

  useEffect(() => {
    loadPlayers()
  }, [status, country])

  const handleOpenModal = () => {
    setSelectedPlayer(null)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setSelectedPlayer(null)
  }

  const handleSavePlayer = async (playerData) => {
    if (selectedPlayer) {
      await updatePlayer(selectedPlayer.id, playerData)
    } else {
      await createPlayer(playerData)
    }

    await loadPlayers()
    setOpenModal(false)
    setSelectedPlayer(null)
  }

  const handleEditPlayer = (player) => {
    setSelectedPlayer(player)
    setOpenModal(true)
  }

  const handleToggleStatus = async (player) => {
  try {
    const updatedPlayer = await updatePlayerStatus(
      player.id,
      !player.is_active
    )

    if (updatedPlayer.error || updatedPlayer.Message === 'Player not found') {
      console.error('Error al actualizar estado:', updatedPlayer)
      return
    }

    setPlayers((prevPlayers) =>
      prevPlayers.map((p) =>
        p.id === player.id
          ? updatedPlayer
          : p
      )
    )
  } catch (error) {
    console.error(error)
  }
}

  return (
    <Container className="admin-players-page">
      <Typography variant="h4" className="admin-players-title">
        Panel Administrador - Jugadores
      </Typography>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <Button variant="contained" onClick={handleOpenModal}>
          NUEVO JUGADOR
        </Button>

        <FormControl
          className="admin-status-filter"
          size="small"
          sx={{ minWidth: 180 }}
        >
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="all">TODOS</MenuItem>
            <MenuItem value="active">ACTIVOS</MenuItem>
            <MenuItem value="inactive">INACTIVOS</MenuItem>
          </Select>
        </FormControl>

        <FormControl
          className="admin-status-filter"
          size="small"
          sx={{ minWidth: 220 }}
        >
          <Select
            value={country}
            displayEmpty
            onChange={(e) => setCountry(e.target.value)}
          >

            <MenuItem value="">
              SELECCIONES
            </MenuItem>
            
            <MenuItem value="Argentina">Argentina</MenuItem>
            <MenuItem value="Portugal">Portugal</MenuItem>
            <MenuItem value="España">España</MenuItem>
            <MenuItem value="Francia">Francia</MenuItem>
            <MenuItem value="Inglaterra">Inglaterra</MenuItem>
            <MenuItem value="Alemania">Alemania</MenuItem>
            <MenuItem value="Brasil">Brasil</MenuItem>
            <MenuItem value="Uruguay">Uruguay</MenuItem>
            <MenuItem value="Colombia">Colombia</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="players-container">
        {players.map((player) => (
          <PlayerCard
            key={player.id}
            player={player}
            onEdit={handleEditPlayer}
            onToggleStatus={handleToggleStatus}
          />
        ))}
      </div>

      <PlayerFormModal
        open={openModal}
        onClose={handleCloseModal}
        onSave={handleSavePlayer}
        playerSelected={selectedPlayer}
      />
    </Container>
  )
}

export default AdminPlayersPage