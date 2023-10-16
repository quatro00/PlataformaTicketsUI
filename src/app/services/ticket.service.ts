import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrearTicketRequest } from '../models/ticket/create-ticket-request';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  service:string = 'Ticket'

  constructor(private http:HttpClient) { }

  crearTicket(request:CrearTicketRequest):Observable<CrearTicketRequest>{
    return this.http.post<CrearTicketRequest>(`${environment.apiBaseUrl}/api/${this.service}/CrearTicket`,request);
  }

}
