export class Usuario{
    _id?: number;
    nombre: String;
    direccion: String;
    correo: String;
    passwd: String;
    favoritos: string[];
    roles: string [];

    constructor(nombre: String, direccion: String, correo: String, passwd: String){
            this.nombre = nombre;
            this.direccion = direccion;
            this.correo = correo;
            this.passwd = passwd;
            this.favoritos = [];
            this.roles = [];
        }
    }