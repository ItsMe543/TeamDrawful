"""drawful URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from drawfulApp import views
from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()
router.register(r'prompts', views.PromptView, 'prompt')
router.register(r'user_memories', views.User_MemoriesView, 'user_memories')
# router.register(r'user_memories/getToday', views.TodaysDrawingView, 'TodaysDrawings')
# router.register(r'user_memories/delete/<int>', views.User_MemoriesDeleteView, 'user_memories_delete')
router.register(r'user_accounts', views.User_AccountsView, 'user_accounts')
router.register(r'badges', views.BadgesView, 'badges')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('', views.main, name="main"),
    path('getLatestDrawing',views.User_MemoriesView.getLatestDrawing),
    path('getTodaysDrawings', views.User_MemoriesView.getTodaysDrawings),
    path('getFriendsByUsername',views.User_AccountsView.getFriendsByUsername),
    path('getUsernameCount',views.User_AccountsView.getUsernameCount),
    path('getEmailCount',views.User_AccountsView.getEmailCount),
    path('authenticateUser',views.User_AccountsView.authenticateUser),
    path('getUserDrawings',views.User_MemoriesView.getUserDrawings),
    path('getTotalDrawings',views.BadgesView.getTotalDrawings),
    path('getUsernames', views.User_AccountsView.getUsernames),
    path('getBadgesEarned',views.User_AccountsView.getBadgesEarned),
    path('getAvgRating', views.User_MemoriesView.getAvgRating),
    path('updateBadges',views.BadgesView.updateBadges),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
