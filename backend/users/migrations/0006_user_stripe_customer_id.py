# Generated by Django 2.2.28 on 2022-06-21 21:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_auto_20220609_1404'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='stripe_customer_id',
            field=models.CharField(blank=True, max_length=80, null=True, verbose_name='Stripe ID'),
        ),
    ]