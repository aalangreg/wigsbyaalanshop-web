// navigation mobile
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => navMenu.classList.toggle('active'));
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => navMenu.classList.remove('active'));
        });
    }
});

// scroll fluide
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// charger les produits depuis le json
async function loadProducts() {
    try {
        const response = await fetch('data/products.json');
        return (await response.json()).products;
    } catch (error) {
        console.error('erreur chargement produits:', error);
        return [];
    }
}

// formater le prix en dollars canadiens
function formatPrice(price) {
    return new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD' }).format(price);
}

// liens de contact (réutilisable pour shopify)
function getDMLinks() {
    return {
        tiktok: 'https://www.tiktok.com/@wigsbyaalanshop?_r=1&_t=ZS-92y35aCBduz',
        facebook: 'https://www.facebook.com/share/1FJoRQaJHw/?mibextid=wwXIfr',
        email: 'contactpro@aalanshop.com',
        phone: '+1 (514) 260-7145'
    };
}

// afficher le menu de commande
function showOrderMenu() {
    if (typeof window.initOrderMenu === 'function') window.initOrderMenu();
    const modal = document.getElementById('orderModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

// fermer le menu de commande
function closeOrderMenu() {
    const modal = document.getElementById('orderModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// copier le numéro de téléphone
function copyPhoneNumber() {
    const phone = getDMLinks().phone;
    navigator.clipboard.writeText(phone).then(() => {
        [document.getElementById('copyPhoneBtn'), document.getElementById('copyPhoneBtnContact')].forEach(btn => {
            if (btn) {
                const originalText = btn.textContent;
                btn.textContent = '✓ Copié !';
                btn.style.backgroundColor = '#4caf50';
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = '';
                }, 2000);
            }
        });
    }).catch(() => alert('Numéro de téléphone: ' + phone));
}

// rendre les fonctions accessibles globalement pour shopify
window.loadProducts = loadProducts;
window.formatPrice = formatPrice;
window.getDMLinks = getDMLinks;
window.showOrderMenu = showOrderMenu;
window.closeOrderMenu = closeOrderMenu;
window.copyPhoneNumber = copyPhoneNumber;
