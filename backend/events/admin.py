from django.contrib import admin
from django.utils import timezone
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

    def price_in_nok(self, obj):
        return str(obj.price) + ' NOK'

    price_in_nok.admin_order_field = 'price'
    price_in_nok.short_description = 'Price'

    list_display = ('title', 'location', 'start_time_seconds', 'end_time_seconds', 'price_in_nok')
    prepopulated_fields = {"slug": ("title",)}


admin.site.register(Event, EventAdmin)

