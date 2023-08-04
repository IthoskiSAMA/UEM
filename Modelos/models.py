from django.db import models

# INFORMACIÓN GENERAL
class Genero(models.Model):
    nombre = models.CharField(max_length=12, null=False, blank=False)
    #class Meta:
    #    db_table = 'genero'

class EstadoCivil(models.Model):
    nombre = models.CharField(max_length=15, null=False, blank=False)
    #class Meta:
    #    db_table = 'estado_civil'

class Discapacidad(models.Model):
    nombre = models.CharField(max_length=2, null=False, blank=False)
    #class Meta:
    #    db_table = 'discapacidad'

class Provincia(models.Model):
    nombre = models.CharField(max_length=50, null=False, blank=False)
    #class Meta:
    #    db_table = 'provincia'

class Ciudad(models.Model):
    nombre = models.CharField(max_length=50, null=False, blank=False)
    provincia = models.ForeignKey(Provincia, on_delete=models.PROTECT)
    #class Meta:
    #    db_table = 'ciudad'

class Pais(models.Model):
    nombre = models.CharField(max_length=35, null=False, blank=False)
    capital = models.CharField(max_length=30, null=False, blank=False)
    #class Meta:
    #    db_table = 'pais'

class Etnia(models.Model):
    nombre = models.CharField(max_length=16, null=False, blank=False)



# Modelo Estudiantes
class Estudiante(models.Model):
    cedula = models.CharField(max_length=13, null=False, blank=False) #requerido
    nombres = models.CharField(max_length=60, null=False, blank=False) #requerido
    apellidos = models.CharField(max_length=60, null=False, blank=False) #requerido
    foto_perfil = models.FileField(upload_to = "fotoEstudiantes/%Y", null=True, blank=True)
    pais = models.ForeignKey(Pais, on_delete=models.PROTECT, null=True)
    fecha_nacimiento = models.DateField(null=True, blank=True)
    genero = models.ForeignKey(Genero, on_delete=models.PROTECT, null=True)
    estado_civil = models.ForeignKey(EstadoCivil, on_delete=models.PROTECT, null=True)
    discapacidad = models.ForeignKey(Discapacidad, on_delete=models.PROTECT, null=True)
    correo = models.EmailField(max_length=100, null=True, blank=True)
    celular = models.CharField(max_length=10, null=True, blank=True)
    provincia = models.ForeignKey(Provincia, on_delete=models.PROTECT, null=True)
    ciudad = models.ForeignKey(Ciudad, on_delete=models.PROTECT, null=True)
    direccion = models.CharField(max_length=150, null=True, blank=True)
    eliminado = models.BooleanField(default=False)
    etnia = models.ForeignKey(Etnia, on_delete=models.PROTECT, null=True)
    #class Meta:
    #    db_table = 'estudiante'




#INFORMACIÓN ACADÉMICA 1/2

class ModalidadEstudio(models.Model):
    nombre = models.CharField(max_length=15, null=False, blank=False)
    #class Meta:
    #    db_table = 'modalidad_estudio'

class Jornada(models.Model):
    nombre = models.CharField(max_length=10, null=False, blank=False)
    #class Meta:
    #    db_table = 'jornada'

class NumeroMatricula(models.Model):
    nombre = models.CharField(max_length=10, null=False, blank=False)
    #class Meta:
    #    db_table = 'numero_matricula'

class Estado(models.Model):
    nombre = models.CharField(max_length=10, null=False, blank=False)
    #class Meta:
    #    db_table = 'estado'

class InformacionAcademica(models.Model):
    estudiante = models.ForeignKey(Estudiante, on_delete=models.CASCADE)
    fecha_ingreso = models.DateField(null=True, blank=True)
    numero_carne = models.CharField(max_length = 10, null=True, blank=True)
    modalidad_estudios = models.ForeignKey(ModalidadEstudio, on_delete=models.PROTECT, null=True)
    jornada = models.ForeignKey(Jornada, on_delete=models.PROTECT, null=True)
    numero_matricula = models.ForeignKey(NumeroMatricula, on_delete=models.PROTECT, null=True)
    estado = models.ForeignKey(Estado, on_delete=models.PROTECT, null=True)
    #class Meta:
    #    db_table = 'informacion_academica'




#INFORMACIÓN ACADÉMICA 2/2

class Grado(models.Model):
    nombre = models.CharField(max_length=15, null=False, blank=False)
    #class Meta:
    #    db_table = 'grado'

class Nivel(models.Model):
    nombre = models.CharField(max_length=50, null=False, blank=False)
    abreviatura = models.CharField(max_length=5, null=False, blank=False)
    #class Meta:
    #    db_table = 'nivel'

class Paralelo(models.Model):
    nombre = models.CharField(max_length=1, null=False, blank=False)
    #class Meta:
    #    db_table = 'paralelo'

class Especialidad(models.Model):
    nombre = models.CharField(max_length=35, null=False, blank=False)
    #class Meta:
    #    db_table = 'especialidad'

class Periodo(models.Model):
    nombre = models.CharField(max_length=4, null=False, blank=False) #4 dígitos
    #class Meta:
    #    db_table = 'periodo'

class Curso(models.Model):
    estudiante = models.ForeignKey(Estudiante, on_delete=models.CASCADE)
    grado = models.ForeignKey(Grado, on_delete=models.PROTECT)
    nivel = models.ForeignKey(Nivel, on_delete=models.PROTECT)
    paralelo = models.ForeignKey(Paralelo, null=True, on_delete=models.PROTECT)
    especialidad = models.ForeignKey(Especialidad, null=True, on_delete=models.PROTECT)
    periodo = models.ForeignKey(Periodo, null=True, on_delete=models.PROTECT)
    estado = models.ForeignKey(Estado, on_delete=models.PROTECT)
    #class Meta:
    #    db_table = 'curso'




#ANEXOS
class TiposAnexo(models.Model):
    nombre = models.CharField(max_length=15, null=False, blank=False)
    #class Meta:
    #    db_table = 'tipos_anexo'

class Anexos(models.Model):
    estudiante = models.ForeignKey(Estudiante, on_delete=models.CASCADE)
    tipo_anexo = models.ForeignKey(TiposAnexo, on_delete=models.PROTECT)
    periodo = models.ForeignKey(Periodo, on_delete=models.PROTECT, null=True)

    def ruta_personalizada(instance, filename):
        path = ""
        if (instance.tipo_anexo.id == 1):
            path = 'anexosEstudiantes/promociones/{0}/{1}'.format(instance.periodo.nombre, filename)
        elif (instance.tipo_anexo.id == 2):
            path = 'anexosEstudiantes/notas_ppe_1/{0}/{1}'.format(instance.periodo.nombre, filename)
        elif (instance.tipo_anexo.id == 3):
            path = 'anexosEstudiantes/notas_ppe_2/{0}/{1}'.format(instance.periodo.nombre, filename)
        elif (instance.tipo_anexo.id == 4):
            path = 'anexosEstudiantes/actas_de_grado/{0}/{1}'.format(instance.periodo.nombre, filename)
        elif (instance.tipo_anexo.id == 5):
            path = 'anexosEstudiantes/titulos/{0}/{1}'.format(instance.periodo.nombre, filename)
        return path

    archivo = models.FileField(upload_to = ruta_personalizada)
    
    #class Meta:
    #    db_table = 'anexo'




#REPRESENTANTE
class Parentezco(models.Model):
    nombre = models.CharField(max_length=20, null=False, blank=False)

class Representante(models.Model):
    estudiante = models.ForeignKey(Estudiante, on_delete=models.CASCADE)
    cedula = models.CharField(max_length = 13, null=False, blank=False) #requerido
    nombres = models.CharField(max_length = 60, null=False, blank=False) #requerido
    apellidos = models.CharField(max_length = 60, null=False, blank=False) #requerido
    parentezco = models.ForeignKey(Parentezco, on_delete=models.PROTECT, null=False, blank=False) #requerido
    pais = models.ForeignKey(Pais, on_delete=models.PROTECT, null=True)
    celular = models.CharField(max_length=10, null=True, blank=True)
    provincia = models.ForeignKey(Provincia, on_delete=models.PROTECT, null=True)
    ciudad = models.ForeignKey(Ciudad, on_delete=models.PROTECT, null=True)
    direccion = models.CharField(max_length = 150, null=True, blank=True)
    #class Meta:
    #    db_table = 'representante'