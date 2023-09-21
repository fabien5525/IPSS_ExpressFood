import bcrypt
from rest_framework import viewsets
from api.models import Plat, User, Livreur, Commande
from api.serializers import PlatSerializer, UserSerializer, LivreurSerializer, CommandeSerializer, UserRegistrationSerializer
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import permissions, status, views
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import BasePermission
from rest_framework.response import Response
from rest_framework_jwt.settings import api_settings

@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
class PlatViewSet(viewsets.ModelViewSet):
    queryset = Plat.objects.all()
    serializer_class = PlatSerializer
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
class LivreurViewSet(viewsets.ModelViewSet):
    queryset = Livreur.objects.all()
    serializer_class = LivreurSerializer

@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
class CommandeViewSet(viewsets.ModelViewSet):
    queryset = Commande.objects.all()
    serializer_class = CommandeSerializer



class UserRegistrationView(views.APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save() 
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLoginView(views.APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):

        mail : str | None  = request.data.get('mail')
        password : str | None = request.data.get('password')

        if not mail or not password:
            return Response({'error': 'Please provide both username and password'}, status=status.HTTP_400_BAD_REQUEST)

        mail = request.data.get('mail')

        user = User.objects.filter(mail=mail).first()

        if not user:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        
        stored_password = user.password.encode('utf-8') 
        password_to_verify = password.encode('utf-8') 

        if not bcrypt.checkpw(password_to_verify, stored_password):
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        # Si l'authentification est réussie :
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(user)

        payload['roles'] = []
        for role in user.roles.all():
            if role.name == 'admin':
                payload['roles'].append('admin')
            elif role.name == 'livreur':
                payload['roles'].append('livreur')
            else:
                payload['roles'].append('user')

        token = jwt_encode_handler(payload)
        return Response(token)        
