import { Routes } from '@angular/router';
import { authguardGuard } from './core/guard/authguard.guard';
import { AuthComponent } from './layout/auth-layout/auth/auth.component';
import { MainComponent } from './layout/main-layout/main/main.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/NotFound/not-found/not-found.component';

export const routes: Routes = [
  
    {path:'' , component:MainComponent, canActivate:[authguardGuard] , children:[
        {path:'', redirectTo:'home',pathMatch:'full'},
        {path:'home' , component:HomeComponent , title: 'Home'},
        {path:'products' , loadComponent:()=>import('./pages/products/product/product.component').then((classes)=>classes.ProductComponent), title: 'Products'},
        {path:'categories' ,loadComponent:()=>import('./pages/categories/categories/categories.component').then((classes)=>classes.CategoriesComponent) , title: 'Categories'},
        {path:'brands' , loadComponent:()=>import('./pages/brands/brands/brands.component').then((classes)=>classes.BrandsComponent) , title: 'Brands'},
        {path:'cart' , loadComponent:()=>import('./pages/cart/cart/cart.component').then((classes)=>classes.CartComponent) , title: 'Cart'},
        {path:'allorders' , loadComponent:()=>import('./pages/allorders/allorders/allorders.component').then((classes)=>classes.AllordersComponent) , title: 'allorders'},
        {path:'wishlist' , loadComponent:()=>import('./pages/wishlist/wishlist/wishlist.component').then((classes)=>classes.WishlistComponent) , title: 'wishlist'},
        {path:'userProfile' , loadComponent:()=>import('./pages/userprofile/userprofile/userprofile.component').then((classes)=>classes.UserprofileComponent) , title: 'User-Profile'},
        {path:'checkout/:c_id' , loadComponent:()=>import('./pages/checkout/checkout/checkout.component').then((classes)=>classes.CheckoutComponent) , title: 'Checkout'},
        {path:'changePassword' , loadComponent:()=>import('./pages/changePassword/change-password/change-password.component').then((classes)=>classes.ChangePasswordComponent) , title: 'change-password'},
        {path:'changeData' , loadComponent:()=>import('./pages/changeData/change-data/change-data.component').then((classes)=>classes.ChangeDataComponent) , title: 'change-Data'},
        {path:'product-details/:p-id', loadComponent:()=>import('./pages/productDetails/productdetails/productdetails.component').then((classes)=>classes.ProductdetailsComponent) , title:'product-details'}
    ]},
    
    {path:'' , component:AuthComponent , children:[
        {path:'login' , loadComponent:()=>import('./pages/login/login/login.component').then((classes)=>classes.LoginComponent) , title: 'Login'},
        {path:'register' , loadComponent:()=>import('./pages/register/register/register.component').then((classes)=>classes.RegisterComponent) , title: 'Register'},
        {path:'**', component:NotFoundComponent , title:'Error'}
    ]}
];
