from django.db import models
from django.contrib.auth.models import User
class Book(models.Model):
    image = models.FileField(upload_to='photos/%y/%m/%d')
    title = models.CharField(max_length=50)
    author = models.CharField(max_length=50)
    category = models.CharField(max_length=50)
    description = models.TextField(null=True, blank=True)
    borrower_id= models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    def __str__(self):
        return self.title

