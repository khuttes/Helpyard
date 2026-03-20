---
title: IDOR Vulnerabilities Explained
author: Md. Hasib Islam
date: 2025-09-28
tags: [idor, access-control, web-security]
---

# Insecure Direct Object References (IDOR) Explained

Insecure Direct Object References (IDOR) are a type of access control vulnerability that arises when an application uses user-supplied input to directly access objects, such as database records, files, or other resources. If the application does not implement proper access control checks, an attacker can manipulate these references to gain unauthorized access to other users' data or functionality.

## How IDOR Attacks Work

Consider a web application that allows users to view their invoices. The URL for viewing an invoice might look like this: `https://example.com/invoice?id=123`. If an attacker changes the `id` parameter from `123` to `124`, and the application does not verify if the current user is authorized to view invoice `124`, then the attacker successfully performs an IDOR attack.

This can apply to various types of objects:

*   **Database IDs:** `user_id=123`, `account_id=XYZ`
*   **Filenames:** `download.php?file=report.pdf`
*   **Other resources:** `profile.php?username=victim`

## Prevention Strategies

Preventing IDOR vulnerabilities primarily involves implementing robust access control mechanisms.

*   **Implement Strong Access Control Checks:** For every request that directly references an object, the application must verify that the authenticated user is authorized to access that specific object.
*   **Use Indirect Object References:** Instead of exposing direct object identifiers (like `invoice_id=123`), use indirect, per-user references. For example, assign a random, non-sequential identifier for each object that is unique to the user's session.
*   **Least Privilege Principle:** Ensure that each user or role has the minimum level of access permissions necessary to perform their tasks.

IDOR vulnerabilities are common and can have significant impact. Always ensure your application verifies user authorization for any direct object access.
