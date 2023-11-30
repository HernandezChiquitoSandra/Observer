import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { BiblioService } from 'src/app/services/biblio.service';
import { Libro } from 'src/app/models/libro';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  libroForm: FormGroup;
  id: string | null;
  private fileTmp:any;
  titulo = 'Añadir libro';
  fileTypes: { [key: string]: string } = {};

  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    public sanitizer: DomSanitizer,
    private _biblioService: BiblioService,
    private aRoute: ActivatedRoute) {
    this.fileTmp = {};
    this.libroForm = this.fb.group({
      titulo: ['', Validators.required],
      editorial: ['', Validators.required],
      fechpubl: ['', Validators.required],
      gen: ['', Validators.required],
      sinop: ['', Validators.required],
      numpag: ['', Validators.required],
      foto: ['',Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');

    this.fileTypes['foto'] = 'image/jpeg';
  }
  ngOnInit(): void {
    this.obtenerLibros();
  }

  getFile($event: any, fieldName: string): void {
  const [file] = $event.target.files;

  // Asegúrate de que fileTypes[fieldName] exista antes de intentar leerlo
  if (!this.fileTypes[fieldName]) {
    console.error(`Tipo de archivo para ${fieldName} no está configurado.`);
    return;
  }

  // Crea un nuevo Blob con el mismo contenido y establece el nuevo tipo
  const modifiedBlob = new Blob([file], { type: this.fileTypes[fieldName] });

  // Asegúrate de que fileTmp[fieldName] exista antes de intentar asignarle propiedades
  if (!this.fileTmp[fieldName]) {
    this.fileTmp[fieldName] = {};
  }

  this.fileTmp[fieldName].fileRaw = modifiedBlob;
  this.fileTmp[fieldName].fileType = this.fileTypes[fieldName];
}

  sendFiles():void{

    const body = new FormData();

    body.append('titulo',this.libroForm.get('titulo')?.value);
    body.append('editorial',this.libroForm.get('editorial')?.value);
    body.append('fechpubl',this.libroForm.get('fechpubl')?.value);
    body.append('gen',this.libroForm.get('gen')?.value);
    body.append('sinop',this.libroForm.get('sinop')?.value);
    body.append('numpag',this.libroForm.get('numpag')?.value);
    body.append('foto', this.fileTmp['foto'].fileRaw, this.fileTmp['foto'].fileType);

    this._biblioService.guardarLibro(body).subscribe(res => {
      if(res){
        Swal.fire('Se ha registrado el libro!', res.message, 'success');
      }
    });

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

  listLibro: Libro[] = [];


  obtenerLibros() {
    this._biblioService.obtenerLibros().subscribe(data => {
      console.log(data);
      this.listLibro = data;
    },error => {
      console.log(error);
    })
  }

  
}
