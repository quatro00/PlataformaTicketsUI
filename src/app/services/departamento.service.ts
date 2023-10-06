import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { DepartamentoModel } from '../models/departamento/departamento-model';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  service:string = 'Departamento'

  constructor(private http:HttpClient, private cookieService: CookieService) { }

  getAll():Observable<DepartamentoModel[]>{
    return this.http.get<DepartamentoModel[]>(`${environment.apiBaseUrl}/api/${this.service}`);
  }

  create(request:DepartamentoModel):Observable<DepartamentoModel>{
    return this.http.post<DepartamentoModel>(`${environment.apiBaseUrl}/api/${this.service}`,request
    ,{headers:{'Authorization':this.cookieService.get('Authorization')}});
  }

  update(id:string, request:DepartamentoModel):Observable<DepartamentoModel>{
    return this.http.put<DepartamentoModel>(`${environment.apiBaseUrl}/api/${this.service}/${id}`,request
    ,{headers:{'Authorization':this.cookieService.get('Authorization')}});
  }
}
