from flask import Flask
from flask_cors import CORS
from config.config import Config
from flask_jwt_extended import JWTManager
from models.db import db
from models.person import Person
from models.national_team import NationalTeam
from models.player import Player
from models.user import User
from routes.player_route import player_bp
from routes.auth_route import auth_bp

import os

app= Flask(__name__)
app.config.from_object(Config)

CORS(app)  # CORS para que react pueda conectarse
jwt = JWTManager(app)
db.init_app(app)

#aca van los bluesprints
app.register_blueprint(player_bp)
app.register_blueprint(auth_bp)


with app.app_context():
    from models.national_team import NationalTeam
    from models.person import Person
    from models.player import Player
    from models.user import User
    db.create_all()

if __name__ == '__main__':
    print("Running World Cup players application...")
    app.run(debug=True, port=5000)