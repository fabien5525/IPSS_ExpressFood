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



class CommandeEnCoursetView(views.APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ObtainTokenSerializer

    def get(self, request, id):
        try:
            commande = Commande.objects.get(id=id)
            if commande.status == 'en cours':
                serializer = CommandeSerializer(commande)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({"message": "La commande n'est pas en cours."}, status=status.HTTP_404_NOT_FOUND)
        except Commande.DoesNotExist:
            return Response({"message": "Commande introuvable."}, status=status.HTTP_404_NOT_FOUND)
        
from geopy.geocoders import Nominatim
from geopy.distance import geodesic

class LocalisationView(views.APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ObtainTokenSerializer

    def get(self, request, email):
        try:
            user = User.objects.get(email=email)
            
            geolocator = Nominatim(user_agent="service_de_distance_km")
            user_location = geolocator.geocode(user.adresse)
            fixed_location = geolocator.geocode("Champs-Élysées, Paris")
            if user_location and fixed_location:
                distance = geodesic((user_location.latitude, user_location.longitude),
                                    (fixed_location.latitude, fixed_location.longitude)).kilometers
                print(f"Distance entre l'adresse de l'utilisateur et l'adresse fixe : {distance} km")
                return Response({"distance": distance}, status=status.HTTP_200_OK)
            else:
                print("L'une des adresses n'a pas pu être géolocalisée.")
                return Response({"message": "L'une des adresses n'a pas pu être géolocalisée."}, status=status.HTTP_404_NOT_FOUND)
        except:
            return Response({"message": "Commande introuvable."}, status=status.HTTP_404_NOT_FOUND)

class LivreurPrendCommande(views.APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ObtainTokenSerializer

    def get(self, request, email):
        try:
            user = User.objects.get(email=email)
            geolocator = Nominatim(user_agent="service_de_distance_km")
            user_location = geolocator.geocode(user.adresse)
            livreurs = Livreur.objects.exclude(user=user)
            for livreur in livreurs:
                livreur_location = geolocator.geocode(livreur.adresse)
                if user_location and livreur_location:
                    distance = geodesic((user_location.latitude, user_location.longitude),
                                        (livreur_location.latitude, livreur_location.longitude)).kilometers
                    if distance < 10:
                        return Response({"livreur": livreur.id}, status=status.HTTP_200_OK)
                print(f"Distance entre l'adresse de l'utilisateur et l'adresse fixe : {distance} km")
                return Response({"distance": distance}, status=status.HTTP_200_OK)
            else:
                print("L'une des adresses n'a pas pu être géolocalisée.")
                return Response({"message": "L'une des adresses n'a pas pu être géolocalisée."}, status=status.HTTP_404_NOT_FOUND)
        except:
            return Response({"message": "Commande introuvable."}, status=status.HTTP_404_NOT_FOUND)
        
