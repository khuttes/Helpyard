document.addEventListener('DOMContentLoaded', () => {
    loadRepos();
});

async function loadRepos() {
    const username = "khuttes";
    const container = document.getElementById("github-repos");

    if (!container) {
        console.error("Element with id 'github-repos' not found.");
        return;
    }

    // Show loading state
    container.innerHTML = '<div class="text-center" style="grid-column: 1/-1;">Loading repositories...</div>';

    try {
        const response = await fetch(
            `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`
        );

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const repos = await response.json();

        if (repos.length === 0) {
            container.innerHTML = '<div class="text-center text-muted" style="grid-column: 1/-1;">No public repositories found.</div>';
            return;
        }

        // Generate HTML with new design matching project styling
        const cardsHtml = repos.map(repo => {
            const description = repo.description || "No description provided.";
            // Truncate description to keep cards uniform
            const truncatedDesc = description.length > 100 ? description.substring(0, 100) + '...' : description;

            return `
            <div class="card project-card" style="height: 100%; display: flex; flex-direction: column; padding: 1.5rem;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <span style="font-size: 1.2rem;">📂</span>
                        <h3 class="card-title" style="margin: 0; font-size: 1.1rem; font-weight: 600;">
                            <a href="${repo.html_url}" target="_blank" style="text-decoration: none; color: inherit;">${repo.name}</a>
                        </h3>
                    </div>
                    <a href="${repo.html_url}" target="_blank" style="color: var(--color-text-muted); text-decoration: none;">↗</a>
                </div>
                
                <p style="flex-grow: 1; margin-bottom: 1.5rem; font-size: 0.9rem; color: var(--color-text-secondary); line-height: 1.6;">
                    ${truncatedDesc}
                </p>

                <div class="repo-info text-xs text-muted" style="border-top: 1px solid var(--glass-border); padding-top: 1rem; display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; gap: 1rem; align-items: center;">
                        ${repo.language ? `<span style="display: flex; align-items: center; gap: 0.3rem;"><span style="width: 8px; height: 8px; background-color: var(--color-primary); border-radius: 50%;"></span> ${repo.language}</span>` : ''}
                        <span>⭐ ${repo.stargazers_count}</span>
                        <span>🔱 ${repo.forks_count}</span>
                    </div>
                    <span style="opacity: 0.7;">${new Date(repo.created_at).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</span>
                </div>
            </div>
        `;
        }).join('');

        container.innerHTML = cardsHtml;

    } catch (error) {
        console.error("Error fetching GitHub repos:", error);
        container.innerHTML = '<div class="text-center text-muted" style="grid-column: 1/-1;">Could not load GitHub repositories.</div>';
    }
}