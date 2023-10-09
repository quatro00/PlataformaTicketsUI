import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { EquipoListModel } from '../models/equipo/equipo-list-model';
import { EquipoModel } from '../models/equipo/equipo-model';
import { AsignarUsuario } from '../models/equipo/asigna-usuario-model';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {
  service:string = 'Equipo'

  constructor(private http:HttpClient, private cookieService: CookieService) { }

  getAll():Observable<EquipoListModel[]>{
    return this.http.get<EquipoListModel[]>(`${environment.apiBaseUrl}/api/${this.service}`);
  }

  create(request:EquipoModel):Observable<EquipoModel>{
    return this.http.post<EquipoModel>(`${environment.apiBaseUrl}/api/${this.service}`,request);
  }

  update(id:string, request:EquipoModel):Observable<EquipoModel>{
    return this.http.put<EquipoModel>(`${environment.apiBaseUrl}/api/${this.service}/${id}`,request);
  }
  
  asignarAgente(request:AsignarUsuario):Observable<AsignarUsuario>{
    return this.http.post<AsignarUsuario>(`${environment.apiBaseUrl}/api/${this.service}/AgregarAgente`,request);
  }

  asignarSupervisor(request:AsignarUsuario):Observable<AsignarUsuario>{
    return this.http.post<AsignarUsuario>(`${environment.apiBaseUrl}/api/${this.service}/AgregarSupervisor`,request);
  }

  desAsignarUsuario(request:AsignarUsuario):Observable<AsignarUsuario>{
    return this.http.post<AsignarUsuario>(`${environment.apiBaseUrl}/api/${this.service}/DesasignarUsuario`,request);
  }
}