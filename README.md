# Documentation

Le site réalisé se trouve être en deux partie distincte : le frontend et le backend.

Le backend se situe dans le dossier courant du projet et la partie frontend se situe dans le dossier frontend.

Le backend est composé de plusieurs technologies : Node.js, Express, Prisma, et beaucoup d'autres plus mineures.

La base de données correspondante au projet est une base de données MySQL (ou MariaDB).

Le frontend a été réalisé avec ReactJS, Bootstrap et CSS.

## Backend

Afin de rendre fonctionnel une route, il faut spécifier la route dans le fichier server.js qui est le fichier de lancement du backend. Ensuite,
il faut ajouter la route précise dans un fichier route se trouvant dans le dossier routes. Ainsi, il ne reste plus qu'a créer la requête vers la base de données
dans un fichier controlleur se trouvant dans le dossier controllers.

## Frontend

Toutes le site se trouve dans le dossier "/frontend/src/".

Le fichier de lancement se trouve être index.js mais la majorité du travail se fait dans le ficher App.js. On y retrouve les routes ainsi que certaines fonctionnalités
avancées.

Ensuite toutes les pages sont classées dans des dossiers afin de structurer son développement.

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