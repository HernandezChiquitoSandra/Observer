import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit{

  usuarioForm: FormGroup;
  usuarioInfo: Usuario | undefined;

  constructor(
    private _authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.usuarioForm = this.fb.group({
      correo: ['', Validators.required],
      passwd: ['', Validators.required]
    })
  }

  ngOnInit(): void {
      
  }

  signIn() {
    console.log(this.usuarioForm)

    console.log(this.usuarioForm.get('nombre')?.value)

    const usuario: Usuario = {
      nombre: this.usuarioForm.get('nombre')?.value,
      direccion: this.usuarioForm.get('direccion')?.value,
      correo: this.usuarioForm.get('correo')?.value,
      passwd: this.usuarioForm.get('passwd')?.value,
      favoritos: [],
      roles: []
    }

    this._authService.loguearUsuario(usuario).subscribe(res => {
      console.log(res);
      localStorage.setItem('token', res.token);
      if(res){
        Swal.fire('Se ha logueado correctamente!', res.message, 'success');
      }
      this.router.navigate(['/']);
    });

    console.log(usuario);
  }

  obtenerInfoUsuario() {
    this._authService.obtenerUsuario().subscribe(
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

}
