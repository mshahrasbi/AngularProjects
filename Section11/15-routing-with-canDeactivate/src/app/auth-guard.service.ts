
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';


@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

    constructor(private autService: AuthService, private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return this.autService.isAuthenticated()
                .then(
                    (authenticate: boolean) => {
                        if (authenticate) {
                            return true;
                        } else {
                            this.router.navigate(['/']);
                        }
                    }
                );
    }

    canActivateChild(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
            return this.canActivate(route, state);
        }
}