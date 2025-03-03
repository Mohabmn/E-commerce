import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../../core/services/orders/payment.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit{

  detailsForm : FormGroup = new FormGroup({
    details : new FormControl(null , Validators.required),
    phone : new FormControl(null , Validators.required),
    city : new FormControl(null , Validators.required)
  })

  cartId!:string
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _PaymentService = inject(PaymentService)
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        console.log(params);
        this.cartId = params.get('c_id')!;
        console.log(this.cartId);
        
      }
    })
  }
  details(){
    console.log(this.detailsForm.value);
    console.log(this.cartId);
    
    if(this.detailsForm.valid){
      this._PaymentService.checkOutSession(this.cartId , this.detailsForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if(res.status == "success"){
            window.open(res.session.url , '_self')
          }
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }
}
