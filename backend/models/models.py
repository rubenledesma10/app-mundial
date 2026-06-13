from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Person (db.Model): #clase abstracta
    __abstract__ = True
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(120), nullable=False)
    birthdate = db.Column(db.Date, nullable=False)
    photo=db.Column(db.String(250), nullable=True)

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"
    
class NationalTeam(db.Model): #entidad para la relacion 
    __tablename__ = 'national_teams'

    id_national_teams = db.Column(db.Integer, primary_key=True)
    country = db.Column(db.String(100), nullable=False)
    technical_director = db.Column(db.String(100), nullable=False)
    group = db.Column(db.String(50), nullable=False)

    players = db.relationship('Player', backref='national_team', lazy=True) #relacion una seleccion tiene muchos jugadores

class Player(Person): #hereda de persona
    __tablename__ = 'players'

    id_national_teams = db.Column(db.Integer, db.ForeignKey('national_teams.id_national_teams'), nullable=False)
    position = db.Column(db.String(50), nullable=False)
    tshirt_number = db.Column(db.Integer, nullable=False)
    current_club = db.Column(db.String(100), nullable=False)
    goals = db.Column(db.Integer, nullable=False, default=0)
    assists = db.Column(db.Integer, nullable=False, default=0)
    yellow_card = db.Column(db.Integer, nullable=False, default=0)
    red_card = db.Column(db.Integer, nullable=False, default=0)
    is_captain = db.Column(db.Boolean, nullable=False)
    weight = db.Column(db.Float, nullable=False)
    height = db.Column(db.Float, nullable=False)

    def update_stats(self, new_goals, new_assists, new_yellow_card, new_red_card):
        if new_goals>=0:
            self.goals += new_goals
        if new_assists>=0:
            self.assists += new_assists
        if new_yellow_card>=0:
            self.yellow_card += new_yellow_card
        if new_red_card>=0:
            self.red_card += new_red_card

class User(Person):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    rol = db.Column(db.String(50), nullable=False, default='user')

    def verify_password(self, password_input): #aca va la logica para verificar el hash de la contraseña
        pass






