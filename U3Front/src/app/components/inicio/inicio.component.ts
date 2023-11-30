import { Component, OnInit } from '@angular/core';
import { BiblioService } from 'src/app/services/biblio.service';
import { Libro } from 'src/app/models/libro';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPen, faList } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { ObserverServiceService } from 'src/app/services/observer-service.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  faTrash = faTrash;
  faPen = faPen;
  faList = faList;

  listLibros: Libro[] = [];
  librosFiltrados: Libro[] = [];
  dialog: any;
  mostrar?: boolean;

  constructor(private _biblioService: BiblioService,
    private observerService: ObserverServiceService,
    private toastr: ToastrService,
    public sanitizer: DomSanitizer,
    public authService: AuthService) { }
    esAdmin = false;

  ngOnInit(): void {
    this.obtenerLibros();
    this.authService.esAdmin().subscribe(result => {
      this.esAdmin = result;
      console.log(this.esAdmin);
    });
    
    // Suscribirse a cambios en los libros
    this.observerService.getBookObservable().subscribe(bookId => {
      console.log(`Se notificó un cambio en el libro con ID: ${bookId}`);
      // Aquí puedes realizar acciones adicionales en respuesta al cambio en el libro
    });
    
  }

      notificarCambio() {
        // Llama al método del servicio para notificar el cambio
        this.observerService.notifyBookChanged('ID_DEL_LIBRO_A_NOTIFICAR');
    }

  filtrarLibros(event: any) {
    this.librosFiltrados = this.listLibros.filter(libro => libro.titulo.toLowerCase().includes(event.target.value.toLowerCase()));
  }

  obtenerLibros() {
    this._biblioService.obtenerLibros().subscribe(data => {
      console.log(data);
      this.listLibros = data;
    }, error => {
      console.log(error);
    })

  }

  getBufferImageSrc(buffer: ArrayBuffer): SafeUrl {
    const blob = new Blob([buffer]);
    const imageUrl = URL.createObjectURL(blob);
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  getSanitizedImageUrl(base64String: string, imageType: string): SafeUrl {
    const imageUrl = `data:image/${imageType};base64,${base64String}`;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  agregarFavorito(libroId: string, libroTitl: string) {
    this._biblioService.agregarFavorito(libroId, libroTitl).subscribe(
      res => {
        Swal.fire({
          title: "Que gran libro!",
          text: "Ha añadido este libro a su lista de favoritos",
          icon: "success"
        });
      },
      error => {
        Swal.fire({
          title: "Oh no!",
          text: "Ese libro ya está en tus favoritos!",
          icon: "error"
        });
        console.error(error);
      }
    );
  }

}