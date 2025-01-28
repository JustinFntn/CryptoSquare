
# Procédure GIT

Quelle que soit la charge de travail (1 petit fix ou une grande feature), vous **devez** vous conformer à la procédure suivante *avant de commencer quelque développement que ce soit*:

1. Créer une issue sur Github
  - placer un court titre descriptif
  - ajouter des éventuelles précisions dans la description
  - S'assigner soi-même si on compte répondre à l'issue

![Créer une issue](docs/img/procédure_git/image.png)
![S'assigner soi-même](docs/img/procédure_git/image-1.png)

2. Créer une branche de développement

  - Créer la branche

![Création de la branche](docs/img/procédure_git/image-2.png)

  - **Changer pour qu'elle se base sur `develop`**

![Choix de la branche](docs/img/procédure_git/image-3.png)

  - Copier les lignes de commande fournies et les coller dans un terminal sur votre ordi

![Commandes pour travailler sur la branche](docs/img/procédure_git/image-4.png)

3. Faire vos changements et commit (en suivant la conventionnal commit)
  - suivre `type(sujet): message descriptif`
  - Types autorisés: feat, fix build, chore, ci, docs, style, refactor, perf, test
  - le sujet est optionnel
  - la totalité du message doit faire < 100 caractères
  - *ex: `git commit -m "feat: ajout du système d'authentification"`*

4. `git pull` *puis* `git push`

5. Créer une pull request sur github:

  - Il y aura probablement un message pour créer la pull request rapidement

![Création rapide PR](docs/img/procédure_git/image-5.png)

  - Si ce n'est pas le cas, créer manuellement :

![Création manuelle PR](docs/img/procédure_git/image-6.png)

  - **Changer la branche de destination** et cliquer sur "créer"

![Changement branche destination](docs/img/procédure_git/image-7.png)

  - Choisir "Create a merge commit". En cas de conflit, si le merge ne peut pas se faire automatiquement, paniquer et alerter tout le monde.

![Create a merge commit](docs/img/procédure_git/image-8.png)

![Confirmer](docs/img/procédure_git/image-9.png)

6. Supprimer la branche d'origine

![Supprimer la branche d'origine](docs/img/procédure_git/image-10.png)



Je suis conscient que ce procédé peut parraître lourd, mais il est essentiel pour le suivi du projet et pour s'assurer que notre dépôt reste propre, stable et conforme aux standards
