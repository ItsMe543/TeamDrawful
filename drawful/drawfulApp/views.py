from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
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

@api_view(['GET', 'POST'])
def promptView(request):

    if request.method == 'GET':
        prompt = models.Prompt_List.objects.all()
        serializer = serializers.PromptSerializer(prompt, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = serializers.PromptSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#class PromptView(viewsets.ModelViewSet):
#    serializer_class = serializers.PromptSerializer
#    queryset = models.Prompt_List.objects.all()

class User_MemoriesView(viewsets.ModelViewSet):
    serializer_class = serializers.User_MemoriesSerializer
    queryset = models.User_Memories.objects.all()

class User_AccountsView(viewsets.ModelViewSet):
    serializer_class = serializers.User_AccountsSerializer
    queryset = models.User_Accounts.objects.all()

