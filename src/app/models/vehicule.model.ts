export interface Vehicule {
    idVehicule: number;
    marque: string;
    modele: string;
    annee?: number;
    kilometrage?: number;
    prix?: number;
    description?: string;
    typeOffre: 'Vente' | 'Location';
    disponible: boolean;
    dateAjout: string;
}
