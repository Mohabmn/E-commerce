import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/authentecation/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-data',
  imports: [ReactiveFormsModule],
  templateUrl: './change-data.component.html',
  styleUrl: './change-data.component.scss'
})
export class ChangeDataComponent {

  constructor(private _AuthService:AuthService , private toastr: ToastrService){}

  private readonly _Router = inject(Router)
  loading: boolean = false

  changeDataForm: FormGroup = new FormGroup({
    name : new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(10)]),
    email : new FormControl(null , [Validators.required , Validators.email]),
    phone : new FormControl(null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),
      })


      updateUserData(){
        if(this.changeDataForm.valid){
         this._AuthService.UpdateLoggeduserdata(this.changeDataForm.value).subscribe({
           next: (res) => {
             console.log(res);
             this.changeDataForm.reset()
             this.toastr.success('User data updated successfully')
             this.loading = false
             this._Router.navigate(['/login'])
           },
           error: (err) => {
             console.log(err);
             this.toastr.error(err.error.message)
             this.loading = false
           }
         })
        }else{
         this.changeDataForm.markAllAsTouched();
        }
       }
}
