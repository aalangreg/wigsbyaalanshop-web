// page catalogue - affichage des produits avec filtres
let allProducts = [];
let filteredProducts = [];

document.addEventListener('DOMContentLoaded', async function() {
    allProducts = await loadProducts();
    filteredProducts = [...allProducts];
    displayProducts();
    setupFilters();
    updateProductsCount();
});

// afficher les produits filtrés
function displayProducts() {
    const productsGrid = document.getElementById('productsGrid');
    const noResults = document.getElementById('noResults');
    if (!productsGrid) return;

    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '';
        if (noResults) noResults.style.display = 'block';
        return;
    }

    if (noResults) noResults.style.display = 'none';

    productsGrid.innerHTML = filteredProducts.map(product => `
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
                <div class="product-card__button">
                    <a href="product.html?id=${product.id}" class="btn btn--primary" style="width: 100%; display: block; margin-bottom: 0.5rem;">Voir les détails</a>
                    <button class="btn btn--secondary" style="width: 100%; display: block;" onclick="showOrderMenu(); return false;">Commander via DM</button>
                </div>
            </div>
        </div>
    `).join('');
}

// configurer les filtres
function setupFilters() {
    const searchInput = document.getElementById('searchInput');
    const filterLength = document.getElementById('filterLength');
    const filterTexture = document.getElementById('filterTexture');
    const filterLace = document.getElementById('filterLace');
    const filterHairType = document.getElementById('filterHairType');
    const clearFilters = document.getElementById('clearFilters');

    const apply = () => applyFilters();
    if (searchInput) searchInput.addEventListener('input', apply);
    if (filterLength) filterLength.addEventListener('change', apply);
    if (filterTexture) filterTexture.addEventListener('change', apply);
    if (filterLace) filterLace.addEventListener('change', apply);
    if (filterHairType) filterHairType.addEventListener('change', apply);
    
    if (clearFilters) {
        clearFilters.addEventListener('click', () => {
            [searchInput, filterLength, filterTexture, filterLace, filterHairType].forEach(el => {
                if (el) el.value = '';
            });
            applyFilters();
        });
    }
}

// appliquer les filtres
function applyFilters() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const lengthFilter = document.getElementById('filterLength')?.value || '';
    const textureFilter = document.getElementById('filterTexture')?.value || '';
    const laceFilter = document.getElementById('filterLace')?.value || '';
    const hairTypeFilter = document.getElementById('filterHairType')?.value || '';

    filteredProducts = allProducts.filter(product => {
        const matchesSearch = !searchTerm || 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm);
        return matchesSearch &&
            (!lengthFilter || product.length === lengthFilter) &&
            (!textureFilter || product.texture === textureFilter) &&
            (!laceFilter || product.laceType === laceFilter) &&
            (!hairTypeFilter || product.hairType === hairTypeFilter);
    });

    displayProducts();
    updateProductsCount();
}

// mettre à jour le compteur de produits
function updateProductsCount() {
    const productsCount = document.getElementById('productsCount');
    if (productsCount) {
        const count = filteredProducts.length;
        productsCount.textContent = `${count} produit${count > 1 ? 's' : ''} trouvé${count > 1 ? 's' : ''}`;
    }
}
