from app.db import get_db_connection

def login_user(email, password):
    """Login logic separated for reusability."""
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    
    cursor.execute("SELECT * FROM users WHERE email = %s AND password = %s", (email, password))
    user = cursor.fetchone()
    
    connection.close()
    
    if user:
        return {"message": "Login successful", "user": user}, 200
    else:
        return {"message": "Invalid credentials"}, 401
