import pymongo
from rest_framework.response import Response
from rest_framework.decorators import api_view

from api.models import Plat,User

from .serializers import LivreurSerializer, PlatSerializer, UserSerializer,CommandeSerializer,UserEtMdpSerializer

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login
#Import apiview
from rest_framework.views import APIView

from rest_framework.authtoken.views import ObtainAuthToken

import os
from dotenv import load_dotenv

load_dotenv()

connection_string = os.getenv("connection_string")


# Example of a viewset
#
# class PersonneViewSet(viewsets.ModelViewSet):
#     queryset = Personne.objects.all()
#     serializer_class = PersonneSerializer

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

        plat_ids = commande.get('id_plats', [])
        plats = []

        for plat_id in plat_ids:
            plat = plats_collection.find_one({'id': plat_id})
            if plat:
                plats.append(plat)
        
        if user and livreur:
            commande_data = {
                'plats': plats,  # Liste des plats associés
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

@api_view(['POST'])
def CreerCommande(request):
    commandeCollection = db['Commande']
    commande = request.data
    commandeCollection.insert_one(commande)
    return Response(status=status.HTTP_201_CREATED)

@api_view(['POST'])
def Inscription(request):
    if request.method == 'POST':
        serializer = UserEtMdpSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # Cela déclenchera la méthode create avec le hachage du mot de passe
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
def Connexion(request):
    serializer = UserEtMdpSerializer(data=request.data)
    if serializer.is_valid():
        return Response({"message": "Connexion réussie"}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
def SearchPlat(request, nom):
    platCollection = db['Plat']
    query = {"nom": {"$regex": nom, "$options": "i"}}
    plats = list(platCollection.find(query))
    
    serializer = PlatSerializer(plats, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def detailLivreur(request, pk):
    livreurCollection = db['Livreur']
    users_collection = db['Utilisateur']

    livreur = livreurCollection.find_one({'id': pk})
    
    user_id = livreur.get('id_user')
    user = users_collection.find_one({'id': user_id})
    
    if user:
        livreur_data = {
            'user': user,
            'localisation': livreur.get('localisation', ''),
            'status': livreur.get('status', ''),
        }

    serializer = LivreurSerializer(livreur_data, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def detailUtilisateur(request, pk):
    userCollection = db['Utilisateur']
    
    user = userCollection.find_one({'id': pk})
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)