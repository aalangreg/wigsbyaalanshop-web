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

    // Combine images and videos if videos array exists
    const media = product.images || [];
    const videos = product.videos || [];
    const allMedia = [...media, ...videos];

    // Helper function to check if a file is a video
    function isVideo(url) {
        if (!url) return false;
        const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi'];
        const lowerUrl = url.toLowerCase();
        return videoExtensions.some(ext => lowerUrl.includes(ext));
    }

    // Get first media item
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
                    <img id="mainImage" src="${media[0] || 'https://via.placeholder.com/800x600/f0f0f0/999999?text=Image+non+disponible'}" 
                         alt="${product.name}" 
                         class="product-gallery__main-image"
                         style="display: none;"
                         onerror="this.src='https://via.placeholder.com/800x600/f0f0f0/999999?text=Image+non+disponible'">
                ` : `
                    <img id="mainImage" src="${firstMedia || 'https://via.placeholder.com/800x600/f0f0f0/999999?text=Image+non+disponible'}" 
                         alt="${product.name}" 
                         class="product-gallery__main-image"
                         onerror="this.src='https://via.placeholder.com/800x600/f0f0f0/999999?text=Image+non+disponible'">
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
                    const thumbnailSrc = isItemVideo ? (media[0] || 'https://via.placeholder.com/200x150/f0f0f0/999999?text=Video') : item;
                    return `
                        <div class="product-gallery__thumbnail-wrapper ${index === 0 ? 'active' : ''}" data-index="${index}">
                            ${isItemVideo ? `
                                <div class="product-gallery__thumbnail-video-indicator">▶</div>
                            ` : ''}
                            <img src="${thumbnailSrc}" 
                                 alt="${product.name} - ${isItemVideo ? 'Vidéo' : 'Vue'} ${index + 1}" 
                                 class="product-gallery__thumbnail"
                                 onerror="this.src='https://via.placeholder.com/200x150/f0f0f0/999999?text=${isItemVideo ? 'Video' : 'Image'}+non+disponible'">
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

    // Setup media gallery (images and videos)
    setupMediaGallery(allMedia);
}

function setupMediaGallery(media) {
    const thumbnails = document.querySelectorAll('.product-gallery__thumbnail-wrapper');
    const mainImage = document.getElementById('mainImage');
    const mainMedia = document.getElementById('mainMedia');

    // Helper function to check if a file is a video
    function isVideo(url) {
        if (!url) return false;
        const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi'];
        const lowerUrl = url.toLowerCase();
        return videoExtensions.some(ext => lowerUrl.includes(ext));
    }

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            const mediaItem = media[index];
            const isVideoItem = isVideo(mediaItem);
            
            if (isVideoItem) {
                // Show video, hide image
                if (mainMedia) {
                    mainMedia.src = mediaItem;
                    mainMedia.style.display = 'block';
                    mainMedia.load(); // Reload video
                }
                if (mainImage) {
                    mainImage.style.display = 'none';
                }
            } else {
                // Show image, hide video
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

            // Update active thumbnail
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            this.classList.add('active');
        });
    });
}
