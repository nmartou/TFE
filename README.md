# TFE

# Erreurs rencontrées

## Prisma

- Prisma (ORM) peut faire des sienne si il n'est pas assez mis à jour car ceux qui le développent le mettent à jour très régulièrement.

# Projet en local

Afin de lancer le projet sur un ordinateur local, il faut taper les commandes suivantes:
    
    
    git clone https://github.com/nmartou/TFE
    cd ./TFE
    npm install
    npm run start
    
Ces commandes servent à installer le projet sur la machine et de lancer le serveur Node.js (backend).

Ensuite il faut taper les commandes suivantes dans un autre terminal pour lancer le frontend:
    
    
    cd ./TFE/frontend
    npm install
    npm run start
    

Par la suite, il faut installer MySQL Workbench (https://www.mysql.com/fr/products/workbench/) qui va simuler la base de données pour le projet.

Dès que la base de données est en place, il faut configurer les paramètres de connexions entre Node.js et MySQL Workbench dans le fichier de configuration .env.

    DATABASE_URL="mysql://user:password@localhost:3306/DBName"

Après cela fait, nous pouvons synchroniser le la base de données avec le fichier de structure de Prisma.

    npx prisma db push

Cela va créer la base de données et la structure de la base de données.

Et voilà, le projet est prêt à être utilisé.

# Projet en production

Pour mettre le projet en production, nous avons besoin de compacter le projet frontend avec la commande suivante dans le dossier courant du frontend :

    npm run build

Ensuite, [A TERMINER]