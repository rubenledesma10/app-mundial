import { useState } from 'react'
import './ProfilePage.css'

const mockUser = {
  first_name: 'Rodrigo',
  last_name: 'Espinosa',
  email: 'rodrigo@email.com',
  dni: '40123456',
  birthday: '1998-05-20',
  active: true,
  password: '',
  role: 'Administrador',
  photo: '',
}

function ProfilePage() {
  const [user, setUser] = useState(mockUser)
  const [isEditing, setIsEditing] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    setUser({
      ...user,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleSave = () => {
    setIsEditing(false)
    console.log('Usuario actualizado:', user)
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-avatar">
          {user.photo ? (
            <img src={user.photo} alt="Foto de usuario" />
          ) : (
            <span>
              {user.first_name[0]}
              {user.last_name[0]}
            </span>
          )}
        </div>

        <h1>Mi Perfil</h1>

        <div className="profile-info">
          <label>
            Nombre
            <input
              name="first_name"
              value={user.first_name}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </label>

          <label>
            Apellido
            <input
              name="last_name"
              value={user.last_name}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </label>

          <label>
            Email
            <input
              name="email"
              type="email"
              value={user.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </label>

          <label>
            DNI
            <input
              name="dni"
              value={user.dni}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </label>

          <label>
            Fecha de nacimiento
            <input
              name="birthday"
              type="date"
              value={user.birthday}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </label>

          <label>
            Contraseña
            <input
              name="password"
              type="password"
              value={user.password}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Nueva contraseña"
            />
          </label>

          <label className="profile-checkbox">
            <input
              name="active"
              type="checkbox"
              checked={user.active}
              onChange={handleChange}
              disabled={!isEditing}
            />
            Usuario activo
          </label>

          <label>
            Rol
            <input value={user.role} disabled />
          </label>
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
              Editar Perfil
            </button>
          )}

          <button
            className="profile-back-button"
            onClick={() => (window.location.href = '/')}
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage