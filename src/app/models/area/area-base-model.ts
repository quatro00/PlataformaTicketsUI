export interface AreaBaseModel{
    id:string;
    areaPadreId:string;
    departamentoId:string;
    clave:string;
    nombre:string;
    descripcion:string;
    activo:boolean;
    areasHijas?:AreaBaseModel[];
}