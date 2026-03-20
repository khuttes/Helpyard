document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("reports-container");
    if (!container) return;
  
    // Updated Report Data based on request
    const reports = [
        {
            target: "DVWA (Damn Vulnerable Web App)",
            vulnerability: "SQL Injection (Union-Based)",
            impact: "Critical. Attackers can extract the entire database, including admin credentials.",
            fix: "Sanitize all user inputs and use Prepared Statements (PDO) for database queries.",
            link: "assets/report dvwa.pdf",
            screenshot: "assets/dvwa.pdf" // Change this path to your image
        },
        {
            target: "OWASP Juice Shop",
            vulnerability: "DOM-Based XSS",
            impact: "High. Malicious scripts can execute in the victim's browser, leading to session hijacking.",
            fix: "Implement context-sensitive encoding and Content Security Policy (CSP).",
            link: "assets/report owasp.pdf",
            screenshot: "assetsowasp.pdf" // Change this path to your image
        },
        {
            target: "E-Commerce",
            vulnerability: "Insecure Direct Object Reference (IDOR)",
            impact: "High. Unauthorized access to sensitive user data by modifying API parameters.",
            fix: "Enforce server-side access control checks for every object reference.",
            link: "assets/report e.pdf",
            screenshot: "assets/e-commerce.pdf" // Change this path to your image
        }
    ];

    container.innerHTML = reports.map(r => `
        <div class="card report-card">
          <h3 class="card-title" style="margin-bottom: 0.5rem;">${r.target}</h3>
          
          <div style="margin-top: 1rem; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.95rem;">
            <div><strong style="color: var(--color-primary);">Vulnerability:</strong> ${r.vulnerability}</div>
            <div><strong style="color: var(--color-danger);">Impact:</strong> ${r.impact}</div>
            <div><strong style="color: var(--color-success);">Fix:</strong> ${r.fix}</div>
          </div>

          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 1.5rem;">
             ${r.screenshot ? `<a href="${r.screenshot}" target="_blank" class="btn btn-secondary btn-sm">📸 View Screenshot</a>` : ''}
             ${r.link !== '#' ? `<a href="${r.link}" class="btn btn-primary btn-sm" onclick="event.preventDefault(); handleReportLinkClick('${r.link}', '${r.target}');">📄 Full Report</a>` : ''}
          </div>
        </div>
      `).join("");
});

    // Function to handle report link clicks
    window.handleReportLinkClick = async (reportLink, title) => {
    if (reportLink.endsWith('.md')) {
        try {
            const response = await fetch(reportLink);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const markdown = await response.text();
            const htmlContent = `<h2>${title}</h2><div class="markdown-body">${marked.parse(markdown)}</div>`;
            if (window.openDetailsModal) {
                window.openDetailsModal(htmlContent);
            } else {
                console.error('window.openDetailsModal is not defined.');
                // Fallback: open raw markdown in new tab if modal function is not available
                window.open(reportLink, '_blank');
            }
        } catch (error) {
            console.error('Error loading or parsing markdown report:', error);
            alert('Failed to load report. Please try again later.');
        }
    } else if (reportLink !== '#') {
        window.open(reportLink, '_blank');
    }
    };