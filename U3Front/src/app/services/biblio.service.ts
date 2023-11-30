import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ObserverServiceService } from './observer-service.service'
import { Libro } from '../models/libro';
import { Usuario } from '../models/usuario';
import { UserService } from './user.service';
import { AuthService } from './auth.service';

const requestOptions = {
    withCredentials: true,
  };

@Injectable({
  providedIn: 'root'
})
export class BiblioService {
  constructor(private http:HttpClient,private observerService: ObserverServiceService,private userService: UserService, private _authService: AuthService) {  }

  guardarLibro(libro: FormData): Observable<any> {
    return this.http.post('http://localhost:9000/api/lib', libro);
  }

  obtenerLibros(): Observable<any>{
    return this.http.get<any[]>('http://localhost:9000/api/libs',requestOptions);
  }

  obtenerLibro(id: string): Observable<any>{
    return this.http.get('http://localhost:9000/api/libs' + id);
  }

  agregarFavorito(libroId: string, libroTitl: string): Observable<any> {
    const favoritoData = { libroId, libroTitl };

  // Obtén el ID del usuario actual desde el servicio de autenticación
  const usuarioId = this._authService.getUserId();

  if (usuarioId) {
    // Llama al servicio de usuario para suscribir automáticamente al usuario al libro
    this.userService.subscribeUserToBookOnFavoriteAdd(usuarioId, libroId);
  }
  
    return this.http.post('http://localhost:9000/api/favoritos/agregar', favoritoData, requestOptions);
  }

  verFavoritos(): Observable<{ libroId: string, libroTitl: string }[]> {
    return this.http.get<{ libroId: string, libroTitl: string }[]>('http://localhost:9000/api/favoritos/verFav');
  }

  eliminarFavorito(libroId: string): Observable<any> {
    const url = `http://localhost:9000/api/favoritos/eliminar/${libroId}`;
    return this.http.delete(url);
  }

}
