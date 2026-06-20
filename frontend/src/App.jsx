import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AdminPlayersPage from './pages/AdminPlayersPage'
import StatisticsPage from './pages/StatisticsPage'
import ProfilePage from './pages/ProfilePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminPlayersPage />} />
        <Route path="/estadisticas" element={<StatisticsPage />} />
        <Route path="/perfil" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App