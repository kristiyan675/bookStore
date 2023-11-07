import { Component } from '@angular/core';
import { BooksService } from '../../services/bookservice';
import { IBook } from 'src/app/interfaces/Ibook';
import { BookDetailsModalComponent } from '../book-details-modal/book-details-modal.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent {

  books: IBook[] = [];
  searchQuery: string = '';
  filteredBooks: IBook[] = [];
  isTitleAscending: boolean = true;
  isAuthorAscending: boolean = true;
  currentPage: number = 1; 
  itemsPerPage: number = 5;

  constructor(private booksService: BooksService, private dialog: MatDialog) {}

  ngOnInit() {
    this.booksService.getBooks().subscribe((data) => {
      this.books = data;
    })
  
    this.booksService.getBookAddedObservable().subscribe((addedBook) => {
      this.books.push(addedBook);
    });
  }

  openBookDetailsModal(book: IBook) {
    this.dialog.open(BookDetailsModalComponent, {
      data: book // Pass the bookID
      });
  }

  /* 
    If the user is on a page and changs the number of items displayed so that
    there are no more items for his current page we should redirect him to 
    the first page so he doesn't see and empty table
  */ 
  updateItemsPerPage() {
    this.currentPage = 1; 
  }

  // filter book by query
  filterBooks() {
    this.filteredBooks = this.books.filter((book) => {
      const query = this.searchQuery.toLowerCase();
      const titleIncludesQuery = book.title.toLowerCase().includes(query);
      const authorIncludesQuery = book.author.toLowerCase().includes(query);
      return titleIncludesQuery || authorIncludesQuery;
    });
    this.updateItemsPerPage()
  }

  sortByTitleHandler() {
    this.paramsHandler("title")
    this.isTitleAscending = !this.isTitleAscending;
  }
  
  sortByAuthorHandler() {
    this.paramsHandler("author")
    this.isAuthorAscending = !this.isAuthorAscending;
  }

  paramsHandler(param: string) {
    const sortAscending = (array: IBook[]) => {
      array.sort((a, b) => a[param].localeCompare(b[param]));
    };
  
    const sortDescending = (array: IBook[]) => {
      array.sort((a, b) => b[param].localeCompare(a[param]));
    };
    
    /* Check which array to sort
      Sorting is done on the full array of books for better UX 
      so user does not need to sort again when moving to second page
    */ 
    
    const arrayToSort = this.searchQuery ? this.filteredBooks : this.books;

    // Check by what criteria to sort
    if (param === "title") {
      // Check in what order to sort
      if (this.isTitleAscending) {
        sortAscending(arrayToSort);
      } else {
        sortDescending(arrayToSort);
      }
    } else {
      if (this.isAuthorAscending) {
        sortAscending(arrayToSort);
      } else {
        sortDescending(arrayToSort);
      }
    }
  }
  
  
}
