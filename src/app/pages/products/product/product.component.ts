import { Component } from '@angular/core';
import { IProduct } from '../../../core/interfaces/products/IProduct';
import { Subscription } from 'rxjs';
import { ICategories } from '../../../core/interfaces/categories/ICategories';
import { ProductsService } from '../../../core/services/products/products.service';
import { CategoriesService } from '../../../core/services/categories/categories.service';
import { AuthService } from '../../../core/services/authentecation/auth.service';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../core/interfaces/wishlist/wishlist.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-product',
  imports: [ FormsModule , RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  
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
