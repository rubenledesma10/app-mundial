from datetime import date
from app import app
from models.db import db
from models.national_team import NationalTeam
from models.person import Person
from models.player import Player
from models.user import User

def seed_database():
    print("⏳ Iniciando la carga de datos (Seeding)...")
    
    # 1. Limpiar datos existentes para no duplicar en cada ejecución
    # El orden importa por las claves foráneas (primero hijos, luego padres)
    Player.query.delete()
    NationalTeam.query.delete()
    db.session.commit()

    # 2. Crear las Selecciones (National Teams)
    argentina = NationalTeam(
        country="Argentina",
        technical_director="Lionel Scaloni",
        group="H"
    )
    
    portugal = NationalTeam(
        country="Portugal",
        technical_director="Roberto Martínez",
        group="K"
    )

    # Guardamos las selecciones en la sesión para que generen sus IDs
    db.session.add(argentina)
    db.session.add(portugal)
    db.session.commit() # Commit aquí para que MySQL asigne los IDs reales
    print("✅ Selecciones creadas con éxito.")

    # 3. Crear los Jugadores (Players) vinculados a sus selecciones
    jugadores = [
        # Jugadores de Argentina
        Player(
            first_name="Lionel",
            last_name="Messi",
            birthdate=date(1987, 6, 24),
            photo="https://images.tntsports.com.ar/2023/10/30/1698710323.jpg", # URL de ejemplo de internet
            id_national_teams=argentina.id_national_teams,
            position="Delantero",
            tshirt_number=10,
            current_club="Inter Miami CF",
            goals=8,
            assists=7,
            yellow_card=1,
            red_card=0,
            is_captain=True,
            weight=72.0,
            height=1.70
        ),
        Player(
            first_name="Emiliano",
            last_name="Martínez",
            birthdate=date(1992, 9, 2),
            photo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6A7w3uCWhEa023yC9z_5f8t6g-C5-3qXW3Q&s",
            id_national_teams=argentina.id_national_teams,
            position="Arquero",
            tshirt_number=23,
            current_club="Aston Villa F.C.",
            goals=0,
            assists=0,
            yellow_card=2,
            red_card=0,
            is_captain=False,
            weight=88.0,
            height=1.95
        ),
        # Jugadores de Portugal
        Player(
            first_name="Cristiano",
            last_name="Ronaldo",
            birthdate=date(1985, 2, 5),
            photo="https://images.daznservices.com/di/library/DAZN_News/b0/cb/cristiano-ronaldo-portugal_wphh5343by3m1at74u68h08w5.jpg",
            id_national_teams=portugal.id_national_teams,
            position="Delantero",
            tshirt_number=7,
            current_club="Al-Nassr F.C.",
            goals=5,
            assists=2,
            yellow_card=0,
            red_card=0,
            is_captain=True,
            weight=83.0,
            height=1.87
        ),
        Player(
            first_name="Bruno",
            last_name="Fernandes",
            birthdate=date(1994, 9, 8),
            photo="https://assets.editorial.manutd.com/AssetPicker/images/0/0/18/125/1211756/Bruno_Fernandes_action_vs_Chelsea1685043813876.jpg",
            id_national_teams=portugal.id_national_teams,
            position="Volante",
            tshirt_number=8,
            current_club="Manchester United F.C.",
            goals=3,
            assists=4,
            yellow_card=1,
            red_card=0,
            is_captain=False,
            weight=69.0,
            height=1.79
        )
    ]

    # Guardamos todos los jugadores en la base de datos
    db.session.add_all(jugadores)
    db.session.commit()
    print("✅ Jugadores insertados con éxito.")
    print("🏆 ¡Base de datos del Mundial poblada correctamente!")

if __name__ == '__main__':
    # Necesitamos el contexto de la app para que reconozca los modelos y la conexión
    with app.app_context():
        seed_database()