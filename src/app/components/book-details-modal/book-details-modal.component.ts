import { Component, Inject} from '@angular/core';
import { IBook } from 'src/app/interfaces/Ibook';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BooksService } from 'src/app/services/bookservice';
@Component({
  selector: 'app-book-details-modal',
  templateUrl: './book-details-modal.component.html',
  styleUrls: ['./book-details-modal.component.css']
})
export class BookDetailsModalComponent {
  // book: IBook
  constructor(
    public dialogRef: MatDialogRef<BookDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public book: IBook,
    private booksService: BooksService
  ) {}
  
  ngOnInit(){
    this.booksService.getBookDetails(this.book.id).subscribe({
      next: (res) => {
        this.book = { ...this.book, description: res.description };
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  closeModal(): void {
    this.dialogRef.close();
  }
}
