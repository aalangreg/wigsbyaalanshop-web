# wigsbyaalanshop-web

Site web pour la boutique de perruques lace premium au Canada.

## Description

J'ai fait un site statique en HTML/CSS/JS vanilla. Pas de framework, juste du code simple. Le catalogue permet de filtrer les produits et les commandes se font via DM (TikTok, Facebook).

## Structure du projet

```
wigsbyaalanshop-web/
├── index.html
├── catalogue.html
├── product.html
├── about.html
├── contact.html
├── data/products.json
├── img/
│   └── logo-de-WIGSBYAALANSHOP.svg
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

## Installation

Pas besoin d'installer quoi que ce soit, c'est juste des fichiers statiques. Pour compiler le SCSS :

```bash
sass styles/main.scss styles/main.css
```

Ou en mode watch si tu veux que ça se recompile automatiquement :

```bash
sass --watch styles/main.scss styles/main.css
```

## Configuration

### Modifier les liens de contact

Tout est dans `js/main.js`, fonction `getDMLinks()`. Tu peux changer les URLs TikTok, Facebook, email et téléphone là-dedans.

### Ajouter/modifier des produits

Les produits sont dans `data/products.json`. Chaque produit a cette structure :

```json
{
  "id": 1,
  "name": "Nom du produit",
  "description": "Description du produit",
  "price": 299,
  "length": "24\"",
  "texture": "Straight",
  "laceType": "5x5 HD Lace",
  "hairType": "100% Human Hair",
  "images": ["img/produit1.jpg"],
  "videos": ["img/produit1.mp4"],
  "features": ["Caractéristique 1", "Caractéristique 2"]
}
```

**Longueurs possibles :** "18\"", "20\"", "22\"", "24\"", "26\"", "28\"", "30\""

**Textures :** Straight, Body Wave, Deep Wave, Loose Wave, Burmese Curly, Cambodian Curly, Pineapple Wave, Curly Wave, Italian Curly

**Types de lace :** 5x5 HD Lace, 5x5 HD Lace Closure, 4x4 Lace Closure, 13x4 HD Lace Frontal, 13x6 HD Lace Frontal

**Types de cheveux :** 100% Human Hair, Raw Hair, Virgin Hair (optionnel)

**Images :** Tableau de chemins. J'utilise `img/disposurcomm.svg` pour les produits pas encore disponibles.

**Vidéos :** Optionnel, formats supportés : .mp4, .webm, .ogg, .mov, .avi

## Fonctionnalités

- Catalogue avec filtres (longueur, texture, lace, type de cheveux) + recherche
- Page produit avec galerie images/vidéos
- Modal de commande (TikTok, Facebook)
- Menu responsive mobile

## Déploiement

1. Vérifie les liens dans `js/main.js`
2. Mets à jour les produits dans `data/products.json`
3. Ajoute tes images dans `img/` (j'ai organisé par produit : `img/imgproductsid1/`, `img/imgproductsid2/`, etc.)
4. Même chose pour les vidéos
5. Pour les produits pas encore dispo, j'utilise `img/disposurcomm.svg`
6. Compile le SCSS : `sass styles/main.scss styles/main.css`
7. Upload sur ton serveur

## Notes importantes

- Les chemins d'images/vidéos dans `products.json` doivent être relatifs à la racine (ex: `img/image.jpg`, pas `../img/image.jpg`) - j'ai eu des problèmes avec ça au début
- J'ai fait le code réutilisable pour Shopify si besoin (fonctions globales dans `main.js`)
- J'ai mis les commentaires en français et en minuscule, c'est plus lisible pour moi

## Spécificités techniques

### Architecture JavaScript

**Vanilla JS ES6+** : Pas de framework, juste du JavaScript moderne avec :
- **Async/await** pour les opérations asynchrones (chargement du JSON via Fetch API)
- **Arrow functions** et **template literals** pour la génération dynamique de HTML
- **Event delegation** et **event listeners** pour la gestion des interactions
- **Closures** pour encapsuler les variables d'état (ex: `allProducts`, `filteredProducts` dans `catalogue.js`)

**Pattern modulaire** : Chaque page a son propre fichier JS (`home.js`, `catalogue.js`, `product.js`) qui s'initialise au `DOMContentLoaded`. Les fonctions utilitaires sont dans `main.js` et exposées globalement via `window` pour réutilisation.

**Gestion d'état** : Pas de state management complexe, juste des variables locales dans chaque module. Les filtres utilisent un pattern de **filtering pipeline** avec chaînage de conditions.

**Parsing d'URL** : Utilisation de `URLSearchParams` pour extraire l'ID produit depuis la query string (`product.html?id=1`).

### Architecture CSS/SCSS

**BEM (Block Element Modifier)** : Toute la nomenclature CSS suit BEM (ex: `.product-card__image`, `.nav__toggle--active`). Ça facilite la maintenance et évite les conflits de styles.

**SCSS avec mixins** : J'utilise des mixins réutilisables pour les breakpoints responsive (`@mixin responsive($breakpoint)`) et les patterns communs (`@mixin flex-center`, `@mixin container`, `@mixin button-base`).

**Variables SCSS** : Palette de couleurs centralisée dans des variables (`$primary-color`, `$secondary-color`, etc.) pour faciliter les changements de thème.

**Pseudo-éléments** : Le filigrane utilise `body::before` avec `position: fixed` et `z-index: 0` pour rester en arrière-plan sans affecter le contenu.

**Flexbox/Grid** : Layout moderne avec CSS Grid pour les grilles de produits et Flexbox pour les alignements. Pas de float ou de positionnement absolu complexe.

### Patterns de code

**Template literals pour HTML dynamique** : Génération de HTML via template strings plutôt que `createElement` pour plus de lisibilité :
```javascript
productsGrid.innerHTML = filteredProducts.map(product => `
    <div class="product-card">
        <img src="${product.images[0]}" alt="${product.name}">
        ...
    </div>
`).join('');
```

**Error handling** : Gestion d'erreurs avec `try/catch` pour le fetch, et `onerror` sur les images/vidéos pour masquer les médias manquants.

**Conditional rendering** : Utilisation d'opérateurs ternaires et de `&&` pour le rendu conditionnel dans les templates.

**Media type detection** : Fonction `isVideo()` qui détecte le type de média via l'extension du fichier pour afficher soit `<img>` soit `<video>`.

### Performance

**Lazy loading implicite** : Les images se chargent au fur et à mesure, pas de lazy loading explicite mais ça pourrait être ajouté.

**Pas de bundler** : Fichiers JS séparés chargés individuellement. Pour la prod, tu pourrais bundler avec Webpack/Vite si besoin.

**CSS compilé** : Le SCSS est précompilé en CSS, pas de compilation à la volée côté client.

### Réutilisabilité

**API globale** : Fonctions exposées sur `window` (`window.loadProducts`, `window.formatPrice`, etc.) pour intégration facile dans d'autres projets (Shopify, WordPress, etc.).

**Séparation des concerns** : Logique métier séparée de la présentation. Les données viennent du JSON, le JS génère le HTML, le CSS gère le style.

**Pas de dépendances** : Code 100% vanilla, facile à intégrer n'importe où sans gestion de dépendances.

## Vocabulaire

J'utilise le vocabulaire technique du marché, pas de termes génériques. La clientèle connaît les perruques.

**Textures :** Straight, Body Wave, Deep Wave, Loose Wave, Burmese Curly, Cambodian Curly, Pineapple Wave, Curly Wave, Italian Curly

**Lace :** 5x5 HD Lace, 5x5 HD Lace Closure, 4x4 Lace Closure, 13x4 HD Lace Frontal, 13x6 HD Lace Frontal

**Cheveux :** 100% Human Hair, Raw Hair, Virgin Hair

## Design

- J'ai mis un filigrane avec le logo en arrière-plan (flou, discret)
- Couleurs : noir, rose (#e91e63), blanc
- Responsive (mobile, tablette, desktop)
- Menu sticky avec burger menu sur mobile

## Contact

- TikTok: https://www.tiktok.com/@wigsbyaalanshop
- Facebook: https://www.facebook.com/share/1FJoRQaJHw/
- Email: contactpro@aalanshop.com

© 2026 WIGS BY AALAN SHOP. Tous droits réservés.
