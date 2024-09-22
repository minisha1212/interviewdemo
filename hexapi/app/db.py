import mysql.connector
from config import Config

def get_db_connection():
    connection = mysql.connector.connect(
        host='localhost',
        user='root',
        password='',
        database='mydatabase'
    )
    return connection
