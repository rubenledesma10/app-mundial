from flask import Blueprint, jsonify, request
from models.player import Player
from models.db import db
from datetime import datetime
from models.national_team import NationalTeam
from sqlalchemy import or_
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
            "Messagge": "Player not found"
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

# Ruta de busqueda + filtracion

@player_bp.route('/api/players/search', methods=['GET'])
def search_players():
    
    name = request.args.get('name')
    position = request.args.get('position')
    country = request.args.get('country')
    captain = request.args.get ('captain')
    min_height = request.args.get('min_height')
    max_height = request.args.get('max_height')
    min_goals = request.args.get('min_goals')
    max_goals = request.args.get('max_goals')
    min_assists = request.args.get('min_assists')
    max_assists = request.args.get('max_assists')
    min_cards = request.args.get('min_cards')
    max_cards = request.args.get('max_cards')
    q = request.args.get('q')
    
    #Filtramos solamente por jugadores que esten activos, asi evitamos la carga de datos no relevantes.
    players_query = Player.query.filter_by(
        is_active=True
    )
    
    #Filtro de busqueda general
    if q:
        players_query = players_query.join(
            NationalTeam
    ).filter(

        or_(
            Player.first_name.ilike(f"%{q}%"),
            Player.last_name.ilike(f"%{q}%"),
            Player.position.ilike(f"%{q}%"),
            Player.current_club.ilike(f"%{q}%"),
            NationalTeam.country.ilike(f"%{q}%"),
            NationalTeam.group.ilike(f"%{q}%"),
            NationalTeam.technical_director.ilike(f"%{q}%")
        )

    )
    
    #Filtros generales (nombre,posicion,pais)
    
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
    
    #Filtros avanzados, para una busqueda sumamente especifica
    
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
    if min_goals:
        players_query = players_query.filter(
            Player.goals >= int(min_goals)
    )
    if max_goals:
        players_query = players_query.filter(
            Player.goals <= int(max_goals)
    )

    if min_assists:
        players_query = players_query.filter(
            Player.assists >= int(min_assists)
    )
    
    if max_assists:
        players_query = players_query.filter(
            Player.assists <= int(max_assists)
    )
    
    if min_cards:
        players_query = players_query.filter(
            (Player.yellow_card + Player.red_card) >= int(min_cards)
    )
        
    if max_cards:
        players_query = players_query.filter(
            (Player.yellow_card + Player.red_card) <= int(max_cards)
    )
    
    
    
    players = players_query.all()
    
    return jsonify(
        [player.to_dict() for player in players]
    ), 200