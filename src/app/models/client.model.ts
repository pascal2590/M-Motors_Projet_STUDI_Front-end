export interface Client {
    idClient?: number;      // Sera généré par le backend
    nom: string;
    prenom: string;
    email: string;
    password: string;
    telephone?: string; 
    adresse?: string;  
    dateUpload?: string;   // Facultatif, sera géré par le backend
}
