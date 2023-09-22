import bcrypt
from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class Plat(models.Model):
    
    dujour = models.BooleanField(default=False)
    dessert = models.BooleanField(default=False)
    prix = models.IntegerField()
    ingredient = models.CharField(max_length=1024)
    nom = models.CharField(max_length=100)
    image = models.ImageField(upload_to='images/', null=True)

    def __str__(self):
        return self.nom
    def __unicode__(self):
        return self.nom
    
class Role(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name
    def __unicode__(self):
        return self.name
    
class User(AbstractUser):
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    adresse = models.CharField(max_length=255)
    mail = models.EmailField(unique=True)
    photo = models.ImageField(upload_to='photos/', blank=True, null=True)
    tel = models.CharField(max_length=15)
    password = models.CharField(max_length=100)
    username = models.CharField(unique=True, max_length=100, null=True)
    roles = models.ManyToManyField(Role, blank=True)
    
    REQUIRED_FIELDS = ['nom', 'prenom', 'adresse', 'mail', 'tel', 'password']

    def __str__(self):
        return self.mail
    def __unicode__(self):
        return self.nom
    
    def save(self, *args, **kwargs):
        # Check if the user is being created (not updating an existing user)
        is_new_user = not self.pk
        super().save(*args, **kwargs)

        # Add 'user' by default to new users
        if is_new_user:
            default_role = Role.objects.get(name='user')
            self.roles.add(default_role)

    def custom_chech_password(self, password_to_verify : str):
        return bcrypt.checkpw(password_to_verify.encode('utf-8'), self.password.encode('utf-8'))

class Livreur(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    localisation = models.CharField(max_length=100)
    status = models.CharField(max_length=100)

    def __str__(self):
        return self.user.nom
    
class Commande(models.Model):
    plats = models.ManyToManyField(Plat)
    prix_total = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    userlivreur = models.ForeignKey(Livreur, on_delete=models.CASCADE, null=True)
    etat = models.CharField(max_length=100)

    def __str__(self):
        return self.etat