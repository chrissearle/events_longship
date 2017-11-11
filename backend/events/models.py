from django.db import models


class Event(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=20)
    description = models.TextField()
    start_dt = models.DateTimeField('event start')
    end_dt = models.DateTimeField('event end')
    location = models.CharField(max_length=200)
    price = models.DecimalField(
        max_digits=5,
        decimal_places=2,
    )
    contact_name = models.CharField(
        max_length=200,
    )
    contact_email = models.CharField(
        max_length=200,
    )
    contact_phone = models.CharField(
        max_length=30,
        blank=True
    )
    image = models.ImageField(
        upload_to='events/images/',
        blank=True
    )
    invitation = models.FileField(
        upload_to='events/invites/',
        blank=True
    )

    def __str__(self):
        return self.title


class Attendee(models.Model):
    CUB = 'CU'
    PIONEER = 'PI'
    SCOUT = 'SC'
    ROVER = 'RO'
    LEADER = 'LE'
    FRIEND = 'FR'

    SECTION = (
        (CUB, 'Flokken'),
        (PIONEER, 'Pionerene'),
        (SCOUT, 'Troppen'),
        (ROVER, 'Roverlag'),
        (LEADER, 'Leder'),
        (FRIEND, 'Venn'),
    )

    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    main_contact_name = models.CharField(
        max_length=200,
        blank=True,
    )
    main_contact_phone = models.CharField(
        max_length=30,
        blank=True,
    )
    main_contact_email = models.EmailField(
        max_length=200,
        blank=True,
    )
    alt_contact_phone = models.CharField(
        max_length=30,
        blank=True,
    )
    alt_contact_name = models.CharField(
        max_length=200,
        blank=True,
    )
    alt_contact_email = models.EmailField(
        max_length=200,
        blank=True,
    )
    section = models.CharField(
        max_length=2,
        choices=SECTION,
        default=SCOUT,
    )
    attending = models.BooleanField(
        default='true'
    )
    notes = models.TextField(
        blank=True
    )

    def __str__(self):
        return self.name
