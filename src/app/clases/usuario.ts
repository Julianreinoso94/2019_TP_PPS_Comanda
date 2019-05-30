export interface IUsuario {
    
    nombre:string;
    apellido:string;
    dni:number;
    foto:string
    perfil:string;
    email:string;
    cuil:number;
    id:number;

}

export class Usuario
{
    id:number;
    usuario:string;
    perfil:string;
    constructor(id:number, usuario:string, perfil:string){
        this.id = id;
        this.usuario = usuario;
        this.perfil = perfil;
    }
}




