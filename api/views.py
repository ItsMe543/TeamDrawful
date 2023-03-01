import sys
from rest_framework.response import Response
from rest_framework.decorators import api_view
sys.path.append("team40-22")
from base.models import Item
from base.serializers import ItemSerializer

@api_view(['GET'])
def getData(request):
    items = Item.objects.all()
    serializer = ItemSerializer(items, many=True)
    return Response(serializer.data)
