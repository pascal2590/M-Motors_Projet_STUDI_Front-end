import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth';

export const commercialGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {

    const auth = inject(AuthService);
    const router = inject(Router);

    // 🔐 1. Non connecté → redirection login
    if (!auth.isLoggedIn()) {

        router.navigate(['/login'], {
            queryParams: {
                returnUrl: state.url
            }
        });

        return false;
    }

    // 🧑‍💼 2. Vérifie rôle Commercial uniquement
    if (!auth.isCommercial()) {

        router.navigate(['/']);
        return false;
    }

    return true;
};
