db={
    "user":"codakcodak",
    "password":"dkdrmaghEl83!",
    "host":"localhost",
    "port":3306,
    "database":"insta_cloud"
}

test_db={
    'user':'codakcodak',
    'password':'dkdrmaghEl83!',
    'host':'localhost',
    'port':3306,
    'database':'insta_cloud_test'
}

JWT_SECRET_KEY="codak"

DB_URL=f"mysql+mysqlconnector://{db['user']}:{db['password']}@{db['host']}:{db['port']}/{db['database']}?charset=utf8"

TEST_DB_URL=f"mysql+mysqlconnector://{test_db['user']}:{test_db['password']}@{test_db['host']}:{test_db['port']}/{test_db['database']}?charset=utf8",

IMAGE_PATH="./images/"

IMAGE_DOWNLOAD_URL="http://127.0.0.1:5001/image-download/"


test_config={
    'DB_URL':f"mysql+mysqlconnector://{test_db['user']}:{test_db['password']}@{test_db['host']}:{test_db['port']}/{test_db['database']}?charset=utf8",
    'JWT_SECRET_KEY':"codak",
    'JWT_EXPIRE_TIME':600,
    'IMAGE_URL':"http://127.0.0.1:5001/download-image/",
    'IMAGE_PATH':"./images/",
}