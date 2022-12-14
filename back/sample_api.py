from flask import Flask,make_response,render_template
from flask_cors import CORS
import os
import time


app=Flask(__name__)

CORS(app)

@app.route("/sync/test")
def sync_test():
    print(os.getpid())
    start=time.time()
    time.sleep(5)
    end=time.time()
    processtime=end-start
    return "{prcesstime}"