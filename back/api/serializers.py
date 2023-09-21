from rest_framework import serializers
from api.models import Plat, User, Livreur, Commande
import bcrypt

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
        fields = '__all__'
    
    def create(self, validated_data):
        plain_password = validated_data['password'].encode('utf-8')
        salt = bcrypt.gensalt()
        validated_data['password'] = bcrypt.hashpw(plain_password, salt).decode('utf-8')
        validated_data['username'] = validated_data['mail']

        user = User.objects.create(**validated_data)
        user.password = ''

        return user