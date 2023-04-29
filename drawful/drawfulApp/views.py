from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from drawfulApp import serializers
from drawfulApp import models
from drawfulApp.authenticationbackend import CustomBackend
from django.db.models import Q
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
    queryset = models.User_Memories.objects.all()

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
        #print("1")
        friends = []
        try:
            #print("1.5")
            q = models.User_Accounts.objects.filter(username=value).values_list('friends')
            #print("2")
        except:
            q ="NO DRAWINGS WITH USERNAME: "+value
            #print("3")
        #print("4")
        for i in range(0, len(q)):
            #print("Spam")
            try:
                #print("pre")
                friends.append(models.User_Accounts.objects.filter(username=q[i]))
                #print("post")
            except:
                #print("fail")
                friends = []
        #print("100")
        return HttpResponse(friends)
    


    def getFriendsEntries(request):
        value = request.GET.get('username')

        try:
            q = models.User_Accounts.objects.filter(username=value).values_list('friends')
        except:
            q ="NO DRAWINGS WITH USERNAME: "+value
        print(q)
        return HttpResponse(q)


    def getUsernameCount(request):
        username = request.GET.get('username')
        try:
            q = models.User_Accounts.objects.filter(username=username).count()
        except:
            q = 0
        
        return HttpResponse(q)

    def getEmailCount(request):
        email = request.GET.get('email')
        try:
            q = models.User_Accounts.objects.filter(email=email).count()
        except:
            q = 0
        
        return HttpResponse(q)
    
    def authenticateUser(request):
        username = request.GET.get('username')
        password = request.GET.get('password')

        user = CustomBackend.authenticate(request, username=username, password=password)
        if user is not None:
            return HttpResponse("1")
        else:
            return HttpResponse("0")
        
    def getUsernames(request):
        value = request.GET.get('username')
        print("We got...", value)
        try:
            q = models.User_Accounts.objects.exclude(username=value).values()
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
