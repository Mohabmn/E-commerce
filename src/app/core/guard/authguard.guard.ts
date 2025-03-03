import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authguardGuard: CanActivateFn = (route, state) => {
  const _Router=inject(Router)

  if(sessionStorage.getItem('token')){
    return true;
  }else{
    _Router.navigate(['/login'])
    return false;
  }
};
