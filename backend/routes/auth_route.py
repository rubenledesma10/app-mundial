from sqlalchemy.exc import IntegrityError
from flask import Blueprint, request, jsonify
from models.db import db
from models.user import User
from flask_jwt_extended import create_access_token
from datetime import date
import os

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@auth_bp.route('/register', methods=['POST'])
def register():
    try:

        if not request.form:
            return jsonify({'message': 'Missing required fields'}), 400
            
        email_required = request.form.get('email')
        password_required = request.form.get('password')
        dni_required = request.form.get('dni')
        
        if not email_required or not password_required or not dni_required:
            return jsonify({'message': 'Email, password, and DNI are required'}), 400
        
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

        birthdate_format = None
        if request.form.get('birthdate'):
            birthdate_format = date.fromisoformat(request.form.get('birthdate'))
 
        new_user = User(
            first_name=request.form.get('first_name'),
            last_name=request.form.get('last_name'),
            birthdate=birthdate_format,
            email=email_exists,
            dni=dni_clean,
            rol='user', 
            photo=None
        )

        new_user.set_password(password_required)

        db.session.add(new_user)
        db.session.flush() 

        UPLOAD_FOLDER = 'static/uploads'
        if 'photo' in request.files:
            file = request.files['photo']
            if file and file.filename != '':
                from werkzeug.utils import secure_filename
                filename = secure_filename(f"user_{new_user.id}_{file.filename}")
                filepath = os.path.join(UPLOAD_FOLDER, filename)

                file.save(filepath)

                new_user.photo = f"static/uploads/{filename}"

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