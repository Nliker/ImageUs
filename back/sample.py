# from random import seed
# from random import randint

# seed(100)

# pre=[randint(0,9)+(10*_) for _ in range(100)]
# after=[randint(0,9)+(10*_) for _ in range(100)]
# result=sorted(set(pre+after))
# print(result)
# deletelist=[]
# addlist=[]
# continuelist=[]

# for room_id in result:
#     if (room_id in pre) and (room_id in after):
#         continuelist.append(room_id)
    
#     if (room_id in pre) and (room_id not in after):
#         deletelist.append(room_id)
    
#     if (room_id not in pre) and (room_id in after):
#         addlist.append(room_id)
# print(f"기존방:{pre}")
# print(f"업데이트 방:{after}")
# print(f"추가방:{addlist}")
# print(f"삭제방:{deletelist}")
# print(f"유지방:{continuelist}")

# a=[
#     {
#         'testa':"123",
#         'testb':"456"
#     },{
#         'testa':"789",
#         'testb':"101112"
#     }
# ]
# for info in a:
#     info['testc']="153151513"
# print(a)

# print([1,2]==[2,1])

# image_roomlist=set([1,2,10,9])
# update_roomlist=set([2,3,4,4,5,6])

# update_list=sorted(image_roomlist.union(update_roomlist))
# print(update_list)

import time
import asyncio

async def find_users_async(n):
    
    for i in range(1, n + 1):
        print(f'{n}명 중 {i}번 째 사용자 조회 중 ...')
        await asyncio.sleep(1)
    print(f'> 총 {n} 명 사용자 비동기 조회 완료!')
    
async def say_hello_delay(n):
    print("hello",n)
    await asyncio.sleep(n)
async def task1(n):
    task=asyncio.create_task(say_hello_delay(n))
    await task
    return n
async def process_async():
    start = time.time()
    # await asyncio.wait([
    #     find_users_async(3),
    #     find_users_async(2),
    #     find_users_async(1),
    # ])
    await task1(5)
    print("giid")
    task1(3)
    end = time.time()
    print(f'>>> 비동기 처리 총 소요 시간: {end - start}')

if __name__ == '__main__':
    asyncio.run(process_async())