from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from .serializers import UserSerializer, LoginSerializer, TopicSerializer, ResourceSerializer, StudyPlanRequestSerializer
from .openai_util import generate_educational_content
from .models import Topic, Resource  # Import the Topic and Resource models
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
import os
import openai

# Register a new user
@api_view(['POST'])
@permission_classes([AllowAny])  # This allows unauthenticated access to this route
def register_user(request):
    """
    Register a new user.
    """
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Login a user and return a JWT token
@api_view(['POST'])
@permission_classes([AllowAny])  # Allow anyone to attempt login, even if they're unauthenticated
def login_user(request):
    """
    Login an existing user and return a JWT token.
    Only registered users can login.
    """
    if request.method == 'POST':
        # Validate login credentials using the LoginSerializer
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            
            # Generate JWT tokens (refresh and access)
            refresh = RefreshToken.for_user(user)
            return Response({
                "access": str(refresh.access_token),
                "refresh": str(refresh)
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Generate educational content based on a prompt
@api_view(['POST'])
def get_educational_content(request):
    """
    Generate educational content using OpenAI's model based on the provided prompt.
    """
    prompt = request.data.get('prompt', '')
    if not prompt:
        return Response({"error": "No prompt provided."}, status=status.HTTP_400_BAD_REQUEST)
    
    # Generate content using the OpenAI utility function
    generated_content = generate_educational_content(prompt)
    return Response({"content": generated_content}, status=status.HTTP_200_OK)

# List all available topics
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def topic_list(request):
    topics = Topic.objects.all()
    serializer = TopicSerializer(topics, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def resource_list(request):
    resources = Resource.objects.all()
    serializer = ResourceSerializer(resources, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_ai_resources(request):
    """
    Accepts a topic name and returns AI-generated learning resources or suggestions.
    """
    topic = request.data.get('topic', '')
    if not topic:
        return Response({"error": "No topic provided."}, status=status.HTTP_400_BAD_REQUEST)

    prompt = (
        f"List 3 useful online resources or tips for learning about '{topic}', "
        f"formatted as:\nTitle: ...\nURL: ...\nDescription: ..."
    )

    generated_content = generate_educational_content(prompt)

    # Handle quota or other OpenAI errors
    if isinstance(generated_content, dict) and "error" in generated_content:
        error_message = generated_content["error"]
        if "insufficient_quota" in error_message:
            return Response({"detail": "insufficient_quota"}, status=429)
        return Response({"detail": error_message}, status=500)

    return Response({"resources": generated_content}, status=200)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def generate_study_plan(request):
    serializer = StudyPlanRequestSerializer(data=request.data)
    if serializer.is_valid():
        topic = serializer.validated_data['topic']
        prompt = f"""
        Create a detailed 4-week study plan for learning "{topic}".
        Include weekly goals, recommended resources, daily tasks, and tips.
        """

        try:
            plan = generate_educational_content(prompt)
            if isinstance(plan, dict) and "error" in plan:
                return Response(plan, status=500)
            return Response({'plan': plan}, status=200)

        except Exception as e:
            return Response({'error': str(e)}, status=500)

    return Response(serializer.errors, status=400)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def generate_mental_health_practices(request):
    """
    Generate AI-based mental health practice tips for students.
    Accepts an optional 'level' (e.g., college, high school).
    """
    level = request.data.get('level', 'college')

    prompt = f"""
    Provide 5 simple, AI-recommended daily mental health practices for {level} students.
    Format the list clearly with numbers and short explanations.
    """

    try:
        practices = generate_educational_content(prompt)
        if isinstance(practices, dict) and "error" in practices:
            return Response(practices, status=500)
        return Response({'practices': practices}, status=200)
    except Exception as e:
        return Response({'error': str(e)}, status=500)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def ai_tutor(request):
    """
    Accept a question and return an AI-generated response for tutoring purposes.
    """
    question = request.data.get('question', '')
    if not question:
        return Response({"error": "No question provided."}, status=status.HTTP_400_BAD_REQUEST)

    # Generate response using OpenAI API
    prompt = f"Answer the following question in an educational way: {question}"
    
    try:
        answer = generate_educational_content(prompt)
        if isinstance(answer, dict) and "error" in answer:
            return Response(answer, status=500)
        return Response({"answer": answer}, status=200)

    except Exception as e:
        return Response({'error': str(e)}, status=500)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def generate_flashcards(request):
    topic = request.data.get('topic', '')
    if not topic:
        return Response({"error": "No topic provided."}, status=status.HTTP_400_BAD_REQUEST)

    prompt = f"Create 5 flashcards for the topic '{topic}', each with a question on one side and an answer on the other."

    try:
        flashcards = generate_educational_content(prompt)
        if isinstance(flashcards, dict) and "error" in flashcards:
            return Response(flashcards, status=500)
        return Response({'flashcards': flashcards}, status=200)

    except Exception as e:
        return Response({'error': str(e)}, status=500)
    


    
    
