import { Routes } from '@angular/router';

import { Home } from './components/home/home';
import { Inscription } from './components/pages/inscription/inscription';
import { VehiculeList } from './components/vehicule-list/vehicule-list';
import { Login } from './components/pages/login/login';

import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { commercialGuard } from './guards/commercial.guard';

export const routes: Routes = [

    // PUBLIC
    {
        path: '',
        component: Home
    },
    {
        path: 'vehicules',
        component: VehiculeList
    },
    {
        path: 'inscription',
        component: Inscription
    },
    {
        path: 'login',
        component: Login
    },

      // ADMIN (STRICT ADMIN ONLY)  
    {
        path: 'admin',
        canActivate: [adminGuard],
        loadComponent: () =>
            import('./components/pages/admin/admin-layout/admin-layout')
                .then(m => m.AdminLayout),
        children: [

            { path: '', pathMatch: 'full', redirectTo: 'dashboard' },

            {
                path: 'dashboard',
                loadComponent: () =>
                    import('./components/pages/admin/admin-dashboard/admin-dashboard')
                        .then(m => m.AdminDashboard)
            },

            {
                path: 'commerciaux',
                loadComponent: () =>
                    import('./components/pages/admin/admin-commerciaux/admin-commerciaux')
                        .then(m => m.AdminCommerciaux)
            },

            {
                path: 'commerciaux/create',
                loadComponent: () =>
                    import('./components/pages/admin/admin-create-commercial/admin-create-commercial')
                        .then(m => m.AdminCreateCommercial)
            }
        ]
    },

      // BACKOFFICE (COMMERCIAL ONLY)    
    {
        path: 'backoffice',
        canActivate: [commercialGuard],
        loadComponent: () =>
            import('./components/pages/commercial/commercial-layout/commercial-layout')
                .then(m => m.CommercialLayout),
        children: [

            { path: '', pathMatch: 'full', redirectTo: 'dashboard' },

            {
                path: 'dashboard',
                loadComponent: () =>
                    import('./components/pages/commercial/commercial-dashboard/commercial-dashboard')
                        .then(m => m.CommercialDashboard)
            },

            {
                path: 'dossiers',
                loadComponent: () =>
                    import('./components/pages/commercial/commercial-dossiers/commercial-dossiers')
                        .then(m => m.CommercialDossiers)
            },

            {
                path: 'dossiers/:id',
                loadComponent: () =>
                    import('./components/pages/commercial/commercial-dossier-detail/commercial-dossier-detail')
                        .then(m => m.CommercialDossierDetail)
            },
            
            {
                path: 'backoffice/dossiers/:id',
                loadComponent: () =>
                    import('./components/pages/commercial/commercial-dossier-detail/commercial-dossier-detail')
                        .then(m => m.CommercialDossierDetail)
            }

        ]
    },

      // ESPACE CLIENT  
    {
        path: 'espace-client',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./components/pages/client/client-layout/client-layout')
                .then(m => m.ClientLayout),
        children: [

            { path: '', pathMatch: 'full', redirectTo: 'dashboard' },

            {
                path: 'dashboard',
                loadComponent: () =>
                    import('./components/pages/client/client-dashboard/client-dashboard')
                        .then(m => m.ClientDashboard)
            },

            {
                path: 'dossiers',
                loadComponent: () =>
                    import('./components/pages/client/client-dossiers/client-dossiers')
                        .then(m => m.ClientDossiersComponent)
            },

            {
                path: 'dossiers/:id',
                loadComponent: () =>
                    import('./components/pages/client/client-dossier-detail/client-dossier-detail')
                        .then(m => m.ClientDossierDetailComponent)
            }
        ]
    },

      // DOSSIERS VÉHICULE (GLOBAL CLIENT ACCESS) 
    {
        path: 'vehicule/:id/achat',
        loadComponent: () =>
            import('./components/dossier-achat/dossier-achat')
                .then(m => m.DossierAchat),
        canActivate: [authGuard]
    },

    {
        path: 'vehicule/:id/lld',
        loadComponent: () =>
            import('./components/dossier-lld/dossier-lld')
                .then(m => m.DossierLld),
        canActivate: [authGuard]
    },

    {
        path: 'vehicule/:id',
        loadComponent: () =>
            import('./components/pages/vehicule-detail/vehicule-detail')
                .then(m => m.VehiculeDetail)
    }
];
