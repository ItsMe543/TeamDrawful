from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import login
from rest_framework import viewsets
from drawfulApp import serializers
from drawfulApp import models
from drawfulApp.authenticationbackend import CustomBackend
from datetime import datetime
from django_filters.rest_framework import DjangoFilterBackend
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
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['date']


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


    def getTodaysDrawings(request):
        serializer_class = serializers.User_MemoriesSerializer
        date = request.GET.get('date')
        today = datetime.today().strftime('%Y-%m-%d')
        print(today)
        try:
            q = models.User_Memories.objects.filter(date = today ).values().order_by("-id")
        except:
            q ="No drawings today: "
        print(q)

        return HttpResponse(q)
    

    def getUserDrawings(request):
        username = request.GET.get('username')
        try:
            #print("Queryset =", User_MemoriesView.queryset)
            p = models.User_Memories.objects.filter(username=username).values()
            #print("p =", p)

            data = list(p)
        except:
            p = "0"
        #print("\n\nType is : ", data)
        return JsonResponse({"data": data})



class User_AccountsView(viewsets.ModelViewSet):
    serializer_class = serializers.User_AccountsSerializer
    queryset = models.User_Accounts.objects.all()

    def getFriendsNew(request):
        value = request.GET.get('username')
        friendsList = []
        try:
            friendsElement = models.User_Accounts.objects.filter(username=value).values_list("friends")
            #friendsList = list(friendsElement)
            print("List of friends: \n", friendsElement)
            print("Friend 1: \n", friendsElement[0])
            print("Friend 2: \n", friendsElement[1])
            #for i in range(0, len(friendsList)):
            try:
                friendsQuerySet = models.User_Accounts.objects.filter(username=friendsElement[0])
                friendsList = list(friendsQuerySet)
                print("INNER TRY: friendsList = ", friendsList)
            except:
                friendsList = []
                print("ERROR OCCURED with INNER try except")
        except:
            friendsList = []
            print("ERROR OCCURED with OUTER try except")
        print("Final return \n", friendsList)
        return JsonResponse({{"friendList": (friendsList)}})
    



    def getFriendsNames(request):
        value = request.GET.get('username')
        friendsElement = []
        try:
            friendsElement = models.User_Accounts.objects.filter(username=value).values_list("friends")
            #friendsList = list(friendsElement)
            print("List of friends: \n", friendsElement)
        except:
            print("ERROR OCCURED with OUTER try except")
        return HttpResponse(friendsElement)





    def getUserEntry(request):
        value = request.GET.get('username')
        userEntry = []
        try:
            userDetails = models.User_Accounts.objects.filter(username=value)
            userEntry = list(userDetails)
            print("List of friends: \n", userEntry)
        except:
            print("ERROR OCCURED with OUTER try except")
        return JsonResponse({{"aFriend": (userEntry)}})





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
        print("Password =", password)

        user = CustomBackend.authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponse("1")
        else:
            return HttpResponse("0")
        
    def getUsernames(request): #that aren't your own
        value = request.GET.get('username')
        #print("We got...", value)
        try:
            q = models.User_Accounts.objects.exclude(username=value).values()
        except:
            q = 0
        data = list(q)
        #print("\n")
        #print(" \n \n Th DATATATATATAT iss... \n \n", data)
        #print("\n")
        return JsonResponse({"allUsers":data})



class BadgesView(viewsets.ModelViewSet):
    serializer_class = serializers.BadgesSerializer
    queryset = models.Badges.objects.all()

    def getTotalDrawings(request):
        value = request.GET.get('username')

        try:
            total = models.User_Memories.objects.filter(username=value).values()
            print(len(total))
        except:
            total ="not working"
        return HttpResponse(len(total))

#class Usernames(viewsets.ModelViewSet):
 #   serializer_class = serializers.User_AccountsSerializer
    #queryset = models.User_Accounts.objects.filter(username=)
