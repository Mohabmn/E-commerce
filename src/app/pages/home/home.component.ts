import { Component, ElementRef, OnDestroy, OnInit, ViewChild, viewChild } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { ICategories } from '../../core/interfaces/categories/ICategories';
import { IProduct } from '../../core/interfaces/products/IProduct';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ProductsService } from '../../core/services/products/products.service';
import { SearchpipePipe } from '../../shared/pipes/searchPipe/searchpipe.pipe';
import {FormsModule} from '@angular/forms'
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/authentecation/auth.service';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/interfaces/wishlist/wishlist.service';

@Component({
  selector: 'app-home',
  imports: [CarouselModule , SearchpipePipe, FormsModule , RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit , OnDestroy{

  searchinput:string=''

   staticCrousol: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: false,
      dots: false,
      autoplay:true,
      autoplayTimeout:2000,
      smartSpeed:900,
      navSpeed:700,
      navText: ['', ''],
      responsive: {
        0: {
          items: 1
        },
       
      },
      nav: false
    }

    dynamicCrousol: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: false,
      dots: false,
      autoplay:true,
      autoplayTimeout:2000,
      smartSpeed:900,
      navSpeed: 700,
      navText: ['', ''],
      responsive: {
        0: {
          items: 1
        },
        400: {
          items: 2
        },
        740: {
          items: 3
        },
        940: {
          items: 4
        }
      },
      nav: true
    }

  

  productData!:IProduct[]
  productsSub!:Subscription
  categoriesData!:ICategories[]
 constructor(private _ProductsService:ProductsService ,private _CategoriesService:CategoriesService ,private _AuthService:AuthService, private _CartService:CartService , private toastr: ToastrService , private _WishlistService:WishlistService){}
  ngOnInit(): void {
    this._AuthService.decodeUserToken()

    this._CategoriesService.getAllCategories().subscribe({
      next:(res)=>{
        this.categoriesData=res.data
        console.log(this.categoriesData);
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
   this.productsSub = this._ProductsService.getAllProducts().subscribe({
    next:(res)=>{
      this.productData=res.data
      console.log(this.productData);
    },
    error:(err)=>{
      console.error(err)
    }
   })
 }

 addTocart(p_id:string){
  this._CartService.AddProductToCart(p_id).subscribe({
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

 addToWishlist(p_id:string , e:Event){
 
  this._WishlistService.AddProductToWishlist(p_id ).subscribe({
   next:(res)=>{
     console.log(res);
    
     this.toastr.success('Product added to wishlist successfully!',"",
      {
        closeButton:true,
        timeOut:5000,
        
      })
      let hearticon = e.target as HTMLElement
      hearticon.classList.add('heart')
      
   },
   error:(err)=>{
     console.log(err);
     this.toastr.error('Failed to add product to cart!')

   }
  })
 }


 ngOnDestroy(): void {
   this.productsSub?.unsubscribe()
 }
}
