from sqlalchemy import create_engine,text
import config
import random
import bcrypt

enterprise_list=["naver","daum","gmail","google","kakao"]
email_tails=["com","co.kr","dat","net"]
email_alphabets = "abcdefghizklmnopqrstuvwxyz1234567890"

def generate_email_pre_part():
    pre_part_email = ""
    for i in range(random.randint(1, 10)):
        pre_part_email += random.choice(email_alphabets)
    return pre_part_email


def generate_email_pro_part():
    pro_part_email=""
    pro_part_email += random.choice(enterprise_list)
    return pro_part_email

def generate_email_tail():
    email_tail=random.choice(email_tails)
    return email_tail

def generate_emails(n):
    emails=[]
    for i in range(n):
        pre_part=generate_email_pre_part()
        pro_part=generate_email_pro_part()
        tail=generate_email_tail()
        email=f"{pre_part}@{pro_part}.{tail}"
        emails.append(email)
    emails=list(set(emails))
    return emails


database=create_engine(config.DB_URL,encoding='utf-8',max_overflow=0)
print("데이터베이스 연결 성공!")

emails=generate_emails(1000)
hashed_password=bcrypt.hashpw("test_password".encode('utf-8'),bcrypt.gensalt()).decode('utf-8')
name="sample_user"
profile="im sample user"
new_users=[
    {
        'name':name,
        'email':email,
        'profile':profile,
        'hashed_password':hashed_password
    } for email in emails if email
]
print(new_users)
for new_user in new_users:
    print(f"{new_user['email']} 삽입중...")
    try:
        row=database.execute(text("""
                        insert into users(
                            name,
                            email,
                            profile,
                            hashed_password
                        ) values (
                            :name,
                            :email,
                            :profile,
                            :hashed_password
                        )
                        """),new_user).lastrowid
        print(f"{new_user['email']} 삽입 완료")
        print(f"ID:{row}")
    except:
        print("오류가 생겼습니다.! 다음을 진행합니다.")
        continue
    

    