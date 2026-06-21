
import { useEffect, useState } from 'react'
import { getProfile, updateProfile } from '../services/profileService'
import './ProfilePage.css'

function ProfilePage() {
  const [user, setUser] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const loadProfile = async () => {
        const data = await getProfile()
        setUser(data.user)
    }

    loadProfile()
    }, [])

  const handleChange = (event) => {
    const { name, value } = event.target

    setUser({
      ...user,
      [name]: value,
    })
  }

  const handleSave = async () => {
    const formData = new FormData()

    formData.append('first_name', user.first_name)
    formData.append('last_name', user.last_name)

    await updateProfile(formData)
    setIsEditing(false)
  }

  if (!user) {
    return <h1 style={{ color: 'white' }}>Cargando perfil...</h1>
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-avatar">
          {user.photo ? (
            <img
              src={`http://localhost:5000/${user.photo}`}
              alt="Foto de usuario"
            />
          ) : (
            <span>
              {user.first_name?.[0]}
              {user.last_name?.[0]}
            </span>
          )}
        </div>

        <h1>Mi Perfil</h1>

        <div className="profile-info">
          {isEditing ? (
            <>
              <input
                name="first_name"
                value={user.first_name || ''}
                onChange={handleChange}
                placeholder="Nombre"
              />

              <input
                name="last_name"
                value={user.last_name || ''}
                onChange={handleChange}
                placeholder="Apellido"
              />

              <p>
                <strong>Email:</strong> {user.email}
              </p>

              <p>
                <strong>DNI:</strong> {user.dni}
              </p>

              <p>
                <strong>Rol:</strong> {user.rol}
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>Nombre:</strong> {user.first_name} {user.last_name}
              </p>

              <p>
                <strong>Email:</strong> {user.email}
              </p>

              <p>
                <strong>DNI:</strong> {user.dni}
              </p>

              <p>
                <strong>Rol:</strong> {user.rol}
              </p>
            </>
          )}
        </div>

        <div className="profile-actions">
            {isEditing ? (
                <button className="profile-save-button" onClick={handleSave}>
                Guardar
                </button>
            ) : (
                <button
                className="profile-edit-button"
                onClick={() => setIsEditing(true)}
                >
                Editar
                </button>
            )}

            <button
                className="profile-back-button"
                onClick={() => window.location.href = '/'}
            >
                Volver
            </button>
            </div>
      </div>
    </div>
  )
}

export default ProfilePage