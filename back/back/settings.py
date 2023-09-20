from pathlib import Path
from dotenv import load_dotenv
import os

load_dotenv()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Take environment variables from .env file

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'rest_framework',
    'api',
	'drf_yasg',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]

ROOT_URLCONF = 'back.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'back.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

MONGO_DATABASE = os.environ.get('MONGO_DATABASE')
MONGO_HOSTNAME = os.environ.get('MONGO_HOSTNAME')
MONGO_USERNAME = os.environ.get('MONGO_USERNAME')
MONGO_PASSWORD = os.environ.get('MONGO_PASSWORD')
MONGO_PORT = 27017

# DATABASES = {
#     'default': {
#         'ENGINE': 'djongo',
#         'NAME': MONGO_DATABASE,
#         'ENFORCE_SCHEMA': False,
#         'CLIENT': {
#             'host': MONGO_HOSTNAME,
#             'port': MONGO_PORT,
#             'username': MONGO_USERNAME,
#             'password': MONGO_PASSWORD,
#             'authSource': MONGO_DATABASE,
#             'authMechanism': 'SCRAM-SHA-1'
#         },
#         'LOGGING': {
#             'version': 1,
#             'loggers': {
#                 'djongo': {
#                     'level': 'DEBUG',
#                     'propagate': False,                        
#                 }
#             },
#         },
#     }
# }

# HOST = "mongodb+srv://sampleUser:samplePassword@cluster0-gbdot.mongodb.net/sampleDB?retryWrites=true&w=majority"

MONGO_HOST = f'mongodb+srv://{MONGO_HOSTNAME}:{MONGO_PASSWORD}@{MONGO_HOSTNAME}/{MONGO_DATABASE}?retryWrites=true&w=majority'

DATABASES = {
    'default': {
        'ENGINE': 'djongo',
        'CLIENT': {
            'host': MONGO_HOST,
            'username': MONGO_USERNAME,
            'password': MONGO_PASSWORD,
            'authSource': MONGO_DATABASE,
            'authMechanism': 'SCRAM-SHA-1'
        }
    }
}

# https://jacobsood.medium.com/integrating-mongodb-atlas-with-django-using-djongo-962dfd1513eb
# https://github.com/prasadborkar1109/blog-django-mongodb/blob/master/mongo_engine/settings.py


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/

STATIC_URL = '/static/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field


DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_METHODS = ['GET', 'POST', 'PUT', 'DELETE']