// Catalogue page - Display all products with filters
let allProducts = [];
let filteredProducts = [];

document.addEventListener('DOMContentLoaded', async function() {
    allProducts = await loadProducts();
    filteredProducts = [...allProducts];
    
    displayProducts();
    setupFilters();
    updateProductsCount();
});

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

    const dmLinks = getDMLinks();

    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <img src="${product.images[0]}" alt="${product.name}" class="product-card__image"
                 onerror="this.src='https://via.placeholder.com/400x300/f0f0f0/999999?text=Image+non+disponible'">
            <div class="product-card__content">
                <h3 class="product-card__name">${product.name}</h3>
                <div class="product-card__details">
                    <span>${product.length}</span>
                    <span class="product-card__technical">${product.texture}</span>
                    <span class="product-card__technical">${product.laceType}</span>
                    ${product.hairType ? `<span class="product-card__hair-type">${product.hairType}</span>` : ''}
                </div>
                <div class="product-card__price">${formatPrice(product.price)}</div>
                <div class="product-card__button">
                    <a href="product.html?id=${product.id}" class="btn btn--primary" style="width: 100%; display: block; margin-bottom: 0.5rem;">
                        Voir les détails
                    </a>
                    <button class="btn btn--secondary" style="width: 100%; display: block;" onclick="showOrderMenu(); return false;">
                        Commander via DM
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function setupFilters() {
    const searchInput = document.getElementById('searchInput');
    const filterLength = document.getElementById('filterLength');
    const filterTexture = document.getElementById('filterTexture');
    const filterLace = document.getElementById('filterLace');
    const filterHairType = document.getElementById('filterHairType');
    const clearFilters = document.getElementById('clearFilters');

    const filterFunction = () => {
        applyFilters();
    };

    if (searchInput) {
        searchInput.addEventListener('input', filterFunction);
    }
    if (filterLength) {
        filterLength.addEventListener('change', filterFunction);
    }
    if (filterTexture) {
        filterTexture.addEventListener('change', filterFunction);
    }
    if (filterLace) {
        filterLace.addEventListener('change', filterFunction);
    }
    if (filterHairType) {
        filterHairType.addEventListener('change', filterFunction);
    }
    if (clearFilters) {
        clearFilters.addEventListener('click', () => {
            if (searchInput) searchInput.value = '';
            if (filterLength) filterLength.value = '';
            if (filterTexture) filterTexture.value = '';
            if (filterLace) filterLace.value = '';
            if (filterHairType) filterHairType.value = '';
            applyFilters();
        });
    }
}

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
        
        const matchesLength = !lengthFilter || product.length === lengthFilter;
        const matchesTexture = !textureFilter || product.texture === textureFilter;
        const matchesLace = !laceFilter || product.laceType === laceFilter;
        const matchesHairType = !hairTypeFilter || product.hairType === hairTypeFilter;

        return matchesSearch && matchesLength && matchesTexture && matchesLace && matchesHairType;
    });

    displayProducts();
    updateProductsCount();
}

function updateProductsCount() {
    const productsCount = document.getElementById('productsCount');
    if (productsCount) {
        const count = filteredProducts.length;
        productsCount.textContent = `${count} produit${count > 1 ? 's' : ''} trouvé${count > 1 ? 's' : ''}`;
    }
}
