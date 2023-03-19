from rest_framework import serializers
from drawfulApp import models

########## Example Serialiser ##########
#class TodoSerializer(serializers.ModelSerializer):
#    class Meta:
#        model = models.Todo
#        fields = ('id', 'title', 'description', 'completed')

class BadgesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Badges
        fields = ('badgeName', 'badgeIcon', 'badgeDescription', 'badgeUnlocked')
