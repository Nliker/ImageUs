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

a=[
    {
        'testa':"123",
        'testb':"456"
    },{
        'testa':"789",
        'testb':"101112"
    }
]
for info in a:
    info['testc']="153151513"
print(a)