document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section, .section_one');
    const videoDisplay = document.querySelector('#gif-display');
    
    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get the video source from data-gif attribute
                const videoSrc = entry.target.dataset.gif;
                // Update the video source
                videoDisplay.src = videoSrc;
                videoDisplay.load(); // Reload the video
                videoDisplay.play(); // Start playing
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the section is visible
    });

    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });
});
