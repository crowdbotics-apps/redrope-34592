# Generated by Django 2.2.28 on 2022-06-25 13:07

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('home', '0023_favoriteevent'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='favoriteevent',
            unique_together={('user', 'event')},
        ),
    ]