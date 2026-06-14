from flask_sqlalchemy import SQLAlchemy
from models.db import db


class Person (db.Model): #clase abstracta
    __abstract__ = True
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(120), nullable=False)
    birthdate = db.Column(db.Date, nullable=False)
    photo=db.Column(db.String(250), nullable=True)

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"