from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from .serializers import TodoSerializer
from .models import Todo
from django.views.decorators.csrf import requires_csrf_token

# Create your views here.

# class TodoView(viewsets.ModelViewSet):#
#    serializer_class = TodoSerializer
#    queryset = Todo.objects.all()

def main(request):
    context = { }
    return render(request, "index.html", context)
