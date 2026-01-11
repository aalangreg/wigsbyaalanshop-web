// Navigation mobile toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Load products data
async function loadProducts() {
    try {
        const response = await fetch('data/products.json');
        const data = await response.json();
        return data.products;
    } catch (error) {
        console.error('Erreur lors du chargement des produits:', error);
        return [];
    }
}

// Format price
function formatPrice(price) {
    return new Intl.NumberFormat('fr-CA', {
        style: 'currency',
        currency: 'CAD'
    }).format(price);
}

// Get DM links and contact info
function getDMLinks() {
    return {
        tiktok: 'https://www.tiktok.com/@wigsbyaalanshop?_r=1&_t=ZS-92y35aCBduz',
        facebook: 'https://www.facebook.com/share/1FJoRQaJHw/?mibextid=wwXIfr',
        email: 'contactpro@aalanshop.com',
        phone: '+1 (514) 260-7145'
    };
}

// Show order menu modal
function showOrderMenu() {
    // Initialize menu if not already done
    if (typeof window.initOrderMenu === 'function') {
        window.initOrderMenu();
    }
    
    const modal = document.getElementById('orderModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

// Close order menu modal
function closeOrderMenu() {
    const modal = document.getElementById('orderModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Copy phone number to clipboard
function copyPhoneNumber() {
    const phone = getDMLinks().phone;
    navigator.clipboard.writeText(phone).then(() => {
        // Update modal button
        const copyBtn = document.getElementById('copyPhoneBtn');
        if (copyBtn) {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = '✓ Copié !';
            copyBtn.style.backgroundColor = '#4caf50';
            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.style.backgroundColor = '';
            }, 2000);
        }
        // Update contact page button
        const copyBtnContact = document.getElementById('copyPhoneBtnContact');
        if (copyBtnContact) {
            const originalText = copyBtnContact.textContent;
            copyBtnContact.textContent = '✓ Copié !';
            copyBtnContact.style.backgroundColor = '#4caf50';
            setTimeout(() => {
                copyBtnContact.textContent = originalText;
                copyBtnContact.style.backgroundColor = '';
            }, 2000);
        }
    }).catch(err => {
        console.error('Erreur lors de la copie:', err);
        alert('Numéro de téléphone: ' + phone);
    });
}
