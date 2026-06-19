from flask import Blueprint, jsonify, request
from models.player import Player
from models.db import db
from datetime import datetime

player_bp = Blueprint('player_bp', __name__)

@player_bp.route('/api/players', methods=['GET'])
def get_players():
    players = Player.query.all()
    return jsonify(
        [player.to_dict() for player in players]
    ),200
    
@player_bp.route('/api/players', methods=['POST'])
def create_player():
    data = request.get_json()
    
    player = Player (
        first_name = data ['first_name'],
        last_name = data ['last_name'],
        birthdate = datetime.strptime(data['birthdate'],'%Y-%m-%d').date(),
        photo = data ['photo'],
        id_national_teams=data['id_national_teams'],
        position=data['position'],
        tshirt_number=data['tshirt_number'],
        current_club=data['current_club'],
        goals=data['goals'],
        assists=data['assists'],
        yellow_card=data['yellow_card'],
        red_card=data['red_card'],
        is_captain=data['is_captain'],
        weight=data['weight'],
        height=data['height']
    )
    
    db.session.add(player)
    db.session.commit()
    return jsonify(player.to_dict()), 201