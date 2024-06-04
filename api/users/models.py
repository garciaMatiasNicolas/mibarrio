from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser


class UserManager(BaseUserManager):
    def create_user(self, email: str, first_name: str, last_name: str, dni: int, user_type: str, password: str = None,
                    profile_photo=None, email_is_confirmed: bool = False) -> object:

        if not email:
            raise ValueError('User must have an email address')
        if not dni:
            raise ValueError('User must have a DNI')

        user = self.model(
            email=email,
            first_name=first_name,
            last_name=last_name,
            dni=dni,
            user_type=user_type,
            profile_photo=profile_photo,
            email_is_confirmed=email_is_confirmed,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email: str, first_name: str, last_name: str, dni: int, user_type: str,
                         password: str = None) -> object:
        user = self.create_user(
            email=email,
            first_name=first_name,
            last_name=last_name,
            dni=dni,
            user_type=user_type,
            password=password
        )
        user.is_admin = True
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user


class Users(AbstractBaseUser):
    email = models.EmailField(max_length=200, unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    dni = models.IntegerField(unique=True)
    user_type = models.CharField(max_length=100)
    profile_photo = models.ImageField(upload_to="media/assets/profile_photos/", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    email_is_confirmed = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ('first_name', 'last_name', 'dni', 'user_type',)

    def has_perm(self, perm, obj=None) -> bool:
        return True

    def has_module_perms(self, app_label) -> bool:
        return True

    @property
    def is_staff(self) -> object:
        return self.is_admin
