# Prestavice API #
    Backend de l'application Prestavice, développé avec Node js et TypeScript.
    Prestavice est le Uber des artisans, permettant de connectant les citoyens 
    et les artisans pour des missions breves.

## Description ##
    Cette API permet de gerer:
        - L'authentification des utilisateurs(USER, ARTISAN, ADMIN)
        - La recherche d'artisans actifs par ville ou service 
        - La publication de missions (Une mission est un besoin exprimé et publié
          par un USER sous forme de petites annonces)
        - Les devis 
        - Une communication breve entre USERS et ARTISANS via une simple messagerie
        - Un systeme d'avis et de notation
        - Profils detaille des ARTISANS
        ...

## Technologies utilisees ##
        .Node js
        .Typescript
        .Express js
        .Postgres SQL 18
        .Prisma 6
        .Zod pour la validation des donnees
        .JWT pour l'auth
        
## Installation et lancement du projet 
        . Cloner le projet : ```git clone https://github.com/galandnoah1/Prestavice-API.git```
        . naviguer dans le dossier ```cd Prestavice-API```
        . Installer les dependances ```npm install```
        . Copier le dossier de variables ```cp .env.example .env```
        . Personnaliser le votre fichier .env
        . Lancer le projet en mode dev ``` npm run dev ```
        . Lancer le projet en production ``` npm run start```