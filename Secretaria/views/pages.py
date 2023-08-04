from django.shortcuts import render
from Modelos.models import *
from django.http import JsonResponse

# Página del Tablero
def pageTablero(request):
    return render(request, 'tablero.html')

# Página de Estudiantes
def pageEstudiantes(request):
    if request.method == 'GET':
        #estudiantes = Estudiante.objects.filter(eliminado = False)[:50]
        cant_estudiantes = Estudiante.objects.all().count()
        return render(request, 'estudiantes/estdnt_listar.html', {
            #"estudiantes": estudiantes,
            "cant_estudiantes": cant_estudiantes,
        })
    else:
        mensaje = "Este método sólo soporta una petición GET"
        print(mensaje)
        return JsonResponse({'resultado': mensaje})

def pageAgregarEstudiante(request):
    if request.method == 'GET':
        paises = Pais.objects.all()
        generos = Genero.objects.all()
        estados_civiles = EstadoCivil.objects.all()
        discapacidades = Discapacidad.objects.all()
        etnias = Etnia.objects.all()
        provincias = Provincia.objects.all()
        ciudades = Ciudad.objects.filter(provincia_id = 13) # Cantones de la provincia de Los Ríos

        modalidad_estudios = ModalidadEstudio.objects.all()
        jornadas = Jornada.objects.all()
        numeroMatriculas = NumeroMatricula.objects.all()

        grados = Grado.objects.all()
        niveles = Nivel.objects.all()
        paralelos = Paralelo.objects.all()
        especialidades = Especialidad.objects.all()
        periodos = Periodo.objects.order_by('-id')
        estados = Estado.objects.all()

        tipos_anexos = TiposAnexo.objects.all()

        return render(request, 'estudiantes/estdnt_agregar.html', {
            'paises': paises,
            'generos': generos,
            'estados_civiles': estados_civiles,
            'discapacidades': discapacidades,
            'etnias': etnias,
            'provincias': provincias,
            'ciudades': ciudades,
            'modalidad_estudios': modalidad_estudios,
            'jornadas': jornadas,
            'numeroMatriculas': numeroMatriculas,
            'grados': grados,
            'niveles': niveles,
            'paralelos': paralelos,
            'especialidades': especialidades,
            'periodos': periodos,
            'estados': estados,
            'tipos_anexos': tipos_anexos,
        })
    else:
        mensaje = "Este método sólo soporta una petición GET"
        print(mensaje)
        return JsonResponse({'resultado': mensaje})

def pageEditarEstudiante(request, id_estudiante):
    if request.method == 'GET':
        estudiante = Estudiante.objects.get(pk = int(id_estudiante))
        paises = Pais.objects.all()
        generos = Genero.objects.all()
        estados_civiles = EstadoCivil.objects.all()
        discapacidades = Discapacidad.objects.all()
        provincias = Provincia.objects.all()
        ciudades = Ciudad.objects.filter(provincia_id = estudiante.provincia.id)

        modalidad_estudios = list(ModalidadEstudio.objects.all().values())
        jornadas = list(Jornada.objects.all().values())
        numeroMatriculas = list(NumeroMatricula.objects.all().values())

        grados = list(Grado.objects.all().values())
        niveles = list(Nivel.objects.all().values())
        paralelos = list(Paralelo.objects.all().values())
        especialidades = list(Especialidad.objects.all().values())
        periodos = list(Periodo.objects.order_by('-id').values())
        estados = list(Estado.objects.all().values())

        tipos_anexos = list(TiposAnexo.objects.all().values())
        
        return render(request, 'estudiantes/estdnt_editar.html', {
            "estudiante": estudiante,
            "paises": paises,
            "generos": generos,
            "estados_civiles": estados_civiles,
            "discapacidades": discapacidades,
            "provincias": provincias,
            "ciudades": ciudades,

            "modalidad_estudios": modalidad_estudios,
            "jornadas": jornadas,
            "numeroMatriculas": numeroMatriculas,
            "grados": grados,
            "niveles": niveles,
            "paralelos": paralelos,
            "especialidades": especialidades,
            "periodos": periodos,
            "estados": estados,
            "tipos_anexos": tipos_anexos,
        })
    else:
        print("Este método sólo soporta una petición POST")


# Página Docentes
def pageDocentes(request):
    return render(request, 'docentes/docentes.html')


# Página Autoridades
def pageAutoridades(request):
    return render(request, 'autoridades/autoridades.html')


# Página Institución
def pageInstitucionAbout(request):
    return render(request, 'institucion/institucion-sobre-nosotros.html')

def pageInstitucionContacto(request):
    return render(request, 'institucion/institucion-contacto.html')

def pageInstitucionBlogs(request):
    return render(request, 'institucion/institucion-blogs.html')



# Página Reportes
def pageReportesEstudiantes(request):
    return render(request, 'reportes/reportes-estudiantes.html')

def pageReportesDocentes(request):
    return render(request, 'reportes/reportes-docentes.html')

def pageReportesAutoridades(request):
    return render(request, 'reportes/reportes-autoridades.html')


# Página Manual de usuario
def pageManualDeusuario(request):
    return render(request, 'manual-usuario/manual-usuario.html')


# Página Patrocinadores
def pagePatrocinadores(request):
    return render(request, 'patrocinadores/patrocinadores.html')


# Página Perfil
def pagePerfil(request):
    return render(request, 'perfil/perfil.html')


# Página Configuracion
def pageConfiguracion(request):
    return render(request, 'configuracion/configuracion.html')