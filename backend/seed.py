from datetime import date
from app import app
from models.db import db
from models.national_team import NationalTeam
from models.player import Player
from models.user import User
import json


def seed_database():
    print("⏳ Borrando tablas y recreando base de datos desde cero...")

    db.drop_all()
    db.create_all()

    print("🌱 Iniciando la carga de datos (Seeding)...")

    print("👥 Creando usuarios del sistema...")

    admin_ruben = User(
        first_name="Ruben",
        last_name="Ledesma",
        birthdate=date(1996, 11, 29),
        email="rubenadmin@admin.com",
        dni="40070521",
        rol="admin",
        is_active=True
    )
    admin_ruben.set_password("messi2022")

    user_santi = User(
        first_name="Santiago",
        last_name="Romano",
        birthdate=date(2001, 8, 20),
        email="santi@gmail.com",
        dni="40999888",
        rol="user",
        is_active=True
    )
    user_santi.set_password("UserPass456")

    db.session.add(admin_ruben)
    db.session.add(user_santi)
    db.session.commit()

    print("✅ Usuarios creados con éxito.")

    national_teams = [
        "México", "Sudáfrica", "Corea del Sur", "Chequia", "Canadá",
        "Bosnia y Herzegovina", "Qatar", "Suiza", "Brasil", "Marruecos",
        "Haití", "Escocia", "Estados Unidos", "Paraguay", "Australia",
        "Turquía", "Alemania", "Curazao", "Costa de Marfil", "Ecuador",
        "Países Bajos", "Japón", "Suecia", "Túnez", "Bélgica",
        "Egipto", "Irán", "Nueva Zelanda", "España", "Cabo Verde",
        "Arabia Saudita", "Uruguay", "Francia", "Senegal", "Irak",
        "Noruega", "Argentina", "Argelia", "Austria", "Jordania",
        "Portugal", "República Democrática del Congo", "Uzbekistán",
        "Colombia", "Inglaterra", "Croacia", "Ghana", "Panamá"
    ]

    for country in national_teams:
        db.session.add(
            NationalTeam(
                country=country,
                technical_director="Sin definir",
                group="A"
            )
        )

    db.session.commit()

    teams = {}

    for team in NationalTeam.query.all():
        teams[team.country] = team.id_national_teams

    print("✅ 48 selecciones creadas con éxito.")

    # 4. Crear los Jugadores desde players.json
    with open("data/players.json", "r", encoding="utf-8") as file:
        contenido = file.read()

    print("PRIMEROS 200 CARACTERES:")
    print(repr(contenido[:200]))

    players_json = json.loads(contenido)

    jugadores = []

    for index, player_data in enumerate(players_json, start=1):
        team_name = player_data["national_team"]
        team_id = teams.get(team_name)

        if not team_id:
            print(f"⚠️ Selección no encontrada: {team_name}")
            continue

        jugador = Player(
            first_name=player_data["first_name"],
            last_name=player_data["last_name"],
            birthdate=date.fromisoformat(player_data["birthdate"]),
            photo=player_data["photo"],
            id_national_teams=team_id,
            position=player_data["position"],
            tshirt_number=index,
            current_club=player_data["current_club"],
            goals=player_data["goals"],
            assists=player_data["assists"],
            yellow_card=player_data["yellow_card"],
            red_card=player_data["red_card"],
            is_captain=index % 25 == 0,
            weight=player_data["weight"],
            height=player_data["height"]
        )

        jugadores.append(jugador)

    db.session.add_all(jugadores)
    db.session.commit()

    print(f"✅ {len(jugadores)} jugadores insertados con éxito.")
    print("🏆 ¡Base de datos poblada completamente!")


if __name__ == '__main__':
    with app.app_context():
        seed_database()