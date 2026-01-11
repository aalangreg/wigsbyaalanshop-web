# WIGS BY AALAN SHOP

Site web e-commerce pour boutique de perruques lace premium au Canada.

## Description

Site web statique développé en HTML, CSS et JavaScript vanilla. Présente un catalogue de produits avec système de filtres avancés et gestion des commandes via messages privés (TikTok, Facebook, téléphone).

## Structure du projet

```
wigsbyaalanshop/
├── index.html
├── catalogue.html
├── product.html
├── about.html
├── contact.html
├── data/
│   └── products.json
├── img/
│   └── logo-de-WIGSBYAALANSHOP.svg
├── js/
│   ├── main.js
│   ├── order-menu.js
│   ├── catalogue.js
│   ├── product.js
│   └── home.js
└── styles/
    ├── main.scss
    └── main.css
```

## Technologies

- HTML5
- SCSS/CSS3
- JavaScript (ES6+)
- JSON pour données produits

## Installation

Aucune dépendance requise. Le site fonctionne avec des fichiers statiques uniquement.

Pour compiler le SCSS :

```bash
sass styles/main.scss styles/main.css
```

Mode watch pour développement :

```bash
sass --watch styles/main.scss styles/main.css
```

## Configuration

### Liens de contact

Modifier la fonction `getDMLinks()` dans `js/main.js` :

```javascript
function getDMLinks() {
    return {
        tiktok: 'https://www.tiktok.com/@wigsbyaalanshop?_r=1&_t=ZS-92y35aCBduz',
        facebook: 'https://www.facebook.com/share/1FJoRQaJHw/?mibextid=wwXIfr',
        email: 'contactpro@aalanshop.com',
        phone: '+1 (514) 260-7145'
    };
}
```

### Gestion des produits

Les produits sont stockés dans `data/products.json`. Format :

```json
{
  "id": 1,
  "name": "Nom du produit",
  "description": "Description détaillée",
  "price": 299,
  "length": "longue",
  "texture": "Straight",
  "laceType": "5x5 HD Lace",
  "hairType": "100% Human Hair",
  "images": ["url1.jpg", "url2.jpg"],
  "features": ["Caractéristique 1", "Caractéristique 2"]
}
```

Valeurs acceptées :

- **length** : "courte", "moyenne", "longue", "très longue"
- **texture** : "Straight", "Body Wave", "Deep Wave", "Loose Wave", "Curly"
- **laceType** : "5x5 HD Lace", "4x4 Lace Closure", "13x4 Lace Frontal"
- **hairType** : "100% Human Hair", "Raw Hair", "Virgin Hair" (optionnel)

## Fonctionnalités

### Catalogue

- Filtres par longueur, texture, type de lace, type de cheveux
- Recherche textuelle dans les noms et descriptions
- Compteur de résultats
- Affichage responsive en grille

### Page produit

- Galerie d'images avec miniatures
- Spécifications détaillées
- Caractéristiques listées
- Bouton de commande avec menu modal

### Menu de commande

Modal avec trois options :
- Redirection vers TikTok
- Redirection vers Facebook
- Affichage du numéro de téléphone avec fonction de copie

### Navigation

- Menu responsive avec toggle mobile
- Navigation sticky en haut de page
- Liens actifs selon la page courante

## Déploiement

1. Vérifier la configuration des liens dans `js/main.js`
2. Mettre à jour les produits dans `data/products.json`
3. Remplacer les images placeholder par les images réelles
4. Compiler le SCSS : `sass styles/main.scss styles/main.css`
5. Uploader tous les fichiers sur le serveur web

## Vocabulaire professionnel

Le site utilise exclusivement le vocabulaire technique du marché des perruques :

- Textures : Straight, Body Wave, Deep Wave, Loose Wave, Curly
- Types de lace : 5x5 HD Lace, 4x4 Lace Closure, 13x4 Lace Frontal
- Types de cheveux : 100% Human Hair, Raw Hair, Virgin Hair

Aucun terme générique n'est utilisé. Le site cible une clientèle experte.

## Compatibilité

- Navigateurs modernes (Chrome, Firefox, Safari, Edge)
- Responsive design (mobile-first)
- Pas de dépendances externes (sauf Google Fonts)

## Contact

- TikTok : https://www.tiktok.com/@wigsbyaalanshop
- Facebook : https://www.facebook.com/share/1FJoRQaJHw/
- Email : contactpro@aalanshop.com
- Téléphone : +1 (514) 260-7145

## Licence

Copyright 2026 WIGS BY AALAN SHOP. Tous droits réservés.
