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

<<<<<<< HEAD
class User_MemoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model =models.User_Memories
        fields =('date','timeCompleted','difficulty','avgRating','timeTaken','prompt','drawing')
=======
class userMemoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User_memories
        fields = ('id', 'date', 'timeCompleted', 'difficulty', 'avgRating', 'TimeTaken', 'prompt', 'drawing')
>>>>>>> 36ab662e8d5598abec928242471abe1656cb2444
