import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/authentecation/auth.service';


@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent implements OnInit{

  constructor(private _HttpClient:HttpClient , private _AuthService :AuthService , private toastr: ToastrService) { }

  loading: boolean = false



  changePasswordForm: FormGroup = new FormGroup({
      currentPassword : new FormControl(null , [Validators.required]),
      password : new FormControl(null , [Validators.required , Validators.pattern(/^\w{6,}$/)]),
      rePassword : new FormControl(null , [Validators.required]),
    },this.match)

    ngOnInit(): void {
      console.log(this._AuthService.U_token);
      
    }

    changePasswordData(){
      if(this.changePasswordForm.valid){
        this._AuthService.UpdateLoggedUserPassword(this.changePasswordForm.value).subscribe({
          next: (res) => {
            console.log(res);
            this.toastr.success('Password changed successfully')
            this.changePasswordForm.reset()
            this.loading = false
          },
          error: (err) => {
            console.log("error s :",err);
            this.toastr.error("error",err.error.message)
            this.loading = false
          }
        })
      }else {
        this.changePasswordForm.markAllAsTouched();
  
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
