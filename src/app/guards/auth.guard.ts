import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

    const token = localStorage.getItem("token");

    if (token && token !== "undefined") {
        return true;
    }

    window.location.href = "/login";
    return false;
};
