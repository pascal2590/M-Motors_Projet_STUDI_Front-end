export interface Client {
    idClient?: number;      // facultatif côté frontend, sera généré par le backend
    nom: string;
    prenom: string;
    email: string;
    password: string;
    telephone?: string;     // facultatif
    adresse?: string;       // facultatif
    dateUpload?: string;    // facultatif, rempli côté backend
}
