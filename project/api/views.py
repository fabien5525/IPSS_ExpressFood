import pymongo
from rest_framework.response import Response
from rest_framework.decorators import api_view

from api.models import Plat,User

from .serializers import LivreurSerializer, PlatSerializer, UserSerializer,CommandeSerializer

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login
#Import apiview
from rest_framework.views import APIView

from rest_framework.authtoken.views import ObtainAuthToken
# Example of a viewset
#
# class PersonneViewSet(viewsets.ModelViewSet):
#     queryset = Personne.objects.all()
#     serializer_class = PersonneSerializer

connection_string = "mongodb+srv://user:w9tINkbC2Mie9VwO@cluster0.1ufwe7s.mongodb.net/?retryWrites=true&w=majority"
from pymongo import MongoClient
client = pymongo.MongoClient(connection_string)
db = client['BDProjet']


@api_view(['GET'])
def getAllPlat(request):
    platCollection = db['Plat']
    plats = list(platCollection.find())
    
    serializer = PlatSerializer(plats, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getAllUser(request):
    userCollection = db['Utilisateur']
    user = list(userCollection.find())
    
    serializer = UserSerializer(user, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getAllLivreur(request):

    livreurCollection = db['Livreur']

    formatted_livreurs = []

    # Récupérez les données de l'utilisateur correspondant à l'ID de livreur
    users_collection = db['Utilisateur']
    livreurs = list(livreurCollection.find())

    for livreur in livreurs:
        user_id = livreur.get('id_user')
        user = users_collection.find_one({'id': user_id})
        if user:
            livreur_data = {
                'user': user,
                'localisation': livreur.get('localisation', ''),
                'status': livreur.get('status', ''),
            }
            formatted_livreurs.append(livreur_data)

    # Sérialisez les données des livreurs avec LivreurSerializer
    serializer = LivreurSerializer(formatted_livreurs, many=True)
    return Response(serializer.data)
@api_view(['GET'])
def getAllCommande(request):
    commandeCollection = db['Commande']
    commandes = list(commandeCollection.find())

    users_collection = db['Utilisateur']
 
    plats_collection = db['Plat']
    res = []
    for commande in commandes:
        user_id = commande.get('id_client')
        user = users_collection.find_one({'id': user_id})

        livreur_id = commande.get('id_livreur')
        livreur = users_collection.find_one({'id': livreur_id})

        plat_id = commande.get('id_plat')
        plat = plats_collection.find_one({'id': plat_id})

        if user and livreur:
            commande_data = {
                'plat': plat,
                'nb_plat': commande.get('nb_plat', ''),
                'prix_total': commande.get('prix_total', ''),
                'user': user,
                'userlivreur': livreur,
                'etat': commande.get('etat', '')
            }
            res.append(commande_data)
    
    serializer = CommandeSerializer(res, many=True)
    return Response(serializer.data)



@api_view(['GET'])
def getPlatduJour(request):
    platCollection = db['Plat']
    plats = list(platCollection.find({'dujour': True}))
    
    serializer = PlatSerializer(plats, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
def updatePlatduJour(request, pk):
    
    platCollection = db['Plat']
    plat = platCollection.find_one({'id': pk})
    plat['dujour'] = not plat.get('dujour', False)
    platCollection.update_one({'id': pk}, {'$set': {'dujour': plat['dujour']}})
    updated_plat = platCollection.find_one({'id': pk})
    serializer = PlatSerializer(updated_plat, many=False)

    return Response(serializer.data)