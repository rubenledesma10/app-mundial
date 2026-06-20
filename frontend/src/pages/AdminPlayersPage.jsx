import { useState } from 'react'
import { Button, Container, Typography } from '@mui/material'
import PlayerFormModal from '../components/PlayerFormModal'
import './AdminPlayersPage.css'

function AdminPlayersPage() {
  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleSavePlayer = (playerData) => {
    console.log('Datos del jugador:', playerData)
    setOpenModal(false)
  }

  return (
    <Container className="admin-players-page">
      <Typography variant="h4" className="admin-players-title">
        Panel Administrador - Jugadores
      </Typography>

      <Button variant="contained" onClick={handleOpenModal}>
        Nuevo Jugador
      </Button>

      <PlayerFormModal
        open={openModal}
        onClose={handleCloseModal}
        onSave={handleSavePlayer}
        playerSelected={null}
      />
    </Container>
  )
}

export default AdminPlayersPage