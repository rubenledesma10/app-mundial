import API_URL from './api'

const getToken = () => localStorage.getItem('token')

export const getPlayers = async () => {
  const response = await fetch(`${API_URL}/api/players`)
  return response.json()
}

export const createPlayer = async (player) => {
  const response = await fetch(`${API_URL}/api/players`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(player),
  })

  const data = await response.json()
  console.log('CREATE RESPONSE:', response.status, data)

  return data
}

export const updatePlayer = async (id, player) => {
  const response = await fetch(`${API_URL}/api/players/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(player),
  })

  const data = await response.json()
  console.log('UPDATE RESPONSE:', response.status, data)

  return data
}

export const deletePlayer = async (id) => {
  const token = getToken()
  console.log('TOKEN PARA DELETE:', token)

  const response = await fetch(`${API_URL}/api/players/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.json()
}