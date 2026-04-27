import { inject } from '@angular/core';
import {
    CanActivateFn,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

import { AuthService } from '../services/auth';

export const adminGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {

    const authService = inject(AuthService);
    const router = inject(Router);

    // Non connecté
    if (!authService.isLoggedIn()) {

        router.navigate(['/login'], {
            queryParams: {
                returnUrl: state.url
            }
        });

        return false;
    }

    // Vérifie BackOffice
    if (!authService.isBackOffice()) {

        router.navigate(['/']);
        return false;
    }

    return true;
};
