from flask_sqlalchemy import SQLAlchemy
from models.db import db

class NationalTeam(db.Model): #entidad para la relacion 
    __tablename__ = 'national_teams'

    id_national_teams = db.Column(db.Integer, primary_key=True)
    country = db.Column(db.String(100), nullable=False)
    technical_director = db.Column(db.String(100), nullable=False)
    group = db.Column(db.String(50), nullable=False)

    players = db.relationship('Player', backref='national_team', lazy=True) #relacion una seleccion tiene muchos jugadores