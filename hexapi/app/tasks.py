from app.db import get_db_connection

def get_tasks(page=1, per_page=10):
    """Fetch tasks with pagination."""
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    
    offset = (page - 1) * per_page

    cursor.execute("SELECT COUNT(*) AS count FROM tasks")
    result = cursor.fetchone()
    total_tasks = result['count'] if result else 0

    cursor.execute("SELECT * FROM tasks LIMIT %s OFFSET %s", (per_page, offset))
    tasks = cursor.fetchall()
    
    connection.close()

    return {
        "tasks": tasks,
        "totaltasks": total_tasks,
        "totalpages": (total_tasks + per_page - 1) // per_page
    }

def get_task(task_id):
    """Fetch a single task by its ID."""
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    
    cursor.execute("SELECT * FROM tasks WHERE id = %s", (task_id,))
    task = cursor.fetchone()
    
    connection.close()
    
    return task

def add_task(name, description):
    """Add a new task."""
    connection = get_db_connection()
    cursor = connection.cursor()
    
    cursor.execute("INSERT INTO tasks (name, description) VALUES (%s, %s)", (name, description))
    connection.commit()
    
    connection.close()

def update_task(task_id, name, description):
    """Update an existing task."""
    connection = get_db_connection()
    cursor = connection.cursor()
    
    cursor.execute("UPDATE tasks SET name = %s, description = %s WHERE id = %s", (name, description, task_id))
    connection.commit()
    
    connection.close()

def delete_task(task_id):
    """Delete a task by its ID."""
    connection = get_db_connection()
    cursor = connection.cursor()
    
    cursor.execute("DELETE FROM tasks WHERE id = %s", (task_id,))
    connection.commit()
    
    connection.close()
