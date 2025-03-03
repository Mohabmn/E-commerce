import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/environment/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private readonly _PLATFORM_ID= inject(PLATFORM_ID)
  UserToken:any

 constructor(private _HttpClient:HttpClient) {
     if(isPlatformBrowser(this._PLATFORM_ID)){
       this.UserToken ={token : sessionStorage.getItem('token')}
     }
     else(
       this.UserToken ={token : null}
     )
    }
  

  AddProductToWishlist(p_id:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/wishlist`,{"productId":p_id},{headers :this.UserToken})
  }

  GetLoggedUserWishlist():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/wishlist`,{headers :this.UserToken})
  }

  removeProductFromWishlist (p_id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${p_id}`,{headers :this.UserToken})
  }
}
