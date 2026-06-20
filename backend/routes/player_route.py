from flask import Blueprint, jsonify, request
from models.player import Player
from models.db import db
from datetime import datetime
from models.national_team import NationalTeam
from sqlalchemy import or_
player_bp = Blueprint('player_bp', __name__)


# Ruta para traer a todos los jugadores

@player_bp.route('/api/players', methods=['GET'])
def get_players():
    players = Player.query.all()
    return jsonify(
        [player.to_dict() for player in players]
    ),200

# Ruta para crear un nuevo jugador

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

# Ruta para eliminar a un jugador, indicandolo a traves del Id

@player_bp.route('/api/players/<int:id>', methods=['DELETE'])
def delete_player(id):
    player = Player.query.get(id)
    
    if not player:
        return jsonify({
            "Message": "Player not found"
        }), 404
    
    db.session.delete(player)
    db.session.commit()
    
    return jsonify({
        "Message": "Player deleted successfully"
    }), 200

# Ruta para editar los atributos de un jugador, indicandolo a traves del Id
    
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

# Ruta de busqueda + filtracion

@player_bp.route('/api/players/search', methods=['GET'])
def search_players():
    
    name = request.args.get('name')
    position = request.args.get('position')
    country = request.args.get('country')
    captain = request.args.get ('captain')
    min_height = request.args.get('min_height')
    max_height = request.args.get('max_height')
    
    players_query = Player.query
    
    #Filtros generales
    
    if name:
        players_query = players_query.filter(
            Player.first_name.ilike(f"%{name}%")
        )
    
    if position:
        players_query = players_query.filter(
            Player.position.ilike(f"%{position}%")
        )
    
    if country:
        players_query = players_query.join(
            NationalTeam
        ).filter(
            NationalTeam.country.ilike(f"%{country}%")
        )
    
    #Filtros avanzados
    
    if captain:
        if captain.lower() == 'true':
            players_query = players_query.filter(
                Player.is_captain == True
            )
            
        elif captain.lower() == 'false':
            players_query = players_query.filter(
                Player.is_captain == False
            )
    
    if min_height:
        players_query = players_query.filter(
            Player.height >= float(min_height)
        )
    
    if max_height:
        players_query = players_query.filter(
            Player.height <= float(max_height)
        )

    players = players_query.all()
    
    return jsonify(
        [player.to_dict() for player in players]
    ), 200