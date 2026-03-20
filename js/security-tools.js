document.addEventListener('DOMContentLoaded', async () => {
    const securityToolsContainer = document.querySelector('#security-tools .projects-grid');
    if (!securityToolsContainer) {
        console.error('Security tools container not found.');
        return;
    }

    // List of markdown files for security tools
    const toolFiles = [
        'assets/tools/burpsuite-extension.md',
    ];

    securityToolsContainer.innerHTML = ''; // Clear static content

    for (const file of toolFiles) {
        try {
            const response = await fetch(file);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const markdown = await response.text();

            // --- YAML Frontmatter Parsing ---
            const frontmatterMatch = markdown.match(/^---([\s\S]*?)---/);
            let tags = ['Security Tool'];
            let title = 'Untitled Tool';
            let language = 'N/A';
            let githubLink = '#';
            let demoLink = '#';
            let cleanMarkdown = markdown;

            if (frontmatterMatch) {
                const frontmatter = frontmatterMatch[1];
                cleanMarkdown = markdown.replace(/^---[\s\S]*?---/, '').trim();

                const titleMatch = frontmatter.match(/title:\s*(.*)/);
                if (titleMatch) title = titleMatch[1].trim().replace(/"/g, '');

                const tagsMatch = frontmatter.match(/tags:\s*\[(.*?)\]/);
                if (tagsMatch) tags = tagsMatch[1].split(',').map(tag => tag.trim());

                const langMatch = frontmatter.match(/language:\s*(.*)/);
                if (langMatch) language = langMatch[1].trim();

                const githubMatch = frontmatter.match(/github:\s*(https?:\/\/[^\s]+)/);
                if (githubMatch) githubLink = githubMatch[1].trim();

                const demoMatch = frontmatter.match(/demo:\s*(https?:\/\/[^\s]+)/);
                if (demoMatch) demoLink = demoMatch[1].trim();
            }

            // --- Content Parsing ---
            const htmlContent = marked.parse(cleanMarkdown);
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = htmlContent;
            const descriptionElement = tempDiv.querySelector('p');
            const description = descriptionElement ? descriptionElement.textContent.substring(0, 150) + '...' : 'No description available.';
            const demoButton = demoLink !== '#' ? `<a href="${demoLink}" target="_blank" class="btn btn-primary btn-sm">Demo →</a>` : `<a href="#" class="btn btn-primary btn-sm" disabled>Demo (N/A)</a>`;


            // Construct the card HTML
            const card = `
                <div class="card project-card">
                    <div class="project-image">
                        <span style="font-size: 3rem;">🛠️</span>
                    </div>
                    ${tags.map(tag => `<span class="badge badge-outline">${tag}</span>`).join('')}
                    <h3 class="card-title" style="margin-top: 1rem;">${title}</h3>
                    <p>${description}</p>
                    <div style="display: flex; gap: 0.5rem; margin-top: 1rem; flex-wrap: wrap;">
                        <a href="${githubLink}" target="_blank" class="btn btn-secondary btn-sm">GitHub →</a>
                        ${demoButton}
                        <span class="badge">${language}</span>
                    </div>
                </div>
            `;
            securityToolsContainer.innerHTML += card;

        } catch (error) {
            console.error(`Error loading or parsing security tool file ${file}:`, error);
            securityToolsContainer.innerHTML += `
                <div class="card">
                    <h3 class="card-title" style="margin-top: 1rem; color: var(--color-danger);">Error Loading Tool</h3>
                    <p>Could not load content for ${file}.</p>
                </div>
            `;
        }
    }
});