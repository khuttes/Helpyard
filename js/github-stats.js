// GitHub Stats Integration
document.addEventListener('DOMContentLoaded', () => {
    fetchGitHubStats();
});

async function fetchGitHubStats() {
    const username = 'khuttes';
    const statsContainer = document.getElementById('github-stats-container');

    if (!statsContainer) return;

    // Show loading state
    statsContainer.innerHTML = '<div class="text-center">Loading stats...</div>';

    try {
        // Fetch User Data
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userResponse.json();

        // Fetch Repos (for stars count)
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        const reposData = await reposResponse.json();

        // Calculate total stars
        const totalStars = reposData.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);

        // Stats to display
        const stats = [
            { label: 'Public Repos', value: userData.public_repos, icon: '📦' },
            { label: 'Total Stars', value: totalStars, icon: '⭐' },
            { label: 'Followers', value: userData.followers, icon: '👥' },
            { label: 'Following', value: userData.following, icon: '👣' }
        ];

        // Generate HTML
        let html = '';
        stats.forEach((stat, index) => {
            html += `
                <div class="stat-card" style="animation-delay: ${index * 0.1}s">
                    <div class="stat-icon">${stat.icon}</div>
                    <div class="stat-number counter" data-target="${stat.value}">${stat.value}</div>
                    <div class="stat-label">${stat.label}</div>
                </div>
            `;
        });

        statsContainer.innerHTML = html;

        // Animate numbers
        animateCounters();

    } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        statsContainer.innerHTML = '<div class="text-center text-muted">Stats currently unavailable</div>';
    }
}

function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps

        let current = 0;
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.innerText = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target;
            }
        };
        updateCounter();
    });
}
