from sqlalchemy import text
from sqlalchemy.exc import IntegrityError


class UserDao:
    def __init__(self,database):
        self.db=database
        
    def insert_user(self,new_user):
        row=self.db.execute(text("""
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
        return row

    def get_user_id_and_password(self,email):
        row=self.db.execute(text("""
            select
                id,
                hashed_password
            from users
            where email=:email
            """),{'email':email}).fetchone()
        user_id_and_password={
            'id':row['id'],
            'hashed_password':row['hashed_password']
        }
        return user_id_and_password
    
    def get_user_info(self,user_id):
        row=self.db.execute(text("""
            select
                id,
                name,
                email,
                profile
            from users
            where id=:user_id
            """),{'user_id':user_id}).fetchone()
        user_info={
            'id':row['id'],
            'name':row['name'],
            'email':row['email'],
            'profile':row['profile']
        }
        return user_info

    def insert_user_friend(self,user_id,friend_user_id):
        try:
            row=self.db.execute(text("""
                insert into users_friend_list(
                    user_id,
                    friend_user_id
                ) values (
                    :user_id,
                    :friend_user_id
                )
                """),[{
                        'user_id':user_id,
                        'friend_user_id':friend_user_id
                    },{
                        'user_id':friend_user_id,
                        'friend_user_id':user_id
                    }]).rowcount
            return 1
        except IntegrityError as e:
            return 0
    
    def get_user_friend(self,user_id,friend_user_id):
        row=self.db.execute(text("""
            select
                user_id,
                friend_user_id
            from users_friend_list
            where user_id=:user_id and friend_user_id=:friend_user_id
            """),{'user_id':user_id,'friend_user_id':friend_user_id}).fetchone()

        user_friend={
            'user_id':row['user_id'],
            'friend_user_id':row['friend_user_id']
        }
        
        return user_friend
    
    def get_user_friendlist(self,user_id):
        rows=self.db.execute(text("""
            select
                u_f.friend_user_id as id,
                u.name,
                u.email,
                u.profile
            from users_friend_list as u_f
            left join users as u
            on u_f.friend_user_id=u.id
            where u_f.user_id=:user_id
            """),{'user_id':user_id}).fetchall()

        user_friend_info_list=[
            {
                'id':user_friend_info['id'],
                'name':user_friend_info['name'],
                'email':user_friend_info['email'],
                'profile':user_friend_info['profile']
            } for user_friend_info in rows
        ]
        
        return user_friend_info_list
    
    def delete_user_friend(self,user_id,delete_friend_user_id):
        row=self.db.execute(text("""
            delete from users_friend_list
            where (user_id=:user_id and friend_user_id=:delete_friend_user_id)
            or (user_id=:delete_friend_user_id and friend_user_id=:user_id) 
            """),{
                    'user_id':user_id,
                    'delete_friend_user_id':delete_friend_user_id
                }).rowcount    
        if row>=1:
            return 1
        else:
            return 0