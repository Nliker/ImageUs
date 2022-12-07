from sqlalchemy.exc import IntegrityError
import aiomysql

class UserDao:
    def __init__(self,database):
        self.db=database
        
    async def insert_user(self,new_user):
        query="""
        insert into users (name,email,profile,hashed_password) 
        values ('%s','%s','%s',%s)
        """ % (new_user['name'],
               new_user['email'],
               new_user['profile'],
               new_user['hashed_password'])
        print(query)
        async with self.db.acquire() as conn:
            async with conn.cursor(aiomysql.DictCursor) as cur:
                await cur.execute(query)
                row=cur.lastrowid
        print(row)    
        return row

    # def insert_user(self,new_user):
    #     row=self.db.execute(text("""
    #         insert into users(
    #             name,
    #             email,
    #             profile,
    #             hashed_password
    #         ) values (
    #             :name,
    #             :email,
    #             :profile,
    #             :hashed_password
    #         )
    #         """),new_user).lastrowid
    #     return row

    async def get_user_id_and_password(self,email):
        query="""
        select id,hashed_password 
        from users 
        where email=('%s')
        """ % (email)
    
        print(query)
        async with self.db.acquire() as conn:
            async with conn.cursor(aiomysql.DictCursor) as cur:
                await cur.execute(query)
                row=await cur.fetchone()

        user_id_and_password={
            'id':row['id'],
            'hashed_password':row['hashed_password']
        } if row else None
        print(row)
        return user_id_and_password

    # def get_user_id_and_password(self,email):
    #     row=self.db.execute(text("""
    #         select
    #             id,
    #             hashed_password
    #         from users
    #         where email=:email
    #         """),{'email':email}).fetchone()
    #     user_id_and_password={
    #         'id':row['id'],
    #         'hashed_password':row['hashed_password']
    #     } if row else None
    #     return user_id_and_password
    
    async def get_user_info(self,user_id):
        query="""
        select id,name,email,profile 
        from users 
        where id=%d and deleted=0
        """ % (user_id)
        print(query)
        async with self.db.acquire() as conn:
            async with conn.cursor(aiomysql.DictCursor) as cur:
                await cur.execute(query)
                row=await cur.fetchone()
    
            user_info={
            'id':row['id'],
            'name':row['name'],
            'email':row['email'],
            'profile':row['profile']
        } if row else None
        print(row)
        
        return user_info
    
    # def get_user_info(self,user_id):
    #     row=self.db.execute(text("""
    #         select
    #             id,
    #             name,
    #             email,
    #             profile
    #         from users
    #         where id=:user_id
    #         and deleted=0
    #         """),{'user_id':user_id}).fetchone()
    #     user_info={
    #         'id':row['id'],
    #         'name':row['name'],
    #         'email':row['email'],
    #         'profile':row['profile']
    #     } if row else None
    #     return user_info

    # def insert_user_friend(self,user_id,friend_user_id):
    #     try:
    #         row=self.db.execute(text("""
    #             insert into users_friend_list(
    #                 user_id,
    #                 friend_user_id
    #             ) values (
    #                 :user_id,
    #                 :friend_user_id
    #             )
    #             """),[{
    #                     'user_id':user_id,
    #                     'friend_user_id':friend_user_id
    #                 },{
    #                     'user_id':friend_user_id,
    #                     'friend_user_id':user_id
    #                 }]).rowcount
    #         return 1
    #     except IntegrityError as e:
    #         return 0
    
    # def get_user_friend(self,user_id,friend_user_id):
    #     row=self.db.execute(text("""
    #         select
    #             user_id,
    #             friend_user_id
    #         from users_friend_list
    #         where user_id=:user_id 
    #         and friend_user_id=:friend_user_id
    #         and deleted=0
    #         """),{'user_id':user_id,'friend_user_id':friend_user_id}).fetchone()

    #     user_friend={
    #         'user_id':row['user_id'],
    #         'friend_user_id':row['friend_user_id']
    #     } if row else None
        
    #     return user_friend
    
    # def get_user_friendlist(self,user_id):
    #     rows=self.db.execute(text("""
    #         select
    #             u_f.friend_user_id as id,
    #             u.name,
    #             u.email,
    #             u.profile
    #         from users_friend_list as u_f
    #         left join users as u
    #         on u_f.friend_user_id=u.id
    #         where u_f.user_id=:user_id
    #         and u.deleted=0
    #         and u_f.deleted=0
    #         """),{'user_id':user_id}).fetchall()

    #     user_friend_info_list=[
    #         {
    #             'id':user_friend_info['id'],
    #             'name':user_friend_info['name'],
    #             'email':user_friend_info['email'],
    #             'profile':user_friend_info['profile']
    #         } for user_friend_info in rows
    #     ]
        
    #     return user_friend_info_list
    
    # def delete_user_friend(self,user_id,delete_friend_user_id):
    #     row=self.db.execute(text("""
    #         update users_friend_list
    #         set deleted=1
    #         where (user_id=:user_id
    #         and friend_user_id=:delete_friend_user_id)
    #         or (user_id=:delete_friend_user_id
    #         and friend_user_id=:user_id)
    #         and deleted=0
    #         """),{
    #                 'user_id':user_id,
    #                 'delete_friend_user_id':delete_friend_user_id
    #             }).rowcount
    #     if row>=2:
    #         return 1
    #     else:
    #         return 0