from rest_framework import viewsets
from personne_api.models import Personne
from personne_api.serializers import PersonneSerializer

# Example of a viewset
#
# class PersonneViewSet(viewsets.ModelViewSet):
#     queryset = Personne.objects.all()
#     serializer_class = PersonneSerializer