// Interactive Terminal Simulation
class Terminal {
    constructor(outputElement, inputElement) {
        this.output = outputElement;
        this.input = inputElement;
        this.commandHistory = [];
        this.historyIndex = -1;

        // Define available commands
        this.commands = {
            help: {
                description: 'Show available commands',
                execute: () => this.showHelp()
            },
            whoami: {
                description: 'Display information about me',
                execute: () => `
        <span class="output">
        Name: Md. Hasib Islam
        Role: Cybersecurity Researcher & CSE Student
        Company: Cyber HelpYard
        Email: ihasib199@gmail.com

        "Hack to learn. Secure to protect."

        More about me: Visit the <a href="#about" target="_blank" style="color: var(--color-primary);">About Me section</a>
        </span>`
            },
            skills: {
                description: 'Display my technical skills',
                execute: () => `
        <span class="output">
        Check out my Technical Arsenal for a visual breakdown of my skills!
        Visit the <a href="#skills" target="_blank" style="color: var(--color-primary);">Skills Section</a>
        </span>`
            },
            featuredprojects: { // Renamed from 'projects'
                description: 'List my featured cybersecurity projects',
                execute: () => `
        <span class="output">
        Explore my featured cybersecurity projects:
        Visit the <a href="#projects" target="_blank" style="color: var(--color-primary);">"Featured Projects" section</a> for details.
        </span>`
            },
            tools: {
                description: 'Showcase of security tools I built',
                execute: () => `
        <span class="output">
        See my custom security tools in action:
        Visit the <a href="#security-tools" target="_blank" style="color: var(--color-primary);">"Security Tools I Built" section</a> for details and demos.
        </span>`
            },
            bounties: {
                description: 'Explore my bug bounty writeups',
                execute: () => `
        <span class="output">
        Discover my bug bounty findings and writeups:
        Visit the <a href="#bug-bounty-writeups" target="_blank" style="color: var(--color-primary);">"Bug Bounty Writeups" section</a> for more.
        </span>`
            },
            github: {
                description: 'See my latest GitHub repositories',
                execute: () => `
        <span class="output">
        View my automatically updated GitHub repositories:
        Visit the <a href="#github" target="_blank" style="color: var(--color-primary);">"Latest GitHub Projects" section</a> for details.
        </span>`
            },
            youtube: {
                description: 'Watch my cybersecurity intro video',
                execute: () => {
                    window.open("https://www.youtube.com/watch?v=dfdhAwSDOgw", "_blank");
                    return `<span class="output">Opening YouTube video in a new tab...</span>`;
                }
            },
            contact: {
                description: 'Show contact information',
                execute: () => `
        <span class="output">
        📧 Email: ihasib199@gmail.com
        🐙 GitHub: github.com/khuttes
        💼 Company: Cyber HelpYard
        📍 Location: Bangladesh

        🎯 Interests: Bug Bounty, Web/Network Pentesting
        💬 Ask me about: Recon, Automation, Security Tools

        Status: OPEN TO OPPORTUNITIES
        </span>`
            },
            clear: {
                description: 'Clear terminal screen',
                execute: () => {
                    this.output.innerHTML = '';
                    return null;
                }
            },
            ls: {
                description: 'List available sections',
                execute: () => `
        <span class="output">
        drwxr-xr-x  about/
        drwxr-xr-x  roadmap/
        drwxr-xr-x  skills/
        drwxr-xr-x  featuredprojects/
        drwxr-xr-x  security-tools/
        drwxr-xr-x  bug-bounty-writeups/
        drwxr-xr-x  github/
        drwxr-xr-x  blog/
        drwxr-xr-x  contact/
        </span>`
            },
            banner: {
                description: 'Show welcome banner',
                execute: () => `
        <span class="output" style="color: var(--color-primary);">
        ██╗  ██╗███████╗██╗     ██████╗ ██╗   ██╗ █████╗ ██████╗ ██████╗
        ██║  ██║██╔════╝██║     ██╔══██╗╚██╗ ██╔╝██╔══██╗██╔══██╗██╔══██╗
        ███████║█████╗  ██║     ██████╔╝ ╚████╔╝ ███████║██████╔╝██║  ██║
        ██╔══██║██╔══╝  ██║     ██╔═══╝   ╚██╔╝  ██╔══██║██╔══██╗██║  ██║
        ██║  ██║███████╗███████╗██║        ██║   ██║  ██║██║  ██║██████╔╝
        ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝        ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝

        Welcome to my Cybersecurity Portfolio Terminal
        Type 'help' for available commands
        </span>`
            }
        };
        this.init();
    }

    init() {
        // Show welcome message
        this.addOutput(this.commands.banner.execute());

        // Setup input listeners
        this.input.addEventListener('keydown', (e) => this.handleKeyDown(e));

        // Focus input on click anywhere in terminal
        this.output.parentElement.addEventListener('click', () => {
            this.input.focus();
        });
    }

    handleKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const command = this.input.value.trim();

            if (command) {
                this.commandHistory.push(command);
                this.historyIndex = this.commandHistory.length;
                this.executeCommand(command);
            }

            this.input.value = '';
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (this.historyIndex > 0) {
                this.historyIndex--;
                this.input.value = this.commandHistory[this.historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (this.historyIndex < this.commandHistory.length - 1) {
                this.historyIndex++;
                this.input.value = this.commandHistory[this.historyIndex];
            } else {
                this.historyIndex = this.commandHistory.length;
                this.input.value = '';
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            this.autoComplete();
        }
    }

    executeCommand(commandString) {
        // Show command in output
        this.addOutput(`<div class="terminal-line">
            <span class="prompt">$</span>
            <span class="command">${commandString}</span>
        </div>`);

        const [cmd, ...args] = commandString.split(' ');

        if (this.commands[cmd]) {
            const result = this.commands[cmd].execute(args);
            if (result) {
                this.addOutput(result);
            }
        } else {
            this.addOutput(`<div class="terminal-line">
            <span class="error">Command not found: ${cmd}</span>
            </div>
            <div class="terminal-line">
                <span class="output">Type 'help' for available commands</span>
            </div>`);
        }

        // Scroll to bottom
        this.output.scrollTop = this.output.scrollHeight;
    }

    addOutput(html) {
        this.output.innerHTML += html;
    }

    showHelp() {
        let helpText = '<span class="output">Available commands:\n\n';
        for (const [cmd, info] of Object.entries(this.commands)) {
            helpText += `  ${cmd.padEnd(12)} - ${info.description} \n`;
        }
        helpText += '</span>';
        return helpText;
    }

    autoComplete() {
        const partial = this.input.value;
        const matches = Object.keys(this.commands).filter(cmd =>
            cmd.startsWith(partial)
        );

        if (matches.length === 1) {
            this.input.value = matches[0];
        } else if (matches.length > 1) {
            this.addOutput(`<div class="terminal-line">
            <span class="output">${matches.join('  ')}</span>
            </div>`);
            this.output.scrollTop = this.output.scrollHeight;
        }
    }
}

// Initialize terminal when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const terminalOutput = document.getElementById('terminal-output');
    const terminalInput = document.getElementById('terminal-input');

    if (terminalOutput && terminalInput) {
        new Terminal(terminalOutput, terminalInput);
    }
});
