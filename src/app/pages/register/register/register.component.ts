import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/authentecation/auth.service';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private _AuthService:AuthService ,private readonly _Router:Router ){}
  
  loading:boolean = false
  restext:string = ''
  registerForm : FormGroup = new FormGroup({
    name :new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(10)]),
    email :new FormControl(null, [Validators.required , Validators.email]),
    password :new FormControl(null , [Validators.required , Validators.pattern(/^\w{6,}$/)]),
    rePassword :new FormControl(null , Validators.required),
    phone :new FormControl(null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)])
  },this.match)

  showinputs():void{
   
    if(this.registerForm.valid){
      this.loading=true
      console.log(this.registerForm.value);
      console.log(this.registerForm);
      this._AuthService.Signup(this.registerForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          this.loading=false
          this._Router.navigate(['/login']);
        },
        error:(err)=>{
          console.log(err);
          this.restext=err.error.message
          this.loading=false

        }
      })
     
    }else{
      this.registerForm.setErrors({notMatch : true})
      this.registerForm.markAllAsTouched()
    }
  }

  match(group:AbstractControl){
    if(group.get('password')?.value === group.get('rePassword')?.value){
      return null
    }else{
      return {notMatch : true}
    }
  }
}
