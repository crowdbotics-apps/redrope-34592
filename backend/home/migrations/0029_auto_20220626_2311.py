# Generated by Django 2.2.28 on 2022-06-26 23:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0028_auto_20220626_0105'),
    ]

    operations = [
        migrations.RenameField(
            model_name='event',
            old_name='bottle_service',
            new_name='bottle_services',
        ),
    ]
