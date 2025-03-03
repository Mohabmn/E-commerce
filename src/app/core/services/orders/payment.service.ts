import { HttpClient } from '@angular/common/http';
import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/environment/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

 UserToken:any
   private readonly _PLATFORM_ID= inject(PLATFORM_ID)
   constructor(private _HttpClient:HttpClient) {
     if(isPlatformBrowser(this._PLATFORM_ID)){
       this.UserToken ={token : sessionStorage.getItem('token')}
     }
     else(
       this.UserToken ={token : null}
     )
    }


  checkOutSession(c_id:string,data:object):Observable<any>{
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/orders/checkout-session/${c_id}?url=${environment.domain}`
      ,{"shippingAddress":data}
      ,{headers :this.UserToken})
  }

  getUserOrders(userId:string):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/orders/user/${userId}`)
  }

  
}
