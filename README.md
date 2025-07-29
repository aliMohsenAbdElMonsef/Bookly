# 📚 Bookly: Django Book Management System

**Bookly** is a robust, backend-focused library management system built with **Django 5.0**. It handles book inventory, user authentication, and a full borrow/return lifecycle — making it a perfect base for personal collections, institutional libraries, or scalable book-sharing platforms.

---

## 📌 Overview

Bookly simplifies and automates the management of books with key features like:

- ✅ User authentication (Admin & Regular users)
- 📖 Book creation, editing, and deletion with cover image support
- 🔄 Borrow and return system using relational logic
- 🛠️ Admin dashboard for easy backend management

Designed with clean, modular architecture to support frontend integration and API extension.

---

## 🚀 Key Features

### 🧑‍💻 User Authentication
- **Signup/Login** using Django sessions (no JWT)
- Role-based access with `is_staff` for admin capabilities

### 📖 Book Management
- Create new books with cover images (`/create`)
- Edit and delete books (`/edit`, `/delete`)
- Unique title validation via Django `ModelForm`

### 🔄 Borrowing System
- Assign books to users via `borrower_id` foreign key (`/borrow`)
- Unassign on return (`/unborrow`)
- Book availability inferred from `borrower_id is None`

### 🛠️ Admin Interface
- Pre-configured **Django Admin** panel
- Full control over users, books, and borrowing records

---

## ⚙️ Technical Highlights

| Layer         | Technology               |
|---------------|---------------------------|
| Backend       | Django 5.0                |
| Database      | SQLite + Django ORM       |
| Authentication| Django Sessions           |
| Security      | CSRF protection, Password hashing |
| File Uploads  | Django `ImageField`       |

---

## 🔍 Borrowing Logic Explained

```python
def borrow(request):
    book = Book.objects.get(title=request.POST['bookname'])
    book.borrower_id = request.user  # Sets FK to current user
    book.save()
