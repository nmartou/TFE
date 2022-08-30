# TFE

# Erreurs rencontrées

## Prisma

- Prisma (ORM) peut faire des sienne si il n'est pas assez mis à jour car ceux qui le développent le mettent à jour très régulièrement.
S'il ne l'est pas il faut le mettre à jour manuellement sans passer par la commande générale de npm (npm install) car celle-ci ne met pas à jour prisma.

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

Après cela fait, nous pouvons synchroniser la base de données avec le fichier de structure de Prisma.

    npx prisma generate

Si la base de données se trouve à distance, il faut s'assurer de la bonne ouverture des ports ainsi que des règles de firewall mise en place.

Et voilà, le projet est prêt à être utilisé.

# Projet en production

Pour mettre le projet en production, nous avons besoin de compacter le projet frontend avec la commande suivante dans le dossier courant du frontend :

    npm run build

Ensuite, [A TERMINER]