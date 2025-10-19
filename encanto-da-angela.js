// ===== ENCANTO DA ÂNGELA - JAVASCRIPT =====

// ===== GLOBAL VARIABLES =====
let cart = [];
let currentTestimonial = 0;
let testimonialInterval;

// ===== PRODUCTS DATA =====
const products = [
    {
        id: 1,
        name: "Sabonete Artesanal Lavanda",
        description: "Sabonete natural com óleo essencial de lavanda, perfeito para relaxar após um longo dia.",
        price: 24.90,
        image: "fas fa-spa",
        category: "sabonetes"
    },
    {
        id: 2,
        name: "Sabonete Artesanal Rosa",
        description: "Delicado sabonete com pétalas de rosa e fragrância suave para uma pele macia.",
        price: 26.90,
        image: "fas fa-leaf",
        category: "sabonetes"
    },
    {
        id: 3,
        name: "Sabonete Artesanal Mel",
        description: "Sabonete hidratante com mel natural e propriedades nutritivas para a pele.",
        price: 28.90,
        image: "fas fa-honey-pot",
        category: "sabonetes"
    },
    {
        id: 4,
        name: "Sabonete Líquido Lavanda",
        description: "Sabonete líquido concentrado com lavanda, ideal para uso diário.",
        price: 32.90,
        image: "fas fa-tint",
        category: "sabonetes-liquidos"
    },
    {
        id: 5,
        name: "Aromatizador de Carro Natural",
        description: "Aromatizador de carro com fragrância natural, duração de até 30 dias.",
        price: 18.90,
        image: "fas fa-car",
        category: "aromatizadores"
    },
    {
        id: 6,
        name: "Spray para Tecidos Casa",
        description: "Spray aromático para tecidos, deixando roupas e cama com cheiro fresco.",
        price: 22.90,
        image: "fas fa-home",
        category: "sprays"
    }
];

// ===== DOM ELEMENTS =====
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const cartIcon = document.getElementById('cart-icon');
const cartModal = document.getElementById('cart-modal');
const closeCart = document.getElementById('close-cart');
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const productsGrid = document.getElementById('products-grid');
const contactForm = document.getElementById('contact-form');
const prevTestimonial = document.getElementById('prev-testimonial');
const nextTestimonial = document.getElementById('next-testimonial');
const shopNowBtn = document.getElementById('shop-now-btn');
const exploreBtn = document.getElementById('explore-btn');

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    loadProducts();
    initializeTestimonials();
    initializeScrollAnimations();
    initializeSmoothScrolling();
    updateCartUI();
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Navigation
    navToggle.addEventListener('click', toggleMobileMenu);
    
    // Cart
    cartIcon.addEventListener('click', openCart);
    closeCart.addEventListener('click', closeCartModal);
    checkoutBtn.addEventListener('click', proceedToCheckout);
    
    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    // Buttons
    shopNowBtn.addEventListener('click', () => scrollToSection('products'));
    exploreBtn.addEventListener('click', () => scrollToSection('products'));
    
    // Testimonials
    prevTestimonial.addEventListener('click', () => changeTestimonial(-1));
    nextTestimonial.addEventListener('click', () => changeTestimonial(1));
    
    // Contact form
    contactForm.addEventListener('submit', handleContactForm);
    
    // Close cart when clicking outside
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            closeCartModal();
        }
    });
    
    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// ===== NAVIGATION =====
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
}

function handleNavClick(e) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href').substring(1);
    scrollToSection(targetId);
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    e.target.classList.add('active');
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = section.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// ===== PRODUCTS =====
function loadProducts() {
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card fade-in';
    card.innerHTML = `
        <div class="product-image">
            <i class="${product.image}"></i>
        </div>
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                <i class="fas fa-shopping-cart"></i>
                Adicionar ao Carrinho
            </button>
        </div>
    `;
    
    return card;
}

// ===== CART FUNCTIONALITY =====
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartUI();
    showAddToCartAnimation();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCartUI();
    }
}

function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    
    // Update cart items
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--text-light);">
                <i class="fas fa-shopping-cart" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.3;"></i>
                <p>Seu carrinho está vazio</p>
            </div>
        `;
        return;
    }
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <i class="${item.image}"></i>
            </div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</div>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        cartItems.appendChild(cartItem);
    });
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2).replace('.', ',');
}

function openCart() {
    cartModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCartModal() {
    cartModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function showAddToCartAnimation() {
    const cartIcon = document.getElementById('cart-icon');
    cartIcon.style.transform = 'scale(1.2)';
    cartIcon.style.color = 'var(--primary-color)';
    
    setTimeout(() => {
        cartIcon.style.transform = 'scale(1)';
        cartIcon.style.color = '';
    }, 300);
}

// ===== CHECKOUT =====
function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Seu carrinho está vazio!', 'error');
        return;
    }
    
    // Show customer information form
    showCustomerInfoForm();
}

function showCustomerInfoForm() {
    // Create customer info modal
    const customerModal = document.createElement('div');
    customerModal.className = 'customer-modal';
    customerModal.innerHTML = `
        <div class="customer-modal-content">
            <div class="customer-header">
                <h3>Informações para Checkout</h3>
                <button class="close-customer-modal" id="close-customer-modal">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form class="customer-form" id="customer-form">
                <div class="form-row">
                    <div class="form-group">
                        <label for="customer-name">Nome Completo *</label>
                        <input type="text" id="customer-name" name="customerName" required>
                    </div>
                    <div class="form-group">
                        <label for="customer-email">Email *</label>
                        <input type="email" id="customer-email" name="customerEmail" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="customer-phone">Telefone *</label>
                        <input type="tel" id="customer-phone" name="customerPhone" required>
                    </div>
                    <div class="form-group">
                        <label for="customer-cpf">CPF *</label>
                        <input type="text" id="customer-cpf" name="customerCpf" required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="customer-address">Endereço Completo *</label>
                    <input type="text" id="customer-address" name="customerAddress" required>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="customer-city">Cidade *</label>
                        <input type="text" id="customer-city" name="customerCity" required>
                    </div>
                    <div class="form-group">
                        <label for="customer-state">Estado *</label>
                        <select id="customer-state" name="customerState" required>
                            <option value="">Selecione</option>
                            <option value="AC">Acre</option>
                            <option value="AL">Alagoas</option>
                            <option value="AP">Amapá</option>
                            <option value="AM">Amazonas</option>
                            <option value="BA">Bahia</option>
                            <option value="CE">Ceará</option>
                            <option value="DF">Distrito Federal</option>
                            <option value="ES">Espírito Santo</option>
                            <option value="GO">Goiás</option>
                            <option value="MA">Maranhão</option>
                            <option value="MT">Mato Grosso</option>
                            <option value="MS">Mato Grosso do Sul</option>
                            <option value="MG">Minas Gerais</option>
                            <option value="PA">Pará</option>
                            <option value="PB">Paraíba</option>
                            <option value="PR">Paraná</option>
                            <option value="PE">Pernambuco</option>
                            <option value="PI">Piauí</option>
                            <option value="RJ">Rio de Janeiro</option>
                            <option value="RN">Rio Grande do Norte</option>
                            <option value="RS">Rio Grande do Sul</option>
                            <option value="RO">Rondônia</option>
                            <option value="RR">Roraima</option>
                            <option value="SC">Santa Catarina</option>
                            <option value="SP">São Paulo</option>
                            <option value="SE">Sergipe</option>
                            <option value="TO">Tocantins</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="customer-zip">CEP *</label>
                        <input type="text" id="customer-zip" name="customerZip" required>
                    </div>
                </div>
                <div class="order-summary">
                    <h4>Resumo do Pedido</h4>
                    <div class="order-items" id="order-items">
                        <!-- Order items will be populated here -->
                    </div>
                    <div class="order-total">
                        <strong>Total: R$ <span id="order-total">0,00</span></strong>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary btn-large" id="proceed-to-payment">
                    <i class="fas fa-credit-card"></i>
                    Prosseguir para Pagamento
                </button>
            </form>
        </div>
    `;
    
    // Add modal styles
    customerModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3000;
        backdrop-filter: blur(5px);
    `;
    
    document.body.appendChild(customerModal);
    document.body.style.overflow = 'hidden';
    
    // Populate order summary
    populateOrderSummary();
    
    // Add event listeners
    document.getElementById('close-customer-modal').addEventListener('click', () => {
        document.body.removeChild(customerModal);
        document.body.style.overflow = 'auto';
    });
    
    customerModal.addEventListener('click', (e) => {
        if (e.target === customerModal) {
            document.body.removeChild(customerModal);
            document.body.style.overflow = 'auto';
        }
    });
    
    document.getElementById('customer-form').addEventListener('submit', handleCustomerForm);
    
    // Add CPF mask
    addCPFMask();
    addPhoneMask();
    addZipMask();
}

function populateOrderSummary() {
    const orderItems = document.getElementById('order-items');
    const orderTotal = document.getElementById('order-total');
    
    orderItems.innerHTML = '';
    
    cart.forEach(item => {
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <div class="order-item-info">
                <span class="order-item-name">${item.name}</span>
                <span class="order-item-quantity">Qtd: ${item.quantity}</span>
            </div>
            <div class="order-item-price">R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</div>
        `;
        orderItems.appendChild(orderItem);
    });
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    orderTotal.textContent = total.toFixed(2).replace('.', ',');
}

function handleCustomerForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const customerData = {
        name: formData.get('customerName'),
        email: formData.get('customerEmail'),
        phone: formData.get('customerPhone'),
        cpf: formData.get('customerCpf'),
        address: formData.get('customerAddress'),
        city: formData.get('customerCity'),
        state: formData.get('customerState'),
        zip: formData.get('customerZip')
    };
    
    // Validate required fields
    if (!customerData.name || !customerData.email || !customerData.phone || 
        !customerData.cpf || !customerData.address || !customerData.city || 
        !customerData.state || !customerData.zip) {
        showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
        return;
    }
    
    // Validate CPF format
    if (!validateCPF(customerData.cpf)) {
        showNotification('CPF inválido. Por favor, verifique o número.', 'error');
        return;
    }
    
    // Validate email format
    if (!validateEmail(customerData.email)) {
        showNotification('Email inválido. Por favor, verifique o endereço.', 'error');
        return;
    }
    
    // Proceed to PagSeguro checkout
    proceedToPagSeguro(customerData);
}

function proceedToPagSeguro(customerData) {
    const proceedBtn = document.getElementById('proceed-to-payment');
    const originalText = proceedBtn.innerHTML;
    
    proceedBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecionando...';
    proceedBtn.disabled = true;
    
    // Prepare order data for PagSeguro
    const orderData = {
        customer: customerData,
        items: cart.map(item => ({
            id: item.id,
            description: item.name,
            amount: (item.price * 100).toFixed(0), // Convert to cents
            quantity: item.quantity
        })),
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };
    
    // In a real implementation, you would send this data to your backend
    // which would then create a PagSeguro session and redirect the user
    
    // For demonstration, we'll simulate the PagSeguro redirect
    setTimeout(() => {
        // Close customer modal
        const customerModal = document.querySelector('.customer-modal');
        if (customerModal) {
            document.body.removeChild(customerModal);
            document.body.style.overflow = 'auto';
        }
        
        // Show PagSeguro redirect message
        showPagSeguroRedirect(orderData);
    }, 2000);
}

function showPagSeguroRedirect(orderData) {
    const redirectModal = document.createElement('div');
    redirectModal.className = 'redirect-modal';
    redirectModal.innerHTML = `
        <div class="redirect-modal-content">
            <div class="redirect-header">
                <i class="fas fa-credit-card"></i>
                <h3>Redirecionando para PagSeguro</h3>
            </div>
            <div class="redirect-body">
                <p>Você será redirecionado para a página segura do PagSeguro para finalizar seu pagamento.</p>
                <div class="order-details">
                    <h4>Detalhes do Pedido:</h4>
                    <p><strong>Cliente:</strong> ${orderData.customer.name}</p>
                    <p><strong>Email:</strong> ${orderData.customer.email}</p>
                    <p><strong>Total:</strong> R$ ${orderData.total.toFixed(2).replace('.', ',')}</p>
                </div>
                <div class="redirect-actions">
                    <button class="btn btn-primary" id="confirm-redirect">
                        <i class="fas fa-external-link-alt"></i>
                        Ir para PagSeguro
                    </button>
                    <button class="btn btn-secondary" id="cancel-redirect">
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    redirectModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3000;
        backdrop-filter: blur(5px);
    `;
    
    document.body.appendChild(redirectModal);
    document.body.style.overflow = 'hidden';
    
    // Add event listeners
    document.getElementById('confirm-redirect').addEventListener('click', () => {
        // In a real implementation, this would redirect to PagSeguro
        // For now, we'll simulate the redirect and show success
        simulatePagSeguroCheckout(orderData);
    });
    
    document.getElementById('cancel-redirect').addEventListener('click', () => {
        document.body.removeChild(redirectModal);
        document.body.style.overflow = 'auto';
    });
}

function simulatePagSeguroCheckout(orderData) {
    // Close redirect modal
    const redirectModal = document.querySelector('.redirect-modal');
    if (redirectModal) {
        document.body.removeChild(redirectModal);
    }
    
    // Show loading
    showNotification('Processando pagamento...', 'info');
    
    // Simulate payment processing
    setTimeout(() => {
        // Clear cart
        cart = [];
        updateCartUI();
        closeCartModal();
        
        // Show success page
        showThankYouPage(orderData);
    }, 3000);
}

function showThankYouPage(orderData) {
    const thankYouModal = document.createElement('div');
    thankYouModal.className = 'thank-you-modal';
    thankYouModal.innerHTML = `
        <div class="thank-you-content">
            <div class="thank-you-header">
                <i class="fas fa-check-circle"></i>
                <h2>Obrigado pela sua compra!</h2>
            </div>
            <div class="thank-you-body">
                <p>Seus produtos artesanais do Encanto da Ângela estão a caminho!</p>
                <div class="order-confirmation">
                    <h3>Confirmação do Pedido</h3>
                    <p><strong>Cliente:</strong> ${orderData.customer.name}</p>
                    <p><strong>Email:</strong> ${orderData.customer.email}</p>
                    <p><strong>Total Pago:</strong> R$ ${orderData.total.toFixed(2).replace('.', ',')}</p>
                    <p><strong>Status:</strong> <span class="status-confirmed">Confirmado</span></p>
                </div>
                <div class="next-steps">
                    <h4>Próximos Passos:</h4>
                    <ul>
                        <li>Você receberá um email de confirmação em breve</li>
                        <li>Seu pedido será processado em até 2 dias úteis</li>
                        <li>O prazo de entrega é de 5 a 10 dias úteis</li>
                        <li>Você pode acompanhar seu pedido pelo email</li>
                    </ul>
                </div>
                <div class="thank-you-actions">
                    <button class="btn btn-primary" id="continue-shopping">
                        <i class="fas fa-shopping-bag"></i>
                        Continuar Comprando
                    </button>
                    <button class="btn btn-secondary" id="close-thank-you">
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    thankYouModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3000;
        backdrop-filter: blur(5px);
    `;
    
    document.body.appendChild(thankYouModal);
    document.body.style.overflow = 'hidden';
    
    // Add event listeners
    document.getElementById('continue-shopping').addEventListener('click', () => {
        document.body.removeChild(thankYouModal);
        document.body.style.overflow = 'auto';
        scrollToSection('products');
    });
    
    document.getElementById('close-thank-you').addEventListener('click', () => {
        document.body.removeChild(thankYouModal);
        document.body.style.overflow = 'auto';
    });
}

// ===== VALIDATION FUNCTIONS =====
function validateCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, '');
    if (cpf.length !== 11) return false;
    
    // Check if all digits are the same
    if (/^(\d)\1{10}$/.test(cpf)) return false;
    
    // Validate CPF algorithm
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(9))) return false;
    
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(10))) return false;
    
    return true;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== INPUT MASKS =====
function addCPFMask() {
    const cpfInput = document.getElementById('customer-cpf');
    if (cpfInput) {
        cpfInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            e.target.value = value;
        });
    }
}

function addPhoneMask() {
    const phoneInput = document.getElementById('customer-phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 10) {
                value = value.replace(/(\d{2})(\d)/, '($1) $2');
                value = value.replace(/(\d{4})(\d)/, '$1-$2');
            } else {
                value = value.replace(/(\d{2})(\d)/, '($1) $2');
                value = value.replace(/(\d{5})(\d)/, '$1-$2');
            }
            e.target.value = value;
        });
    }
}

function addZipMask() {
    const zipInput = document.getElementById('customer-zip');
    if (zipInput) {
        zipInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{5})(\d)/, '$1-$2');
            e.target.value = value;
        });
    }
}

// ===== TESTIMONIALS =====
function initializeTestimonials() {
    const slides = document.querySelectorAll('.testimonial-slide');
    
    if (slides.length === 0) return;
    
    // Auto-rotate testimonials
    testimonialInterval = setInterval(() => {
        changeTestimonial(1);
    }, 5000);
}

function changeTestimonial(direction) {
    const slides = document.querySelectorAll('.testimonial-slide');
    if (slides.length === 0) return;
    
    slides[currentTestimonial].classList.remove('active');
    
    currentTestimonial += direction;
    
    if (currentTestimonial >= slides.length) {
        currentTestimonial = 0;
    } else if (currentTestimonial < 0) {
        currentTestimonial = slides.length - 1;
    }
    
    slides[currentTestimonial].classList.add('active');
    
    // Reset auto-rotation
    clearInterval(testimonialInterval);
    testimonialInterval = setInterval(() => {
        changeTestimonial(1);
    }, 5000);
}

// ===== CONTACT FORM =====
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Set reply-to field to the sender's email
    const replyToField = contactForm.querySelector('input[name="_replyto"]');
    if (replyToField) {
        replyToField.value = data.email;
    }
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;
    
    // Submit to Formspree
    fetch('https://formspree.io/f/xeordodr', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Success
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Enviado!';
            submitBtn.style.background = '#4CAF50';
            showFormspreeSuccessMessage(data);
            
            // Reset form after success
            setTimeout(() => {
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
        } else {
            throw new Error('Erro ao enviar mensagem');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        showNotification('Erro ao enviar mensagem. Tente novamente.', 'error');
    });
}

function showFormspreeSuccessMessage(data) {
    const successModal = document.createElement('div');
    successModal.className = 'success-modal';
    successModal.innerHTML = `
        <div class="success-modal-content">
            <div class="success-header">
                <i class="fas fa-check-circle"></i>
                <h3>Mensagem Enviada!</h3>
            </div>
            <div class="success-body">
                <p>Obrigada pelo seu contato, <strong>${data.name}</strong>!</p>
                <p>Sua mensagem foi enviada com sucesso e responderemos em breve.</p>
                <div class="formspree-info">
                    <h4>✅ Confirmação:</h4>
                    <ul>
                        <li>Email enviado para: angelagalindo78@yahoo.com.br</li>
                        <li>Você receberá uma cópia da mensagem</li>
                        <li>Responderemos em até 24 horas</li>
                        <li>Para urgências, use o WhatsApp</li>
                    </ul>
                </div>
                <div class="contact-actions">
                    <a href="https://wa.me/5511982043400?text=${encodeURIComponent(`Olá Ângela! Vim através do site Encanto da Ângela. Meu nome é ${data.name}. ${data.message}`)}" target="_blank" class="btn btn-whatsapp">
                        <i class="fab fa-whatsapp"></i>
                        Enviar WhatsApp
                    </a>
                    <button class="btn btn-primary" id="close-formspree-modal">
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    successModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3000;
        backdrop-filter: blur(5px);
    `;
    
    document.body.appendChild(successModal);
    document.body.style.overflow = 'hidden';
    
    // Add event listener to close modal
    document.getElementById('close-formspree-modal').addEventListener('click', () => {
        document.body.removeChild(successModal);
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside
    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) {
            document.body.removeChild(successModal);
            document.body.style.overflow = 'auto';
        }
    });
}

function showEmailSuccessMessage(data) {
    const successModal = document.createElement('div');
    successModal.className = 'success-modal';
    successModal.innerHTML = `
        <div class="success-modal-content">
            <div class="success-header">
                <i class="fas fa-envelope-open"></i>
                <h3>Email Aberto!</h3>
            </div>
            <div class="success-body">
                <p>Obrigada pelo seu contato, <strong>${data.name}</strong>!</p>
                <p>Seu cliente de email foi aberto com a mensagem preenchida.</p>
                <div class="email-instructions">
                    <h4>Próximos Passos:</h4>
                    <ol>
                        <li>Verifique se o email foi aberto automaticamente</li>
                        <li>Se não abriu, clique no botão abaixo</li>
                        <li>Revise a mensagem e clique em "Enviar"</li>
                        <li>Você receberá uma resposta em breve!</li>
                    </ol>
                </div>
                <div class="email-actions">
                    <a href="mailto:angelagalindo78@yahoo.com.br?subject=${encodeURIComponent(`Contato via Site - ${data.name}`)}&body=${encodeURIComponent(`Olá Ângela!\n\nVim através do site Encanto da Ângela e gostaria de entrar em contato.\n\nNome: ${data.name}\nEmail: ${data.email}\n\nMensagem:\n${data.message}\n\nAtenciosamente,\n${data.name}`)}" class="btn btn-primary">
                        <i class="fas fa-envelope"></i>
                        Abrir Email Novamente
                    </a>
                    <a href="https://wa.me/5511982043400?text=${encodeURIComponent(`Olá Ângela! Vim através do site Encanto da Ângela. Meu nome é ${data.name}. ${data.message}`)}" target="_blank" class="btn btn-whatsapp">
                        <i class="fab fa-whatsapp"></i>
                        Enviar WhatsApp
                    </a>
                </div>
                <button class="btn btn-secondary" id="close-email-modal">
                    Fechar
                </button>
            </div>
        </div>
    `;
    
    // Add modal styles
    successModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3000;
        backdrop-filter: blur(5px);
    `;
    
    document.body.appendChild(successModal);
    document.body.style.overflow = 'hidden';
    
    // Add event listener to close modal
    document.getElementById('close-email-modal').addEventListener('click', () => {
        document.body.removeChild(successModal);
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside
    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) {
            document.body.removeChild(successModal);
            document.body.style.overflow = 'auto';
        }
    });
}

function showDetailedSuccessMessage(data) {
    const successModal = document.createElement('div');
    successModal.className = 'success-modal';
    successModal.innerHTML = `
        <div class="success-modal-content">
            <div class="success-header">
                <i class="fas fa-check-circle"></i>
                <h3>Mensagem Enviada!</h3>
            </div>
            <div class="success-body">
                <p>Obrigada pelo seu contato, <strong>${data.name}</strong>!</p>
                <p>Sua mensagem foi recebida e responderemos em breve.</p>
                <div class="contact-info">
                    <h4>Formas de Contato:</h4>
                    <div class="contact-options">
                        <div class="contact-option">
                            <i class="fab fa-whatsapp"></i>
                            <div>
                                <strong>WhatsApp</strong>
                                <p>(11) 98204-3400</p>
                                <a href="https://wa.me/5511982043400?text=Olá! Vim através do site Encanto da Ângela." target="_blank" class="btn btn-whatsapp">
                                    <i class="fab fa-whatsapp"></i>
                                    Enviar WhatsApp
                                </a>
                            </div>
                        </div>
                        <div class="contact-option">
                            <i class="fas fa-envelope"></i>
                            <div>
                                <strong>Email</strong>
                                <p>angelagalindo78@yahoo.com.br</p>
                                <a href="mailto:angelagalindo78@yahoo.com.br?subject=Contato via Site&body=Olá Ângela!%0A%0AVim através do site Encanto da Ângela.%0A%0AMensagem:%0A${encodeURIComponent(data.message)}" class="btn btn-email">
                                    <i class="fas fa-envelope"></i>
                                    Enviar Email
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="btn btn-primary" id="close-success-modal">
                    Fechar
                </button>
            </div>
        </div>
    `;
    
    // Add modal styles
    successModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3000;
        backdrop-filter: blur(5px);
    `;
    
    document.body.appendChild(successModal);
    document.body.style.overflow = 'hidden';
    
    // Add event listener to close modal
    document.getElementById('close-success-modal').addEventListener('click', () => {
        document.body.removeChild(successModal);
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside
    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) {
            document.body.removeChild(successModal);
            document.body.style.overflow = 'auto';
        }
    });
}

// ===== SCROLL ANIMATIONS =====
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// ===== SMOOTH SCROLLING =====
function initializeSmoothScrolling() {
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== NOTIFICATIONS =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ===== HEADER SCROLL EFFECT =====
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(200, 162, 200, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// ===== LAZY LOADING =====
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== PERFORMANCE OPTIMIZATION =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced scroll handler
const debouncedScrollHandler = debounce(() => {
    // Handle scroll events here if needed
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// ===== ACCESSIBILITY =====
document.addEventListener('keydown', (e) => {
    // Close cart with Escape key
    if (e.key === 'Escape' && cartModal.classList.contains('active')) {
        closeCartModal();
    }
    
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        addToCart,
        removeFromCart,
        updateQuantity,
        changeTestimonial
    };
}
