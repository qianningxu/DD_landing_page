document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section, .section_one');
    const videoDisplay = document.querySelector('#gif-display');
    let isTransitioning = false; 

    const preloadVideos = () => {
        sections.forEach(section => {
            const videoSrc = section.dataset.gif;
            const preloadLink = document.createElement('link');
            preloadLink.rel = 'preload';
            preloadLink.as = 'video';
            preloadLink.href = videoSrc;
            document.head.appendChild(preloadLink);
        });
    };
    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isTransitioning) {
                isTransitioning = true;
                videoDisplay.classList.add('fade');
                
                setTimeout(() => {
                    const videoSrc = entry.target.dataset.gif;
                    videoDisplay.src = videoSrc;
                    
                    videoDisplay.onloadeddata = () => {
                        videoDisplay.play();
                        videoDisplay.classList.remove('fade');
                        setTimeout(() => {
                            isTransitioning = false;
                        }, 250);  
                    };
                }, 250);
            }
        });
    }, {
        threshold: 0.7,   
        rootMargin: '-5% 0px'   
    });

    sections.forEach(section => {
        observer.observe(section);
    });
    
    preloadVideos();   
});

// Add scroll event listener to handle header border
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 0) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

function initializeSlideshow() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    // Function to update slides and dots
    function updateSlideshow(index) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // Show first slide
    updateSlideshow(0);

    // Change slide every 3 seconds
    setInterval(() => {
        updateSlideshow((currentSlide + 1) % slides.length);
    }, 3000);

    // Add click handlers for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            updateSlideshow(index);
        });
    });
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', initializeSlideshow);
