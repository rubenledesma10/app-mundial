/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import {
  Button,
  Container,
  Typography,
  FormControl,
  Select,
  MenuItem,
  TextField,
} from '@mui/material'

import { useAuth } from '../hooks/useAuth'
import PlayerFormModal from '../components/PlayerFormModal'
import PlayerCard from '../components/PlayerCard'

import {
  createPlayer,
  updatePlayer,
  updatePlayerStatus,
} from '../services/playerService'

import './HomeAdmin.css'

function HomeAdmin() {
  const { user } = useAuth()

  const [openModal, setOpenModal] = useState(false)
  const [players, setPlayers] = useState([])
  const [selectedPlayer, setSelectedPlayer] = useState(null)
  const [status, setStatus] = useState('all')
  const [country, setCountry] = useState('')
  const [search, setSearch] = useState('')

  const loadPlayers = async () => {
    try {
      let url = `http://127.0.0.1:5000/api/players/search?status=${status}`

      if (country) {
        url += `&country=${country}`
      }

      if (search) {
        url += `&q=${search}`
      }

      const response = await fetch(url)
      const data = await response.json()

      setPlayers(data)
    } catch (error) {
      console.error('Error cargando jugadores:', error)
    }
  }

  useEffect(() => {
    loadPlayers()
  }, [status, country, search])

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
      await updatePlayerStatus(player.id, !player.is_active)
      await loadPlayers()
    } catch (error) {
      console.error('Error al actualizar estado:', error)
    }
  }

  return (
    <Container className="home-admin-page">
      <Typography variant="h4" className="home-admin-title">
        Panel Administrador - Jugadores
      </Typography>

      <Typography
        sx={{
          color: 'white',
          textAlign: 'center',
          marginBottom: '24px',
        }}
      >
        Bienvenido {user?.first_name}
      </Typography>

      <div className="admin-toolbar">
        <div className="admin-toolbar-left">
          <Button variant="contained" onClick={handleOpenModal}>
            NUEVO JUGADOR
          </Button>

          <FormControl className="admin-status-filter" size="small">
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="all">TODOS</MenuItem>
              <MenuItem value="active">ACTIVOS</MenuItem>
              <MenuItem value="inactive">INACTIVOS</MenuItem>
            </Select>
          </FormControl>

          <FormControl className="admin-status-filter" size="small">
            <Select
              value={country}
              displayEmpty
              onChange={(e) => setCountry(e.target.value)}
            >
              <MenuItem value="">SELECCIONES</MenuItem>
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

        <TextField
          size="small"
          placeholder="Buscar jugador..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="admin-search"
        />
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

export default HomeAdmin