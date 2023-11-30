import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObserverServiceService {

  private bookSubject = new Subject<string>();


  getBookObservable(): Observable<string> {
    return this.bookSubject.asObservable();
  }

      // Observable que otros componentes pueden suscribirse para recibir notificaciones de cambios
      bookChanged$: Observable<string> = this.bookSubject.asObservable();

      subscribeUserToBook(userId: string, bookId: string) {
          // Lógica para suscribir al usuario al libro
          console.log(`Usuario ${userId} suscrito al libro ${bookId}`);
      }
  
      notifyBookChanged(bookId: string) {
          // Lógica para notificar cambios en el libro
          this.bookSubject.next(bookId);
      }
}