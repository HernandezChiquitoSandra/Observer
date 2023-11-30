export class Libro{
    _id: string;
    titulo: string;
    editorial: string;
    fechpubl: string;
    gen: string;
    sinop: string;
    numpag: string;
    foto?: string;
    estatus: string;

    constructor(_id: string, titulo: string, editorial: string, fechpubl: string, gen: string, sinop: string, numpag: string, foto: string, estatus: string){
            this.titulo = titulo;
            this.editorial = editorial;
            this.fechpubl = fechpubl;
            this.gen = gen;
            this.sinop = sinop;
            this.numpag = numpag;
            this.foto = foto;
            this._id = _id;
            this.estatus = estatus;
        }
    }