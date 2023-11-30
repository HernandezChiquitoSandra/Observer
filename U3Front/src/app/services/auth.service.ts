import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Usuario } from '../models/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Libro } from '../models/libro';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {  }

  registrarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post('http://localhost:9000/api/signup', usuario);
  }

  loguearUsuario(usuario: Usuario): Observable<any> {
    return this.http.post('http://localhost:9000/api/signin', usuario);
  }

  obtenerUsuario(): Observable<Usuario> {
    return this.http.get<Usuario>('http://localhost:9000/api/info');
  }

  getUserId(): string | null {
    const token = this.getToken();
    if (token) {
      // Decodifica el token para obtener la información del usuario
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload._id;
    }
    return null;
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
    Swal.fire({
      title: "Adiós!",
      text: "Ha salido de su cuenta correctamente",
      icon: "success"
    });
  }

  getToken() {
    return localStorage.getItem('token');
  }

  esAdmin(): Observable<boolean> {
    // Supongamos que hay un endpoint en tu servidor que devuelve información sobre el usuario actual
    // Puedes ajustar esto según cómo obtienes la información del usuario en tu backend
    return this.http.get<Usuario>('http://localhost:9000/api/info').pipe(
      map((usuario: Usuario) => {
        return usuario && usuario.roles && usuario.roles.includes('admin');
      })
    );
  }

}
