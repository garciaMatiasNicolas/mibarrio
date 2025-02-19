# Generated by Django 5.0.6 on 2024-05-31 22:27

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('neighborhoods', '0001_initial'),
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Notifications',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('file_url', models.URLField()),
                ('penalty', models.CharField(max_length=255)),
                ('term', models.CharField(max_length=255)),
                ('due_date', models.DateTimeField()),
                ('image', models.ImageField(blank=True, null=True, upload_to='media/assets/notifications/')),
                ('observations', models.TextField()),
                ('status', models.CharField(default='pending', max_length=255)),
                ('creator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='notifications', to='users.users')),
                ('property', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='notifications', to='neighborhoods.properties')),
            ],
        ),
    ]
