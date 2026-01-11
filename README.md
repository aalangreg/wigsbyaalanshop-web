# wigsbyaalanshop-web

Site web pour boutique de perruques lace premium au Canada.

## Ce que c'est

Site statique en HTML/CSS/JS vanilla. Catalogue de produits avec filtres et commandes via DM (TikTok, Facebook, téléphone).

## Structure

```
wigsbyaalanshop-web/
├── index.html
├── catalogue.html
├── product.html
├── about.html
├── contact.html
├── data/products.json
├── img/logo-de-WIGSBYAALANSHOP.svg
├── js/
│   ├── main.js
│   ├── catalogue.js
│   ├── product.js
│   ├── home.js
│   └── order-menu.js
└── styles/
    ├── main.scss
    └── main.css
```

## Setup

Pas de dépendances, juste des fichiers statiques.

Pour compiler le SCSS :

Compile le SCSS :
```bash
cd styles && sass main.scss main.css
```

Ou en mode watch :

```bash
sass --watch styles/main.scss styles/main.css
```

## Config

### Liens de contact

Modifier `getDMLinks()` dans `js/main.js` :

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

### Produits

Les produits sont dans `data/products.json`. Format :

```json
{
  "id": 1,
  "name": "Nom du produit",
  "description": "Description",
  "price": 299,
  "length": "longue",
  "texture": "Straight",
  "laceType": "5x5 HD Lace",
  "hairType": "100% Human Hair",
  "images": ["img/products/produit1-vue1.jpg", "img/products/produit1-vue2.jpg"],
  "videos": ["videos/products/produit1-demo.mp4"],
  "features": ["Caractéristique 1", "Caractéristique 2"]
}
```

Valeurs possibles :
- length: "courte", "moyenne", "longue", "très longue"
- texture: "Straight", "Body Wave", "Deep Wave", "Loose Wave", "Curly", "Burmese Curly", "Cambodian curly", "Pineapple wave", "Curly Wave", "Italian curly"
- laceType: "5x5 HD Lace", "4x4 Lace Closure", "13x4 Lace Frontal"
- hairType: "100% Human Hair", "Raw Hair", "Virgin Hair" (optionnel)
- images: tableau de chemins vers les images (requis)
- videos: tableau de chemins vers les vidéos (optionnel) - formats supportés: .mp4, .webm, .ogg, .mov, .avi

## Fonctionnalités

Catalogue avec filtres (longueur, texture, lace, type de cheveux) et recherche.

Page produit avec galerie d'images et vidéos, et détails.

Menu modal de commande avec 3 options : TikTok, Facebook, ou copie du numéro de téléphone.

Navigation responsive avec menu mobile.

## Déploiement

1. Vérifier les liens dans `js/main.js`
2. Mettre à jour les produits dans `data/products.json`
3. Remplacer les images placeholder par vos vraies images dans `img/products/`
4. Ajouter vos vidéos dans `videos/products/` (optionnel)
5. Compiler le SCSS : `cd styles && sass main.scss main.css`
6. Upload sur le serveur

## Vocabulaire

Le site utilise le vocabulaire technique du marché :
- Textures : Straight, Body Wave, Deep Wave, Loose Wave, Curly, Burmese Curly, Cambodian curly, Pineapple wave, Curly Wave, Italian curly
- Lace : 5x5 HD Lace, 4x4 Lace Closure, 13x4 Lace Frontal
- Cheveux : 100% Human Hair, Raw Hair, Virgin Hair

Pas de termes génériques, clientèle experte.

## Contact

- TikTok: https://www.tiktok.com/@wigsbyaalanshop
- Facebook: https://www.facebook.com/share/1FJoRQaJHw/
- Email: contactpro@aalanshop.com

Copyright 2026 WIGS BY AALAN SHOP. Tous droits réservés.
