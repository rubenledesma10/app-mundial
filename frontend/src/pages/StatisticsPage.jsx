import { useEffect, useState } from 'react'
import { getPlayers } from '../services/playerService'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'
import './StatisticsPage.css'

function StatisticsPage() {
  const [players, setPlayers] = useState([])

  useEffect(() => {
    const loadPlayers = async () => {
      const data = await getPlayers()
      setPlayers(data)
    }

    loadPlayers()
  }, [])

  const goalsData = [...players]
    .sort((a, b) => b.goals - a.goals)
    .slice(0, 10)
    .map((player) => ({
      nombre: `${player.first_name} ${player.last_name}`,
      goles: player.goals,
    }))

  const assistsData = [...players]
    .sort((a, b) => b.assists - a.assists)
    .slice(0, 10)
    .map((player) => ({
      nombre: `${player.first_name} ${player.last_name}`,
      asistencias: player.assists,
    }))

  const yellowData = [...players]
    .sort((a, b) => b.yellow_card - a.yellow_card)
    .slice(0, 10)
    .map((player) => ({
      nombre: `${player.first_name} ${player.last_name}`,
      amarillas: player.yellow_card,
    }))

  const redData = [...players]
    .sort((a, b) => b.red_card - a.red_card)
    .slice(0, 10)
    .map((player) => ({
      nombre: `${player.first_name} ${player.last_name}`,
      rojas: player.red_card,
    }))

  return (
  <div className="statistics-page">
          <h1 className="statistics-title">
            📊 Estadísticas del Mundial
          </h1>

          <div className="statistics-card">
            <h2>⚽ Top 10 Goleadores</h2>

            <p className="statistics-leader">
              🥇 Líder: {goalsData[0]?.nombre} ({goalsData[0]?.goles} goles)
            </p>

            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={goalsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nombre" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="goles" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="statistics-card">
            <h2>🎯 Top 10 Asistencias</h2>

            <p className="statistics-leader">
              🥇 Líder: {assistsData[0]?.nombre} ({assistsData[0]?.asistencias} asistencias)
            </p>

            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={assistsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nombre" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="asistencias" fill="#2e7d32" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="statistics-card">
            <h2>🟨 Top 10 Tarjetas Amarillas</h2>

            <p className="statistics-leader">
              🥇 Líder: {yellowData[0]?.nombre} ({yellowData[0]?.amarillas} amarillas)
            </p>

            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={yellowData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nombre" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amarillas" fill="#fbc02d" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="statistics-card">
            <h2>🟥 Top 10 Tarjetas Rojas</h2>

            <p className="statistics-leader">
              🥇 Líder: {redData[0]?.nombre} ({redData[0]?.rojas} rojas)
            </p>

            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={redData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nombre" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="rojas" fill="#d32f2f" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )
   
    }

export default StatisticsPage