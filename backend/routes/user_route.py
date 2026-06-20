from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import date
from models.db import db
from models.user import User
from utils.decorators import admin_required

users_bp = Blueprint('users', __name__, url_prefix='/api/users')

@users_bp.route('/', methods=['POST'])
@admin_required()
def admin_create_user():
    try:
        data = request.get_json()
        if not data or 'email' not in data or 'password' not in data or 'dni' not in data:
            return jsonify({'message': 'Missing required fields'}), 400
        email_exists = data.get('email').lower().strip()

        dni_model = str(data.get('dni')).strip()
        dni_clean = dni_model.replace(" ", "").replace("-", "").replace(".", "")

        if not dni_clean.isdigit():
            return jsonify({'message': 'DNI must contain only numbers'}), 400

        user_exists = User.query.filter_by(email=email_exists).first()
        if user_exists:
            return jsonify({'message': 'Email already exists'}), 400
        
        user_dni_exists = User.query.filter_by(dni=dni_clean).first()
        if user_dni_exists:
            return jsonify({'message': 'DNI already exists'}), 400

        rol_required = data.get('rol', 'user').lower().strip()

        if rol_required not in ['user', 'admin']: #validacion para mayor segurida
            return jsonify({'message': 'Invalid role. Must be "user" or "admin"'}), 400

        birthdate_format=None
        if data.get('birthdate'):
            birthdate_format = date.fromisoformat(data.get('birthdate'))
        new_user = User(
            first_name=data.get('first_name'),
            last_name=data.get('last_name'),
            birthdate=birthdate_format,
            photo=data.get('photo'),
            email=email_exists,
            dni=dni_clean,
            rol=rol_required
        )

        new_user.set_password(data.get('password'))
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'User created successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Error creating user', 'error': str(e)}), 500
    
@users_bp.route('/', methods=['GET'])
@admin_required()
def get_all_users():
    try:
        users = User.query.all()
        users_list = []
        for user in users:
            users_list.append({
                'id': user.id,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'birthdate': user.birthdate.isoformat() if user.birthdate else None,
                'photo': user.photo,
                'email': user.email,
                'dni': user.dni,
                'rol': user.rol,
                'is_active': user.is_active
            })
        return jsonify({'users': users_list}), 200
    except Exception as e:
        return jsonify({'message': 'Error fetching users', 'error': str(e)}), 500
    
@users_bp.route('/<int:user_id>', methods=['PUT'])
@admin_required()
def update_user(user_id):
    try:
        user_to_update = User.query.get(user_id)
        if not user_to_update:
            return jsonify({'message': 'User not found'}), 404
        
        data = request.get_json()
        if not data:
            return jsonify({'message': 'No data provided for update'}), 400
        
        if 'dni' in data:
            dni_model = str(data.get('dni')).strip()
            dni_clean = dni_model.replace(" ", "").replace("-", "").replace(".", "")
            if not dni_clean.isdigit():
                return jsonify({'message': 'DNI must contain only numbers'}), 400
            user_dni_exists = User.query.filter_by(dni=dni_clean).first()
            if user_dni_exists and user_dni_exists.id != user_id:
                return jsonify({'message': 'DNI already exists'}), 400
            user_to_update.dni = dni_clean
        
        if 'email' in data:
            email_exists = data.get('email').lower().strip()
            user_email_exists = User.query.filter_by(email=email_exists).first()
            if user_email_exists and user_email_exists.id != user_id:
                return jsonify({'message': 'Email already exists'}), 400
            user_to_update.email = email_exists

        if 'is_active' in data:
            if not isinstance(data.get('is_active'), bool): #para asegurarnos que el valor que vena sea booleano
                return jsonify({'message': 'is_active must be a boolean value'}), 400
            if data.get('is_active') is False and str(user_to_update.id) == get_jwt_identity():
                return jsonify({'message': 'You cannot deactivate your own account'}), 400
            user_to_update.is_active = data.get('is_active')

        if 'first_name' in data:
            user_to_update.first_name = data.get('first_name')
        if 'last_name' in data:
            user_to_update.last_name = data.get('last_name')
        if 'birthdate' in data:
            user_to_update.birthdate = date.fromisoformat(data.get('birthdate')) if data.get('birthdate') else None
        if 'photo' in data:
            user_to_update.photo = data.get('photo')
        if 'rol' in data:
            rol_required = data.get('rol', 'user').lower().strip()
            if rol_required not in ['user', 'admin']:
                return jsonify({'message': 'Invalid role. Must be "user" or "admin"'}), 400
            user_to_update.rol = rol_required
        if 'password' in data:
            user_to_update.set_password(data.get('password'))
        
        db.session.commit()
        return jsonify({'message': 'User updated successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Error updating user', 'error': str(e)}), 500
    
@users_bp.route('/<int:user_id>', methods=['DELETE'])
@admin_required()
def delete_user(user_id):
    try:
        user_to_delete = User.query.get(user_id)
        if not user_to_delete:
            return jsonify({'message': 'User not found'}), 404
        if str(user_to_delete.id) == get_jwt_identity():
            return jsonify({'message': 'You cannot deactivate your own account'}), 400
        db.session.delete(user_to_delete)
        db.session.commit()
        return jsonify({'message': 'User deactivated successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Error deactivating user', 'error': str(e)}), 500
    
@users_bp.route('/search', methods=['GET'])
@admin_required()
def search_users():
    try:
        query = request.args.get('q', '').strip() #capturamos el parametro q de la url
        if not query:
            return jsonify({'message': 'No search query provided'}), 400
        
        search_pattern = f"%{query}%" #busca coincidencia en nomre, apellido, dni, etc usando like. el % alreddor para que busque "contieen esta palabra"
        filtered_users=User.query.filter(
            (User.first_name.like(search_pattern)) |
            (User.last_name.like(search_pattern)) |
            (User.dni.like(search_pattern)) |
            (User.email.like(search_pattern))
        ).all()

        users_list = []
        for user in filtered_users:
            users_list.append({
                'id': user.id,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'birthdate': user.birthdate.isoformat() if user.birthdate else None,
                'photo': user.photo,
                'email': user.email,
                'dni': user.dni,
                'rol': user.rol,
                'is_active': user.is_active
            })
        return jsonify({'users': users_list}), 200
    except Exception as e:
        return jsonify({'message': 'Error searching users', 'error': str(e)}), 500
    
    
