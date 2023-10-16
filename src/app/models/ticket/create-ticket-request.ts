export class CrearTicketRequest{
    areaId:string[];
    prioridadId:string;
    titulo:string;
    subCategoriaId:string;
    descripcion:string;
    archivos:CrearTicketArchivoRequest[];
}

export class CrearTicketArchivoRequest{
    nombreFisico:string;
    nombre:string;
}