document.addEventListener('DOMContentLoaded', () => {

    // Roadmap Details Data
    const roadmapData = {
        'Foundations': {
            title: 'Foundations (Completed)',
            description: 'Built a strong base in computer science and networking principles.',
            details: `
                <ul>
                    <li><strong>Linux:</strong> Proficient in Bash scripting, file system hierarchy, permissions, and process management. Administered Ubuntu and CentOS servers.</li>
                    <li><strong>Networking:</strong> Deep understanding of TCP/IP, OSI Model, Subnetting, DNS, HTTP/S, and common protocols. CCNA-level knowledge.</li>
                    <li><strong>Python:</strong> Automating tasks, writing custom scripts for reconnaissance, and basic socket programming.</li>
                </ul>
                <div style="margin-top: 1rem;">
                    <h4>Key Resources:</h4>
                    <p>OverTheWire Bandit, Linux Journey, Professor Messer Network+</p>
                </div>
            `
        },
        'Core Security': {
            title: 'Core Security (Completed)',
            description: 'Mastered the fundamentals of information security.',
            details: `
                <ul>
                    <li><strong>OWASP Top 10:</strong> In-depth study of common web vulnerabilities (SQLi, XSS, CSRF, IDOR).</li>
                    <li><strong>Web Fundamentals:</strong> Understanding how browsers work, cookies, sessions, and authentication mechanisms.</li>
                    <li><strong>Cryptography:</strong> Basics of symmetric/asymmetric encryption, hashing, and digital signatures.</li>
                </ul>
            `
        },
        'Offensive Security': {
            title: 'Offensive Security (In Progress)',
            description: 'Actively practicing penetration testing and red team methodologies.',
            details: `
                <ul>
                    <li><strong>Tools:</strong> Advanced usage of Burp Suite Pro, Metasploit, Nmap, Wireshark, and Empire.</li>
                    <li><strong>Active Directory:</strong> Attacks involving Kerberoasting, AS-REP Roasting, and Golden Ticket.</li>
                    <li><strong>Privilege Escalation:</strong> Windows and Linux local privilege escalation techniques.</li>
                </ul>
                <div style="margin-top: 1rem;">
                    <h4>Current Status:</h4>
                    <p>Ranked Top 5% on TryHackMe. Compromised 20+ machines on HackTheBox.</p>
                </div>
            `
        },
        'Advanced Research': {
            title: 'Advanced Research (Planned)',
            description: 'Future goals focusing on advanced exploitation and cloud security.',
            details: `
                <ul>
                    <li><strong>Exploit Dev:</strong> Buffer overflows, ROP chains, and heap exploitation.</li>
                    <li><strong>Reverse Engineering:</strong> Static and dynamic analysis using Ghidra and x64dbg.</li>
                    <li><strong>Cloud Security:</strong> AWS Security Specialty certification path.</li>
                </ul>
            `
        }
    };

    // Add click event to roadmap cards
    document.querySelectorAll('.roadmap-content').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            const title = card.querySelector('h3').textContent;
            const data = roadmapData[title];

            if (data) {
                const htmlContent = `
                    <h2>${data.title}</h2>
                    <p class="text-muted">${data.description}</p>
                    <hr style="border-color: var(--glass-border); margin: 1rem 0;">
                    ${data.details}
                `;

                // Use centralized modal function from main.js
                if (window.openDetailsModal) window.openDetailsModal(htmlContent);
            }
        });
    });
});
