import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard = () => {

    const router = inject(Router);

    const token = localStorage.getItem('token');

    if (token) {

        return true;

    }
    else {

        alert(
            "⚠️ Vous devez être connecté pour déposer un dossier."
        );

        // Sauvegarder l'URL actuelle
        const currentUrl = router.url;

        // Rediriger vers le formulaire de login avec retour à l'URL après succès
        router.navigate(
            ['/login'],
            {
                queryParams: {
                    returnUrl: currentUrl
                }
            }
        );

        return false;

    }

};
