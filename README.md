# UEM
Aplicación web para el control y administración de registros en secretaría

# Packages
```bash
asgiref==3.6.0
django==4.1.5
sqlparse==0.4.3
tzdata==2022.7
python-dateutil
mysqlclient
psycopg2-binary
python-decouple
python-dotenv
```

Nota: Cuando quieras copiar las bibliotecas instaladas en otro entorno virtual, debes hacer lo siguiente:
* Instalar el entorno virtual
```bash
python -m venv envUEM
```
* Copiar las librerías del directorio sites-packages origen
* Pegarlas en el directorio sites.packages destino

# Instalación de la BD
### Configura la conexión a la base de datos desde el archivo settings.py

MySQL

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'db_uem_secretaria',
        'USER': 'root',
        'PASSWORD': '123456',
        'HOST': 'localhost',
        'DATABASE_PORT': '3306',
    }
}
```

PostgreSQL

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'db_uem_secretaria',
        'USER': 'postgres',
        'PASSWORD': '123456',
        'HOST': 'localhost',
        'DATABASE_PORT': '5432',
    }
}
```

Crea y ejecuta las migraciones
```bash
python manage.py makemigrations
python manage.py migrate
```

Instala las semillas
```bash
python manage.py loaddata 00_info_general.json
python manage.py loaddata 01_provincias.json
python manage.py loaddata 02_cantones.json
python manage.py loaddata 03_info_academica.json
python manage.py loaddata 04_info_cursos.json
python manage.py loaddata 05_tipos_anexos.json
python manage.py loaddata 06_periodos.json
python manage.py loaddata 07_paises.json
python manage.py loaddata 08_estudiantes.json
```


# Ejecución de consultas en el shell
### importa las siguientes dependencias
```shell
import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "UEM.settings")
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
from Secretaria.models import *
```

APP_SECRET_KEY = '_Z~I/9Vb8l#+~PtD>;PJPgW?eh^+_x#xyZ3x~D%%I<0mo-&Jq-'