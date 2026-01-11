// Product page - Display single product details
document.addEventListener('DOMContentLoaded', async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    if (!productId) {
        document.getElementById('productContent').innerHTML = '<p>Produit non trouvé.</p>';
        return;
    }

    const products = await loadProducts();
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        document.getElementById('productContent').innerHTML = '<p>Produit non trouvé.</p>';
        return;
    }

    displayProduct(product);
});

function displayProduct(product) {
    const productContent = document.getElementById('productContent');
    const dmLinks = getDMLinks();
    let currentImageIndex = 0;

    const productHTML = `
        <div class="product-gallery">
            <div class="product-gallery__main">
                <img id="mainImage" src="${product.images[0]}" alt="${product.name}" 
                     class="product-gallery__main-image"
                     onerror="this.src='https://via.placeholder.com/800x600/f0f0f0/999999?text=Image+non+disponible'">
            </div>
            <div class="product-gallery__thumbnails">
                ${product.images.map((image, index) => `
                    <img src="${image}" alt="${product.name} - Vue ${index + 1}" 
                         class="product-gallery__thumbnail ${index === 0 ? 'active' : ''}"
                         data-index="${index}"
                         onerror="this.src='https://via.placeholder.com/200x150/f0f0f0/999999?text=Image+non+disponible'">
                `).join('')}
            </div>
        </div>
        <div class="product-info">
            <h1 class="product-info__name">${product.name}</h1>
            <div class="product-info__price">${formatPrice(product.price)}</div>
            <div class="product-info__description">${product.description}</div>
            <div class="product-info__specs">
                <div class="product-info__spec">
                    <span class="product-info__spec-label">Longueur :</span>
                    <span class="product-info__spec-value">${product.length}</span>
                </div>
                <div class="product-info__spec">
                    <span class="product-info__spec-label">Texture :</span>
                    <span class="product-info__spec-value product-info__spec-value--technical">${product.texture}</span>
                </div>
                <div class="product-info__spec">
                    <span class="product-info__spec-label">Type de lace :</span>
                    <span class="product-info__spec-value product-info__spec-value--technical">${product.laceType}</span>
                </div>
                ${product.hairType ? `
                <div class="product-info__spec">
                    <span class="product-info__spec-label">Type de cheveux :</span>
                    <span class="product-info__spec-value product-info__spec-value--technical">${product.hairType}</span>
                </div>
                ` : ''}
            </div>
            ${product.features ? `
                <div class="product-info__features">
                    <h3>Caractéristiques :</h3>
                    <ul>
                        ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
            <div class="product-info__cta">
                <button class="btn btn--primary" onclick="showOrderMenu(); return false;" style="width: 100%; display: block;">
                    Commander via DM
                </button>
            </div>
        </div>
    `;

    productContent.innerHTML = productHTML;

    // Setup image gallery
    setupImageGallery(product.images);
}

function setupImageGallery(images) {
    const thumbnails = document.querySelectorAll('.product-gallery__thumbnail');
    const mainImage = document.getElementById('mainImage');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            
            // Update main image
            if (mainImage) {
                mainImage.src = images[index];
            }

            // Update active thumbnail
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            this.classList.add('active');
        });
    });
}
