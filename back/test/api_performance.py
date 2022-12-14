import json
from locust import HttpUser,  task
import sys,os
sys.path.append((os.path.dirname(os.path.abspath(os.path.dirname(__file__)))))
import config
from io import BytesIO

# parent_path=os.path.dirname(os.path.abspath(os.path.dirname(__file__)))
# projects_dir=os.path.dirname(os.path.abspath(parent_path))
# image_dir=f"{projects_dir}/image_back/{config.test_config['IMAGE_PATH']}"
# test_image_dir=f"{parent_path}/{config.test_config['TEST_IMAGE_PATH']}"
# save_image_dir=f"{config.test_config['IMAGE_DOWNLOAD_URL']}"

# filename="sample_image.JPG"
# test_file_path=f"{test_image_dir}/{filename}"
# with open(test_file_path,'rb') as f:
#     image=f.read()

# image=image
class TestUserClass(HttpUser):
    def on_start(self):		
        print("start test")
        # print(self.test_file_path)
    def on_stop(self):		
        print("end test")		
    # @task
    # def login(self):
    #     user_credential={
    #         "email": "test1@test.com",
    #         "password": "test1"
    #     }
                
    #     self.client.post("/user/login",
    #         json.dumps(user_credential),
    #         headers={"Content-Type" : "application/json"})
        
    @task
    def sync_test(self):
        self.client.get("/sync/test")
        
    # @task
    # def post_image(self):
    #     self.client.post("/image",
    #             headers={"Authorization":self.access_token},
    #             files={'image':(self.filename,BytesIO(self.image),'image/jpeg')})