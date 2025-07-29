from django.urls import path
from .views import create,signup,login,logout_view,borrow,unborrow,delete , edit

urlpatterns = [
    path('create', create),
    path('signup', signup),
    path('login', login),
    path('logout', logout_view),
    path('borrow',borrow),
    path('unborrow',unborrow),
    path('delete',delete),
    path('edit',edit),
]
