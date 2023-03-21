from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from drawfulApp import serializers
from drawfulApp import models

# Create your views here.

########## Example view ##########
#class TodoView(viewsets.ModelViewSet):#
#    serializer_class = serializers.TodoSerializer
#    queryset = models.Todo.objects.all()

def main(request):
    context = { }
    return render(request, "index.html", context)

class PromptView(viewsets.ModelViewSet):
    serializer_class = serializers.PromptSerializer
    queryset = models.Prompt_List.objects.all()

<<<<<<< HEAD
class User_MemoriesView(viewsets.ModelViewSet):
    serializer_class = serializers.User_MemoriesSerializer
    queryset = models.User_Memories.objects.all()
=======
class userMemoriesView(viewsets.ModelViewSet):
    serializer_class = serializers.userMemoriesSerializer
    queryset = models.User_memories.objects.all()
>>>>>>> 36ab662e8d5598abec928242471abe1656cb2444
