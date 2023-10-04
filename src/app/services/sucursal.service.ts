import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SucursalModel } from '../models/sucursal-model';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { SucursalRequestModel } from '../models/sucursal/sucursal-request';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  constructor(private http:HttpClient, private cookieService: CookieService) { }

  getSucursales():Observable<SucursalModel[]>{
    return this.http.get<SucursalModel[]>(`${environment.apiBaseUrl}/api/Sucursal`,
    { 
      headers:{'Authorization':this.cookieService.get('Authorization')}
    });
  }

  createSucursal(request:SucursalRequestModel):Observable<SucursalModel>{
    return this.http.post<SucursalModel>(`${environment.apiBaseUrl}/api/Sucursal`,request
    ,{headers:{'Authorization':this.cookieService.get('Authorization')}});
  }

  updateSucursal(id:string, request:SucursalRequestModel):Observable<SucursalModel>{
    return this.http.put<SucursalModel>(`${environment.apiBaseUrl}/api/Sucursal/${id}`,request
    ,{headers:{'Authorization':this.cookieService.get('Authorization')}});
  }
}
