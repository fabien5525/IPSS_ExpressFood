from rest_framework import viewsets
from api.models import Plat, User, Livreur, Commande
from api.serializers import ObtainTokenSerializer, PlatSerializer, UserSerializer, LivreurSerializer, CommandeSerializer, UserRegistrationSerializer
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import permissions, status, views
from rest_framework.response import Response
from rest_framework.response import Response
from api.authentification import JWTAuthentication
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from django_filters import rest_framework as filters

@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
class PlatViewSet(viewsets.ModelViewSet):
    queryset = Plat.objects.all()
    serializer_class = PlatSerializer

class UserFilter(filters.FilterSet):
    is_livreur = filters.BooleanFilter(field_name='is_livreur', method='filter_is_livreur')

    def filter_is_livreur(self, queryset, name, value):
        if (value == 'true'):
            return  queryset.filter(id__in=Livreur.objects.values('user'))
        elif (value == 'false'):
            return queryset.filter(id__in=Livreur.objects.values('user'), is_livreur=False)
        return queryset

@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = UserFilter

    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'is_livreur',
                openapi.IN_QUERY,
                description='Filter by is_livreur',
                type=openapi.TYPE_BOOLEAN,
            ),
        ]
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
class LivreurViewSet(viewsets.ModelViewSet):
    queryset = Livreur.objects.all()
    serializer_class = LivreurSerializer

class CommandeFilter(filters.FilterSet):
    user = filters.CharFilter(method='filter_user')

    def filter_user(self, queryset, name, value):
        return queryset.filter(user_id=value)

@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
class CommandeViewSet(viewsets.ModelViewSet):
    queryset = Commande.objects.all()
    serializer_class = CommandeSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = CommandeFilter

    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'user',
                openapi.IN_QUERY,
                description='Filter by user ID',
                type=openapi.TYPE_STRING,
            ),
        ]
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)



class UserRegistrationView(views.APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save() 
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLoginView(views.APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ObtainTokenSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        username = serializer.validated_data.get('username')
        password = serializer.validated_data.get('password')

        user = User.objects.filter(username=username).first()

        if user is None or not user.custom_chech_password(password):
            return Response({'message': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

        # Generate the JWT token
        jwt_token = JWTAuthentication.create_jwt(user)

        return Response({'token': jwt_token})
