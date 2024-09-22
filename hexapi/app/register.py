# app/auth/services.py

from app.db import get_db_connection
import mysql.connector

def register_user(name, email, password):
    """Handles user registration by inserting the data into the database."""
    
    # Check if user already exists
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
    existing_user = cursor.fetchone()

    if existing_user:
        return {"message": "User already exists with this email"}, 400

    # Insert the new user
    try:
        cursor.execute(
            "INSERT INTO users (name, email, password) VALUES (%s, %s, %s)",
            (name, email, password)
        )
        connection.commit()
    except mysql.connector.Error as err:
        connection.rollback()
        return {"message": f"Database error: {err}"}, 500
    finally:
        connection.close()

    return {"message": "User registered successfully"}, 201
