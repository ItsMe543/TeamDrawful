from django.db import models
from django.utils import timezone
import os
# Create your models here.
#class Todo(models.Model):
#        title = models.CharField(max_length=120)
#        description = models.TextField()
#        completed = models.BooleanField(default=False)
#
#        def _str_(self):
#                return self.title



#Table for todays drawings
#Primary key = username
#class Todays_drawings(models.Model):
#        username = models.CharField(max_length=30, primary_key=True) #Primary key
#        drawing = models.ImageField(upload_to=None, height_field=None, width_field=None, max_length=100)
#        timeCompleted = models.TimeField(auto_now=True) #auto_now updates this field to the last time this object saves data
#        difficulty = models.CharField(max_length=10)
#        avgRating = models.FloatField(default=0.0)
#        TimeTaken = models.TimeField()



#Table for each users memories
#Primary key = date
def generateFilename(instance,filename):
        timestamp = timezone.now().strftime('%Y%m%d_%H%M%S')
        basename, extension = os.path.splitext(filename)
        new_filename = f'mem_{timestamp}{extension}'
        return f'uploads/drawings/{new_filename}'


class User_Memories(models.Model):
        id = models.AutoField(primary_key=True)
        date = models.CharField(max_length=10)
        timeCompleted = models.TimeField()
        difficulty = models.CharField(max_length=10)
        avgRating = models.FloatField(default=0.0)
        timeTaken = models.TimeField()
        #auto_now updates this field to the last time this object saves data
        prompt = models.CharField(max_length=50)
        #***None must be filled*** pip install pillow
        drawing = models.ImageField(upload_to=generateFilename, height_field=None, width_field=None, max_length=100)



#Tables of all accounts and applicable data, each row is a new user
#Primary Key = Username
class User_Accounts(models.Model):
        username = models.CharField(max_length=30)
        hashedPass = models.CharField(max_length=10000, null=True, blank=True)
        name = models.CharField(max_length=30)
        email = models.CharField(max_length=320)
        bio = models.CharField(max_length=30, null=True, blank=True)
        profilePicture = models.ImageField(upload_to=None, height_field=None, width_field=None, max_length=100, null=True, blank=True)
        favouriteDraw = models.ImageField(upload_to=None, height_field=None, width_field=None, max_length=100, null=True, blank=True)
        badgesEarned = models.CharField(max_length=30, null=True, blank=True)
        averageRating = models.FloatField()
        currentStreak = models.IntegerField(default=0)
        maxStreak = models.IntegerField(default=0)
        totalStars = models.IntegerField(default=0)
        friends = models.CharField(max_length=30, null=True, blank=True) #List of users who are friends with this user
        friendRequests = models.CharField(max_length=30, null=True, blank=True) #List of users which have sent friend requests to this account
        RSAPub = models.CharField(max_length=10000, null=True, blank=True)
        RSAPriv = models.CharField(max_length=10000, null=True, blank=True)
        AESPriv = models.CharField(max_length=10000, null=True, blank=True)
        AESSemi = models.CharField(max_length=10000, null=True, blank=True)


#This tables stores all badges for each user, with each entry being the badge, alone with unlocked status
#Primary key = badgeName
class Badges(models.Model):
        badgeName = models.CharField(max_length=20, primary_key=True)
        badgeIcon = models.ImageField(upload_to=None, height_field=None, width_field=None, max_length=100)
        badgeDescirption = models.CharField(max_length=500)
        badgeUnlocked = models.BooleanField(default=False)


#This table is the table for prompts which can be generated
#Primary key = prompt
class Prompt_List(models.Model):
        id = models.IntegerField(primary_key=True)
        prompt = models.CharField(max_length=50)
        promptGenre = models.CharField(max_length=50)
        alreadyUsed = models.BooleanField(default=False)
        previousWinner = models.CharField(max_length=30)

