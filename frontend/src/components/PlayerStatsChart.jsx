import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts'
import './PlayerStatsChart.css'

function PlayerStatsChart({ players, title, dataKey, color, dataKeys }) {
  const data = players
    .map((player) => {
      const playerData = {
        name: `${player.first_name} ${player.last_name}`,
      }

      if (dataKeys) {
        dataKeys.forEach((item) => {
          playerData[item.key] = Number(player[item.key] || 0)
        })

        playerData.total = dataKeys.reduce(
          (total, item) => total + Number(player[item.key] || 0),
          0
        )
      } else {
        playerData[dataKey] = Number(player[dataKey] || 0)
      }

      return playerData
    })
    .sort((a, b) => {
      if (dataKeys) {
        return b.total - a.total
      }

      return b[dataKey] - a[dataKey]
    })
    .slice(0, 10)

  const topPlayer = data[0]

  return (
    <div className="player-stats-chart">
      <h2>{title}</h2>

      {topPlayer && (
        <p className="player-stats-highlight">
          🥇 Líder: {topPlayer.name}
        </p>
      )}

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          {dataKeys && <Legend />}

          {dataKeys ? (
            dataKeys.map((item) => (
              <Bar
                key={item.key}
                dataKey={item.key}
                name={item.name}
                fill={item.color}
              />
            ))
          ) : (
            <Bar dataKey={dataKey} fill={color} />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PlayerStatsChart