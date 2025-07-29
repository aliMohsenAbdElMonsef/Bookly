from django.urls import path
from . import views
name_app = 'pages'
urlpatterns = [
    path('',views.homepage,name = 'homepage'),
    path('aboutus/',views.aboutus,name = 'aboutus'),
    path('addbook/',views.addbook,name = 'addbook'),
    path('editbook/<int:book_id>/', views.editbutton, name='editbook'),
    path('forgetpass/',views.forgetpass,name = 'forgetpass'),
    path('login/',views.login,name = 'login'),
    path('signup/',views.signup,name = 'signup'),
    path('books/',views.books,name = 'books'),
    path('mybooks/',views.mybooks,name = 'mybooks'),
]