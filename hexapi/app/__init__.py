# app/__init__.py
from flask import Flask
from app.routes import auth

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')
    
    app.register_blueprint(auth, url_prefix='/api')

    return app
