from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.hashers import check_password
from drawfulApp.models import User_Accounts

class CustomBackend(BaseBackend):
    def authenticate(self, username, password):
        print("Auth password =", password)
        try:
            user = User_Accounts.objects.get(username=username)

            if check_password(password, user.password):
                print("Got here!")
                return user
            else:
                print("Actually got here :(")
                return None
        except User_Accounts.DoesNotExist:
            return None
    
    def get_user(self, user_id):
        try:
            return User_Accounts.objects.get(pk=user_id)
        except:
            return None