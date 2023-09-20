from rest_framework import viewsets
from api.models import Plat, User, Livreur, Commande
from api.serializers import PlatSerializer, UserSerializer, LivreurSerializer, CommandeSerializer, UserRegistrationSerializer
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import permissions, status, views
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.authentication import JWTAuthentication

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

    def post(self, request):
        mail = request.data.get('mail')

        user = User.objects.filter(mail=mail).first()

        if not user:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        
        # check password with bcrypt
        if not user.check_password(request.data.get('password')):
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key})
        
