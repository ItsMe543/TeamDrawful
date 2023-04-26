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
    queryset = models.Prompt_List.objects.all()


class User_MemoriesView(viewsets.ModelViewSet):
    serializer_class = serializers.User_MemoriesSerializer
    queryset = models.User_Memories.objects.all();



    def getLatestDrawing(request):
        value = request.GET.get('username')

        try:
            q = models.User_Memories.objects.filter(username=value).values().order_by("-id")
            maxId = q[0]["id"]
            p = models.User_Memories.objects.filter(username=value).filter(id=maxId).values()
            #print(p)
            #print(q)
        except:
            q ="NO DRAWINGS WITH USERNAME: "+value
        print(q[0]["id"])

        return HttpResponse(p)
    


class User_AccountsView(viewsets.ModelViewSet):
    serializer_class = serializers.User_AccountsSerializer
    queryset = models.User_Accounts.objects.all()

    def getFriendsByUsername(request):
        value = request.GET.get('username')

        try:
            q = models.User_Accounts.objects.filter(username=value).values()
        except:
            q ="NO DRAWINGS WITH USERNAME: "+value
        print(q)

    def getUsernamesCount(request):
        value = request.GET.get('username')
        try:
            q = models.User_Accounts.objects.filter(username=value).count();
        except:
            q = 0
        
        return HttpResponse(q)


class BadgesView(viewsets.ModelViewSet):
    serializer_class = serializers.BadgesSerializer
    queryset = models.Badges.objects.all()

    def getTotalDrawings(request):
        value = request.GET.get('username')

        try:
            total = models.User_Memories.objects.filter(username=value)
            print(len(total))
        except:
            total ="not working"
        return HttpResponse(len(total))    

class Usernames(viewsets.ModelViewSet):
    serializer_class = serializers.User_AccountsSerializer
    #queryset = models.User_Accounts.objects.filter(username=)
