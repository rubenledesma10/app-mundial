import PlayerStatsChart from '../components/PlayerStatsChart'
import './StatisticsPage.css'

const mockPlayers = [
  {
    id: 1,
    first_name: 'Lionel',
    last_name: 'Messi',
    goals: 15,
    assists: 8,
    yellow_card: 1,
    red_card: 0,
  },
  {
    id: 2,
    first_name: 'Kylian',
    last_name: 'Mbappé',
    goals: 12,
    assists: 4,
    yellow_card: 3,
    red_card: 1,
  },
  {
    id: 3,
    first_name: 'Julián',
    last_name: 'Álvarez',
    goals: 8,
    assists: 6,
    yellow_card: 2,
    red_card: 0,
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

      <PlayerStatsChart
        title="Tarjetas por jugador"
        players={mockPlayers}
        dataKeys={[
          {
            key: 'yellow_card',
            name: 'Amarillas',
            color: '#FFD700',
          },
          {
            key: 'red_card',
            name: 'Rojas',
            color: '#D32F2F',
          },
        ]}
      />
    </div>
  )
}

export default StatisticsPage