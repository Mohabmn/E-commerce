import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from './../../../core/services/authentecation/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  constructor(private _AuthService: AuthService ,private _Router:Router) { }
  check: boolean = false;
  LogedUserName!: string
  loged:boolean = false;

  ngOnInit(): void {
    this._AuthService.decodeUserToken()
    if (this._AuthService.userToken) {

      this.LogedUserName = this._AuthService.userToken.name;
      this.check = true;
    }
    this.updateUserState();

    if(sessionStorage.getItem('token')){
      this.loged = true;
    }
  }

  logOut(){
    this.check=false;
    sessionStorage.removeItem('token');
    this._Router.navigate(['/login']);
    this._AuthService.userToken.name = "";
    this._AuthService.userToken.id = "";
    this._AuthService.userToken.role = "";
    this._AuthService.userToken.iat = 0;
    this._AuthService.userToken.exp = 0;
  }

  updateUserState(): void {
    if (this._AuthService.userToken) {
      this.LogedUserName = this._AuthService.userToken.name;
      this.check = !!this.LogedUserName; 
    } else {
      this.check = false;
    }
  }



}
