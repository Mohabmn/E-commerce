import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../core/services/products/products.service';
import { IProduct } from '../../../core/interfaces/products/IProduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-productdetails',
  imports: [CarouselModule],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.scss'
})
export class ProductdetailsComponent implements OnInit {
  imageDetailCrousol: OwlOptions = {
   
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay:false,
    autoplayTimeout:2000,
    smartSpeed:900,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
     
    },
    nav: false
  }
  constructor(private _ProductsService:ProductsService, private _CartService:CartService , private toastr: ToastrService){}
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  product_id!:string
  productDetails:IProduct = {} as IProduct
ngOnInit(){
  this._ActivatedRoute.paramMap.subscribe({
    next:(res)=>{
      this.product_id=res.get('p-id')!;
      console.log(this.product_id);
    }
  })

  this._ProductsService.getSpecificProduct(this.product_id).subscribe({
    next:(res)=>{
      console.log(res);
      this.productDetails=res.data;
    },
    error:(err)=>{
      console.log(err);
    }
  })
 
}

addToCart(){
  this._CartService.AddProductToCart(this.product_id).subscribe({
    next:(res)=>{
      console.log(res);
      this.toastr.success('Product added to cart successfully!',"",
        {
          closeButton:true,
          timeOut:5000,
          
        }
      )
    },
    error:(err)=>{
      console.log(err);
      this.toastr.error('Failed to add product to cart!')
    }
  })
}


}
