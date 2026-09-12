# Cloud Computing — Module 6: Cloud Security and Identity Management

Organized by topic, with two lenses for each: **Learning Perspective** (understand the concept properly) and **Interview Perspective** (how to answer it fast, cleanly, and confidently).

> **Note:** Built from general industry knowledge, matching Module 6 of your NAV (Cloud Security, Policies & Principles of Access Management, Principle of Least Privilege, User Access Levels, IAM, Standard Password Policy, Identity Provider Standards, Cloud Encryption, Cloud Monitoring). Worth cross-checking against your actual course material for alignment, same as the earlier files.

---

## 1. Cloud Security

### Learning Perspective
**Cloud security** is the set of policies, controls, technologies, and practices used to protect cloud-based systems, data, and infrastructure from threats — both external (attackers) and internal (misconfiguration, insider risk).

A foundational concept is the **shared responsibility model**: the cloud provider and the customer each own different parts of the security burden.
- **Provider responsibility** — typically "security *of* the cloud": physical data center security, host infrastructure, hypervisor, and (depending on service model) parts of the network/OS layer
- **Customer responsibility** — typically "security *in* the cloud": data, identity and access management, application-level security, and OS/network configuration (the exact split shifts depending on whether you're using IaaS, PaaS, or SaaS — customers manage progressively less as you move up that stack)

**Common pillars of cloud security:**
- **Identity and access management** — controlling who can do what (see Sections 5–6)
- **Data protection** — encryption at rest and in transit (see Section 8)
- **Network security** — firewalls, security groups, segmentation
- **Monitoring and incident response** — detecting and reacting to threats (see Section 9)
- **Compliance** — meeting regulatory/industry requirements (e.g., HIPAA, PCI-DSS, GDPR)

### Interview Perspective
**Q: What is the shared responsibility model, and why does it matter?**
> It defines which security responsibilities belong to the cloud provider versus the customer. The provider secures the underlying infrastructure ("security of the cloud"); the customer is responsible for securing their data, identities, and configurations ("security in the cloud"). It matters because a huge share of cloud security incidents come from customer-side misconfiguration, not provider failures — understanding the boundary is essential to closing security gaps.

**Q: Does the shared responsibility split change between IaaS, PaaS, and SaaS?**
> Yes — as you move from IaaS to PaaS to SaaS, the provider takes on more responsibility (OS, runtime, and eventually the application itself), and the customer's direct security burden shrinks, though they remain responsible for their data and access controls regardless of service model.

---

## 2. Policies and Principles of Access Management

### Learning Perspective
**Access management** is the practice of controlling who (or what) can access which resources, and what they're allowed to do once they have access. It's governed by a combination of formal **policies** (documented rules) and underlying **principles** (guiding philosophies) that shape how those policies are designed.

**Common access management models:**
- **RBAC (Role-Based Access Control)** — permissions are assigned to roles, and users are assigned to roles, rather than granting permissions directly to individuals — simplifies management at scale
- **ABAC (Attribute-Based Access Control)** — access decisions are based on attributes (user department, resource sensitivity, time of day, location, etc.), enabling more fine-grained, dynamic policies
- **Policy-based access control** — centrally defined, often machine-readable policies (e.g., JSON-based policy documents) that explicitly allow or deny actions on specific resources

**Key principles that guide good access management:**
- **Least privilege** — grant only the access necessary to perform a task (detailed in Section 3)
- **Separation of duties** — no single individual should have unchecked control over a sensitive process (e.g., the person who approves a payment shouldn't also be the one who can initiate it)
- **Need-to-know** — access to sensitive information should be limited to those who genuinely require it for their role

### Interview Perspective
**Q: What's the difference between RBAC and ABAC?**
> RBAC assigns permissions to roles and users to roles — simple and scalable for typical organizational structures. ABAC evaluates access based on dynamic attributes (user, resource, environment, context), enabling more granular, context-aware policies, at the cost of added complexity.

**Q: What is separation of duties, and why does it matter for security?**
> It's the principle that no single person should have end-to-end unchecked control over a sensitive process — splitting critical actions across multiple people/roles reduces the risk of fraud, error, or abuse of privilege going undetected.

---

## 3. Principle of Least Privilege (PoLP)

### Learning Perspective
The **Principle of Least Privilege** states that a user, application, or system should be granted **only the minimum level of access required** to perform its function — nothing more.

**Why it matters:**
- **Reduces attack surface** — if an account or service is compromised, the potential damage is limited to whatever narrow access it actually has
- **Limits blast radius** — contains the impact of mistakes (accidental deletion, misconfiguration) as well as malicious activity
- **Supports compliance** — many regulatory frameworks explicitly require minimal-necessary-access controls

**Common practices that implement PoLP:**
- Granting time-limited or **just-in-time** access rather than standing/permanent permissions
- Regularly **auditing and revoking unused permissions**
- Using granular, resource-specific permissions rather than broad, sweeping ones (e.g., access to one specific storage bucket rather than all storage in an account)
- Applying PoLP to **both human users and service/application identities** (e.g., a VM's service account should only have access to what it explicitly needs)

### Interview Perspective
**Q: What is the principle of least privilege, and why is it important?**
> It means granting the minimum access necessary for a user or system to do its job — nothing more. It matters because it shrinks the attack surface and limits the damage from a compromised account, a mistake, or a malicious actor, since access is tightly scoped rather than broad.

**Q: How would you apply least privilege in practice?**
> Use granular, resource-specific permissions instead of broad roles, apply just-in-time/temporary access where possible, regularly audit and revoke unused permissions, and apply the same discipline to service accounts/applications, not just human users.

⭐ **Very frequently asked** — expect a follow-up asking for a concrete example (e.g., "a developer shouldn't have production database delete permissions if their job only requires read access to logs").

---

## 4. User Access Levels

### Learning Perspective
**User access levels** define tiers or categories of permission granted to different types of users, typically escalating from very limited to broad administrative control.

**Common access level tiers (conceptual, not a formal standard):**
- **Guest / read-only** — can view resources but not modify them
- **Standard user** — can perform typical day-to-day actions within their scope (e.g., use an application, manage their own data)
- **Power user / contributor** — broader ability to create, modify, or manage resources within a defined area
- **Administrator** — can manage configuration, users, and permissions within a system or account
- **Super admin / root / owner** — highest level of control, often including the ability to grant/revoke other admins' access and manage billing or account-level settings

Access levels are usually implemented through **role assignments** (tying back to RBAC) rather than ad hoc, one-off permission grants — keeping access consistent, auditable, and easier to manage as an organization scales.

### Interview Perspective
**Q: Why do organizations define tiered user access levels instead of giving everyone the same access?**
> Different roles need different capabilities — a support agent doesn't need the same access as an administrator. Tiered access levels let organizations match permissions to actual job responsibilities, which supports least privilege, reduces risk, and makes auditing who-can-do-what much simpler.

**Q: What's the risk of having too many "super admin" or root-level accounts?**
> Every super admin account is a high-value target and a potential single point of failure — if compromised, it can grant an attacker sweeping control. Best practice is to minimize the number of standing super admin accounts and use just-in-time elevation instead.

---

## 5. Identity and Access Management (IAM)

### Learning Perspective
**IAM** is the overarching framework — combining processes, policies, and technology — used to manage digital identities and control their access to resources. It answers two core questions for every request: **"Who are you?"** (authentication) and **"What are you allowed to do?"** (authorization).

**Core IAM components:**
- **Identities** — users, groups, service accounts/applications, and devices
- **Authentication** — verifying identity (passwords, multi-factor authentication, biometrics, certificates)
- **Authorization** — determining what an authenticated identity can do (via roles, policies, permissions)
- **Provisioning/deprovisioning** — creating accounts when someone joins, and — critically — promptly removing access when they leave or change roles
- **Audit and reporting** — logging who accessed what, and when, for security review and compliance

**Multi-Factor Authentication (MFA)** is a key IAM control — requiring two or more independent proofs of identity (something you know, something you have, something you are), significantly reducing the risk of compromised credentials leading to unauthorized access.

### Interview Perspective
**Q: What is IAM, and what are its core functions?**
> IAM is the framework for managing digital identities and controlling their access — covering authentication (verifying who you are), authorization (what you're allowed to do), provisioning/deprovisioning of accounts, and auditing access over time.

**Q: Why is prompt deprovisioning as important as provisioning?**
> Because "orphaned" accounts — access left active after someone leaves a role or the organization — are a common and serious security gap. Attackers and auditors alike look for stale accounts with lingering, unmonitored access.

**Q: Why is MFA considered a critical control?**
> Because passwords alone are frequently compromised (phishing, reuse, leaks). MFA requires a second independent factor, so a stolen password alone isn't enough to gain access — dramatically reducing the success rate of credential-based attacks.

---

## 6. Standard Password Policy (SPP)

### Learning Perspective
A **Standard Password Policy** defines the rules an organization enforces for creating and managing passwords, aiming to reduce the risk of compromised credentials.

**Common elements of a modern password policy:**
- **Minimum length** — longer passwords are exponentially harder to brute-force than complex-but-short ones; modern guidance (e.g., NIST) emphasizes length over forced complexity
- **Complexity requirements** — historically required mixed case/numbers/symbols, though current best-practice guidance has moved away from strict complexity rules in favor of length and breach-checking, since complexity rules often push users toward predictable patterns
- **Password expiration** — periodic forced changes; also increasingly de-emphasized by modern guidance unless there's evidence of compromise, since frequent forced changes tend to encourage weak, incremental password variations
- **Password history** — preventing reuse of recent passwords
- **Breach/blocklist checking** — rejecting passwords known to have appeared in prior data breaches
- **Account lockout policies** — limiting failed login attempts to slow brute-force attacks
- **Encouraging/requiring MFA** — modern policies increasingly treat MFA as a more effective control than ever-more-complex password rules

### Interview Perspective
**Q: What should a strong password policy include?**
> Reasonable minimum length, breach/blocklist checking, account lockout after repeated failures, discouraging password reuse, and pairing it with MFA. Note that current best-practice guidance (e.g., NIST) has moved away from forced complexity and frequent expiration, since those often lead to weaker, more predictable passwords.

**Q: Why has industry guidance shifted away from mandatory periodic password changes?**
> Research showed that forced frequent changes led users to make small, predictable modifications to existing passwords (e.g., appending a number), which didn't meaningfully improve security and often frustrated users. Modern guidance instead favors long passwords, breach detection, and MFA as more effective controls.

---

## 7. Identity Provider Standards (SAML, OpenID)

### Learning Perspective
**Identity federation standards** allow identity verification to be handled by a trusted third party (an **Identity Provider**, or IdP) rather than requiring every application to manage its own separate set of credentials — this underpins **Single Sign-On (SSO)**.

- **SAML (Security Assertion Markup Language)** — an XML-based standard for exchanging authentication and authorization data between an identity provider and a service provider. Widely used in enterprise SSO scenarios (e.g., logging into many corporate SaaS apps using one corporate identity).
- **OpenID Connect (OIDC)** — a modern identity layer built **on top of OAuth 2.0**, using JSON/REST rather than XML. Widely used for consumer-facing and modern web/mobile applications (e.g., "Sign in with Google").
  - Note the related but distinct concept: **OAuth 2.0** itself is an *authorization* framework (granting limited access to resources), while **OpenID Connect adds an identity/authentication layer on top of it** — a common point of confusion.

**Why these standards matter:**
- Enable **Single Sign-On (SSO)** — authenticate once, access many connected applications
- Reduce the number of credentials users (and attackers) have to manage
- Centralize authentication logic and security controls (like MFA) at the identity provider, rather than duplicating them across every application

### Interview Perspective
**Q: What's the difference between SAML and OpenID Connect?**
> SAML is an older, XML-based standard commonly used for enterprise SSO. OpenID Connect is a modern, JSON/REST-based identity layer built on top of OAuth 2.0, widely used in consumer and modern web/mobile applications. Both enable federated authentication and SSO, but differ in format, era of design, and typical use case.

**Q: What's the difference between OAuth 2.0 and OpenID Connect?**
> OAuth 2.0 is fundamentally about *authorization* — granting an application limited access to a resource on a user's behalf. OpenID Connect builds an *authentication* (identity verification) layer on top of OAuth 2.0. In short: OAuth answers "what can this app do on my behalf," OIDC answers "who is this user."

⭐ **Frequently confused pair** — be precise about the OAuth-vs-OIDC distinction; interviewers often probe this specifically.

---

## 8. Cloud Encryption

### Learning Perspective
**Encryption** protects data by converting it into an unreadable form that can only be reversed with the correct decryption key, ensuring that even if data is accessed by an unauthorized party, it remains unintelligible without that key.

**Two primary states data can be encrypted in:**
- **Encryption at rest** — protecting stored data (on disk, in databases, in object storage) from unauthorized access if the underlying storage is somehow accessed directly
- **Encryption in transit** — protecting data as it moves across a network (e.g., via TLS/SSL), preventing interception or tampering while data travels between systems

**Key management** is central to encryption's effectiveness:
- **Customer-managed keys** — the customer generates, rotates, and controls access to encryption keys, offering maximum control
- **Provider-managed keys** — the cloud provider handles key management on the customer's behalf, simpler but with less direct control
- **Key rotation** — periodically replacing encryption keys to limit the impact if a key is ever compromised
- **HSMs (Hardware Security Modules)** — dedicated hardware for securely generating, storing, and managing cryptographic keys, often used for the highest-sensitivity workloads

### Interview Perspective
**Q: What's the difference between encryption at rest and encryption in transit, and why do you need both?**
> Encryption at rest protects stored data from unauthorized access if storage is compromised directly; encryption in transit protects data as it moves across networks from interception. You need both because data is vulnerable at different points — sitting in storage and while traveling between systems — and securing only one leaves the other exposed.

**Q: Customer-managed vs. provider-managed encryption keys — what's the trade-off?**
> Customer-managed keys give you full control over key generation, rotation, and access — important for strict compliance or sensitivity requirements — but add operational responsibility. Provider-managed keys are simpler and handled automatically, but you have less direct control and visibility over key handling.

---

## 9. Cloud Monitoring and Its Benefits

### Learning Perspective
**Cloud monitoring** is the continuous observation and analysis of cloud infrastructure, applications, and security events, to understand system health, detect anomalies, and respond to issues quickly.

**Core components:**
- **Logging** — recording discrete events (e.g., login attempts, API calls, errors) for later review and audit
- **Metrics** — quantitative measurements over time (CPU usage, request latency, error rates) used to track performance and trigger alerts
- **Tracing** — following a single request's path across multiple services, especially valuable in microservices/distributed architectures for diagnosing where slowdowns or failures occur
- **Alerting** — automatically notifying relevant teams when thresholds are breached or anomalies are detected
- **SIEM (Security Information and Event Management)** — aggregates and correlates security-relevant logs/events across systems to detect potential threats

**Benefits of strong cloud monitoring:**
- **Faster incident detection and response** — reduces the time between something going wrong and someone knowing about it
- **Improved reliability/performance** — proactively catching degradation before it becomes an outage
- **Security threat detection** — spotting suspicious patterns (e.g., unusual access locations, privilege escalation attempts) early
- **Compliance and audit support** — many regulations require demonstrable logging and monitoring of access to sensitive systems/data
- **Capacity planning** — historical metrics inform decisions about scaling infrastructure ahead of demand

### Interview Perspective
**Q: What are the main components of cloud monitoring, and how do they work together?**
> Logging captures discrete events, metrics track quantitative system health over time, tracing follows requests across distributed services, and alerting notifies teams when something needs attention. Together they give both a real-time and historical view of system health and security posture.

**Q: What are the key benefits of investing in strong cloud monitoring?**
> Faster incident detection and response, improved reliability through proactive issue-catching, earlier security threat detection, support for compliance/audit requirements, and better-informed capacity planning based on historical usage trends.

---

## Quick Interview-Prep Cheat Sheet

| Topic | One-line answer |
|---|---|
| Cloud security | Shared responsibility model — provider secures "of the cloud," customer secures "in the cloud" |
| Access management policies | RBAC (roles), ABAC (attributes), guided by least privilege, separation of duties, need-to-know |
| Principle of Least Privilege | Grant only the minimum access necessary — shrinks attack surface and blast radius |
| User access levels | Tiered permissions (guest → user → admin → super admin), usually implemented via RBAC |
| IAM | Framework for authentication + authorization + provisioning/deprovisioning + auditing of identities |
| Standard Password Policy | Favor length + breach-checking + MFA over forced complexity/expiration (modern guidance) |
| SAML vs. OpenID Connect | SAML = XML, enterprise SSO; OIDC = JSON, built on OAuth 2.0, modern web/consumer apps |
| OAuth vs. OIDC | OAuth = authorization ("what can this app do"); OIDC = authentication ("who is this user") |
| Cloud encryption | At rest (stored data) + in transit (moving data); key management (customer- vs. provider-managed) is critical |
| Cloud monitoring | Logging + metrics + tracing + alerting → faster incident response, reliability, security detection, compliance |

---