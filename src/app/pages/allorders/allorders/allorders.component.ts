import { AuthService } from './../../../core/services/authentecation/auth.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../../core/services/orders/payment.service';
import { IOrders } from '../../../core/interfaces/allOrders/iorders';

@Component({
  selector: 'app-allorders',
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {
  constructor(private _HttpClient:HttpClient , private _AuthService:AuthService , private _PaymentService:PaymentService){}
 
  orders!:IOrders[]
  userId!:string
  paied!:boolean
  ngOnInit(): void {
    this.userId=this._AuthService.userToken.id
    console.log("user id",this.userId);

    this._PaymentService.getUserOrders(this.userId).subscribe({
      next:(res)=>{
        this.orders = res
        console.log(this.orders);
        this.paied=this.orders[0].isPaid
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

}
