import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateTicketMensajeRequest } from '../models/ticket/create-ticket-mensaje';

@Injectable({
  providedIn: 'root'
})
export class TicketComentarioService {

  service:string = 'TicketComentario'

  constructor(private http:HttpClient) { }

  crear(request:CreateTicketMensajeRequest):Observable<CreateTicketMensajeRequest>{
    return this.http.post<CreateTicketMensajeRequest>(`${environment.apiBaseUrl}/api/${this.service}`,request);
  }
}
