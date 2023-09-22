import json
import bcrypt
from rest_framework import viewsets
from api.models import Plat, User, Livreur, Commande
from api.serializers import ObtainTokenSerializer, PlatSerializer, UserSerializer, LivreurSerializer, CommandeSerializer, UserRegistrationSerializer
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import permissions, status, views
from rest_framework.response import Response
from rest_framework.response import Response
from api.authentification import JWTAuthentication

#  def get_queryset(self):
#         queryset = super().get_queryset()
#         search_param = self.request.query_params.get('search', None)
#         if search_param:
#             # Filtrer les plats qui contiennent la chaîne de recherche dans le nom ou les ingrédients
#             queryset = queryset.filter(Q(nom__icontains=search_param) | Q(ingredient__icontains=search_param))
#         return queryset
    
# @authentication_classes([JWTAuthentication])
# @permission_classes([IsAuthenticated])
# class UserViewSet(viewsets.ModelViewSet):
#     queryset = User.objects.exclude(id__in=Livreur.objects.values('user'))
#     serializer_class = UserSerializer
# 

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

    def get_queryset(self):
        queryset = super().get_queryset()
        is_livreur_param = self.request.query_params.get('is_livreur', None)
        if is_livreur_param != None:
            if is_livreur_param == 'true':
                queryset = queryset.filter(id__in=Livreur.objects.values('user'))
            else:
                queryset = queryset.exclude(id__in=Livreur.objects.values('user'))
        return queryset

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
    permission_classes = [permissions.AllowAny]
    serializer_class = ObtainTokenSerializer

    # def post(self, request, *args, **kwargs):

    #     mail : str | None  = request.data.get('mail')
    #     password : str | None = request.data.get('password')

    #     if not mail or not password:
    #         return Response({'error': 'Please provide both username and password'}, status=status.HTTP_400_BAD_REQUEST)

    #     mail = request.data.get('mail')

    #     user = User.objects.filter(mail=mail).first()

    #     if not user:
    #         return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        
    #     stored_password = user.password.encode('utf-8') 
    #     password_to_verify = password.encode('utf-8') 

    #     if not bcrypt.checkpw(password_to_verify, stored_password):
    #         return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

    #     # Si l'authentification est réussie :
    #     jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
    #     jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

    #     payload = jwt_payload_handler(user)

    #     payload['id'] = user.id

    #     payload['roles'] = []
    #     for role in user.roles.all():
    #         if role.name == 'admin':
    #             payload['roles'].append('admin')
    #         elif role.name == 'livreur':
    #             payload['roles'].append('livreur')
    #         else:
    #             payload['roles'].append('user')

    #     token = jwt_encode_handler(payload)
    #     return Response(json.dumps({'token': token}), status=status.HTTP_200_OK)        

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
