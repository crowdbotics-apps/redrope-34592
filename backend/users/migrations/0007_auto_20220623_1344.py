# Generated by Django 2.2.28 on 2022-06-23 13:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_user_stripe_customer_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='interests',
            field=models.ManyToManyField(blank=True, related_name='interest_users', to='home.Interest', verbose_name='Interest'),
        ),
    ]
