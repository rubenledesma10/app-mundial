from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import date
from models.db import db
from models.user import User
from utils.decorators import admin_required
import os
from werkzeug.utils import secure_filename

users_bp = Blueprint('users', __name__, url_prefix='/api/users')

UPLOAD_FOLDER = 'static/uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


@users_bp.route('/', methods=['POST'])
@admin_required()
def admin_create_user():
    try:

        if not request.form:
            return jsonify({'message': 'Missing required fields'}), 400

        email_required = request.form.get('email')
        password_required = request.form.get('password')
        dni_required = request.form.get('dni')

        if not email_required or not password_required or not dni_required:
            return jsonify({'message': 'Missing required fields: email, password and DNI'}), 400

        email_exists = email_required.lower().strip()
        dni_model = str(dni_required).strip()
        dni_clean = dni_model.replace(" ", "").replace("-", "").replace(".", "")

        if not dni_clean.isdigit():
            return jsonify({'message': 'DNI must contain only numbers'}), 400

        user_exists = User.query.filter_by(email=email_exists).first()
        if user_exists:
            return jsonify({'message': 'Email already exists'}), 400
        
        user_dni_exists = User.query.filter_by(dni=dni_clean).first()
        if user_dni_exists:
            return jsonify({'message': 'DNI already exists'}), 400

        rol_required = request.form.get('rol', 'user').lower().strip()
        if rol_required not in ['user', 'admin']:
            return jsonify({'message': 'Invalid role. Must be "user" or "admin"'}), 400

        birthdate_format = None
        if request.form.get('birthdate'):
            birthdate_format = date.fromisoformat(request.form.get('birthdate'))

        new_user = User(
            first_name=request.form.get('first_name'),
            last_name=request.form.get('last_name'),
            birthdate=birthdate_format,
            email=email_exists,
            dni=dni_clean,
            rol=rol_required,
            photo=None 
        )
        new_user.set_password(password_required)

        db.session.add(new_user)
        db.session.flush() 

        if 'photo' in request.files:
            file = request.files['photo']
            if file and file.filename != '':
                filename = secure_filename(f"user_{new_user.id}_{file.filename}")
                filepath = os.path.join(UPLOAD_FOLDER, filename)
                file.save(filepath)
                new_user.photo = f"static/uploads/{filename}"

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

        if not request.form and not request.files:
            return jsonify({'message': 'No data provided for update'}), 400
        
        if 'photo' in request.files:
            file = request.files['photo']
            if file and file.filename != '':
                filename = secure_filename(f"user_{user_id}_{file.filename}")
                filepath = os.path.join(UPLOAD_FOLDER, filename)
                file.save(filepath)
                user_to_update.photo = f"static/uploads/{filename}"

        if 'dni' in request.form:
            dni_model = str(request.form.get('dni')).strip()
            dni_clean = dni_model.replace(" ", "").replace("-", "").replace(".", "")
            if not dni_clean.isdigit():
                return jsonify({'message': 'DNI must contain only numbers'}), 400
            user_dni_exists = User.query.filter_by(dni=dni_clean).first()
            if user_dni_exists and user_dni_exists.id != user_id:
                return jsonify({'message': 'DNI already exists'}), 400
            user_to_update.dni = dni_clean
        
        if 'email' in request.form:
            email_exists = request.form.get('email').lower().strip()
            user_email_exists = User.query.filter_by(email=email_exists).first()
            if user_email_exists and user_email_exists.id != user_id:
                return jsonify({'message': 'Email already exists'}), 400
            user_to_update.email = email_exists

        if 'is_active' in request.form:
            user_to_update.is_active = request.form.get('is_active') == 'true'

        if 'first_name' in request.form:
            user_to_update.first_name = request.form.get('first_name')
            
        if 'last_name' in request.form:
            user_to_update.last_name = request.form.get('last_name')
            
        if 'birthdate' in request.form:
            user_to_update.birthdate = date.fromisoformat(request.form.get('birthdate')) if request.form.get('birthdate') else None
            
        if 'rol' in request.form:
            rol_required = request.form.get('rol', 'user').lower().strip()
            if rol_required not in ['user', 'admin']:
                return jsonify({'message': 'Invalid role. Must be "user" or "admin"'}), 400
            user_to_update.rol = rol_required

        if 'password' in request.form and request.form.get('password'):
            user_to_update.set_password(request.form.get('password'))
        
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
            filtered_users = User.query.all()
        else:
            search_pattern = f"%{query}%"
            filtered_users = User.query.filter(
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
    
@users_bp.route('/<int:user_id>/toggle', methods=['PUT'])
@admin_required()
def toggle_user_status(user_id):
    try:
        user = User.query.get(user_id)
        if not user:
            return jsonify({'message': 'User not found'}), 404

        if str(user.id) == get_jwt_identity():
            return jsonify({'message': 'You cannot deactivate your own account'}), 400

        user.is_active = not user.is_active
        
        db.session.commit()

        return jsonify({
            'message': 'Status updated successfully',
            'is_active': user.is_active
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Error updating status', 'error': str(e)}), 500
    
@users_bp.route('/<int:user_id>', methods=['GET'])
@admin_required()
def get_user_by_id(user_id):
    try:
  
        user = User.query.get(user_id)
        if not user:
            return jsonify({'message': 'User not found'}), 404

        return jsonify({
            'user': {
                'id': user.id,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'birthdate': user.birthdate.isoformat() if user.birthdate else None,
                'photo': user.photo,
                'email': user.email,
                'dni': user.dni,
                'rol': user.rol,
                'is_active': user.is_active
            }
        }), 200

    except Exception as e:
        return jsonify({'message': 'Error fetching user', 'error': str(e)}), 500
