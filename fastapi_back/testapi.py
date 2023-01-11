from fastapi import FastAPI
import time
from datetime import datetime
import os 
import asyncio
ow = datetime.now()
app=FastAPI()

print("TESTAPI 시작")


@app.get("/ping")
async def pong():
    return {"pid":os.getpid()}

@app.get("/async/sync")  
async def async_with_sync():
  print(os.getpid())
  await asyncio.sleep(10)
#   time.sleep(10)
  
  print("프로세스 끝")
  now = datetime.now()

  return {"시간":now.strftime('%Y-%m-%d %H:%M:%S'),
          "pid":os.getpid()}