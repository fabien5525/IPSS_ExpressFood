# Generated by Django 4.1.11 on 2023-09-20 16:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Plat',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dujour', models.BooleanField(default=False)),
                ('dessert', models.BooleanField(default=False)),
                ('prix', models.IntegerField()),
                ('ingredient', models.CharField(max_length=100)),
                ('nom', models.CharField(max_length=100)),
                ('image', models.ImageField(null=True, upload_to='images/')),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('_id', models.AutoField(primary_key=True, serialize=False)),
                ('nom', models.CharField(max_length=100)),
                ('prenom', models.CharField(max_length=100)),
                ('adresse', models.CharField(max_length=255)),
                ('mail', models.EmailField(max_length=254, unique=True)),
                ('photo', models.ImageField(blank=True, null=True, upload_to='photos/')),
                ('tel', models.CharField(max_length=15)),
                ('password', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Livreur',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('localisation', models.CharField(max_length=100)),
                ('status', models.CharField(max_length=100)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.user')),
            ],
        ),
        migrations.CreateModel(
            name='Commande',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('prix_total', models.IntegerField()),
                ('etat', models.CharField(max_length=100)),
                ('plats', models.ManyToManyField(to='api.plat')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.user')),
                ('userlivreur', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.livreur')),
            ],
        ),
    ]
