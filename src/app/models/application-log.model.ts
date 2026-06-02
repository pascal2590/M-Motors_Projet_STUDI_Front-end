export interface ApplicationLog {
    idLog: number;
    niveau: string;
    message: string;
    endpoint?: string;
    utilisateur?: string;
    dateLog: string;
}