from .models import (Event, Attendee)
from rest_framework import serializers


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = (
            'title', 'slug', 'description', 'start_dt', 'end_dt', 'location', 'price', 'contact_name', 'contact_email',
            'contact_phone')


class AttendeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendee
        fields = ('name', 'event', 'main_contact_name', 'main_contact_phone', 'main_contact_email', 'alt_contact_phone',
                  'alt_contact_name', 'alt_contact_email', 'section', 'attending', 'notes')
