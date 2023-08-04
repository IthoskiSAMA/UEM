from django.db import models


class Rol(models.Model):
    #Secretaria, TICs, SuperUsuario
    nombre = models.CharField(max_length=14, null=False, blank=False)


class Usuario(models.Model):
    nombre = models.CharField(max_length=60, null=False, blank=False)
    rol = models.ForeignKey(Rol, on_delete=models.PROTECT, null=False)
    correo = models.EmailField(max_length=100, null=False, blank=False)
    password = models.CharField(max_length=20, null=False, blank=False)
    class Meta:
        db_table = 'usuario'