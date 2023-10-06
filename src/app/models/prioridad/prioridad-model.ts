export interface PrioridadModel{
    id:string;
    sucursalId:string;
    nombre:string;
    descripcion:string;
    tiempoDeAtencion:number;
    nivelDePrioridad:number;
    color:string;
    activo:boolean;
}