import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class AuthGuard implements CanActivate{ 
    constructor(private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) :| Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree  {
        const authToken = localStorage.getItem('access_token');
        if (authToken) {
          return true;
        } else {
          this.router.navigate(['/unauthorize']);
          return false;
        }
    }
    
}