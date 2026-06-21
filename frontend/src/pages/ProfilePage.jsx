import { useEffect, useState, useRef } from 'react'
import { getProfile, updateProfile } from '../services/profileService'
import './ProfilePage.css'

function ProfilePage() {
  const [user, setUser] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  
  const [previewUrl, setPreviewUrl] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [usingCamera, setUsingCamera] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    const loadProfile = async () => {
        const data = await getProfile()
        setUser(data.user)
        if (data.user?.photo) {
          setPreviewUrl(`http://localhost:5000/${data.user.photo}`)
        }
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

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
        setSelectedFile(file)
        setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const startCamera = async () => {
    setUsingCamera(true)
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        if (videoRef.current) videoRef.current.srcObject = stream
    } catch (err) {
        console.error(err)
        alert("No se pudo acceder a la cámara.")
        setUsingCamera(false)
    }
  }

  const capturePhoto = () => {
    const video = videoRef.current
    if (!video) return

    const canvas = document.createElement('canvas')
    canvas.width = 640
    canvas.height = 480
    const ctx = canvas.getContext('2d')
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    canvas.toBlob((blob) => {
        if (blob) {
            const fileFromCamera = new File([blob], "profile_capture.jpg", { type: "image/jpeg" })
            setSelectedFile(fileFromCamera)
            setPreviewUrl(URL.createObjectURL(fileFromCamera))
        }
    }, 'image/jpeg', 0.9)

    const stream = video.srcObject
    if (stream) stream.getTracks().forEach(track => track.stop())
    setUsingCamera(false)
  }

  const handleSave = async () => {
    const formData = new FormData()

    formData.append('first_name', user.first_name)
    formData.append('last_name', user.last_name)
    
    if (selectedFile) {
        formData.append('photo', selectedFile)
    }

    try {
        await updateProfile(formData)
        setIsEditing(false)
        setUsingCamera(false)
        // Recargamos el perfil para asegurar que traiga la nueva URL del backend
        const data = await getProfile()
        setUser(data.user)
        if (data.user?.photo) {
          setPreviewUrl(`http://localhost:5000/${data.user.photo}`)
        }
        alert("¡Perfil guardado con éxito!")
    } catch (error) {
        console.error("Error al guardar perfil", error)
        alert("Ocurrió un error al guardar los cambios.")
    }
  }

  if (!user) {
    return <h1 style={{ color: 'white' }}>¡¡ INICIA SESIÓN O REGISTRATE PARA PODER VER ESTA SECCION</h1>
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        
        {/* AVATAR / CÁMARA */}
        <div className="profile-avatar">
          {usingCamera ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <video ref={videoRef} autoPlay playsInline style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', transform: 'scaleX(-1)' }} />
              <button type="button" onClick={capturePhoto} style={{ marginTop: '5px', padding: '2px 8px', fontSize: '12px' }}>Tomar Foto</button>
            </div>
          ) : previewUrl ? (
            <img src={previewUrl} alt="Foto de usuario" />
          ) : (
            <span>
              {user.first_name?.[0]}
              {user.last_name?.[0]}
            </span>
          )}
        </div>

        {/* CONTROLES MULTIMEDIA EN MODO EDICIÓN */}
        {isEditing && !usingCamera && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '15px' }}>
            <label className="profile-edit-button" style={{ padding: '5px 10px', fontSize: '12px', cursor: 'pointer' }}>
              Subir Foto
              <input type="file" accept="image/*" hidden onChange={handleFileChange} />
            </label>
            <button type="button" onClick={startCamera} style={{ padding: '5px 10px', fontSize: '12px' }}>
              Usar Cámara
            </button>
          </div>
        )}

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