import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Inscription }
    from './components/pages/inscription/inscription';

export const routes: Routes = [

    {
        path: '',
        component: Home
    },
    {
        path: 'inscription',
        component: Inscription
    }

];
