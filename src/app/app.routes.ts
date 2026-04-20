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

  
    // ESPACE CLIENT (PROTÉGÉ)
  
    {
        path: 'espace-client',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./components/pages/client/client-layout/client-layout')
                .then(m => m.ClientLayout),
        children: [

            // Redirection par défaut
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'dashboard'
            },

            // DASHBOARD            
            {
                path: 'dashboard',
                loadComponent: () =>
                    import('./components/pages/client/client-dashboard/client-dashboard')
                        .then(m => m.ClientDashboard)
            },


            // DOSSIERS
            {
                path: 'dossiers',
                loadComponent: () =>
                    import('./components/pages/client/client-dossiers/client-dossiers')
                        .then(m => m.ClientDossiersComponent)
            },

            // DETAIL DOSSIER
            {
                path: 'dossiers/:id',
                loadComponent: () =>
                    import('./components/pages/client/client-dossier-detail/client-dossier-detail')
                        .then(m => m.ClientDossierDetailComponent)
            }
        ]


    }
,


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
