import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SucursalModel } from '../models/sucursal-model';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  constructor(private http:HttpClient, private cookieService: CookieService) { }

  getSucursales():Observable<SucursalModel[]>{
    return this.http.get<SucursalModel[]>(`${environment.apiBaseUrl}/api/Sucursal`,
    { 
      headers:{'Authorization':this.cookieService.get('Authorization')}
    }
    );
  }
}
