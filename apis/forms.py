from django import forms
from .models import Book

class EditBook(forms.ModelForm):
    class Meta:
        model = Book
        fields = ['title', 'author', 'category', 'description', 'image']
    def __init__(self, *args, **kwargs):
        self.instance = kwargs.get('instance')
        super(EditBook, self).__init__(*args, **kwargs)
    def clean_title(self):
        title = self.cleaned_data.get('title')
        if Book.objects.filter(title=title).exclude(id=self.instance.id).exists():
            raise forms.ValidationError("A book with this title already exists.")
        return title
