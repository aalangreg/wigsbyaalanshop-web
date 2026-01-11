// menu de commande - modal avec options de contact
document.addEventListener('DOMContentLoaded', function() {
    initOrderMenu();
    setupOrderButtons();
});

// initialiser le menu de commande
function initOrderMenu() {
    const dmLinks = getDMLinks();
    
    let modal = document.getElementById('orderModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'orderModal';
        modal.className = 'order-modal';
        document.body.appendChild(modal);
    }
    
    modal.innerHTML = `
        <div class="order-modal__overlay" onclick="closeOrderMenu()"></div>
        <div class="order-modal__content">
            <button class="order-modal__close" onclick="closeOrderMenu()" aria-label="Fermer">×</button>
            <h2 class="order-modal__title">Commander via</h2>
            <div class="order-modal__options">
                <a href="${dmLinks.tiktok}" class="order-modal__option" target="_blank" rel="noopener noreferrer">
                    <div class="order-modal__icon">📱</div>
                    <div class="order-modal__text">
                        <h3>TikTok</h3>
                        <p>Envoyez-nous un message privé</p>
                    </div>
                </a>
                <a href="${dmLinks.facebook}" class="order-modal__option" target="_blank" rel="noopener noreferrer">
                    <div class="order-modal__icon">👥</div>
                    <div class="order-modal__text">
                        <h3>Facebook</h3>
                        <p>Écrivez-nous en message privé</p>
                    </div>
                </a>
            </div>
        </div>
    `;
}

// configurer les boutons de commande
function setupOrderButtons() {
    document.querySelectorAll('a.btn, button.btn').forEach(btn => {
        if ((btn.textContent.includes('Commander via DM') || btn.textContent.includes('Commander')) && 
            !btn.hasAttribute('data-order-btn-setup')) {
            btn.setAttribute('data-order-btn-setup', 'true');
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                showOrderMenu();
            });
        }
    });
}

// rendre la fonction accessible globalement pour shopify
window.initOrderMenu = initOrderMenu;
