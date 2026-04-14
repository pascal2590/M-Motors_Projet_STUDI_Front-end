import { Routes } from '@angular/router';

import { Home } from './components/home/home';
import { Inscription } from './components/pages/inscription/inscription';
import { Login } from './components/pages/login/login';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [

    // HOME PUBLIC
    {
        path: '',
        component: Home
    },

    // INSCRIPTION
    {
        path: 'inscription',
        component: Inscription
    },

    // LOGIN
    {
        path: 'login',
        component: Login
    },

    // ESPACE CLIENT PROTÉGÉ
    {
        path: 'espace-client',
        loadComponent: () =>
            import('./components/pages/client/client-dashboard')
                .then(m => m.ClientDashboard),
        canActivate: [authGuard]
    }

];
