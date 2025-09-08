// DOM Elements
const enterBtn = document.getElementById('enter-btn');
const landing = document.getElementById('landing');
const mainContent = document.getElementById('main-content');
const backToTop = document.getElementById('back-to-top');
const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
const lightboxOverlay = document.querySelector('.lightbox-overlay');
const confettiContainer = document.getElementById('confetti');

// State
let currentImageIndex = 0;
let images = [];
let hasEnteredSite = false;

// Initialize the site
document.addEventListener('DOMContentLoaded', function() {
    generateGallery();
    setupEventListeners();
    
    // Prevent scrolling on landing page
    document.body.style.overflow = 'hidden';
});

// Generate photo gallery
function generateGallery() {
    const photoCount = 20;
    
    for (let i = 1; i <= photoCount; i++) {
        const photoNumber = i.toString().padStart(2, '0');
        const imagePath = `./assets/photos/photo${photoNumber}.jpg`;
        
        // Create gallery item
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-index', i - 1);
        
        const img = document.createElement('img');
        img.src = imagePath;
        img.alt = `Kimberly photo ${i}`;
        img.loading = 'lazy';
        
        galleryItem.appendChild(img);
        gallery.appendChild(galleryItem);
        
        // Store image data
        images.push({
            src: imagePath,
            alt: `Kimberly photo ${i}`
        });
        
        // Add click handler for lightbox
        galleryItem.addEventListener('click', () => openLightbox(i - 1));
    }
}

// Setup event listeners
function setupEventListeners() {
    // Enter button
    enterBtn.addEventListener('click', enterSite);
    enterBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            enterSite();
        }
    });
    
    // Back to top button
    backToTop.addEventListener('click', scrollToTop);
    
    // Scroll handler for back-to-top visibility
    window.addEventListener('scroll', handleScroll);
    
    // Lightbox controls
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', () => navigateLightbox('prev'));
    lightboxNext.addEventListener('click', () => navigateLightbox('next'));
    lightboxOverlay.addEventListener('click', closeLightbox);
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboard);
    
    // Prevent right-click on images (optional)
    gallery.addEventListener('contextmenu', (e) => {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
        }
    });
}

// Enter site functionality
function enterSite() {
    if (hasEnteredSite) return;
    
    hasEnteredSite = true;
    
    // Create confetti
    createConfetti();
    
    // Hide landing screen after a brief delay
    setTimeout(() => {
        landing.classList.add('hidden');
        document.body.style.overflow = 'auto';
        
        // Scroll to main content
        setTimeout(() => {
            mainContent.scrollIntoView({ behavior: 'smooth' });
        }, 400);
    }, 1000);
}

// Create confetti animation
function createConfetti() {
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        
        confettiContainer.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 5000);
    }
}

// Handle scroll events
function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Show/hide back-to-top button
    if (scrollTop > 600) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    
    // Show/hide navigation based on scroll position
    if (hasEnteredSite && scrollTop > 100) {
        navigation.classList.add('visible');
    } else if (!hasEnteredSite) {
        navigation.classList.remove('visible');
    }
}

// Scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Open lightbox
function openLightbox(index) {
    currentImageIndex = index;
    lightboxImage.src = images[index].src;
    lightboxImage.alt = images[index].alt;
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    
    // Focus management
    lightboxClose.focus();
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
    
    // Return focus to gallery item
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems[currentImageIndex]) {
        galleryItems[currentImageIndex].focus();
    }
}

// Navigate lightbox
function navigateLightbox(direction) {
    if (direction === 'next') {
        currentImageIndex = (currentImageIndex + 1) % images.length;
    } else {
        currentImageIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
    }
    
    lightboxImage.src = images[currentImageIndex].src;
    lightboxImage.alt = images[currentImageIndex].alt;
}

// Handle keyboard navigation
function handleKeyboard(e) {
    // Landing page navigation
    if (!hasEnteredSite && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        enterSite();
        return;
    }
    
    // Lightbox navigation
    if (lightbox.classList.contains('active')) {
        switch (e.key) {
            case 'Escape':
                e.preventDefault();
                closeLightbox();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                navigateLightbox('prev');
                break;
            case 'ArrowRight':
                e.preventDefault();
                navigateLightbox('next');
                break;
        }
    }
}

// Add sparkle effect to enter button
function createSparkles() {
    const sparkles = document.querySelector('.sparkles');
    const sparkleCount = 6;
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.style.position = 'absolute';
        sparkle.style.width = '4px';
        sparkle.style.height = '4px';
        sparkle.style.background = '#ffd93d';
        sparkle.style.borderRadius = '50%';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animation = `sparkle 1s ease-in-out infinite ${Math.random() * 1}s`;
        
        sparkles.appendChild(sparkle);
    }
}

// Add sparkle animation CSS
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkle {
        0%, 100% {
            opacity: 0;
            transform: scale(0);
        }
        50% {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(sparkleStyle);

// Create sparkles on button hover
enterBtn.addEventListener('mouseenter', createSparkles);

// Image loading error handling
gallery.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjZjhmOWZhIi8+CjxwYXRoIGQ9Im0xNjAgMTEwIDgwIDgwIDgwLTgwIiBzdHJva2U9IiNkZGRkZGQiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPgo8Y2lyY2xlIGN4PSIxODAiIGN5PSIxMDAiIHI9IjIwIiBzdHJva2U9IiNkZGRkZGQiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPgo8dGV4dCB4PSIyMDAiIHk9IjE2MCIgZm9udC1mYW1pbHk9IkludGVyLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5OTk5Ij5QaG90byBDb21pbmcgU29vbjwvdGV4dD4KPC9zdmc+';
        e.target.alt = 'Photo placeholder - coming soon';
    }
}, true);

// Smooth reveal animations for elements as they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe gallery items for smooth reveals
setTimeout(() => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        item.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(item);
    });
}, 1000);

// Preload next/previous images in lightbox for smoother navigation
function preloadImages(currentIndex) {
    const preloadIndexes = [
        (currentIndex + 1) % images.length,
        currentIndex === 0 ? images.length - 1 : currentIndex - 1
    ];
    
    preloadIndexes.forEach(index => {
        const img = new Image();
        img.src = images[index].src;
    });
}

// Update lightbox navigation to include preloading
const originalNavigateLightbox = navigateLightbox;
navigateLightbox = function(direction) {
    originalNavigateLightbox(direction);
    preloadImages(currentImageIndex);
};

// Touch gesture support for mobile lightbox navigation
let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchStartX - touchEndX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            // Swiped left - next image
            navigateLightbox('next');
        } else {
            // Swiped right - previous image
            navigateLightbox('prev');
        }
    }
}