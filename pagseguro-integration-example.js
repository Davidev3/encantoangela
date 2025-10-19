// ===== PAGSEGURO INTEGRATION EXAMPLE =====
// This file shows how to integrate with PagSeguro API for real payments
// Replace the simulation in encanto-da-angela.js with actual API calls

// ===== PAGSEGURO CONFIGURATION =====
const PAGSEGURO_CONFIG = {
    // Replace with your actual PagSeguro credentials
    email: 'seu-email@exemplo.com',
    token: 'seu-token-pagseguro',
    environment: 'production', // 'sandbox' for testing, 'production' for live
    baseUrl: 'https://ws.sandbox.pagseguro.uol.com.br', // Change to production URL when ready
    checkoutUrl: 'https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html' // Change to production URL when ready
};

// ===== PAGSEGURO API FUNCTIONS =====

/**
 * Creates a PagSeguro session for checkout
 * @returns {Promise<string>} Session ID
 */
async function createPagSeguroSession() {
    try {
        const response = await fetch(`${PAGSEGURO_CONFIG.baseUrl}/v2/sessions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                email: PAGSEGURO_CONFIG.email,
                token: PAGSEGURO_CONFIG.token
            })
        });

        if (!response.ok) {
            throw new Error('Failed to create PagSeguro session');
        }

        const data = await response.text();
        // Parse XML response to get session ID
        const sessionId = data.match(/<id>(.*?)<\/id>/)?.[1];
        
        if (!sessionId) {
            throw new Error('Session ID not found in response');
        }

        return sessionId;
    } catch (error) {
        console.error('Error creating PagSeguro session:', error);
        throw error;
    }
}

/**
 * Creates a PagSeguro checkout request
 * @param {Object} orderData - Order information
 * @param {string} sessionId - PagSeguro session ID
 * @returns {Promise<string>} Checkout code
 */
async function createPagSeguroCheckout(orderData, sessionId) {
    try {
        const checkoutData = {
            email: PAGSEGURO_CONFIG.email,
            token: PAGSEGURO_CONFIG.token,
            currency: 'BRL',
            reference: `ENCANTO_${Date.now()}`, // Unique order reference
            senderName: orderData.customer.name,
            senderEmail: orderData.customer.email,
            senderPhone: orderData.customer.phone.replace(/\D/g, ''), // Remove formatting
            senderCPF: orderData.customer.cpf.replace(/\D/g, ''), // Remove formatting
            senderAreaCode: orderData.customer.phone.replace(/\D/g, '').substring(0, 2),
            senderPhone: orderData.customer.phone.replace(/\D/g, '').substring(2),
            shippingAddressStreet: orderData.customer.address,
            shippingAddressNumber: '1', // You might want to separate this field
            shippingAddressComplement: '',
            shippingAddressDistrict: '',
            shippingAddressCity: orderData.customer.city,
            shippingAddressState: orderData.customer.state,
            shippingAddressCountry: 'BRA',
            shippingAddressPostalCode: orderData.customer.zip.replace(/\D/g, ''),
            shippingType: '3', // 3 = PAC (Correios)
            shippingCost: '0.00', // Free shipping for this example
            extraAmount: '0.00',
            redirectURL: `${window.location.origin}/obrigado.html`, // Thank you page
            notificationURL: `${window.location.origin}/api/pagseguro/notification`, // Webhook for payment notifications
        };

        // Add items to checkout
        orderData.items.forEach((item, index) => {
            checkoutData[`itemId${index + 1}`] = item.id;
            checkoutData[`itemDescription${index + 1}`] = item.description;
            checkoutData[`itemAmount${index + 1}`] = item.amount;
            checkoutData[`itemQuantity${index + 1}`] = item.quantity;
        });

        const response = await fetch(`${PAGSEGURO_CONFIG.baseUrl}/v2/checkout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(checkoutData)
        });

        if (!response.ok) {
            throw new Error('Failed to create PagSeguro checkout');
        }

        const data = await response.text();
        // Parse XML response to get checkout code
        const checkoutCode = data.match(/<code>(.*?)<\/code>/)?.[1];
        
        if (!checkoutCode) {
            throw new Error('Checkout code not found in response');
        }

        return checkoutCode;
    } catch (error) {
        console.error('Error creating PagSeguro checkout:', error);
        throw error;
    }
}

/**
 * Redirects user to PagSeguro checkout page
 * @param {string} checkoutCode - PagSeguro checkout code
 */
function redirectToPagSeguro(checkoutCode) {
    const checkoutUrl = `${PAGSEGURO_CONFIG.checkoutUrl}?code=${checkoutCode}`;
    window.location.href = checkoutUrl;
}

// ===== INTEGRATION WITH MAIN CHECKOUT FLOW =====

/**
 * Updated proceedToPagSeguro function for real integration
 * Replace the simulation in encanto-da-angela.js with this function
 */
async function proceedToPagSeguroReal(customerData) {
    const proceedBtn = document.getElementById('proceed-to-payment');
    const originalText = proceedBtn.innerHTML;
    
    try {
        proceedBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Criando sessão...';
        proceedBtn.disabled = true;
        
        // Create PagSeguro session
        const sessionId = await createPagSeguroSession();
        
        proceedBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando checkout...';
        
        // Prepare order data
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
        
        // Create PagSeguro checkout
        const checkoutCode = await createPagSeguroCheckout(orderData, sessionId);
        
        proceedBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecionando...';
        
        // Close customer modal
        const customerModal = document.querySelector('.customer-modal');
        if (customerModal) {
            document.body.removeChild(customerModal);
            document.body.style.overflow = 'auto';
        }
        
        // Redirect to PagSeguro
        redirectToPagSeguro(checkoutCode);
        
    } catch (error) {
        console.error('Checkout error:', error);
        
        // Reset button
        proceedBtn.innerHTML = originalText;
        proceedBtn.disabled = false;
        
        // Show error message
        showNotification('Erro ao processar pagamento. Tente novamente.', 'error');
    }
}

// ===== WEBHOOK HANDLER EXAMPLE =====
// This would be implemented on your backend server

/**
 * Example webhook handler for PagSeguro notifications
 * This should be implemented on your backend server
 */
function handlePagSeguroNotification(notificationData) {
    // This function would be called by your backend when PagSeguro sends a notification
    // about payment status changes
    
    const { notificationCode, notificationType } = notificationData;
    
    if (notificationType === 'transaction') {
        // Query PagSeguro to get transaction details
        queryTransactionStatus(notificationCode);
    }
}

/**
 * Query transaction status from PagSeguro
 * This should be implemented on your backend server
 */
async function queryTransactionStatus(notificationCode) {
    try {
        const response = await fetch(`${PAGSEGURO_CONFIG.baseUrl}/v3/transactions/notifications/${notificationCode}?email=${PAGSEGURO_CONFIG.email}&token=${PAGSEGURO_CONFIG.token}`);
        
        if (!response.ok) {
            throw new Error('Failed to query transaction status');
        }
        
        const data = await response.text();
        // Parse XML response to get transaction details
        const transactionStatus = data.match(/<status>(.*?)<\/status>/)?.[1];
        const transactionReference = data.match(/<reference>(.*?)<\/reference>/)?.[1];
        
        // Update order status in your database
        updateOrderStatus(transactionReference, transactionStatus);
        
    } catch (error) {
        console.error('Error querying transaction status:', error);
    }
}

/**
 * Update order status in your database
 * This should be implemented on your backend server
 */
function updateOrderStatus(orderReference, status) {
    // Map PagSeguro status codes to your order statuses
    const statusMap = {
        '1': 'pending',      // Aguardando pagamento
        '2': 'reviewing',    // Em análise
        '3': 'paid',         // Paga
        '4': 'available',    // Disponível
        '5': 'dispute',      // Em disputa
        '6': 'returned',     // Devolvida
        '7': 'cancelled'     // Cancelada
    };
    
    const orderStatus = statusMap[status] || 'unknown';
    
    // Update your database with the new status
    console.log(`Order ${orderReference} status updated to: ${orderStatus}`);
    
    // Send confirmation email to customer if payment is successful
    if (orderStatus === 'paid' || orderStatus === 'available') {
        sendOrderConfirmationEmail(orderReference);
    }
}

/**
 * Send order confirmation email
 * This should be implemented on your backend server
 */
function sendOrderConfirmationEmail(orderReference) {
    // Send email to customer with order confirmation
    console.log(`Sending confirmation email for order: ${orderReference}`);
}

// ===== USAGE INSTRUCTIONS =====
/*
To integrate this with your website:

1. Replace the simulation in encanto-da-angela.js:
   - Find the function `proceedToPagSeguro(customerData)`
   - Replace its content with a call to `proceedToPagSeguroReal(customerData)`

2. Set up your PagSeguro credentials:
   - Replace the email and token in PAGSEGURO_CONFIG
   - Change environment to 'production' when ready to go live

3. Implement backend webhook handler:
   - Create an endpoint to receive PagSeguro notifications
   - Implement the functions marked as "backend server" functions
   - Update your database with order statuses

4. Create thank you page:
   - Create obrigado.html for successful payments
   - Create error page for failed payments

5. Test thoroughly:
   - Use PagSeguro sandbox environment first
   - Test all payment methods
   - Verify webhook notifications work correctly

6. Security considerations:
   - Never expose your PagSeguro token in frontend code
   - Implement proper validation on backend
   - Use HTTPS for all communications
   - Validate all webhook notifications
*/
