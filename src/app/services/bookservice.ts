import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { IBook } from '../interfaces/Ibook';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private apiUrl = 'http://localhost:3000';
  private bookAddedSubject = new Subject<IBook>();
  constructor(private http: HttpClient) {}

  getBooks(): Observable<IBook[]> {
    return this.http.get<IBook[]>(this.apiUrl + "/books");
  }

  addBook(newBookData: IBook): Observable<IBook> {
    return this.http.post<IBook>(this.apiUrl + "/books", newBookData).pipe(
      tap((addedBook) => {
        this.bookAddedSubject.next(addedBook);
      })
    );
  }

  getBookAddedObservable(): Observable<IBook> {
    return this.bookAddedSubject.asObservable();
  }

  addBookDetails(bookDetails: any): Observable<any> {
    const bookDetailsUrl = `${this.apiUrl}/bookDetails`;
    return this.http.post(bookDetailsUrl, bookDetails);
  }

  getBookDetails(bookId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/bookDetails/${bookId}`);
  }
}