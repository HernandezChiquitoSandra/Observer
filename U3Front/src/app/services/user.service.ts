import { Injectable } from '@angular/core';
import { ObserverServiceService } from './observer-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private bookObserverService: ObserverServiceService) {}

  subscribeUserToBookOnFavoriteAdd(userId: string, bookId: string) {
    // Lógica para suscribir automáticamente al usuario al libro
    this.bookObserverService.subscribeUserToBook(userId, bookId);
  }
}
