from django.contrib import admin

# Register your models here.
from drawfulApp import models

########## Example Class ##########
#class TodoAdmin(admin.ModelAdmin):
#    list_display = ('title', 'description', 'completed')

class PromptAdmin(admin.ModelAdmin):
    list_display = ('id', 'prompt', 'promptGenre', 'alreadyUsed', 'previousWinner')

# Register your models here.
#admin.site.register(Todo, TodoAdmin)
admin.site.register(models.Prompt_List, PromptAdmin)