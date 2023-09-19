from django.db import models

# Example of a model
#
# class Personne(models.Model):
#     firstname = models.CharField(max_length=100)
#     lastname = models.CharField(max_length=100)
#     age = models.IntegerField()

class Plat(models.Model):
    
    dujour = models.BooleanField(default=False)
    dessert = models.BooleanField(default=False)
    prix = models.IntegerField()
    ingredient = models.CharField(max_length=100)
    nom = models.CharField(max_length=100)
    image = models.ImageField(upload_to='images/', null=True)
    id = models.IntegerField(primary_key=True) 

    def __str__(self):
        return self.nom
    def __unicode__(self):
        return self.nom
    
class User(models.Model):
    id = models.IntegerField(primary_key=True)  # Utilisation de l'ID comme clé primaire
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    adresse = models.CharField(max_length=255)
    mail = models.EmailField()
    photo = models.ImageField(upload_to='photos/', blank=True, null=True)
    tel = models.CharField(max_length=15)
    
    
    def __str__(self):
        return self.nom
    def __unicode__(self):
        return self.nom
    

class Livreur(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    localisation = models.CharField(max_length=100)
    status = models.BooleanField(max_length=100)

    def __str__(self):
        return self.user.nom
    
class Commande(models.Model):
    plats = models.ManyToManyField(Plat)
    prix_total = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    userlivreur = models.ForeignKey(Livreur, on_delete=models.CASCADE)
    etat = models.CharField(max_length=100)

    def __str__(self):
        return self.etat
    