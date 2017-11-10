from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import (Event)
from .serializers import (EventSerializer, AttendeeSerializer)


class EventView(APIView):
    def get(self, request, slug):
        try:
            return Response(EventSerializer(self.get_object(slug)).data)
        except Event.DoesNotExist:
            return Response('Not found', status=status.HTTP_404_NOT_FOUND)

    def get_object(self, slug):
            return Event.objects.get(slug=slug)


class AttendeeView(APIView):
    def post(self, request, slug):
        try:
            event = Event.objects.get(slug=slug)

            data = {}
            data.update(request.data)
            data.update({"event": event.pk})

            adults = ['LE','RO','FR']

            if data['section'] in adults:
                data['main_contact_name'] = data['name']

            serializer = AttendeeSerializer(data=data)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Event.DoesNotExist:
            return Response('Not found', status=status.HTTP_404_NOT_FOUND)

