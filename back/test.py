import requests
from concurrent.futures import ThreadPoolExecutor

def get_url(url):
    return requests.get(url,headers={'Authorization':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxOTg1LCJleHAiOjE2NzQxMTEwNTIsImlhdCI6MTY3NDEwNTA1Mn0.LooNHeEPnZq-CYOKDQ_8HenmbaxQKQfqGGhW4XgjzoA"})

list_of_urls=["http://118.42.101.135:5000/user/1985/roomlist"]*10000

with ThreadPoolExecutor(max_workers=50) as pool:
    response_list=list(pool.map(get_url,list_of_urls))

for response in response_list:
    print(response)