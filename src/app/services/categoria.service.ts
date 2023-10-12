import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CategoriaListModel } from '../models/categoria/categoria-list-model';
import { CategoriaModel } from '../models/categoria/categoria-model';
import { Observable } from 'rxjs';
import { AsignarEquipo } from '../models/categoria/asignar-equipo.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  service:string = 'Categoria'

  constructor(private http:HttpClient) { }

  getAll():Observable<CategoriaListModel[]>{
    return this.http.get<CategoriaListModel[]>(`${environment.apiBaseUrl}/api/${this.service}`);
  }

  getCategorias():Observable<CategoriaListModel[]>{
    return this.http.get<CategoriaListModel[]>(`${environment.apiBaseUrl}/api/${this.service}/GetCategorias`);
  }

  create(request:CategoriaModel):Observable<CategoriaModel>{
    return this.http.post<CategoriaModel>(`${environment.apiBaseUrl}/api/${this.service}`,request);
  }

  update(id:string, request:CategoriaModel):Observable<CategoriaModel>{
    return this.http.put<CategoriaModel>(`${environment.apiBaseUrl}/api/${this.service}/${id}`,request);
  }

  asignarEquipo(request:AsignarEquipo):Observable<AsignarEquipo>{
    return this.http.post<AsignarEquipo>(`${environment.apiBaseUrl}/api/${this.service}/asignarequipo`,request);
  }

  desasignarEquipo(request:AsignarEquipo):Observable<AsignarEquipo>{
    return this.http.post<AsignarEquipo>(`${environment.apiBaseUrl}/api/${this.service}/desasignarequipo`,request);
  }
}
