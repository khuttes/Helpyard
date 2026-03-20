document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("services-container");
    if (!container) return;
  
    // Updated Service Packages based on request
    const services = [
        {
            title: "Basic",
            price: "$20 – $50",
            icon: "🔍",
            description: "Essential automated security scanning for websites.",
            features: ["Scan website", "Basic vulnerabilities report"]
        },
        {
            title: "Standard",
            price: "$50 – $150",
            icon: "🛡️",
            description: "In-depth manual analysis and compliance checks.",
            features: ["Manual testing", "OWASP Top 10 check", "Detailed report"]
        },
        {
            title: "Premium",
            price: "$150 – $300+",
            icon: "🚀",
            description: "Comprehensive penetration testing and remediation.",
            features: ["Full pentest", "API testing", "Fix recommendations"]
        }
    ];

    container.innerHTML = services.map(service => `
        <div class="card service-card">
            <div class="service-icon">${service.icon}</div>
            <h3 class="card-title">${service.title}</h3>
            <p class="text-muted">${service.description}</p>
            <div style="margin: 1.5rem 0;">
                ${service.features.map(f => `<span class="badge badge-outline">${f}</span>`).join("")}
            </div>
            <div class="service-price" style="font-size: 1.25rem; font-weight: bold; color: var(--color-primary); margin-top: auto;">${service.price}</div>
        </div>
    `).join("");
});