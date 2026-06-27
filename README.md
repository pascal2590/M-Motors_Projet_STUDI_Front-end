# 🚗 M-Motors — Frontend Web

Frontend Angular du projet **M-Motors**, plateforme de vente et location de véhicules d’occasion avec option d’achat.

---

# 📌 Présentation du projet

M-Motors est une application Full Stack permettant :

* la consultation des véhicules,
* la recherche et le filtrage des annonces,
* le dépôt de dossiers d’achat ou de location,
* l’authentification des utilisateurs,
* le suivi des dossiers clients,
* et la gestion du back-office.

Ce dépôt contient uniquement le **frontend Angular** de l’application.

---

# 🛠️ Technologies utilisées

* Angular 20
* TypeScript
* HTML5
* CSS3
* RxJS
* JWT Authentication
* Responsive Design

---

# 📂 Architecture du projet

```bash
src/
│
├── app/
│   ├── components/
│   ├── services/
│   ├── guards/
│   ├── models/
│   ├── interceptors/
│   └── app.routes.ts
│
├── assets/
├── environments/
└── styles.css
```

---

# ⚙️ Prérequis

Avant l’installation, vérifier les éléments suivants :

* Node.js 22+
* Angular CLI
* Git
* Visual Studio Code

---

# 🚀 Installation du projet

## 1️⃣ Cloner le dépôt

```bash
git clone https://github.com/pascal2590/M-Motors_Projet_STUDI_Front-end.git
```

---

## 2️⃣ Accéder au projet

```bash
cd M-Motors_Projet_STUDI_Front-end
```

---

## 3️⃣ Installer les dépendances

```bash
npm install
```

---

# ▶️ Lancer le projet

```bash
ng serve
```

---

# 🌐 Accès application

```bash
http://localhost:4200
```

---

# 🔗 Configuration API Backend

Le frontend communique avec le backend ASP.NET Core via des services Angular.

## Exemple d’URL API :

```typescript
apiUrl = 'https://localhost:7183/api';
```

---

# 🔐 Authentification JWT

L’application utilise un système d’authentification JWT permettant :

* la connexion sécurisée des utilisateurs,
* la protection des routes,
* la gestion des rôles,
* et la sécurisation des appels API.

---

# 📋 Fonctionnalités principales

## Front-office

* Consultation des véhicules
* Recherche multicritères
* Filtres Vente / Location
* Fiches détaillées
* Dépôt de dossier
* Upload de documents

---

## Back-office

* Gestion des dossiers
* Suivi des statuts
* Notes internes
* Logs système
* Gestion des utilisateurs

---

# 📱 Responsive Design

L’interface est responsive et compatible :

* Desktop
* Tablette
* Mobile

---

# 🧪 Tests

## Lancer les tests unitaires

```bash
ng test
```

---

# 🔒 Sécurité

* Authentification JWT
* Guards Angular
* Intercepteur HTTP
* Validation des formulaires
* Protection des routes

---

# 📈 Qualité logicielle

* Architecture modulaire
* Composants standalone Angular
* Services dédiés
* Code maintenable et évolutif
* Responsive UI moderne

---

# 👨‍💻 Auteur

Pascal MOREL
Bachelor Développeur d’application C# .NET — STUDI

---

# 📄 Licence

Projet pédagogique réalisé dans le cadre du Bachelor Développeur d’application C# .NET.
