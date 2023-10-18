import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrearTicketRequest } from '../models/ticket/create-ticket-request';
import { TicketModel } from '../models/ticket/ticket-model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  service:string = 'Ticket'

  constructor(private http:HttpClient) { }

  crearTicket(request:CrearTicketRequest):Observable<CrearTicketRequest>{
    return this.http.post<CrearTicketRequest>(`${environment.apiBaseUrl}/api/${this.service}/CrearTicket`,request);
  }

  getTicketsByEstatus(estatus:number):Observable<any[]>{
    let params = new HttpParams().append('estatusId', estatus);

    return this.http.get<any[]>(`${environment.apiBaseUrl}/api/${this.service}/GetUsuarioTickets`,{params});
  }

  getTicketsSupervisorByEstatus(estatus:number):Observable<any[]>{
    let params = new HttpParams().append('estatusId', estatus);

    return this.http.get<any[]>(`${environment.apiBaseUrl}/api/${this.service}/GetSupervisorTickets`,{params});
  }

  getSupervisorTicketDetalle(id:string):Observable<TicketModel>{
    return this.http.get<TicketModel>(`${environment.apiBaseUrl}/api/${this.service}/GetSupervisorTicketDetalle/${id}`);
  }
}
