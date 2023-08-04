from django.shortcuts import render


def pageIndex(request):
    return render(request, 'sitio_web/index.html')

def pageSobreNosotros(request):
    return render(request, 'sitio_web/sobre_nosotros.html')

def pageContacto(request):
    return render(request, 'sitio_web/index.html')

def pageBlogs(request):
    return render(request, 'sitio_web/index.html')