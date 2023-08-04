from django.shortcuts import render, redirect
from django.http import JsonResponse
from Inicio.models import Usuario
from cryptography.fernet import Fernet
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import random
import string
import os


def pageLogin(request):
    return render(request, 'autenticacion/login.html')

def pageRecuperarPassword(request):
    return render(request, 'autenticacion/recuperar-password.html')

def getJsonIniciarSesion(request):
    if request.method == 'POST':
        key=Fernet.generate_key()
        contrasena_cifrada=Fernet(key)
        correo = request.POST['inputCorreo']
        password = request.POST['inputPassword']

        usuario = Usuario.objects.filter(correo = correo, password = password).first()
        if usuario:
            request.session['usuarioID'] = usuario.id
            request.session['usuarioNombre'] = usuario.nombre
            request.session['usuarioRol'] = usuario.rol.nombre
            return JsonResponse({'resultado': 1})
        return JsonResponse({'resultado': 0})
        
    else:
        return JsonResponse({'resultado': "Este método sólo soporta una petición POST"})

def generate_random_password(length=8):
    characters = string.ascii_letters + string.digits
    password = ''.join(random.choice(characters) for _ in range(length))
    return password

def send_email_with_password(email, password):
    message = Mail(
        from_email='ithoski.sama@gmail.com',  # Tu dirección de correo electrónico
        to_emails=email,
        subject='Tu nueva contraseña',
        plain_text_content=f'Tu nueva contraseña es: {password}'
    )
    
    try:
        sg = SendGridAPIClient(api_key=os.environ.get('SENDGRID_API_KEY'))
        response = sg.send(message)
        print('Correo enviado exitosamente')

    except Exception as e:
        print(f'Error al enviar el correo: {str(e)}')

def getJsonVerificarCorreo(request):
    if request.method == 'POST':
        correo = request.POST['inputCorreo']
        # Deben comprobar que el correo que quiere recuperar la clave exista en la base de datos
        usuario = Usuario.objects.filter(correo = correo).first()
        # Devolver true o falso para indicar que existe o no
        if usuario:
            return JsonResponse({'resultado': True})
        return JsonResponse({'resultado': False})

def getJsonEnviarPasswordXCorreo(request):
    # Enviar la constraseña del usuario al correo registrado
    if request.method == 'POST':
        correo = request.POST['inputCorreo']
        usuario = Usuario.objects.filter(correo = correo).first()
    # Devolver un json de confirmación
    if usuario:
        email_to_send = correo
        generated_password = generate_random_password()
        send_email_with_password(email_to_send, generated_password)
        return JsonResponse({'resultado': True}) # True = Mensaje enviado al correo
    return JsonResponse({'resultado': False})

def cerrarSesion(request):
    if request.session.get('usuarioID'):
        del request.session['usuarioID']
        del request.session['usuarioNombre']
        del request.session['usuarioRol']
        request.session.flush()
    
    return redirect('/')