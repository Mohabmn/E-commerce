import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { BrandsService } from '../../../core/services/brands/brands.service';
import { Observable } from 'rxjs';
import { IBrand } from '../../../core/interfaces/brands/ibrand';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit{
  private readonly _BrandsService =inject(BrandsService)
 
  brandsData!:IBrand[]
  brangImage!:string
  brandName!:string
  open:boolean=false
  ngOnInit(): void {
     this._BrandsService.getAllBrands().subscribe({
      next:(res)=>{
        console.log(res);
        this.brandsData = res.data;
        console.log(this.brandsData);
        
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  
  getSpaceficBrand(b_id:string){
    this._BrandsService.getSpacificBrand(b_id).subscribe({
      next:(res)=>{
        console.log(res);
        this.brangImage= res.data.image
        this.brandName = res.data.name
        console.log(this.brandName);
        
        this.showWindow()
       
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  showWindow()
  {
    this.open=true
  }

  closeWindo(e:Event){
   
    if(e.target == e.currentTarget){

      this.open=false
    }
    
  }
}
