from django.urls import include, path
from . import views

urlpatterns = [
    path('', views.main, name='main'),
    path('friends/memories/0', views.PromptView.id_list, name='id_list'),
]
