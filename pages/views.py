from django.shortcuts import render,redirect
from apis.models import Book
from django.shortcuts import redirect,get_object_or_404,render
from apis.forms import EditBook

def homepage(request):
    return render(request,'pages/home.html')
def aboutus(request):
    return render(request,'pages/AboutUs.html')
def addbook(request):
    return render(request,'pages/Add-Book.html')

def books(request):
    return render(request,'pages/books.html',{"books":Book.objects.all()})
def editbutton(request, book_id):
    print("lol")
    book = get_object_or_404(Book, id=book_id)
    if request.method == 'POST':
        form = EditBook(request.POST, instance=book)
        if form.is_valid():
            form.save()
            return redirect('/books')  # Redirect to a 'view' page after successful update
        else:
            return render(request, 'pages/edit.html', {'form': form, 'book': book})
    
    # Handle GET request
    form = EditBook(instance=book)
    return render(request, 'pages/edit.html', {'form': form, 'book': book})



def forgetpass(request):
    return render(request,'pages/forgetPassword.html')
def login(request):
    return render(request,'pages/login.html')
def mybooks(request):
    if request.user.is_authenticated:
        user = request.user
        user_books = Book.objects.filter(borrower_id=user)
        return render(request, 'pages/mybooks.html', {"books": user_books})
    else:
        return redirect('login')
def signup(request):
    return render(request,'pages/sign-up.html')
