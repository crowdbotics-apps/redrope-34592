# Generated by Django 2.2.28 on 2022-06-25 22:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0025_auto_20220625_2126'),
    ]

    operations = [
        migrations.AddField(
            model_name='usereventregistration',
            name='amount_left',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=8, verbose_name='Amount left'),
        ),
        migrations.AddField(
            model_name='usereventregistration',
            name='amount_paid',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=8, verbose_name='Amount paid'),
        ),
        migrations.AddField(
            model_name='usereventregistration',
            name='interested',
            field=models.BooleanField(default=True, verbose_name='Interested'),
        ),
        migrations.AddField(
            model_name='usereventregistration',
            name='reserved',
            field=models.BooleanField(default=False, verbose_name='Reserved'),
        ),
    ]
