import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BooksService } from 'src/app/services/bookservice';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {

  bookForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/), Validators.maxLength(30)]),
    author: new FormControl('',[Validators.required, Validators.pattern(/^[A-Za-z\s]+$/), Validators.maxLength(30)]),
    isbn: new FormControl('', [Validators.required,Validators.pattern(/^[0-9][0-9\s-]*[0-9]$/), Validators.maxLength(20)]),
    coverImage: new FormControl('', Validators.required),
    description: new FormControl(''),
  });

  constructor(private bookService: BooksService, private router: Router) {}

  navigateToHome() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    const { description, ...newBook } = this.bookForm.value;
    if (this.bookForm.valid) {
      this.bookService.addBook(newBook).subscribe();
      this.navigateToHome()
    }

    this.updateBookDetails(description);
    
  }

  isFormValid() {
    return this.bookForm.valid;
  }


  updateBookDetails(newBookDescription: string) {
    this.bookService.getBooks().subscribe((books) => {
      const newBookId = books.length;

      // Create description for the new book
      const newBookDetails = {
        id: newBookId,
        description: newBookDescription,
      };

      // Call the service to update book details
      this.bookService.addBookDetails(newBookDetails).subscribe();
    });
    this.bookForm.reset();
  }

}
