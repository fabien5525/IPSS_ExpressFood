from rest_framework import serializers
from api.models import Plat,User,Livreur,Commande

# class PersonneSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Personne
#         fields = ['id', 'firstname', 'lastname', 'age']

class PlatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plat
        fields = '__all__'

    def __str__(self):
        return self.nom
    def __unicode__(self):
        return self.nom
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def __str__(self):
        return self.nom
    def __unicode__(self):
        return self.nom
    
class LivreurSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Livreur
        fields = '__all__'

class CommandeSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    userlivreur = UserSerializer()
    plat = PlatSerializer()

    class Meta:
        model = Commande
        fields = '__all__'