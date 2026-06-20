from sqlalchemy.exc import IntegrityError
from flask import Blueprint, request, jsonify
from models.db import db
from models.user import User
from flask_jwt_extended import create_access_token
from datetime import date

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data=request.get_json()
        
        if not data or 'email' not in data or 'password' not in data or 'dni' not in data:
            return jsonify({'message': 'Email, password, and DNI are required'}), 400
        
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
            rol=data.get('rol', 'user').lower().strip()
        )

        new_user.set_password(data.get('password'))
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'User registered successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Error registering user', 'error': str(e)}), 500
        
@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        if not data or 'email' not in data or 'password' not in data:
            return jsonify({'message': 'Email and password are required'}), 400
        
        email_clean=data.get('email').lower().strip()
        user = User.query.filter_by(email=email_clean).first()

        if not user or not user.check_password(data.get('password')):
            return jsonify({'message': 'Invalid email or password'}), 401
        
        if not user.is_active:
            return jsonify({'message': 'User account is inactive'}), 403

        additional_claims = {
            'rol': user.rol,
            'dni': user.dni,
            'full_name': user.get_full_name()
        }

        access_token = create_access_token(identity=str(user.id), additional_claims=additional_claims)

        return jsonify({
            "message": 'Login successful',
            "token": access_token,
            "user": {
                "id": user.id,
                "email": user.email,
                "rol": user.rol,
                "dni": user.dni,
                "full_name": user.get_full_name()
            }
        }), 200
    except Exception as e:
        return jsonify({'message': 'Error during login', 'error': str(e)}), 500