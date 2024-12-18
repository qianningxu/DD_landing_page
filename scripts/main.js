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
