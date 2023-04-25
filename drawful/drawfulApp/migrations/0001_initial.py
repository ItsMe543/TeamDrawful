# Generated by Django 4.1.7 on 2023-04-25 13:20

import django.contrib.auth.models
from django.db import migrations, models
import django.utils.timezone
import django_base64field.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Badges',
            fields=[
                ('badgeName', models.CharField(max_length=20, primary_key=True, serialize=False)),
                ('badgeIcon', django_base64field.fields.Base64Field(blank=True, default='', max_length=3000000, null=True)),
                ('badgeDescription', models.CharField(max_length=500)),
                ('badgeUnlocked', models.BooleanField(default=False)),
                ('badgeDateUnlocked', models.DateField(default=0)),
                ('badgeTimeUnlocked', models.TimeField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Prompt_List',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('prompt', models.CharField(max_length=50)),
                ('promptGenre', models.CharField(max_length=50)),
                ('alreadyUsed', models.BooleanField(default=False)),
                ('previousWinner', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='User_Memories',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('date', models.DateField()),
                ('timeCompleted', models.TimeField()),
                ('difficulty', models.CharField(max_length=10)),
                ('avgRating', models.FloatField(default=0.0)),
                ('timeTaken', models.TimeField()),
                ('prompt', models.CharField(max_length=50)),
                ('drawing', django_base64field.fields.Base64Field(blank=True, default='', max_length=3000000, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='User_Accounts',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('username', models.CharField(max_length=30, unique=True)),
                ('password', models.CharField(blank=True, max_length=10000, null=True)),
                ('first_name', models.CharField(max_length=50)),
                ('last_name', models.CharField(blank=True, max_length=50, null=True)),
                ('email', models.CharField(max_length=320)),
                ('bio', models.CharField(blank=True, max_length=30, null=True)),
                ('profilePicture', django_base64field.fields.Base64Field(blank=True, default='', max_length=3000000, null=True)),
                ('favouriteDraw', django_base64field.fields.Base64Field(blank=True, default='', max_length=3000000, null=True)),
                ('badgesEarned', models.CharField(blank=True, max_length=30, null=True)),
                ('averageRating', models.FloatField()),
                ('currentStreak', models.IntegerField(default=0)),
                ('maxStreak', models.IntegerField(default=0)),
                ('totalStars', models.IntegerField(default=0)),
                ('friends', models.CharField(blank=True, max_length=30, null=True)),
                ('friendRequests', models.CharField(blank=True, max_length=30, null=True)),
                ('last_login', models.DateTimeField(blank=True, null=True)),
                ('is_superuser', models.BooleanField(blank=True, null=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
    ]