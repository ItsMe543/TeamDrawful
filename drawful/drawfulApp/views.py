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

class BadgesView(viewsets.ModelViewSet):
    serializer_class = serializers.BadgesSerializer
    queryset = models.Badges.objects.all()
