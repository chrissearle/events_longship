"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.conf.urls.static import (settings, static)
from django.contrib import admin
from events.views import (EventView, AttendeeView)

admin.site.site_header = 'Longship Events Admin'
admin.site.site_title = 'Longship Events'
admin.site.index_title = 'Events Administration'

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^event/(?P<slug>[-\w]+)/attend$', AttendeeView.as_view()),
    url(r'^event/(?P<slug>[-\w]+)/$', EventView.as_view()),
]

if settings.DEBUG is True:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
