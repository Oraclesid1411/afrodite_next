// Utility functions for the application

// Smooth scroll to element
function scrollToElement(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Format price range
function formatPriceRange(range) {
  const ranges = {
    '€': '50-100€',
    '€€': '100-200€',
    '€€€': '200-500€',
    '€€€€': '500€+'
  };
  return ranges[range] || range;
}

// Format rating
function formatRating(rating) {
  return parseFloat(rating).toFixed(1);
}

// Debounce function for search
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

// Local storage helpers
const storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },
  
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }
};

// Image lazy loading
function lazyLoadImages() {
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

// Form validation helpers
const validation = {
  email: (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },
  
  phone: (phone) => {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/\s/g, ''));
  },
  
  required: (value) => {
    return value && value.trim().length > 0;
  }
};

// Analytics helpers
const analytics = {
  track: (event, properties = {}) => {
    // Placeholder for analytics tracking
    console.log('Analytics event:', event, properties);
  },
  
  page: (pageName) => {
    // Placeholder for page tracking
    console.log('Page view:', pageName);
  }
};

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    scrollToElement,
    formatPriceRange,
    formatRating,
    debounce,
    storage,
    lazyLoadImages,
    validation,
    analytics
  };
}