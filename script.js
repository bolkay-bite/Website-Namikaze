// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('scrolled', window.scrollY > 0);
});

// Tab functionality for Ecosystem section
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Show corresponding content
        const tabId = button.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Initialize tokenomics chart
function initTokenChart() {
    const ctx = document.getElementById('tokenChart').getContext('2d');
    const tokenChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Gaming Rewards', 'Team', 'Liquidity', 'Marketing', 'Staking Rewards'],
            datasets: [{
                data: [30, 20, 15, 15, 20],
                backgroundColor: [
                    '#6c5ce7',
                    '#00cec9',
                    '#fd79a8',
                    '#fdcb6e',
                    '#00b894'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animate elements when scrolling
function animateOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .timeline-item, .partner-logo');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
}
async function connectWallet() {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log("Connected:", accounts[0]);
            // Update UI (misal: ganti tombol jadi alamat wallet yang disingkat)
        } catch (error) {
            console.error("User rejected request:", error);
        }
    } else {
        alert("Please install MetaMask!");
    }
}
document.querySelector('.btn-primary').addEventListener('click', connectWallet);

// Initialize floating elements animation
function initFloatingElements() {
    const elements = document.querySelectorAll('.element');
    
    elements.forEach((element, index) => {
        // Set different animation durations for variety
        element.style.animationDuration = `${4 + index}s`;
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize token chart if Chart.js is loaded
    if (typeof Chart !== 'undefined') {
        initTokenChart();
    }
    
    initFloatingElements();
    
    // Set first tab as active by default
    if (tabButtons.length > 0) {
        tabButtons[0].click();
    }
    
    // Add scroll event listener for animations
    window.addEventListener('scroll', animateOnScroll);
    
    // Trigger initial animation check
    animateOnScroll();
});

// Hero image parallax effect
if (document.querySelector('.hero-image')) {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image img');
        heroImage.style.transform = `translateY(${scrollPosition * 0.3}px)`;
    });
}