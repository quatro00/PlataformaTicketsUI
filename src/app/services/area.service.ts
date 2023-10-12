import { Injectable } from '@angular/core';
import { AreaBaseModel } from '../models/area/area-base-model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  service:string = 'Area'

  constructor(private http:HttpClient) { }

  createAreaBase(request:AreaBaseModel):Observable<AreaBaseModel>{
    return this.http.post<AreaBaseModel>(`${environment.apiBaseUrl}/api/${this.service}/CreateAreaBase`,request);
  }
  createAreaAnidada(request:AreaBaseModel):Observable<AreaBaseModel>{
    return this.http.post<AreaBaseModel>(`${environment.apiBaseUrl}/api/${this.service}/CreateAreaAnidada`,request);
  }
  GetAreasBaseByDepartamento(departamentoId:string):Observable<AreaBaseModel[]>{
    let params = new HttpParams().append('departamentoId', `${departamentoId}`);

    return this.http.get<AreaBaseModel[]>(`${environment.apiBaseUrl}/api/${this.service}/GetAreasBaseByDepartamento`,{params});
  }
  GetAreas(departamentoId:string):Observable<any[]>{
    //let params = new HttpParams().append('departamentoId', `${departamentoId}`);

    return this.http.get<any[]>(`${environment.apiBaseUrl}/api/${this.service}/GetAreas/${departamentoId}`);
  }
}
