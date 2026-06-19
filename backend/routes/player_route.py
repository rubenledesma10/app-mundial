from flask import Blueprint, jsonify, request
from models.player import Player
from models.db import db

player_bp = Blueprint('player_bp', __name__)

@player_bp.route('/api/players', methods=['GET'])
def get_players():
    players = Player.query.all
    return jsonify(
        [player.to_dict() for player in players]
    ),200