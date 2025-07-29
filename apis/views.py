from django.http import HttpResponse
from django.contrib.auth import logout
from django.http import JsonResponse
from .models import Book,User
from django.contrib.auth import login as auth_login, authenticate
from django.shortcuts import redirect,get_object_or_404,render
import json
# Create
def create(request):
    if request.method == 'POST':
        title = request.POST.get('title')
        author = request.POST.get('author')
        category = request.POST.get('category')
        description = request.POST.get('description')
        image = request.FILES.get('image')
        addedbook = Book.objects.filter(title=title).first()
        if addedbook is not None:
            return JsonResponse({'error': 'Cannot add book with the same name'}, status=400)
        book = Book(
            title=title,
            author=author,
            category=category,
            description=description,
            image=image
        )
        book.save()
        return JsonResponse({'message': 'Book added successfully'})
    return JsonResponse({'error': 'Invalid request'}, status=400)
# Delete
def delete(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)  # Load from request.body
            name = data.get('booktitle', '')
            if not name:
                return JsonResponse({"error": "Invalid book name"}, status=400)
            book = Book.objects.filter(title=name).first()
            if not book:
                return JsonResponse({"error": "Book not found"}, status=404)  # Changed status to 404
            book.delete()
            return JsonResponse({"message": "Book deleted successfully"})
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Bad Request!"}, status=400)
# Update
def edit(request):
    if request.method == 'POST':  # Changed 'post' to 'POST'
        try:
            print ("lol")
            data = json.loads(request.body)
            required_fields = ["title"  , "author", "category"]
            if not all(field in data for field in required_fields):
                return JsonResponse({"error": "title, author and category are required"}, status=400)
            name = data.get('title', '')
            if not name:
                return JsonResponse({"error": "Invalid Book name"}, status=400)
            addedbook = Book.objects.filter(title=name).first()
            if addedbook is not None:
                return JsonResponse({"error": "book name is already exist"}, status=400)
            bookid = data.get('bookid' , '')
            book = Book.objects.filter(id=bookid).first()
            if not book:
                return JsonResponse({"error": "Book not Found"}, status=404)  # Changed status to 404
            if 'description' in data:
                book.description = data['description']
            if 'title' in data:
                book.title = data['title']
            if 'category' in data:
                book.category = data['category']
            if 'author' in data:
                book.author = data['author']
            book.save()  
        except json.decoder.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
        except Exception as e:
            
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Bad Request!"}, status=400)
    

# Borrow
def borrow(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            book_title = data.get('bookname', '')
            username = data.get('username', '')
            userid = data.get('userid','')
            if not book_title:
                return JsonResponse({"error": "Invalid book title"}, status=400)
            if not username:
                return JsonResponse({"error": "Invalid user ID"}, status=400)
            book = Book.objects.filter(title=book_title).first()
            if not book:
                return JsonResponse({"error": "Book not found"}, status=404)
            if book.borrower_id:
                return JsonResponse({"error": "Book already borrowed"}, status=400)
            user = User.objects.get(pk=userid)
            book.borrower_id = user
            book.save()
            return JsonResponse({"message": "Book borrowed successfully"})
        except json.decoder.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
    else:
        return JsonResponse({"error": "Bad request"}, status=400) 
    


# login
def login(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            username = data.get('username', '')
            password = data.get('password', '')
            
            # Authenticate the user
            user = authenticate(request, username=username, password=password)
            if user is not None:
                auth_login(request, user)
                return JsonResponse({"message": "Logged in successfully"})
            else:
                return JsonResponse({"error": "Invalid username or password"}, status=403)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Bad request"}, status=400)


# signup
def signup(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            required_fields = ["email", "username", "password", "isadmin"]
            if not all(field in data for field in required_fields):
                return JsonResponse({"error": "Required fields: email, username, password, isadmin"}, status=400)
            email = data.get('email', '')
            username = data.get('username', '')
            password = data.get('password', '')
            confirmpassword = data.get('confirmpassword', '')
            if password != confirmpassword:
                return JsonResponse({"error": "Confirmed password doesn't match"}, status=400)
            if User.objects.filter(username=username).exists():
                return JsonResponse({"error": "Username already exists"}, status=400)
            isadmin = data.get('isadmin', False)
            User.objects.create_user(username=username, email=email, password=password, is_staff=isadmin)
            return JsonResponse({"message": "Signed up successfully"})
        except json.decoder.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Bad request"}, status=400)
# log out
def logout_view(request):
    logout(request)
    next_url = request.GET.get('next', '/')
    if next_url:
        return redirect(next_url)
    return redirect('home')  # Redirect to the home page if next_url is not safe or not provided
# unborrow
def unborrow(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            bookname = data.get('book_title','')
            book=Book.objects.filter(title=bookname).first()
            book.borrower_id = None
            book.save()
            print(bookname)
            return JsonResponse({"msg":"unborrowed successfully"})
        except json.decoder.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Bad request"}, status=400)


