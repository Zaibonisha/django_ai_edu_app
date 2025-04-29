from django.urls import path
from .views import (
    register_user,
    login_user,
    topic_list,
    resource_list,
    get_educational_content,
    get_ai_resources,
    generate_study_plan,
    generate_mental_health_practices,
    ai_tutor,
    generate_flashcards
)

urlpatterns = [
    path('register/', register_user, name='register_user'),
    path('login/', login_user, name='login_user'),
    path('topics/', topic_list, name='topic_list'),
    path('resources/', resource_list, name='resource_list'),
    path('generate-content/', get_educational_content, name='generate_content'),
    path('ai-resources/', get_ai_resources, name='get_ai_resources'),
    path('generate-study-plan/', generate_study_plan, name='generate-study-plan'),
    path('mental-health/', generate_mental_health_practices, name='generate-mental-health-practices'),
    path('ai-tutor/', ai_tutor, name='ai_tutor'),
    path('generate-flashcards/', generate_flashcards, name='generate_flashcards'),
]
