from flask import Flask
from flask_cors import CORS
from routes import investment_routes

def create_app():
    app = Flask(__name__)
    CORS(app)  # Enable CORS for all domains on all routes

    # Import and register blueprints/routes
    # from routes import investment_routes
    app.register_blueprint(investment_routes.bp)

    return app