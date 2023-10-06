import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { PrioridadModel } from '../models/prioridad/prioridad-model';
import { PrioridadListModel } from '../models/prioridad/prioridad-list-model';

@Injectable({
  providedIn: 'root'
})
export class PrioridadService {

  service:string = 'Prioridad'

  constructor(private http:HttpClient, private cookieService: CookieService) { }

  getAll():Observable<PrioridadListModel[]>{
    return this.http.get<PrioridadListModel[]>(`${environment.apiBaseUrl}/api/${this.service}`);
  }

  create(request:PrioridadModel):Observable<PrioridadModel>{
    return this.http.post<PrioridadModel>(`${environment.apiBaseUrl}/api/${this.service}`,request);
  }

  update(id:string, request:PrioridadModel):Observable<PrioridadModel>{
    return this.http.put<PrioridadModel>(`${environment.apiBaseUrl}/api/${this.service}/${id}`,request);
  }
}
