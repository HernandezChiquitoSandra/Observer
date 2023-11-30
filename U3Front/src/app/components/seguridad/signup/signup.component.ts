import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service'
import { Usuario } from 'src/app/models/usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  usuarioForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private router: Router
  ) {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      correo: ['', Validators.required],
      passwd: ['', Validators.required]
    })
  }

  ngOnInit() {

  }

  signUp() {
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

    this._authService.registrarUsuario(usuario).subscribe(res => {
      console.log(res);
      localStorage.setItem('token', res.token);
      if(res){
        Swal.fire('Se ha registrado correctamente!', res.message, 'success');
      }
      this.router.navigate(['/']);
    });

    console.log(usuario);
  }
}