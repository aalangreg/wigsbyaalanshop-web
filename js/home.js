// page d'accueil - aperçu des produits
document.addEventListener('DOMContentLoaded', async function() {
    const previewGrid = document.getElementById('previewGrid');
    if (!previewGrid) return;

    const products = await loadProducts();
    const previewProducts = products.slice(0, 6);
    
    if (previewProducts.length === 0) {
        previewGrid.innerHTML = '<p>Aucun produit disponible pour le moment.</p>';
        return;
    }

    previewGrid.innerHTML = previewProducts.map(product => `
        <div class="product-card">
            <img src="${product.images[0] || ''}" alt="${product.name}" class="product-card__image" onerror="this.style.display='none';">
            <div class="product-card__content">
                <h3 class="product-card__name">${product.name}</h3>
                <div class="product-card__details">
                    <span class="product-card__technical">${product.length}</span>
                    <span class="product-card__technical">${product.texture}</span>
                    <span class="product-card__technical">${product.laceType}</span>
                    ${product.hairType ? `<span class="product-card__hair-type">${product.hairType}</span>` : ''}
                </div>
                <div class="product-card__price">${formatPrice(product.price)}</div>
                <a href="product.html?id=${product.id}" class="btn btn--primary product-card__button">Voir les détails</a>
            </div>
        </div>
    `).join('');
});
