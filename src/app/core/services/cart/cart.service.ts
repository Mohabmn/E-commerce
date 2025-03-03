import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/environment/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CartService {
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

  getUserCart():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`,{headers :this.UserToken})
  }

  AddProductToCart(p_id:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`,{"productId": p_id},{headers :this.UserToken})
  }

  RemovespecificcartItem(p_id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${p_id}`,{headers :this.UserToken})
  }

  Clearusercart():Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`,{headers :this.UserToken} )
  }

  UpdateCartProductQuantity(p_id:string , count:number):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${p_id}`,{"count": count},{headers :this.UserToken})
  }
}
