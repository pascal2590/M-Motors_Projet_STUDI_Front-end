import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {

    const authService = inject(AuthService);
    const router = inject(Router);

    if (!authService.isLoggedIn()) {

        alert("Vous devez être connecté");

        router.navigate(['/login'], {
            queryParams: {
                returnUrl: state.url
            }
        });

        return false;
    }

    return true;
};
