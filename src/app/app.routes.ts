import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Inscription } from './components/pages/inscription/inscription';
import { VehiculeList } from './components/vehicule-list/vehicule-list';

import { Login } from './components/pages/login/login';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: 'vehicules',
        component: VehiculeList
    },


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
    },

    // DOSSIER ACHAT (protégé)

    {
        path: 'vehicule/:id/achat',
        loadComponent: () =>
            import('./components/dossier-achat/dossier-achat')
                .then(m => m.DossierAchat),
        canActivate: [authGuard]
    },

    // DOSSIER LOCATION LLD (protégé)

    {
        path: 'vehicule/:id/lld',
        loadComponent: () =>
            import('./components/dossier-lld/dossier-lld')
                .then(m => m.DossierLld),
        canActivate: [authGuard]
    },


    
    // DETAIL VEHICULE
    {
        path: 'vehicule/:id',
        loadComponent: () =>
            import('./components/pages/vehicule-detail/vehicule-detail')
                .then(m => m.VehiculeDetail)
    }

];
