# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-11-10 07:17
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0008_auto_20171110_0716'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='contact_phone',
            field=models.CharField(blank=True, max_length=30),
        ),
    ]