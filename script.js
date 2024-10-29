const videoContainer = document.getElementById('video-container');
const slides = Array.from(document.querySelectorAll('.video-slide'));
let currentIndex = 0;

// Shuffle function for an array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Shuffle and display slides on page load
document.addEventListener('DOMContentLoaded', () => {
    // Shuffle the slides
    const shuffledSlides = shuffle(slides);

    // Clear the container and append shuffled slides
    videoContainer.innerHTML = ''; // Clear existing slides
    shuffledSlides.forEach(slide => videoContainer.appendChild(slide));

    // Show the first slide
    showSlide(0); // Show the first slide after shuffling
});

// Show the current slide and manage video playback
function showSlide(index) {
    slides.forEach((slide, idx) => {
        const video = slide.querySelector('video');
        if (idx === index) {
            video.play().catch(error => {
                console.error("Playback error:", error);
            });
            video.loop = true; // Set to loop
            slide.style.transform = `translateY(0)`;
        } else {
            video.pause();
            slide.style.transform = `translateY(${(idx - index) * 100}%)`;
        }
    });
}

// Unmute on interaction
const unmuteButton = document.getElementById('unmute-button');
unmuteButton.addEventListener('click', () => {
    const currentVideo = slides[currentIndex].querySelector('video');
    currentVideo.muted = false; // Unmute video on button click
    unmuteButton.style.display = 'none'; // Hide the button after click
});

// Swipe navigation for videos
let startY = 0;
let endY = 0;

videoContainer.addEventListener('touchstart', (event) => {
    startY = event.touches[0].clientY;
});

videoContainer.addEventListener('touchend', (event) => {
    endY = event.changedTouches[0].clientY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;

    if (startY - endY > swipeThreshold) {
        currentIndex = (currentIndex + 1) % slides.length; // Swipe up
    } else if (endY - startY > swipeThreshold) {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length; // Swipe down
    }

    showSlide(currentIndex);
}

// Show the first slide initially
showSlide(currentIndex);
