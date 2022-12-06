import json
from locust import HttpUser,  task
import sys,os
sys.path.append((os.path.dirname(os.path.abspath(os.path.dirname(__file__)))))
import config
from io import BytesIO

parent_path=os.path.dirname(os.path.abspath(os.path.dirname(__file__)))
projects_dir=os.path.dirname(os.path.abspath(parent_path))
image_dir=f"{projects_dir}/image_back/{config.test_config['IMAGE_PATH']}"
test_image_dir=f"{parent_path}/{config.test_config['TEST_IMAGE_PATH']}"
save_image_dir=f"{config.test_config['IMAGE_DOWNLOAD_URL']}"

filename="sample_image.JPG"
test_file_path=f"{test_image_dir}/{filename}"
with open(test_file_path,'rb') as f:
    image=f.read()

image=image
class TestUserClass(HttpUser):
    access_token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2Njk3OTgwNzUsImlhdCI6MTY2OTc5MjA3NX0.AGIbjpuh-v6N6vkUzLDAQbMSvPyjcyeIkZoWXn4oksQ"

    sample_image="http://127.0.0.1:5001/image-download/1/스크린샷 2022-09-22 오후 3.37.21.png"
    test_file_path=test_file_path
    filename=filename
    image=image
    def on_start(self):		
        print("start test")
        print(self.test_file_path)
    def on_stop(self):		
        print("end test")		
    # @task
    # def login(self):
    #     user_credential={
    #         "email":"test1234@naver.com",
    #         "password":"test1234"
    #     }
        
        # self.client.post("/user/login",
        #     json.dumps(user_credential),
        #     headers={"Content-Type" : "application/json"})
        
    @task
    def post_image(self):
        self.client.post("/image",
                headers={"Authorization":self.access_token},
                files={'image':(self.filename,BytesIO(self.image),'image/jpeg')})