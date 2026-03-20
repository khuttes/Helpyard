document.addEventListener('DOMContentLoaded', async () => {
    const blogPostsContainer = document.getElementById('blog-posts-container');
    if (!blogPostsContainer) {
        console.error('Blog posts container not found.');
        return;
    }

    // List of markdown files to load
    const markdownFiles = [
        'blog/posts/securing-aws.md',
        'blog/posts/zero-day-exploits.md',
        'blog/posts/social-engineering.md'
    ];

    for (const file of markdownFiles) {
        try {
            const response = await fetch(file);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const markdown = await response.text();

            // --- YAML Frontmatter Parsing ---
            const frontmatterMatch = markdown.match(/^---([\s\S]*?)---/);
            let tags = ['Cybersecurity'];
            let title = 'Untitled Post';
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
                    <h2 class="card-title" style="margin-top: 1rem;">${title}</h2>
                    <p>${description}</p>
                    <a href="blog/post-detail.html?post=${file.split('/').pop()}" class="btn btn-secondary btn-sm" style="margin-top: 1rem;">Read Article</a>
                </div>
            `;
            blogPostsContainer.innerHTML += card;

        } catch (error) {
            console.error(`Error loading or parsing markdown file ${file}:`, error);
            blogPostsContainer.innerHTML += `
                <div class="card">
                    <h2 class="card-title" style="margin-top: 1rem; color: var(--color-danger);">Error Loading Post</h2>
                    <p>Could not load content for ${file}.</p>
                </div>
            `;
        }
    }
});