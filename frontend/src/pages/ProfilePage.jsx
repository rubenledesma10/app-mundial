import './ProfilePage.css'

const mockUser = {
  first_name: 'Rodrigo',
  last_name: 'Espinosa',
  email: 'rodrigo@email.com',
  role: 'Administrador',
  photo: '',
}

function ProfilePage() {
  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-avatar">
          {mockUser.photo ? (
            <img src={mockUser.photo} alt="Foto de usuario" />
          ) : (
            <span>
              {mockUser.first_name[0]}
              {mockUser.last_name[0]}
            </span>
          )}
        </div>

        <h1>Mi Perfil</h1>

        <div className="profile-info">
          <p>
            <strong>Nombre:</strong> {mockUser.first_name} {mockUser.last_name}
          </p>

          <p>
            <strong>Email:</strong> {mockUser.email}
          </p>

          <p>
            <strong>Rol:</strong> {mockUser.role}
          </p>
        </div>
        <button
        className="profile-back-button"
        onClick={() => window.location.href = '/'}
        >
        Volver
        </button>
      </div>
    </div>
  )
}

export default ProfilePage