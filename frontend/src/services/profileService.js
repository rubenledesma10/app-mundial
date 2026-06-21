import API_URL from './api'

const getToken = () => localStorage.getItem('token')

export const getProfile = async () => {
  const response = await fetch(`${API_URL}/api/auth/perfil`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })

  return response.json()
}

export const updateProfile = async (formData) => {
  const response = await fetch(`${API_URL}/api/auth/perfil`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    body: formData,
  })

  return response.json()
}