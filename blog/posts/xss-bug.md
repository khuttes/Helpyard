---
title: Understanding XSS Vulnerabilities
author: Md. Hasib Islam
date: 2025-10-12
tags: [xss, web-security, vulnerability]
---

# Understanding Cross-Site Scripting (XSS) Vulnerabilities

Cross-Site Scripting (XSS) attacks are a type of injection, in which malicious scripts are injected into otherwise benign and trusted websites. XSS attacks occur when an attacker uses a web application to send malicious code, generally in the form of a browser-side script, to a different end user.

The browser has no way to know that the script should not be trusted, and will execute the malicious script. Because the browser thinks the script came from a trusted source, the malicious script can access any cookies, session tokens, or other sensitive information retained by the browser and used with that site.

## Types of XSS Attacks

There are three primary types of XSS attacks:

1.  **Stored XSS (Persistent XSS):** The malicious script is permanently stored on the target servers. The victim then retrieves the malicious script from the server when requesting the stored information.
2.  **Reflected XSS (Non-Persistent XSS):** The malicious script is reflected off of a web server to the victim's browser. The script is activated through a link, which sends a request to a website with an XSS vulnerability.
3.  **DOM-based XSS:** The vulnerability lies in the client-side code rather than the server-side code. The attack payload is executed as a result of modifying the DOM environment in the victim's browser.

## Prevention

To prevent XSS, the primary defense is to filter or escape user input before it is displayed back to the user.

*   **Input Validation:** Validate all input on the server side (and client side as well for a better user experience).
*   **Output Encoding:** Encode all data before placing it in HTML, JavaScript, URL, or CSS contexts.
*   **Content Security Policy (CSP):** Implement a robust CSP to mitigate the impact of XSS attacks.

This post provides a basic overview. For more detailed information, refer to OWASP XSS Prevention Cheat Sheet.
