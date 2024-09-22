from flask import Blueprint, request, jsonify
from app.db import get_db_connection
from app.login import login_user
from app.register import register_user
from app.tasks import get_tasks, get_task, add_task, update_task, delete_task
from app.user import get_user, update_user_profile
from flask_cors import CORS


auth = Blueprint('auth', __name__)
CORS(auth)  

@auth.route('/login', methods=['POST'])
def login():
    data = request.json

    # Validate data
    if not data or 'email' not in data or 'password' not in data:
        return jsonify({"message": "Email and password are required"}), 400

    email = data['email']
    password = data['password']

    # Use the separate login logic
    response, status = login_user(email, password)
    return jsonify(response), status


@auth.route('/register', methods=['POST'])
def register():
    data = request.json

    # Validate input
    if not data or 'name' not in data or 'email' not in data or 'password' not in data:
        return jsonify({"message": "Name, email, and password are required"}), 400

    name = data['name']
    email = data['email']
    password = data['password']

    # Use the registration logic
    response, status = register_user(name, email, password)
    return jsonify(response), status

@auth.route('/user/<int:user_id>', methods=['GET'])
def get_user_profile(user_id):
    user = get_user(user_id)
    if user:
        return jsonify(user)
    return jsonify({"message": "User not found"}), 404

@auth.route('/user/<int:user_id>', methods=['PUT'])
def update_user_profile(user_id):
    data = request.json
    user = update_user(user_id, data)
    if user:
        return jsonify(user)
    return jsonify({"message": "User not found"}), 404

@auth.route('/tasks', methods=['GET'])
def list_tasks():
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 10))
    
    tasks_data = get_tasks(page, per_page)
    return jsonify(tasks_data)

@auth.route('/tasks/<int:task_id>', methods=['GET'])
def retrieve_task(task_id):
    task = get_task(task_id)
    if task:
        return jsonify(task)
    else:
        return jsonify({"message": "Task not found"}), 404

@auth.route('/tasks', methods=['POST'])
def create_task():
    data = request.json
    name = data.get('name')
    description = data.get('description')

    if not name or not description:
        return jsonify({"message": "Name and description are required"}), 400
    
    add_task(name, description)
    return jsonify({"message": "Task created successfully"}), 201

@auth.route('/tasks/<int:task_id>', methods=['PUT'])
def edit_task(task_id):
    data = request.json
    name = data.get('name')
    description = data.get('description')

    if not name or not description:
        return jsonify({"message": "Name and description are required"}), 400
    
    update_task(task_id, name, description)
    return jsonify({"message": "Task updated successfully"})

@auth.route('/tasks/<int:task_id>', methods=['DELETE'])
def remove_task(task_id):
    delete_task(task_id)
    return jsonify({"message": "Task deleted successfully"})