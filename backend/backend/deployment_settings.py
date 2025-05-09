import os
import dj_database_url
from .settings import *
from .settings import BASE_DIR

ALLOWED_HOSTS = [os.environ.get['RENDER_EXTERNAL_HOSTNAME']]
CSRF_TRUSTED_ORIGINS = ['https://'+ os.environ.get['RENDER_EXTERNAL_HOSTNAME']]

DEBUG = False
SECRET_KEY = os.environ.get['SECRET_KEY']


MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]

"""
CORS_ALLOWS_CREDENTIALS = CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # or whatever port your React app is on
]
"""

STORAGES = {
    "default":{
       "BACKEND" : "django.core.files.storage.FileSystemStorage"
    },
    "staticfiles" : {
      "BACKEND" : "Whitenoise.storage.CompressedStaticFilesStorage",  
    }, 
}


DATABASES = {
     "default": dj_database_url.config(
         default= os.environ['DATABASE_URL'],
         conn_max_age=600
     )

}