import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioModel } from '../models/usuario/usuario-model';
import { UsuarioListModel } from '../models/usuario/usuario-list-model';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  service:string = 'Usuario'

  constructor(private http:HttpClient) { }

  getAll():Observable<UsuarioListModel[]>{
    return this.http.get<UsuarioListModel[]>(`${environment.apiBaseUrl}/api/${this.service}`);
  }

  create(request:UsuarioModel):Observable<UsuarioModel>{
    return this.http.post<UsuarioModel>(`${environment.apiBaseUrl}/api/${this.service}`,request);
  }

  update(id:string, request:UsuarioModel):Observable<UsuarioModel>{
    return this.http.put<UsuarioModel>(`${environment.apiBaseUrl}/api/${this.service}/${id}`,request);
  }
}
