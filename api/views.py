from rest_framework.response import Response
from rest_framework.decorators import api_view
import sys
sys.path.insert(1, '/team40-22/base')
from base.models import Item
from base.serializers import ItemSerializer

@api_view(['GET'])
def getData(request):
    items = Item.objects.all()
    serializer = ItemSerializer(items, many=True)
    return Response(serializer.data)
