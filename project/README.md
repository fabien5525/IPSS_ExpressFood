# Express Food - API

# Installation de l'appli

## Prérequis

* Python

## Initialiser un .venv

~~~
py -m venv .venv
.\.venv\Scripts\activate
~~~

## Récuperer les packets 

~~~
pip install -r .\requirements.txt
~~~

## Mettre à jour les packets

~~~
pip freeze > requirements.txt
~~~

## Effectuer les migrations

Pas forcément nécéssaire si l'on utilise MongoDB avec Atlas
~~~
py manage.py makemigrations
py manage.py migrate
~~~

# Lancer le serveur 

~~~
py manage.py runserver
~~~