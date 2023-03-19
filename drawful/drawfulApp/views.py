from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
import serializers
import models

# Create your views here.

########## Example view ##########
#class TodoView(viewsets.ModelViewSet):#
#    serializer_class = serializers.TodoSerializer
#    queryset = models.Todo.objects.all()

def main(request):
    context = { }
    return render(request, "index.html", context)

class DifficultyView(viewsets.ModelViewSet):
    pass
