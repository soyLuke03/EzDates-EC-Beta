import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from "rxjs";
import { AuthService } from './auth.service';
 
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authService:AuthService){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.authService.isAuthenticated()
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        if (this.authService.isAuthenticated()){
          return true;
        } else {
          
          this.router.navigate(['/logs/login']);
        }
        return false;
        
    
      }
 
}