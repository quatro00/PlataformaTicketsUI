import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { SubCategoriaListModel } from '../models/subcategoria/subcategoria-list-model';
import { SubCategoriaModel } from '../models/subcategoria/subcategoria-model';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriaService {
  service:string = 'SubCategoria'

  constructor(private http:HttpClient) { }

  getAll():Observable<SubCategoriaListModel[]>{
    return this.http.get<SubCategoriaListModel[]>(`${environment.apiBaseUrl}/api/${this.service}`);
  }

  create(request:SubCategoriaModel):Observable<SubCategoriaModel>{
    return this.http.post<SubCategoriaModel>(`${environment.apiBaseUrl}/api/${this.service}`,request);
  }

  update(id:string, request:SubCategoriaModel):Observable<SubCategoriaModel>{
    return this.http.put<SubCategoriaModel>(`${environment.apiBaseUrl}/api/${this.service}/${id}`,request);
  }

  getSubCategorias(id:string):Observable<SubCategoriaListModel[]>{
    return this.http.get<SubCategoriaListModel[]>(`${environment.apiBaseUrl}/api/${this.service}/GetSubCategorias/${id}`);
  }
}
