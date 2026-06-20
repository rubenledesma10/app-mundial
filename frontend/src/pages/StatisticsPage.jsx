import PlayerStatsChart from '../components/PlayerStatsChart'
import './StatisticsPage.css'

const mockPlayers = [
  {
    id: 1,
    first_name: 'Lionel',
    last_name: 'Messi',
    goals: 15,
    assists: 8,
  },
  {
    id: 2,
    first_name: 'Kylian',
    last_name: 'Mbappé',
    goals: 12,
    assists: 4,
  },
  {
    id: 3,
    first_name: 'Julián',
    last_name: 'Álvarez',
    goals: 8,
    assists: 6,
  },
]

function StatisticsPage() {
  return (
    <div className="statistics-page">
      <h1>Estadísticas del Mundial</h1>

      <PlayerStatsChart
        title="Goles por jugador"
        players={mockPlayers}
        dataKey="goals"
        color="#1976d2"
      />

      <PlayerStatsChart
        title="Asistencias por jugador"
        players={mockPlayers}
        dataKey="assists"
        color="#2e7d32"
      />
    </div>
  )
}

export default StatisticsPage