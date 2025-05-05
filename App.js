
// DOM Elements
const generateBtn = document.getElementById('generateBtn');
const password1 = document.getElementById('password1');
const password2 = document.getElementById('password2');
const copyButtons = document.querySelectorAll('.copy-btn');
const typeTags = document.querySelectorAll('.type-tag');
const autoCopyCheckbox = document.getElementById('autoCopy');

// Character sets
const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

// Generate random password
function generatePassword(length = 16, options = {
    uppercase: true,
    numbers: true,
    symbols: true
}) {
    let chars = lowercase;
    if (options.uppercase) chars += uppercase;
    if (options.numbers) chars += numbers;
    if (options.symbols) chars += symbols;

    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

// Generate email-style password
function generateEmailPassword() {
    const domains = ['savd', 'prot', 'secr', 'rand', 'pass'];
    const tlds = ['.com', '.net', '.org', '.vw', '.pw'];
    const randomString = generatePassword(20, {uppercase: true, numbers: true, symbols: false}).toLowerCase();
    
    const domain = domains[Math.floor(Math.random() * domains.length)];
    const tld = tlds[Math.floor(Math.random() * tlds.length)];
    
    return `my@${domain}${tld}.${randomString}`;
}

// Update passwords
function updatePasswords() {
    password1.querySelector('span').textContent = generateEmailPassword();
    password2.querySelector('span').textContent = generatePassword(20);
    
    if (autoCopyCheckbox.checked) {
        copyToClipboard(password1.querySelector('span').textContent);
    }
}

// Copy to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Password copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// Show toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.backgroundColor = 'var(--dark)';
    toast.style.color = 'white';
    toast.style.padding = '12px 24px';
    toast.style.borderRadius = 'var(--border-radius)';
    toast.style.zIndex = '1000';
    toast.style.boxShadow = 'var(--box-shadow)';
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Event Listeners
generateBtn.addEventListener('click', updatePasswords);

copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const passwordText = e.target.parentElement.textContent.trim().replace('COPY', '');
        copyToClipboard(passwordText);
    });
});

typeTags.forEach(tag => {
    tag.addEventListener('click', () => {
        typeTags.forEach(t => t.classList.remove('active'));
        tag.classList.add('active');
        updatePasswords();
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Add spans to password elements for easier manipulation
    password1.innerHTML = `<span>${generateEmailPassword()}</span><button class="copy-btn">COPY</button>`;
    password2.innerHTML = `<span>${generatePassword(20)}</span><button class="copy-btn">COPY</button>`;
});
