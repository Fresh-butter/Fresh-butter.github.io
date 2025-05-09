/**
 * tracker.js - User interaction tracking script
 * Captures all click events and page views performed by a user across HTML tags and CSS objects.
 * Logs events to console in format: Timestamp, event type (click/view), event object (description)
 */

// Function to log events
function logEvent(eventType, objectType, description) {
    const timestamp = new Date().toLocaleString();
    console.log(`${timestamp}, ${eventType}, ${objectType}${description ? ' (' + description + ')' : ''}`);
}

// Function to get the type of element
function getElementType(element) {
    // Special handling for input elements
    if (element.tagName === 'INPUT') {
        return `input-${element.type || 'text'}`;
    }

    // Check for custom classes specific to your website
    const customClasses = {
        'skill-item': 'skill',
        'education-item': 'education',
        'gallery-item': 'gallery-image',
        'skill-bar': 'skill-progress-bar',
        'skill-level': 'skill-indicator',
    };

    for (const [className, type] of Object.entries(customClasses)) {
        if (element.classList.contains(className)) {
            return type;
        }
    }

    // Check for ARIA roles
    const role = element.getAttribute('role');
    if (role) {
        return role;
    }

    if(element.tagName === 'A') {
        return 'hyperlink';
    }
    if(element.tagName === 'IMG') {
        return 'image';
    }


    // Default to lowercase tag name
    return element.tagName.toLowerCase();
}


// Improved function to get element description
function getElementDescription(element) {
    // Check for data-track attribute first
    if (element.dataset && element.dataset.track) {
        return element.dataset.track;
    }
    
    // For links, use text content or href
    if (element.tagName === 'A') {
        if (element.textContent.trim()) {
            return element.textContent.trim();
        }
        return element.getAttribute('href');
    }
    
    // For images, use alt text or src filename
    if (element.tagName === 'IMG') {
        if (element.alt) return element.alt;
        const src = element.getAttribute('src');
        return src ? src.split('/').pop() : 'image';
    }
    
    // Use ID if available
    if (element.id) return element.id;
    
    // Use trimmed text content if available
    if (element.textContent && element.textContent.trim()) {
        const text = element.textContent.trim();
        return text.length > 30 ? text.substring(0, 27) + '...' : text;
    }
    
    // Use class as last resort
    if (element.className) return element.className;
    
    return '';
}

// Track page view
function trackPageView() {
    logEvent('view', 'page', document.title);
}

// Track section view
function trackSectionView(sectionId) {
    logEvent('view', 'section', sectionId);
}

// Track clicks using event delegation
document.addEventListener('click', function(event) {
    const element = event.target;
    const elementType = getElementType(element);
    const description = getElementDescription(element);
    logEvent('click', elementType, description);
    
    // Only track section views from navigation clicks here, not in main.js
    if (element.tagName === 'A' && element.closest('nav')) {
        const href = element.getAttribute('href');
        if (href && href.startsWith('#')) {
            const sectionId = href.substring(1);
            trackSectionView(sectionId);
        }
    }
});

// Initialize tracking
document.addEventListener('DOMContentLoaded', function() {
    trackPageView();
    
    // Track initial section view
    const activeSection = document.querySelector('.section.active');
    if (activeSection && activeSection.id) {
        trackSectionView(activeSection.id);
    }
});
