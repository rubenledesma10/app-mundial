import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'
import './PlayerStatsChart.css'

function PlayerStatsChart({ players, title, dataKey, color }) {
  const data = players.map((player) => ({
    name: `${player.first_name} ${player.last_name}`,
    [dataKey]: Number(player[dataKey] || 0),
  }))

  return (
    <div className="player-stats-chart">
      <h2>{title}</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey={dataKey} fill={color} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PlayerStatsChart