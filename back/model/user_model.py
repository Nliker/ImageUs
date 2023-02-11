from sqlalchemy import text
from sqlalchemy.exc import IntegrityError


class UserDao:
    def __init__(self,database):
        self.db=database
        
    def insert_user(self,new_user):
        result=self.db.execute(text("""
            insert into users(
                name,
                email,
                profile,
                hashed_password,
                type
            ) values (
                :name,
                :email,
                :profile,
                :hashed_password,
                :type
            )
            """),new_user)
        row=result.lastrowid
        result.close()
        
        return row

    def get_user_id_and_password(self,email,type):
        result=self.db.execute(text("""
            select
                id,
                hashed_password
            from users
            where email=:email
            and type=:type
            """),{'email':email,'type':type})
        row=result.fetchone()
        result.close()

        user_id_and_password={
            'id':row['id'],
            'hashed_password':row['hashed_password']
        } if row else None
        
        return user_id_and_password
    
    def get_user_info(self,user_id):
        result=self.db.execute(text("""
            select
                id,
                name,
                email,
                profile
            from users
            where id=:user_id
            and deleted=0
            """),{'user_id':user_id})
        
        row=result.fetchone()
        result.close()
       
        user_info={
            'id':row['id'],
            'name':row['name'],
            'email':row['email'],
            'profile':row['profile']
        } if row else None
        
        return user_info

    def insert_user_friend(self,user_id,friend_user_id):
        try:
            result=self.db.execute(text("""
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
                    }])
            row=result.rowcount
            result.close()
            return 1
        except IntegrityError as e:
            return 0
    
    def get_user_friend(self,user_id,friend_user_id):
        result=self.db.execute(text("""
            select
                user_id,
                friend_user_id
            from users_friend_list
            where user_id=:user_id 
            and friend_user_id=:friend_user_id
            and deleted=0
            """),{'user_id':user_id,'friend_user_id':friend_user_id})
        row=result.fetchone()
        result.close()

        user_friend={
            'user_id':row['user_id'],
            'friend_user_id':row['friend_user_id']
        } if row else None
        
        return user_friend
    def get_deleted_user_friend(self,user_id,friend_user_id):
        result=self.db.execute(text("""
            select
                user_id,
                friend_user_id
            from users_friend_list
            where user_id=:user_id 
            and friend_user_id=:friend_user_id
            and deleted=1
            """),{'user_id':user_id,'friend_user_id':friend_user_id})
        row=result.fetchone()
        result.close()

        user_friend={
            'user_id':row['user_id'],
            'friend_user_id':row['friend_user_id']
        } if row else None
        
        return user_friend
    def update_user_deleted_friend(self,user_id,friend_user_id):
        result=self.db.execute(text("""
            update users_friend_list
            set deleted=0
            where ((user_id=:user_id
            and friend_user_id=:friend_user_id)
            or (user_id=:friend_user_id
            and friend_user_id=:user_id))
            and deleted=1
            """),{'user_id':user_id,'friend_user_id':friend_user_id})
        row=result.rowcount
        result.close()
        
        if row>=1:
            return 1
        else:
            return 0
        
    def get_user_friendlist(self,user_id):
        result=self.db.execute(text("""
            select
                u_f.friend_user_id as id,
                u.name,
                u.email,
                u.profile
            from users_friend_list as u_f
            left join users as u
            on u_f.friend_user_id=u.id
            where u_f.user_id=:user_id
            and u.deleted=0
            and u_f.deleted=0
            """),{'user_id':user_id})
        rows=result.fetchall()
        result.close()

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
        result=self.db.execute(text("""
            update users_friend_list
            set deleted=1
            where ((user_id=:user_id
            and friend_user_id=:delete_friend_user_id)
            or (user_id=:delete_friend_user_id
            and friend_user_id=:user_id))
            and deleted=0
            """),{
                    'user_id':user_id,
                    'delete_friend_user_id':delete_friend_user_id
                })
        row=result.rowcount
        result.close()
        if row>=1:
            return 1
        else:
            return 0
    
    def get_email_auth_time_diff(self,email):
        result=self.db.execute(text("""
            select
                TIMESTAMPDIFF(SECOND,updated_at,CURRENT_TIMESTAMP())
            from email_auth
            where email=:email
            """),{'email':email})
        row=result.fetchone()
        result.close()
        (time_diff,)=row if row else None

        return time_diff
        
    
    def get_email_auth_info(self,email):
        result=self.db.execute(text("""
            select
                email,
                auth_password,
                activated
            from email_auth
            where email=:email
        """),{'email':email})
        row=result.fetchone()
        result.close()
    
        email_auth={
            'email':row['email'],
            'auth_password':row['auth_password'],
            'activated':row['activated']
        } if row else None

        return email_auth
    
    def update_email_auth(self,email,auth_password):
        result=self.db.execute(text("""
            update email_auth
            set 
                auth_password=:auth_password,
                activated=0
            where email=:email
        """),{'email':email,'auth_password':auth_password})
        row=result.rowcount
        result.close()
        
        return row

    def update_email_auth_activate(self,email):
        result=self.db.execute(text("""
            update email_auth
            set
                activated=1
            where email=:email
            and activated!=1
            """),{'email':email})
        row=result.rowcount
        result.close()
        
        return row
        
        
    def insert_email_auth(self,email,auth_password):
        result=self.db.execute(text("""
            insert into email_auth(
                email,
                auth_password
            ) values (
                :email,
                :auth_password
            )
        """),{'email':email,'auth_password':auth_password})
        row=result.rowcount
        result.close()

        return row
    
    def update_user(self,user_id,attr,value):
        query="""
            update users
            set
                %s='%s'
            where id=%d
            and %s!='%s'
        """ % (attr,value,user_id,attr,value)
        result=self.db.execute(query)
        row=result.rowcount
        result.close()
        
        return row

    def delete_user(self,delete_user_id):
        result=self.db.execute(text("""
           update users
           set deleted=1
           where id=:delete_user_id
           and deleted=0
        """),{'delete_user_id':delete_user_id})
        row=result.rowcount
        result.close()
        
        return row