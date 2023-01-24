import requests
from concurrent.futures import ThreadPoolExecutor
import time

def get_url(url):
    return requests.get(url,headers={'Authorization':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxOTg1LCJleHAiOjE2NzQyMDI3NzYsImlhdCI6MTY3NDE5Njc3Nn0.w7rnRl7yGU3c0aiE3J4SSNAibj_d7ySKdT4Wup_Jn9g"})

list_of_urls=["http://118.42.101.135:5000/user/1985/roomlist"]*1000
start = time.time()

with ThreadPoolExecutor(max_workers=32) as pool:
    response_list=list(pool.map(get_url,list_of_urls))
end = time.time()
for response in response_list:
    print(response)
print(end - start)