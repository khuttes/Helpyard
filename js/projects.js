document.addEventListener('DOMContentLoaded', () => {
    const projectData = {
        'Graphical Password Auth System': {
            title: 'Graphical Password Auth System',
            tags: ['HTML', 'JavaScript', 'Research', 'Authentication'],
            description: 'Client-side authentication using image sequence recognition. Features image randomization and localStorage integration.',
            details: `
                <h3>Project Overview</h3>
                <p>This research project explores an alternative to traditional text-based passwords. Users select a specific sequence of images to authenticate.</p>
                
                <h3>Key Features</h3>
                <ul>
                    <li><strong>Image Randomization:</strong> The grid of images shuffles on every load to prevent pattern surfing.</li>
                    <li><strong>Client-Side Logic:</strong> logic is handled via JavaScript with minimal backend dependency for demonstration.</li>
                    <li><strong>Security:</strong> Mitigates keylogger attacks as there is no keyboard input required for the password.</li>
                </ul>
                <p><a href="https://github.com/khuttes/CS-GPAS-Client-Side-Graphical-Password-Authentication-System-" target="_blank" class="btn btn-secondary btn-sm">View on GitHub</a></p>
            `
        },
        'Malware Behavior Analysis Tool': {
            title: 'Malware Behavior Analysis Tool',
            tags: ['Security Research', 'Python', 'Sandboxing'],
            description: 'Dynamic malware analysis tool utilizing runtime monitoring techniques to detect anomalies.',
            details: `
                <h3>Functionality</h3>
                <p>A tool designed to run suspicious binaries in a controlled environment and log their activities.</p>
                <ul>
                    <li><strong>Process Monitoring:</strong> Tracks child process creation and injection attempts.</li>
                    <li><strong>Network Activity:</strong> Logs DNS requests and connection attempts to C2 servers.</li>
                    <li><strong>File System:</strong> Monitors file creation and modification (e.g., ransomware behavior).</li>
                </ul>
                <p><a href="https://github.com/khuttes/Malware-Behavior-Analysis-Tool" target="_blank" class="btn btn-secondary btn-sm">View Source</a></p>
            `
        },
        'Port Scanner (Mini Nmap)': {
            title: 'Port Scanner (Mini Nmap)',
            tags: ['Python', 'Networking', 'Reconnaissance'],
            description: 'Lightweight network reconnaissance tool mimicking core Nmap functionality.',
            details: `
                <h3>How it Works</h3>
                <p>A multi-threaded port scanner built in Python using the <code>socket</code> library.</p>
                <ul>
                    <li>Supports TCP Connect and SYN scanning techniques.</li>
                    <li>Banner grabbing for service version detection.</li>
                    <li>Multi-threading for faster scan speeds across large ranges.</li>
                </ul>
            `
        },
        'Brute-Force Simulator': {
            title: 'Brute-Force Simulator',
            tags: ['Python', 'Cryptography', 'Education'],
            description: 'Educational tool demonstrating password cracking techniques and defense mechanisms.',
            details: `
                <h3>Educational Purpose</h3>
                <p>Visualizes how quickly weak passwords can be cracked compared to strong ones.</p>
                <ul>
                    <li>Demonstrates Dictionary attacks vs. Brute-force.</li>
                    <li>Shows the impact of password length and complexity (entropy).</li>
                    <li>Includes a "Defense Mode" to simulate account lockouts and delays.</li>
                </ul>
            `
        },
        'Voice Control Assistant': {
            title: 'Voice Control Assistant',
            tags: ['Python', 'AI', 'Automation'],
            description: 'Local voice-controlled assistant for system automation without cloud dependencies.',
            details: `
                <h3>Features</h3>
                <p>Uses libraries like <code>speech_recognition</code> and <code>pyttsx3</code> for offline processing.</p>
                <p>Can execute system commands, open applications, and perform web searches based on voice triggers.</p>
            `
        },
        'Secure Home Automation': {
            title: 'Secure Home Automation',
            tags: ['C++', 'IoT', 'Encryption'],
            description: 'IoT-based home automation system with focus on secure communication protocols.',
            details: `
                <h3>Security First</h3>
                <p>Unlike many standard IoT devices, this project focuses on the security layer.</p>
                <ul>
                    <li>Implements AES encryption for command transmission.</li>
                    <li>Prevents Replay Attacks using timestamped tokens.</li>
                    <li>Built using ESP8266/ESP32 microcontrollers.</li>
                </ul>
            `
        }
    };

    // Attach event listeners to Project Cards
    const projectCards = document.querySelectorAll('#projects .card');

    projectCards.forEach(card => {
        const titleElement = card.querySelector('.card-title');
        if (titleElement) {
            const title = titleElement.textContent;

            // Make card clickable
            card.style.cursor = 'pointer';
            card.addEventListener('click', (e) => {
                // Prevent interfering with direct button clicks if any
                if (e.target.closest('a')) return;

                const data = projectData[title];
                if (data) {
                    const htmlContent = `
                        <h2>${data.title}</h2>
                        <div style="margin-bottom: 1rem;">
                            ${data.tags.map(tag => `<span class="badge">${tag}</span>`).join('')}
                        </div>
                        <p class="text-muted">${data.description}</p>
                        <hr style="border-color: var(--glass-border); margin: 1rem 0;">
                        ${data.details}
                    `;
                    
                    // Use centralized modal function from main.js
                    if (window.openDetailsModal) window.openDetailsModal(htmlContent);
                }
            });
        }
    });

});
