document.addEventListener('DOMContentLoaded', async () => {
    const bugBountyPostsContainer = document.getElementById('bug-bounty-posts-container');
    if (!bugBountyPostsContainer) {
        console.error('Bug bounty posts container not found.');
        return;
    }

    // List of markdown files for bug bounty writeups
    // For simplicity, reusing existing blog posts for demonstration
    const bugBountyFiles = [
        'blog/posts/bugbounty-method.md',
        'blog/posts/idor-guide.md',
        'blog/posts/xss-bug.md',
    ];

    for (const file of bugBountyFiles) {
        try {
            const response = await fetch(file);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const markdown = await response.text();

            // --- YAML Frontmatter Parsing ---
            const frontmatterMatch = markdown.match(/^---([\s\S]*?)---/);
            let tags = ['Bug Bounty'];
            let title = 'Untitled Writeup';
            let cleanMarkdown = markdown;

            if (frontmatterMatch) {
                const frontmatter = frontmatterMatch[1];
                cleanMarkdown = markdown.replace(/^---[\s\S]*?---/, '').trim();

                const titleMatch = frontmatter.match(/title:\s*(.*)/);
                if (titleMatch) title = titleMatch[1].trim().replace(/"/g, '');

                const tagsMatch = frontmatter.match(/tags:\s*\[(.*?)\]/);
                if (tagsMatch) tags = tagsMatch[1].split(',').map(tag => tag.trim());
            }

            // --- Content Parsing ---
            const htmlContent = marked.parse(cleanMarkdown);
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = htmlContent;
            const descriptionElement = tempDiv.querySelector('p');
            const description = descriptionElement ? descriptionElement.textContent.substring(0, 150) + '...' : 'No description available.';

            // Construct the card HTML
            const card = `
                <div class="card">
                    ${tags.map(tag => `<span class="badge badge-outline">${tag}</span>`).join('')}
                    <h3 class="card-title" style="margin-top: 1rem;">${title}</h3>
                    <p>${description}</p>
                    <a href="blog/post-detail.html?post=${file.split('/').pop()}" class="text-gradient">Read Full Writeup &rarr;</a>
                </div>
            `;
            bugBountyPostsContainer.innerHTML += card;

        } catch (error) {
            console.error(`Error loading or parsing bug bounty file ${file}:`, error);
            bugBountyPostsContainer.innerHTML += `
                <div class="card">
                    <h3 class="card-title" style="margin-top: 1rem; color: var(--color-danger);">Error Loading Writeup</h3>
                    <p>Could not load content for ${file}.</p>
                </div>
            `;
        }
    }
});