export class UsuarioModel{
    id:string;
    matricula:string;
    nombre:string;
    apellidos:string;
    sucursalId:string;
    correoElectronico:string;
    activo:boolean;
    rolId:string;
}

class RolListModel{
    id:string;
    nombre:string;
}