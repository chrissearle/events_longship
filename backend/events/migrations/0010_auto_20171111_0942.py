# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-11-11 08:42
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0009_auto_20171110_0717'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='image',
            field=models.ImageField(blank=True, upload_to='events/images/'),
        ),
        migrations.AddField(
            model_name='event',
            name='invitation',
            field=models.FileField(blank=True, upload_to='events/invites/'),
        ),
    ]
