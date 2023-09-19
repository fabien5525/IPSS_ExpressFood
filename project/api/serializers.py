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
        fields = ['id', 'nom', 'prenom', 'adresse', 'mail', 'photo', 'tel']

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
    plats = PlatSerializer(many=True)  # Utilisation du champ 'plats' avec many=True7
    
    class Meta:
        model = Commande
        fields = '__all__'


import hashlib
class UserEtMdpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'nom', 'prenom', 'adresse', 'mail', 'photo', 'tel', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.get('password')
        hashed_password = hashlib.sha256(password.encode()).hexdigest()
        validated_data['password'] = hashed_password
        return super().create(validated_data)


from rest_framework import serializers
from hashlib import sha256

class UserEtMdpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'nom', 'prenom', 'adresse', 'mail', 'photo', 'tel', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Hachez le mot de passe avant de l'ajouter à la base de données
        password = validated_data.get('password')
        hashed_password = hashlib.sha256(password.encode()).hexdigest()
        validated_data['password'] = hashed_password
        return super().create(validated_data)

    def validate(self, data):
        email = data.get('mail')
        password = data.get('password')
        user_data = User.objects.filter(mail=email).first()
        if user_data is not None:
            hashed_password = user_data.password
            hashed_input_password = sha256(password.encode()).hexdigest()

            if hashed_password == hashed_input_password:
                return data
            else:
                raise serializers.ValidationError("Mot de passe incorrect.")
        else:
            raise serializers.ValidationError("Utilisateur non trouvé.")