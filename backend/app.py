from flask import Flask
from config.config import Config
from models.models import db
from flask_jwt_extended import JWTManager
from models.models import Person, NationalTeam, Player, User
import os

app= Flask(__name__)
app.config.from_object(Config)

jwt=JWTManager(app)
db.init_app(app)

#aca van los bluesprints

with app.app_context():
    from models.models import Person, NationalTeam, Player, User
    db.create_all()

if __name__ == '__main__':
    print("Running World Cup players application...")
    app.run(debug=True)