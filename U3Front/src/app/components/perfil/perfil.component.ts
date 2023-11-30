import { Component, OnInit } from '@angular/core';
import { Libro } from 'src/app/models/libro';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { BiblioService } from 'src/app/services/biblio.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuarioInfo: Usuario | undefined;
  usuarioFavs: {libroId: string ,libroTitl: string }[] | undefined;
  esAdmin = false;

  constructor (public authService: AuthService,
    private _biblioService: BiblioService) {}

  ngOnInit(): void {
    this.obtenerInfoUsuario();
    this.verFavoritos();
  }

  obtenerInfoUsuario() {
    this.authService.obtenerUsuario().subscribe(
      (data) => {
        this.usuarioInfo = data;
        // Verificar si el usuario tiene el rol 'admin'
        if (this.usuarioInfo.roles.includes('admin')) {
          // Realizar acciones específicas para usuarios con rol 'admin'
          console.log(this.usuarioInfo.roles);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  verFavoritos() {
    this._biblioService.verFavoritos().subscribe(
      (data) => {
        this.usuarioFavs = data;
        console.log(this.usuarioFavs);
        
      },
      (error) => {
        console.error(error);
      }
    );
  }

  eliminarFavorito(libroId: string) {
    this._biblioService.eliminarFavorito(libroId).subscribe(
      () => {
        // Actualiza la lista de favoritos después de eliminar
        this.verFavoritos();
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
