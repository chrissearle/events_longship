from django.contrib import admin
from django.utils import timezone
from django.utils.html import format_html
from import_export import resources, fields
from import_export.admin import ExportActionModelAdmin

from .models import (Event, Attendee, SECTION)


class AttendeeResource(resources.ModelResource):
    name = fields.Field(column_name='Navn')
    main_contact_name = fields.Field(column_name='Navn #1')
    main_contact_phone = fields.Field(column_name='Tlf #1')
    main_contact_email = fields.Field(column_name='E-post #1')
    alt_contact_name = fields.Field(column_name='Navn #2')
    alt_contact_phone = fields.Field(column_name='Tlf #2')
    alt_contact_email = fields.Field(column_name='E-post #2')
    section = fields.Field(column_name='Enhet')
    attending = fields.Field(column_name='Deltaker')
    notes = fields.Field(column_name='Notater')

    class Meta:
        model = Attendee
        exclude = ('id', 'event',)

    def dehydrate_name(self, attendee):
        return attendee.name

    def dehydrate_main_contact_name(self, attendee):
        return attendee.main_contact_name

    def dehydrate_main_contact_phone(self, attendee):
        return attendee.main_contact_phone

    def dehydrate_main_contact_email(self, attendee):
        return attendee.main_contact_email

    def dehydrate_alt_contact_name(self, attendee):
        return attendee.alt_contact_name

    def dehydrate_alt_contact_phone(self, attendee):
        return attendee.alt_contact_phone

    def dehydrate_alt_contact_email(self, attendee):
        return attendee.alt_contact_email

    def dehydrate_section(self, attendee):
        return next(section for (key, section) in SECTION if key == attendee.section)

    def dehydrate_attending(self, attendee):
        if attendee.attending:
            return "Ja"
        else:
            return "Nei"

    def dehydrate_notes(self, attendee):
        return attendee.notes


class AttendeeAdmin(ExportActionModelAdmin):
    resource_class = AttendeeResource

    list_filter = ('event', 'attending', 'section',)
    list_display = ('name', 'attending', 'section',)


admin.site.register(Attendee, AttendeeAdmin)


def format_date(date):
    local_date = timezone.localtime(date)
    return local_date.strftime("%d %b %Y %H:%M")


class EventAdmin(admin.ModelAdmin):
    def start_time_seconds(self, obj):
        return format_date(obj.start_dt)

    start_time_seconds.admin_order_field = 'start_dt'
    start_time_seconds.short_description = 'Start'

    def end_time_seconds(self, obj):
        return format_date(obj.end_dt)

    end_time_seconds.admin_order_field = 'end_dt'
    end_time_seconds.short_description = 'End'

    def deadline_time_seconds(self, obj):
        return format_date(obj.deadline_dt)

    deadline_time_seconds.admin_order_field = 'deadline_dt'
    deadline_time_seconds.short_description = 'Registration Deadline'

    def price_in_nok(self, obj):
        return str(obj.price) + ' NOK'

    price_in_nok.admin_order_field = 'price'
    price_in_nok.short_description = 'Price'

    def public_link(self, obj):
        return format_html("<a href='/{url}'>{url}</a>", url=obj.slug)

    list_display = ('title', 'location', 'start_time_seconds', 'end_time_seconds', 'price_in_nok', 'public_link')
    prepopulated_fields = {"slug": ("title",)}


admin.site.register(Event, EventAdmin)
