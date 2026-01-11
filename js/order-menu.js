// Order menu functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize order menu modal
    initOrderMenu();
    
    // Setup all "Commander via DM" buttons
    setupOrderButtons();
});

// Initialize order menu modal
function initOrderMenu() {
    const dmLinks = getDMLinks();
    
    // Create modal if it doesn't exist
    let modal = document.getElementById('orderModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'orderModal';
        modal.className = 'order-modal';
        document.body.appendChild(modal);
    }
    
    // Update modal content
    modal.innerHTML = `
        <div class="order-modal__overlay" onclick="closeOrderMenu()"></div>
        <div class="order-modal__content">
            <button class="order-modal__close" onclick="closeOrderMenu()" aria-label="Fermer">×</button>
            <h2 class="order-modal__title">Commander via</h2>
            <div class="order-modal__options">
                <a href="${dmLinks.tiktok}" class="order-modal__option" target="_blank" rel="noopener noreferrer">
                    <div class="order-modal__icon">📱</div>
                    <div class="order-modal__text">
                        <h3>Via TikTok</h3>
                        <p>Envoyez-nous un message privé</p>
                    </div>
                </a>
                <a href="${dmLinks.facebook}" class="order-modal__option" target="_blank" rel="noopener noreferrer">
                    <div class="order-modal__icon">👥</div>
                    <div class="order-modal__text">
                        <h3>Via Facebook</h3>
                        <p>Écrivez-nous en message privé</p>
                    </div>
                </a>
            </div>
        </div>
    `;
}

function setupOrderButtons() {
    // Find all order buttons and replace their behavior
    const orderButtons = document.querySelectorAll('[data-order-btn], .btn[href*="contact"], .btn:contains("Commander via DM")');
    
    // Also check for buttons with text "Commander via DM"
    document.querySelectorAll('a.btn, button.btn').forEach(btn => {
        if (btn.textContent.includes('Commander via DM') || btn.textContent.includes('Commander')) {
            if (!btn.hasAttribute('data-order-btn-setup')) {
                btn.setAttribute('data-order-btn-setup', 'true');
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    showOrderMenu();
                });
            }
        }
    });
}
