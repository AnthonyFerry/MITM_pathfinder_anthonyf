Pathfinder :

Vous pouvez accéder à la demo du site à l'adresse suivante : anthonyf.ddns.net/pathfinder

Installation : 
Placez le dossier racine "pathfinder/" dans le dossier "www" de votre serveur Apache.

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

/!\ Attention /!\
Cette application à été développée en JavaScript en utilisant la balise Html5 <canvas>. L'application à été testée sur les dernières versions des navigateur Chrome, Firefox, Edge et Safari.
La version Safari présente des problèmes au niveau de l'interprétation de la fiche de style.

L'application n'a été pensée pour être utilisée sur un support mobile (Android, iOs, etc.)

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Contenu :
L'application pathfinder est essentiellement développée sous JavaScript.

pathfinder (racine du projet)
  |
  -- js (contient tout les fichiers de script)
  |	  |
  |	  -- classes (contient toute les classes utilisée dans le projet)
  |	  |
  |	  -- events.js (contient tout les événements liés au DOM et les actions qui y sont appliquées)
  |	  |
  |	  -- index.php (fichier php incluant en html toutes les classes et scripts)
  |	  |
  |	  -- variables.js (déclaration de toute les variables globales)
  |
  -- index.php (index du site contenant tout le DOM)
  |
  -- style.css (fiche de style appliquée au site)

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Motivation des choix de développement :
J'ai choisi de développer cette application en PHP/JavaScript pour les raisons suivantes:
- Stocker l'application sur un serveur Apache pour qu'elle soit disponible depuis n'importe quelle plateforme (pouvru qu'elle dispose d'un navigateur internet).
- Pouvoir exécuter les scripts de pathfinding depuis la machine de l'utilisateur. Comme ça, s'il décide de télécharger la page HTML sur son poste de travail, il pourra y accéder, même sans disposer d'une connexion internet.
- HTML5 propose l'outil <canvas> qui est très utile et intuitif pour dessiner.