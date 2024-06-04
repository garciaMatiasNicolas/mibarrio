# Generated by Django 5.0.6 on 2024-05-31 22:27

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Users',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('email', models.EmailField(max_length=200, unique=True)),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('dni', models.IntegerField(unique=True)),
                ('user_type', models.CharField(max_length=100)),
                ('profile_photo', models.ImageField(blank=True, null=True, upload_to='media/assets/profile_photos/')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('email_is_confirmed', models.BooleanField(default=False)),
                ('is_admin', models.BooleanField(default=False)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
