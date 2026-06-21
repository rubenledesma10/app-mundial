from functools import wraps
from flask import jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt

def admin_required():
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            try:

                verify_jwt_in_request() #verificamos que el JWT venga con el berear token
                
                claims = get_jwt() #exctraemos los claims del tkoen
                
                if claims.get("rol") != "admin": #si el rol no es admin, le devolvemos un error de permisos 
                    return jsonify({"error": "Acceso denegado. Se requieren permisos de administrador."}), 403
                
                return fn(*args, **kwargs) #si es admin, lo deja pasar al endpoint
                
            except Exception as e:
                return jsonify({"error": "Token inválido o ausente", "details": str(e)}), 401
        return decorator
    return wrapper