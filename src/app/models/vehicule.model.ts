export interface Vehicule {

    idVehicule: number;

    marque: string;

    modele: string;

    annee?: number;

    kilometrage?: number;

    prix?: number;

    description?: string;

    typeOffre: 'vente' | 'location';

    disponible: boolean;

    dateAjout: string;

    imageUrl?: string;
}