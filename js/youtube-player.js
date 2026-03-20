let player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('hero-video', {
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    // Ensure video is playing (muted) immediately for visual "running" state
    event.target.mute();
    event.target.playVideo();
    
    // Setup triggers to unmute on first user interaction
    startVideoOnUserInteraction();
}

function startVideoOnUserInteraction() {
    const startVideo = () => {
        if (player && typeof player.unMute === 'function') {
            player.unMute();
            player.playVideo(); // Ensure it keeps playing
            
            // Update button text if it exists
            const muteBtn = document.getElementById("mute-btn");
            if(muteBtn) muteBtn.textContent = "Mute";
        }

        // Remove listeners after first interaction
        document.removeEventListener("click", startVideo);
        document.removeEventListener("scroll", startVideo);
        document.removeEventListener("mousemove", startVideo);
        document.removeEventListener("touchstart", startVideo);
        document.removeEventListener("keydown", startVideo);
    };

    document.addEventListener("click", startVideo);
    document.addEventListener("scroll", startVideo);
    document.addEventListener("mousemove", startVideo);
    document.addEventListener("touchstart", startVideo);
    document.addEventListener("keydown", startVideo);
}

// Mute Button Logic
document.addEventListener('DOMContentLoaded', () => {
    const muteBtn = document.getElementById("mute-btn");
    if (muteBtn) {
        muteBtn.onclick = function() {
            if (player && typeof player.isMuted === 'function') {
                if (player.isMuted()) {
                    player.unMute();
                    muteBtn.textContent = "Mute";
                } else {
                    player.mute();
                    muteBtn.textContent = "Unmute";
                }
            }
        };
    }
});