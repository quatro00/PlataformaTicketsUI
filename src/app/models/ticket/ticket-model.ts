export class TicketModel{
    id:string;
    folio:number;
    solicitante:string;
    subcategoria:string;
    categoria:string;
    sucursal:string;
    departamento:string;
    area:string;
    titulo:string;
    prioridad:string;
    nivelDePrioridad:number;
    color:string;
    estatus:string;
    fechaCreacion:string;
    estatusColor:string;
    descripcion:string;
    archivos:TicketArchivoModel[];
    comentarios:TicketComentarioModel[];
    asignados:TicketUsuarioAsignadoModel[];
    materiales:TicketMaterialModel[];
}

export class TicketArchivoModel{
    id:string;
    UsuarioId:string;
    nombre:string;
    nombreFisico:string;
    tamano:number;
    fecha:string;
}

export class TicketComentarioModel{
    fecha:string;
    id:string;
    nombre:string;
    texto:string;
}

export class TicketUsuarioAsignadoModel{
    id:string;
    nombre:string;
}

export class TicketMaterialModel{
    id:string;
    concepto:string;
    tipo:string;
    unidad:string;
    cantidad:number;
    precio:number;
}