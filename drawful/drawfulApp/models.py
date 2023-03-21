from django.db import models

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
class User_Memories(models.Model):
        #memoryId = models.IntegerField(primary_key=True)
        date = models.DateField(primary_key=True)
        timeCompleted = models.TimeField()
        difficulty = models.CharField(max_length=10)
        avgRating = models.FloatField(default=0.0)
        timeTaken = models.IntegerField()

        #auto_now updates this field to the last time this object saves data
        prompt = models.CharField(max_length=50)

        #***None must be filled*** pip install pillow
        drawing = models.ImageField(upload_to=None, height_field=None, width_field=None, max_length=100)



#Tables of all accounts and applicable data, each row is a new user
#Primary Key = Username
class User_Accounts(models.Model):
        username = models.CharField(max_length=30)
        email = models.CharField(max_length=320)
        profilePicture = models.ImageField(upload_to=None, height_field=None, width_field=None, max_length=100)
        favouriteDraw = models.ImageField(upload_to=None, height_field=None, width_field=None, max_length=100)
        badgesEarned = models.CharField(max_length=30)
        darkMode = models.BooleanField(default=False)
        averageRating = models.FloatField()
        currentStreak = models.IntegerField(default=0)
        maxStreak = models.IntegerField(default=0)
        totalStars = models.IntegerField(default=0)
        friends = models.CharField(max_length=30)
        friendRequests = models.CharField(max_length=30)
        language = models.CharField(max_length=423)



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
        promptGenre = models.CharField(max_length=30)
        alreadyUsed = models.BooleanField(default=False)
        previousWinner = models.CharField(max_length=30)

