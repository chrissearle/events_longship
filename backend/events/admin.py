from django.contrib import admin
from django.utils import timezone
from django.utils.html import format_html
from .models import (Event, Attendee)
from import_export.admin import ExportActionModelAdmin


class AttendeeAdmin(ExportActionModelAdmin):
    list_filter = ('event',)
    list_display = ('name', 'attending', 'section')


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

