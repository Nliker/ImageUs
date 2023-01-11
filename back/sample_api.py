from flask import Flask
from flask_cors import CORS
import os
import time
import asyncio
from  sqlalchemy import create_engine,text

app=Flask(__name__)

CORS(app)
app.config.from_pyfile("config.py")
database=create_engine(app.config['DB_URL'],encoding='utf-8',max_overflow=0)
print(os.getpid())
async def get_user_data_async(n):
    database.execute(text("""
        select 
            email,name,profile
        from users
        where id=:id
        """),{'id':n}).fetchone
def get_user_data_sync(n):
    database.execute(text("""
        select 
            email,name,profile
        from users
        where id=:id
        """),{'id':n}).fetchone

@app.route("/sync/test",methods=['GET'])
async def sync_test():
    print(os.getpid())
    # start=time.time()
    # task1=asyncio.create_task(get_user_data_async(5))
    # await task1
    while True:
        pass
    # get_user_data_sync(5)
    # asyncio.sleep(0.1)
    end=time.time()
    processtime=end-start
    return "{prcesstime}"