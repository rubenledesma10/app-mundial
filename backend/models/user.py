from flask_sqlalchemy import SQLAlchemy
from models.person import Person
from models.db import db
from werkzeug.security import generate_password_hash, check_password_hash

class User(Person):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    rol = db.Column(db.String(50), nullable=False, default='user')
    dni = db.Column(db.String(20), unique=True, nullable=False)
    
    def set_password(self, password_input): #aca va la logica para hashear la contraseña
        self.password = generate_password_hash(password_input)
    def check_password(self, password_input): #aca va la logica para verificar el hash de la contraseña
        return check_password_hash(self.password, password_input)