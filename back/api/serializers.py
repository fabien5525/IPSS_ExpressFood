from rest_framework import serializers
from api.models import Plat, User, Livreur, Commande
from rest_framework.authtoken.models import Token
import bcrypt

from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver

def hash_password(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

class PlatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plat
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class LivreurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Livreur
        fields = '__all__'

class CommandeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Commande
        fields = '__all__'

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('mail', 'password')
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        validated_data['password'] = hash_password(validated_data['password'])
        user = User.objects.create(**validated_data)

        user.save()

        return user
