import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { Itoken } from '../../interfaces/usertoken/itoken';
import { environment } from './../../../shared/environment/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private readonly _PLATFORM_ID= inject(PLATFORM_ID)

    U_token!:any

  constructor(private _HttpClient:HttpClient) { 
     if(isPlatformBrowser(this._PLATFORM_ID)){
          this.U_token ={token : sessionStorage.getItem('token')}
        }
        else(
          this.U_token ={token : null}
        )
  }
  
  userToken!:Itoken


  decodeUserToken(){
    if(sessionStorage.getItem('token')){
      this.userToken=jwtDecode(sessionStorage.getItem('token') !) 
      console.log(this.userToken);
      console.log(this.userToken.id);
      
    }
  }

  Signup(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup`,data)
  }
  
  signin(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin`,data)
  }

  ForgotPassword(userEmail: string): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`, { "email": userEmail });
  }

  VerifyResetCode(resetCode:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`,{"resetCode":resetCode})
  }

  UpdateLoggedUserPassword(data:object):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/users/changeMyPassword`,data,{headers :this.U_token})
  }

  ResetPassword(data:object):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`,data)
  }

  UpdateLoggeduserdata(data:object):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/users/updateMe/`,data,{headers :this.U_token})
  }
}
