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
const navigation = document.querySelector('.navigation');

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
    const photoFiles = [
        { name: 'photo01', ext: 'jpg', orientation: 'horizontal' },
        { name: 'photo02', ext: 'jpg', orientation: 'horizontal' },
        { name: 'photo03', ext: 'JPEG', orientation: 'vertical' },
        { name: 'photo04', ext: 'JPEG', orientation: 'horizontal' },
        { name: 'photo05', ext: 'jpg', orientation: 'vertical' },
        { name: 'photo06', ext: 'jpg', orientation: 'horizontal' },
        { name: 'photo07', ext: 'JPEG', orientation: 'horizontal' },
        // Placeholders for photos 08-24 (will show placeholder until real photos are added)
        { name: 'photo08', ext: 'jpg', orientation: 'horizontal', placeholder: true },
        { name: 'photo09', ext: 'jpg', orientation: 'vertical', placeholder: true },
        { name: 'photo10', ext: 'jpg', orientation: 'horizontal', placeholder: true },
        { name: 'photo11', ext: 'jpg', orientation: 'vertical', placeholder: true },
        { name: 'photo12', ext: 'jpg', orientation: 'horizontal', placeholder: true },
        { name: 'photo13', ext: 'jpg', orientation: 'horizontal', placeholder: true },
        { name: 'photo14', ext: 'jpg', orientation: 'vertical', placeholder: true },
        { name: 'photo15', ext: 'jpg', orientation: 'horizontal', placeholder: true },
        { name: 'photo16', ext: 'jpg', orientation: 'horizontal', placeholder: true },
        { name: 'photo17', ext: 'jpg', orientation: 'vertical', placeholder: true },
        { name: 'photo18', ext: 'jpg', orientation: 'horizontal', placeholder: true },
        { name: 'photo19', ext: 'jpg', orientation: 'vertical', placeholder: true },
        { name: 'photo20', ext: 'jpg', orientation: 'horizontal', placeholder: true },
        { name: 'photo21', ext: 'jpg', orientation: 'horizontal', placeholder: true },
        { name: 'photo22', ext: 'jpg', orientation: 'vertical', placeholder: true },
        { name: 'photo23', ext: 'jpg', orientation: 'horizontal', placeholder: true },
        { name: 'photo24', ext: 'jpg', orientation: 'vertical', placeholder: true }
    ];
    
    photoFiles.forEach((photo, i) => {
        let imagePath;
        if (photo.placeholder) {
            // Use placeholder image for photos that don't exist yet
            imagePath = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjZjhmOWZhIi8+CjxwYXRoIGQ9Im0xNjAgMTEwIDgwIDgwIDgwLTgwIiBzdHJva2U9IiNkZGRkZGQiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPgo8Y2lyY2xlIGN4PSIxODAiIGN5PSIxMDAiIHI9IjIwIiBzdHJva2U9IiNkZGRkZGQiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPgo8dGV4dCB4PSIyMDAiIHk9IjE2MCIgZm9udC1mYW1pbHk9IkludGVyLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5OTk5Ij5QaG90byBDb21pbmcgU29vbjwvdGV4dD4KPC9zdmc+';
        } else {
            imagePath = `./assets/photos/${photo.name}.${photo.ext}`;
        }
        
        // Create gallery item
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-index', i);
        
        const img = document.createElement('img');
        img.src = imagePath;
        img.alt = photo.placeholder ? `Photo ${i + 1} - Coming Soon` : `Kimberly photo ${i + 1}`;
        img.loading = 'lazy';
        
        galleryItem.appendChild(img);
        gallery.appendChild(galleryItem);
        
        // Store image data
        images.push({
            src: imagePath,
            alt: photo.placeholder ? `Photo ${i + 1} - Coming Soon` : `Kimberly photo ${i + 1}`
        });
        
        // Add click handler for lightbox
        galleryItem.addEventListener('click', () => openLightbox(i));
    });
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
    
    // Navigation buttons
    const homeBtn = document.getElementById('home-btn');
    const partyPlanBtn = document.getElementById('party-plan-btn');
    
    if (homeBtn) {
        homeBtn.addEventListener('click', () => {
            // Reset to landing page
            hasEnteredSite = false;
            mainContent.classList.add('hidden');
            landing.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            window.scrollTo(0, 0);
        });
    }
    
    if (partyPlanBtn) {
        const dropdown = document.getElementById('party-plan-dropdown');
        
        partyPlanBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('show');
        });
        
        // Close dropdown when clicking elsewhere
        document.addEventListener('click', (e) => {
            if (!partyPlanBtn.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.classList.remove('show');
            }
        });
        
        // Close dropdown on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                dropdown.classList.remove('show');
            }
        });
    }
    
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
    
    // Wait 2 seconds to enjoy the confetti, then transition
    setTimeout(() => {
        // Show main content
        mainContent.classList.remove('hidden');
        
        // Hide landing screen
        setTimeout(() => {
            landing.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 500);
    }, 5000);
}

// Create confetti animation
function createConfetti() {
    const confettiCount = 80;
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7', '#a29bfe'];
    
    // Clear any existing confetti
    confettiContainer.innerHTML = '';
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.cssText = `
            position: absolute;
            left: ${Math.random() * 100}%;
            top: -10px;
            width: ${Math.random() * 8 + 4}px;
            height: ${Math.random() * 8 + 4}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            animation: confettiFall ${Math.random() * 2 + 3}s linear forwards;
            animation-delay: ${Math.random() * 2}s;
            transform-origin: center;
            z-index: 1000;
        `;
        
        confettiContainer.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 7000);
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

// Scroll to next section
function scrollToNextSection(selector) {
    const section = document.querySelector(selector);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
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

// Add sparkle and confetti animation CSS
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