from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from django.db.models import Q
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

    def id_list(request):
        print("Here")
        id = request.GET.get('id', None)
        queryset = models.Prompt_List.objects.all()
        if id:
            print("Id query")
            queryset = queryset.filter(Q(id=id))

class User_MemoriesView(viewsets.ModelViewSet):
    serializer_class = serializers.User_MemoriesSerializer
    queryset = models.User_Memories.objects.all()

class User_AccountsView(viewsets.ModelViewSet):
    serializer_class = serializers.User_AccountsSerializer
    queryset = models.User_Accounts.objects.all()


class BadgesView(viewsets.ModelViewSet):
    serializer_class = serializers.BadgesSerializer
    queryset = models.Badges.objects.all()


class Usernames(viewsets.ModelViewSet):
    serializer_class = serializers.User_AccountsSerializer
    #queryset = models.User_Accounts.objects.filter(username=)