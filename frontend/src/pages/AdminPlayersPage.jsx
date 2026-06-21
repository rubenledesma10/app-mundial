/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react'
import { Button, Container, Typography } from '@mui/material'
import PlayerFormModal from '../components/PlayerFormModal'
import PlayerCard from '../components/PlayerCard'
import {
  getPlayers,
  createPlayer,
  updatePlayer,
  deletePlayer,
} from '../services/playerService'
import './AdminPlayersPage.css'

function AdminPlayersPage() {
  const [openModal, setOpenModal] = useState(false)
  const [players, setPlayers] = useState([])
  const [selectedPlayer, setSelectedPlayer] = useState(null)

  const loadPlayers = async () => {
    const data = await getPlayers()
    setPlayers(data)
  }

  useEffect(() => {
    loadPlayers()
  }, [])

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

  const handleDeletePlayer = async (id) => {
    const confirmDelete = window.confirm('¿Seguro que querés eliminar este jugador?')

    if (!confirmDelete) return

    await deletePlayer(id)
    await loadPlayers()
  }

  return (
    <Container className="admin-players-page">
      <Typography variant="h4" className="admin-players-title">
        Panel Administrador - Jugadores
      </Typography>

      <Button variant="contained" onClick={handleOpenModal}>
        Nuevo Jugador
      </Button>

      <div className="players-container">
        {players.map((player) => (
          <PlayerCard
            key={player.id}
            player={player}
            onEdit={handleEditPlayer}
            onDelete={handleDeletePlayer}
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