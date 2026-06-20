from flask import Blueprint, jsonify, request
from models.player import Player
from models.db import db
from datetime import datetime

player_bp = Blueprint('player_bp', __name__)

#Traemos todos los jugadores

@player_bp.route('/api/players', methods=['GET'])
def get_players():
    players = Player.query.filter_by(is_active=True).all()
    
    return jsonify(
        [player.to_dict() for player in players]
    ),200

#Traemos jugadores solo por ID

@player_bp.route("/api/players/<int:id>", methods=['GET'])
def get_player_by_id(id):

    player = Player.query.filter_by(
        id=id,
        is_active=True
    ).first()
    
    if not player:
        return jsonify({
            "Messagge: Player not found"
        }), 404
    
    return jsonify(
        player.to_dict()
    ),200
# Agregamos un nuevo jugador
    
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

#Eliminamos un jugador por su ID

@player_bp.route('/api/players/<int:id>', methods=['DELETE'])
def delete_player(id):
    player = Player.query.get(id)
    
    if not player:
        return jsonify({
            "Message": "Player not found"
        }), 404
    
    player.is_active = False
    db.session.commit()
    
    return jsonify({
        "Message": "Player deactivated successfully"
    }), 200

#Editamos un jugador por su ID

@player_bp.route('/api/players/<int:id>', methods=['PUT'])
def update_player(id):
    
    player = Player.query.get(id)
    
    if not player:
        return jsonify({
            "Message": "Player not found"
        }), 404
    
    data = request.get_json()
    
    player.first_name = data['first_name']
    player.last_name = data['last_name']
    player.birthdate = datetime.strptime(data['birthdate'],'%Y-%m-%d').date()
    player.photo = data['photo']
    player.id_national_teams = data['id_national_teams']
    player.position = data['position']
    player.tshirt_number = data['tshirt_number']
    player.current_club = data['current_club']
    player.goals = data['goals']
    player.assists = data['assists']
    player.yellow_card = data['yellow_card']
    player.red_card = data['red_card']
    player.is_captain = data['is_captain']
    player.weight = data['weight']
    player.height = data['height']
    
    db.session.commit()
    
    return jsonify(player.to_dict()), 200