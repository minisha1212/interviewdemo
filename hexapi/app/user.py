from app.db import get_db_connection

def get_user(user_id):
    """Retrieve user profile from the database."""
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    
    cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
    user = cursor.fetchone() 
    connection.close()

    return user
    

def update_user_profile(user_id, data):
    """Update user profile in the database."""
    connection = get_db_connection()
    cursor = connection.cursor()
    
    query = """
    UPDATE users
    SET name = %s, email = %s, hobby = %s, birthdate = %s, gender = %s
    WHERE id = %s
    """
    values = (
        data.get('name'),
        data.get('email'),
        data.get('hobby'),
        data.get('birthdate'),
        data.get('gender'),
        user_id
    )
    
    cursor.execute(query, values)
    connection.commit()
    
    # Check if any row was updated
    if cursor.rowcount == 0:
        connection.close()
        return {"message": "User not found"}, 404
    
    connection.close()
    
    # Fetch the updated user
    return get_user_profile(user_id)
