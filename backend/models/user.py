from flask_sqlalchemy import SQLAlchemy
from models.person import Person
from models.db import db

class User(Person):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    rol = db.Column(db.String(50), nullable=False, default='user')

    def verify_password(self, password_input): #aca va la logica para verificar el hash de la contraseña
        pass