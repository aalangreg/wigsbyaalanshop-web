// page produit - affichage des détails d'un produit
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

// détecter si un fichier est une vidéo
function isVideo(url) {
    if (!url) return false;
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi'];
    return videoExtensions.some(ext => url.toLowerCase().includes(ext));
}

// afficher le produit avec galerie images/vidéos
function displayProduct(product) {
    const productContent = document.getElementById('productContent');
    const media = product.images || [];
    const videos = product.videos || [];
    const allMedia = [...media, ...videos];
    const firstMedia = allMedia[0] || (media[0] || '');
    const isFirstVideo = isVideo(firstMedia);

    const productHTML = `
        <div class="product-gallery">
            <div class="product-gallery__main">
                ${isFirstVideo ? `
                    <video id="mainMedia" src="${firstMedia}" 
                           class="product-gallery__main-image" 
                           controls
                           playsinline
                           onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                        Votre navigateur ne supporte pas la lecture de vidéos.
                    </video>
                    <img id="mainImage" src="${media[0] || ''}" 
                         alt="${product.name}" 
                         class="product-gallery__main-image"
                         style="display: none;"
                         onerror="this.style.display='none';">
                ` : `
                    <img id="mainImage" src="${firstMedia || ''}" 
                         alt="${product.name}" 
                         class="product-gallery__main-image"
                         onerror="this.style.display='none';">
                    <video id="mainMedia" src="" 
                           class="product-gallery__main-image" 
                           controls
                           playsinline
                           style="display: none;">
                        Votre navigateur ne supporte pas la lecture de vidéos.
                    </video>
                `}
            </div>
            <div class="product-gallery__thumbnails">
                ${allMedia.map((item, index) => {
                    const isItemVideo = isVideo(item);
                    const thumbnailSrc = isItemVideo ? (media[0] || '') : item;
                    return `
                        <div class="product-gallery__thumbnail-wrapper ${index === 0 ? 'active' : ''}" data-index="${index}">
                            ${isItemVideo ? `<div class="product-gallery__thumbnail-video-indicator">▶</div>` : ''}
                            <img src="${thumbnailSrc}" 
                                 alt="${product.name} - ${isItemVideo ? 'Vidéo' : 'Vue'} ${index + 1}" 
                                 class="product-gallery__thumbnail"
                                 onerror="this.style.display='none';">
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
        <div class="product-info">
            <h1 class="product-info__name">${product.name}</h1>
            <div class="product-info__price">${formatPrice(product.price)}</div>
            <div class="product-info__description">${product.description}</div>
            <div class="product-info__specs">
                <div class="product-info__spec">
                    <span class="product-info__spec-label">Longueur :</span>
                    <span class="product-info__spec-value product-info__spec-value--technical">${product.length}</span>
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
    setupMediaGallery(allMedia);
}

// configurer la galerie média (images et vidéos)
function setupMediaGallery(media) {
    const thumbnails = document.querySelectorAll('.product-gallery__thumbnail-wrapper');
    const mainImage = document.getElementById('mainImage');
    const mainMedia = document.getElementById('mainMedia');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            const mediaItem = media[index];
            const isVideoItem = isVideo(mediaItem);
            
            if (isVideoItem) {
                if (mainMedia) {
                    mainMedia.src = mediaItem;
                    mainMedia.style.display = 'block';
                    mainMedia.load();
                }
                if (mainImage) mainImage.style.display = 'none';
            } else {
                if (mainImage) {
                    mainImage.src = mediaItem;
                    mainImage.style.display = 'block';
                }
                if (mainMedia) {
                    mainMedia.style.display = 'none';
                    mainMedia.pause();
                    mainMedia.src = '';
                }
            }

            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            this.classList.add('active');
        });
    });
}
