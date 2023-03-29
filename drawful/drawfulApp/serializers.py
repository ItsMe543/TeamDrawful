from rest_framework import serializers
from drawfulApp import models

########## Example Serialiser ##########
#class TodoSerializer(serializers.ModelSerializer):
#    class Meta:
#        model = models.Todo
#        fields = ('id', 'title', 'description', 'completed')

class PromptSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Prompt_List
        fields = ('id', 'prompt', 'promptGenre', 'alreadyUsed', 'previousWinner')

class User_MemoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model =models.User_Memories
        fields = ('id', 'date', 'timeCompleted', 'difficulty', 'avgRating', 'timeTaken', 'prompt', 'drawing')

class User_AccountsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User_Accounts
        fields = ('username','name','email','bio','profilePicture','favouriteDraw','badgesEarned','averageRating','currentStreak','maxStreak','totalStars','friends','friendRequests')
