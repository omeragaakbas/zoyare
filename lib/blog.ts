import generatedPosts from "@/content/posts-generated.json";

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readTime: number;
  body: string; // HTML string
  lang?: "en" | "nl";
};

export const posts: Post[] = [
  {
    slug: "outsource-or-build-software-in-house",
    title: "Outsource or build in-house? The honest comparison",
    description:
      "Hire a developer, build it yourself, or outsource to a specialist? The pros and cons of each approach — with real numbers.",
    date: "2026-01-19",
    category: "Software Development",
    readTime: 7,
    body: `
<p>You need software. Maybe an internal tool, a client portal or an integration between two systems. The first question you ask yourself: do I build it myself, hire a developer, or outsource it to a specialist?</p>

<p>The honest answer: it depends on your situation. But there are clear guidelines. In this article I compare the three options side by side — with real numbers and the pitfalls I encounter in practice.</p>

<h2>Option 1: Hiring a developer full-time</h2>

<p>The most obvious choice if you need ongoing software development.</p>

<p><strong>Pros:</strong></p>
<ul>
  <li>Full control over priorities and planning</li>
  <li>Knowledge stays in-house</li>
  <li>Direct communication, no external dependencies</li>
</ul>

<p><strong>Cons:</strong></p>
<ul>
  <li>Cost: a mid-level developer costs €55,000–€85,000 per year in salary, plus employer costs, hardware, tooling and mentoring</li>
  <li>Hiring takes 3–6 months on average in the current market</li>
  <li>A single developer has a limited skillset by definition — front-end, back-end, infra and design in one person is rare</li>
  <li>If they're sick or leave, you're stuck</li>
</ul>

<p><strong>When it makes sense:</strong> when you have continuous (30+ hours per week) development work and can manage a technical team.</p>

<h2>Option 2: Hiring a freelance developer</h2>

<p>More flexible than a full-time hire, but with its own risks.</p>

<p><strong>Pros:</strong></p>
<ul>
  <li>Flexible scaling up and down</li>
  <li>No long-term commitment</li>
  <li>Often specialized knowledge available</li>
</ul>

<p><strong>Cons:</strong></p>
<ul>
  <li>Hourly rates of €75–€150 add up quickly</li>
  <li>Availability isn't guaranteed — good freelancers are often fully booked</li>
  <li>Quality varies enormously — no team reviewing the work</li>
  <li>Knowledge transfer is a risk when the freelancer moves on</li>
</ul>

<p><strong>When it makes sense:</strong> for short-term, well-defined tasks where you can provide technical direction yourself.</p>

<h2>Option 3: Outsourcing to a software partner</h2>

<p>A studio or specialist that handles the full process: from analysis to delivery.</p>

<p><strong>Pros:</strong></p>
<ul>
  <li>Broad skillset without hiring multiple people</li>
  <li>Experience with similar projects — faster past the pitfalls</li>
  <li>Fixed price or sprint-based, so predictable costs</li>
  <li>Documentation and handover are part of the delivery</li>
</ul>

<p><strong>Cons:</strong></p>
<ul>
  <li>Less direct control over daily priorities</li>
  <li>Communication requires clear agreements</li>
  <li>Large agencies can be more expensive due to overhead</li>
</ul>

<p><strong>When it makes sense:</strong> for scoped projects where you want results without building an internal team. Especially effective when you choose a small-scale partner where the engineer doing the work is also the person you talk to.</p>

<h2>Costs side by side</h2>

<p>For a mid-sized project (for example an internal tool with API integrations, 3-month timeline):</p>

<ul>
  <li><strong>Full-time developer</strong>: ~€25,000 (3 months salary + overhead) — but you keep paying after the project is done</li>
  <li><strong>Freelancer</strong>: €30,000–€50,000 (400–500 hours × €75–€100)</li>
  <li><strong>Software partner</strong>: €20,000–€50,000 (project price, including analysis and documentation)</li>
</ul>

<p>The difference isn't just in price, but in what you get: a partner delivers a finished product, a freelancer delivers hours, a full-time hire delivers ongoing capacity.</p>

<h2>Common pitfalls when outsourcing</h2>

<p><strong>1. Choosing on price</strong><br>
The cheapest quote almost never wins in the long run. Always ask: who does the work? Is that the same person you're talking to?</p>

<p><strong>2. No technical point of contact internally</strong><br>
Outsourcing only works if there's someone internally who can make decisions. Without that person, every project gets stuck in alignment.</p>

<p><strong>3. Not defining scope upfront</strong><br>
"We'll see what's needed" leads to endless timelines and rising costs. A good partner helps you define the scope before anything gets built. I wrote more about this in <a href="/blog/why-software-projects-fail">why software projects fail</a>.</p>

<h2>My advice</h2>

<p>There's no universally right choice. But for most SMBs that need software for a specific problem, outsourcing to a specialized partner is the most efficient route. You get a broader skillset, <a href="/blog/custom-software-development-cost">predictable costs</a> and a delivered product — without the overhead of hiring and building an internal team.</p>

<p>Not sure which approach fits your situation? <a href="/contact">I'm happy to think along</a> — no strings attached.</p>
    `.trim(),
  },
  {
    slug: "why-software-projects-fail",
    title: "Why software projects fail — and how to prevent it",
    description:
      "80% of software projects run over time or budget. The 5 most common causes and concrete tips to prevent them.",
    date: "2026-02-16",
    category: "Software Development",
    readTime: 8,
    body: `
<p>The statistics aren't pretty: according to the Standish Group CHAOS Report, only 31% of all software projects cross the finish line on time, within budget and with the desired functionality. The rest runs over, costs more than planned or doesn't deliver what was promised.</p>

<p>In my work as a software engineer, I see the same patterns recurring. Most projects don't fail because of technical problems — they fail because of human and organizational mistakes that are avoidable. And when shortcuts accumulate, you end up with <a href="/blog/technical-debt-hidden-cost">technical debt</a> that slows everything down.</p>

<h2>1. The scope isn't sharp enough</h2>

<p>This is by far the most common cause. The project starts with a vague idea: "we want a platform" or "we need an app." Without clear boundaries, the scope grows with every meeting.</p>

<p><strong>How to recognize it:</strong></p>
<ul>
  <li>"Can we also add this?" comes up every week</li>
  <li>There's no document describing what <a href="/blog/mvp-vs-full-product-when-to-stop-building">v1 does and doesn't include</a></li>
  <li>Stakeholders have different expectations of the end result</li>
</ul>

<p><strong>How to prevent it:</strong></p>
<ul>
  <li>Write a scope document before a single line of code is written</li>
  <li>Explicitly define what's <em>not</em> in the first version</li>
  <li>Have all stakeholders sign off on the scope document</li>
</ul>

<h2>2. No iterative process</h2>

<p>The waterfall model — building for months and then delivering all at once — is a recipe for disappointment. After three months of building, it turns out the client had something completely different in mind.</p>

<p><strong>How to prevent it:</strong></p>
<ul>
  <li>Work in 1–2 week sprints</li>
  <li>Show a working version after each sprint</li>
  <li>Give the client the chance to course-correct before it's too late</li>
</ul>

<p>A project that processes feedback every two weeks can't build in the wrong direction for three months.</p>

<h2>3. The wrong partner or the wrong team</h2>

<p>Not every developer or agency is suited for every project. An agency specializing in WordPress websites isn't the right choice for a complex API integration.</p>

<p><strong>Red flags:</strong></p>
<ul>
  <li>The partner doesn't ask critical questions about your requirements</li>
  <li>A quote is sent immediately without a discovery phase</li>
  <li>You talk to an account manager but don't know who does the work</li>
  <li>The price is suspiciously low compared to other quotes</li>
</ul>

<p><strong>Green flags:</strong></p>
<ul>
  <li>The partner says "no" to features that don't belong in v1</li>
  <li>Time is spent understanding your problem, not just your wishes</li>
  <li>The person you talk to is the same person writing the code</li>
</ul>

<h2>4. Testing starts too late</h2>

<p>Testing isn't a phase at the end of a project — it's an ongoing activity. Software that's only tested in the last week is guaranteed to contain bugs that take weeks to fix.</p>

<p><strong>How to prevent it:</strong></p>
<ul>
  <li>Automated tests from day one</li>
  <li>A staging environment where the client can test along the way</li>
  <li>Prioritize bug fixes over new features</li>
</ul>

<h2>5. No ownership on the client side</h2>

<p>A software project needs someone on the client side who can and will make decisions. Without that person, the team waits for answers, decisions are delayed and the timeline slips.</p>

<p><strong>What you need:</strong></p>
<ul>
  <li>One point of contact with the authority to make decisions</li>
  <li>Availability: at least 2–4 hours per week for the project</li>
  <li>Willingness to prioritize — not everything can happen at once</li>
</ul>

<h2>The common thread</h2>

<p>All five causes share the same core: <strong>communication and expectation management</strong>. Technology is rarely the problem. It's about clear agreements, short feedback loops and the discipline to guard the scope.</p>

<p>A good software project doesn't start with code. It starts with a conversation where the problem becomes clear, the scope is defined and the collaboration is structured. Everything after that is execution.</p>

<h2>Need help setting up a project?</h2>

<p>I'm happy to help with a <a href="/contact">discovery session</a>: understanding the problem, defining the scope and creating a realistic plan. Want to know <a href="/blog/custom-software-development-cost">what custom software costs</a>? That's a good place to start.</p>
    `.trim(),
  },
  {
    slug: "digital-transformation-for-smbs",
    title: "Digital transformation for SMBs: where to start?",
    description:
      "Digital transformation sounds like something for large corporates. But it's relevant for SMBs too — as long as you stay practical. A hands-on guide.",
    date: "2026-03-08",
    category: "Digital Transformation",
    readTime: 7,
    body: `
<p>Digital transformation. It's a term you hear everywhere — from government subsidies to consultancy pitches. But what does it actually mean if you run a business with 5, 20 or 50 employees? Do you need to overhaul everything? Buy a new ERP system? Build an app?</p>

<p>Usually not. Digital transformation for SMBs isn't a revolution — it's a series of smart improvements that make your business more efficient, more scalable and less dependent on manual work.</p>

<h2>What is digital transformation, really?</h2>

<p>At its core: <strong>replacing processes that currently run manually, on paper or in disconnected systems with software that does it better, faster and more reliably.</strong></p>

<p>Real-world examples:</p>

<ul>
  <li>From spreadsheets to a central system where everyone works</li>
  <li>From manual invoicing to automated workflows</li>
  <li>From email as a project management tool to a proper system</li>
  <li>From asking colleagues for data to dashboards with real-time insights</li>
  <li>From paper forms to digital intake that feeds directly into your system</li>
</ul>

<p>None of these steps require a million-dollar budget or a six-month consultancy engagement.</p>

<h2>Where to start?</h2>

<p>The mistake many businesses make: starting too big. A 40-page "digital transformation roadmap" that tries to change everything at once. That doesn't work. This does:</p>

<h3>Step 1: Identify your pain points</h3>

<p>Walk along with your team for a week and note every moment someone:</p>
<ul>
  <li>Manually copies data from one system to another</li>
  <li>Shares a spreadsheet via email</li>
  <li>Has to ask a colleague for information because there's no central system</li>
  <li>Manually compiles a report</li>
  <li>Executes a process that depends on one specific person</li>
</ul>

<h3>Step 2: Prioritize by impact and feasibility</h3>

<p>Not every pain point is equally urgent. Score each one on two axes:</p>
<ul>
  <li><strong>Impact</strong>: how much time, money or errors does a solution save?</li>
  <li><strong>Feasibility</strong>: how complex is the solution? Are there existing tools or is custom work needed?</li>
</ul>

<p>Start with the point that scores high on both: high impact, relatively easy to solve.</p>

<h3>Step 3: Choose the right solution</h3>

<p>Not everything requires custom software. The right solution depends on the problem:</p>

<ul>
  <li><strong>Standard SaaS tool</strong> — If your problem is generic (project management, CRM, accounting), an existing tool is almost always better and cheaper than custom work.</li>
  <li><strong>Integration between existing tools</strong> — If your tools don't talk to each other, an <a href="/blog/api-integration-connecting-systems">API connection</a> is often sufficient.</li>
  <li><strong>Custom automation</strong> — If the process is too specific for standard software, a <a href="/blog/business-process-automation-guide">tailor-made automation</a> is the way.</li>
  <li><strong>Custom application</strong> — Only if nothing on the market truly fits your workflow.</li>
</ul>

<h3>Step 4: Start small and measure results</h3>

<p>Implement one improvement, measure the effect (time saved, error reduction, costs) and use that as the basis for the next step. This creates internal buy-in and prevents having to commit a large budget without proven results.</p>

<h2>Common mistakes</h2>

<p><strong>1. Buying technology without understanding the problem</strong><br>
A new CRM solves nothing if your sales process isn't clear. First the process, then the tool.</p>

<p><strong>2. Wanting everything at once</strong><br>
Digital transformation isn't a project with an end date. It's an ongoing process of improvement. Don't try to change everything at once.</p>

<p><strong>3. Forgetting the people</strong><br>
Software only works if people use it. Invest in training and involve your team in the decision. A system nobody uses is money wasted.</p>

<p><strong>4. Not assigning an owner</strong><br>
Someone needs to be responsible for progress. Without an owner, every digitalization project stalls in the daily grind.</p>

<h2>What does digital transformation cost?</h2>

<p>That depends entirely on the scope. But to give you an idea:</p>

<ul>
  <li><strong>Implementing and configuring SaaS tools</strong>: €1,000 – €5,000 (one-time) + subscription costs</li>
  <li><strong><a href="/services/api-integrations">API integration</a> between two systems</strong>: €2,500 – €15,000</li>
  <li><strong>Custom automation</strong>: €5,000 – €30,000</li>
  <li><strong>Fully custom system</strong>: €20,000+</li>
</ul>

<p>The ROI for well-chosen projects is almost always within 6–12 months. Especially the combination of time savings and error reduction delivers measurable results quickly.</p>

<h2>Ready to take the first step?</h2>

<p>Describe your current situation: which processes take too much time, which systems you use now and where the biggest frustration lies. Then I'll look at which step delivers the most value — and whether that's a standard tool, an integration or custom work.</p>
    `.trim(),
  },
  {
    slug: "custom-software-development-cost",
    title: "Custom software development: what does it cost and what should you know?",
    description:
      "Everything you need to know before commissioning custom software: costs, timelines, pitfalls and how to choose the right partner.",
    date: "2026-03-20",
    category: "Custom Software",
    readTime: 8,
    body: `
<p>Commissioning custom software is a big step. You're deliberately choosing a solution that doesn't come off the shelf — and there's a reason for that. But what does it actually cost? What do you need to arrange? And how do you avoid the most common mistakes?</p>

<p>In this article I explain everything from my own practice as a software engineer. No sales pitch, just honest information.</p>

<h2>When do you choose custom software?</h2>

<p>Standard software works fine for generic processes. But as soon as your business has a workflow that's too specific for what a SaaS package offers, you hit limitations:</p>

<ul>
  <li>Two systems that don't communicate with each other</li>
  <li>Employees manually transferring data between tools</li>
  <li>Reports that never quite match because the system doesn't understand your definitions</li>
  <li>Process automation that "almost" works but still requires a manual step</li>
</ul>

<p>If you recognize yourself in one of these situations, custom software is worth exploring.</p>

<h2>What does custom software cost?</h2>

<p>The honest answer: <strong>it depends on the complexity</strong>. But to give you a framework:</p>

<ul>
  <li><strong>Small automation or tool (2–6 weeks)</strong>: €5,000 – €20,000</li>
  <li><strong>Mid-sized system with API integrations (2–4 months)</strong>: €20,000 – €75,000</li>
  <li><strong>Enterprise platform or mobile app (4–12 months)</strong>: €75,000+</li>
</ul>

<p>Compare this with the alternatives: a full-time software developer costs €60,000–€90,000 per year in salary alone, not counting overhead. Custom software is in many cases <a href="/blog/outsource-or-build-software-in-house">cheaper than an internal team</a>, especially for scoped projects.</p>

<h2>What determines the price?</h2>

<p>The biggest price factors are:</p>

<ol>
  <li><strong>Complexity of the logic</strong> — The more exceptions, calculations or decision trees, the more time.</li>
  <li><strong>Integrations with existing systems</strong> — Every <a href="/blog/api-integration-connecting-systems">API connection</a> takes time, especially when the other system's documentation is poor.</li>
  <li><strong>User interface</strong> — An internal tool without a polished UI is faster than a consumer app where design matters.</li>
  <li><strong>Scaling and performance</strong> — Building software for 10 users is different than for 10,000.</li>
  <li><strong>Maintenance and further development</strong> — Who manages it after delivery?</li>
</ol>

<h2>The process: from idea to live software</h2>

<p>A solid process looks like this:</p>

<ol>
  <li><strong>Discovery</strong> — Understanding the problem. What's the current process? Where's the pain? What's the desired outcome?</li>
  <li><strong>Scope definition</strong> — What do we build, and what don't we? A sharp scope prevents endless timelines.</li>
  <li><strong>Architecture decisions</strong> — Which technology? Which data model? How do we scale later?</li>
  <li><strong>Building in iterations</strong> — Not building for 6 months and then delivering all at once. Working in sprints so you can give early feedback.</li>
  <li><strong>Testing and deployment</strong> — Automated tests, staging environment, production deployment.</li>
  <li><strong>Handover and documentation</strong> — So you can continue with any developer later, not just me.</li>
</ol>

<h2>Most common mistakes</h2>

<p><strong>1. Wanting too much in the first version</strong><br>
<a href="/blog/mvp-vs-full-product-when-to-stop-building">V1 should solve the core problem</a>, not every possible future wish. Every feature you add to the first version nearly doubles the chance of delays.</p>

<p><strong>2. Not investing enough time in the discovery phase</strong><br>
Building software starts with understanding what you're building. Spending weeks understanding the problem saves months of rework.</p>

<p><strong>3. Choosing on price rather than quality</strong><br>
The cheapest quote is rarely the best investment. Poorly built software costs you more in maintenance and rewrites.</p>

<p><strong>4. Not assigning an internal owner</strong><br>
Custom software requires a contact person on your side who can make decisions. Without that person, a project stalls.</p>

<h2>How to choose the right partner?</h2>

<p>Ask these questions in every conversation:</p>

<ul>
  <li>What's your approach when the scope changes midway?</li>
  <li>Can you share examples of similar projects?</li>
  <li>Who actually builds it — you, or is it outsourced?</li>
  <li>What do I get if I discover a bug after delivery?</li>
  <li>What does the documentation look like?</li>
</ul>

<p>Watch out: agencies scale their teams with juniors or outsource to low-cost countries. A specialized engineer who does the work themselves is in most cases faster, cheaper and more reliable.</p>

<h2>Ready to get started?</h2>

<p>At Zoyare I always start with a free 30-minute conversation. Not a sales pitch, but honest advice on whether custom software is the right solution for your situation. If standard software is a better fit, I'll tell you that too.</p>
    `.trim(),
  },
  {
    slug: "api-integration-connecting-systems",
    title: "Connecting systems via API: how it works in practice",
    description:
      "You use five different tools, but they don't talk to each other. API integration solves that. Explained in plain language + what it costs.",
    date: "2026-03-28",
    category: "API & Integrations",
    readTime: 6,
    body: `
<p>Almost every growing business runs into it at some point: multiple systems that don't communicate with each other. Accounting is in Xero, the CRM is in HubSpot, planning is in a custom tool and reports are manually built in Excel. Every week, all over again.</p>

<p>This is solvable. API integration connects those systems so data flows automatically and manual copy-pasting becomes a thing of the past.</p>

<h2>What is an API, exactly?</h2>

<p>An API (Application Programming Interface) is a standardized way for software systems to communicate with each other. Almost every modern software application has an API — from Xero and HubSpot to Shopify and SAP.</p>

<p>Simply put: an API is a door through which systems can exchange data. My job is building the connection between those doors.</p>

<h2>When is API integration the solution?</h2>

<p>API integration is relevant when you:</p>

<ul>
  <li>Manually transfer data between systems (copy, paste, export/import)</li>
  <li>Build reports by combining data from multiple sources</li>
  <li>Want to connect a new system to existing software</li>
  <li>Need real-time data exchange (e.g., inventory, orders, customer data)</li>
  <li>Want to automate notifications or actions based on events in another system</li>
</ul>

<h2>How does an API integration project work?</h2>

<p>A typical integration project follows these steps:</p>

<ol>
  <li><strong>Mapping</strong> — Which data needs to go from which system to which system? What are the fields, formats and frequencies?</li>
  <li><strong>API documentation analysis</strong> — Every system has its own rules. Some APIs are excellently documented (Stripe, Twilio), others are a challenge (older enterprise systems).</li>
  <li><strong>Authentication setup</strong> — OAuth, API keys, webhooks — the connection must be secure.</li>
  <li><strong>Transformation logic</strong> — Data in system A looks different than in system B. Translating that is the real work.</li>
  <li><strong>Error handling</strong> — What happens when a system goes offline briefly? Good integrations are resilient to outages.</li>
  <li><strong>Monitoring</strong> — After delivery you want to know if the integration is working. Logging and alerts are a standard part of my deliveries.</li>
</ol>

<h2>Real-world examples</h2>

<p><strong><a href="/portfolio/siemens">Siemens BuildingX Connector</a></strong><br>
For Siemens I built a production-ready Mendix connector for the BuildingX IoT platform. This involved complex Java implementation, layered REST API integrations and a complete sample application for enterprise customers.</p>

<p><strong>Invoicing automation</strong><br>
An accounting firm manually processed timesheets from dozens of freelancers. We built an <a href="/blog/business-process-automation-guide">automation tool</a> that handles the entire process — from CSV upload to sent PDF invoice — without any manual step.</p>

<h2>What does an API integration cost?</h2>

<p>Depending on complexity:</p>

<ul>
  <li><strong>Simple connection between two modern systems</strong>: €2,500 – €8,000</li>
  <li><strong>Multi-system integration with transformation logic</strong>: €8,000 – €25,000</li>
  <li><strong>Enterprise integration with legacy systems</strong>: €25,000+</li>
</ul>

<p>Timeline is typically 2–8 weeks, depending on the quality of the API documentation and complexity of the business logic.</p>

<h2>What makes a good integration?</h2>

<p>Many integration projects are built as a "quick fix" — and that comes back to haunt you. A good integration is:</p>

<ul>
  <li><strong>Reliable</strong>: works even when a system is temporarily unreachable</li>
  <li><strong>Documented</strong>: so you know exactly what's happening</li>
  <li><strong>Maintainable</strong>: when a system changes its API, the adjustment is minimal</li>
  <li><strong>Monitored</strong>: alerts when something goes wrong</li>
</ul>

<h2>Ready to get started?</h2>

<p>Describe which systems you want to connect and what the data flow should be, and I'll take a free look at whether and how this is technically feasible. See our <a href="/services/api-integrations">API integration service</a> for more details.</p>
    `.trim(),
  },
  {
    slug: "business-process-automation-guide",
    title: "Business process automation: when does it pay off and how do you approach it?",
    description:
      "Which processes are suited for automation, what does it deliver and how do you prevent building an automation nobody uses?",
    date: "2026-04-07",
    category: "Process Automation",
    readTime: 7,
    body: `
<p>Every business has them: processes that are manually executed every week. Processing timesheets, compiling reports, creating invoices, transferring data between systems. Work that someone does, but that a computer should really be doing.</p>

<p>Business process automation (BPA) solves this. But not every process is suited for automation — and a poorly automated process is sometimes worse than a manual one. In this article I explain when automation pays off, how to approach it and what the pitfalls are.</p>

<h2>What is business process automation?</h2>

<p>BPA is automating recurring business processes with software. The scope is broad:</p>

<ul>
  <li>A script that <a href="/blog/api-integration-connecting-systems">synchronizes data between two systems</a> every night</li>
  <li>A tool that reads CSV files and automatically generates invoices</li>
  <li>A workflow that registers a new customer in three systems simultaneously</li>
  <li>A reporting tool that automatically sends a management report every Monday</li>
</ul>

<p>It's about one thing: eliminating manual, repetitive work.</p>

<h2>When is automation worth it?</h2>

<p>The rule of thumb is simple: if a process takes more than <strong>2 hours per week</strong>, runs regularly and has few exceptions, automation is almost always profitable.</p>

<p>Concrete signals you should automate:</p>

<ul>
  <li>Employees manually copy data between spreadsheets, email or systems</li>
  <li>The same report is manually compiled every week</li>
  <li>Errors occur because people retype data</li>
  <li>A new employee needs a week to learn "the process"</li>
  <li>When the regular person is sick, nobody knows how the process works</li>
</ul>

<h2>Which processes are not suited?</h2>

<p>Automation works best for processes with clear rules and few exceptions. Processes that don't automate well:</p>

<ul>
  <li>Processes with a lot of human judgment ("this doesn't quite look right, but still...")</li>
  <li>Processes heavily dependent on external parties that don't have an API</li>
  <li>Processes so rare that the build cost will never be recouped</li>
  <li>Processes that will fundamentally change soon</li>
</ul>

<h2>A concrete example: freelancer invoicing</h2>

<p>For <a href="/portfolio/proaspect">ProAspect</a> I built an automation tool for an accounting firm. The manual process looked like this:</p>

<ol>
  <li>Freelancers submit weekly timesheets</li>
  <li>Employee downloads the CSV files</li>
  <li>Employee looks up the correct rate per freelancer per client</li>
  <li>Employee manually creates an invoice in Word</li>
  <li>Employee exports to PDF</li>
  <li>Employee sends the invoice via email</li>
</ol>

<p>This process took several hours per week for dozens of freelancers. And it was error-prone: wrong rate, wrong client, forgotten invoice.</p>

<p>The automation replaces steps 2 through 6 entirely. The employee uploads the CSV — the rest happens automatically. From timesheet to sent invoice in seconds.</p>

<h2>How to approach an automation project?</h2>

<ol>
  <li>
    <strong>Map the current process</strong><br>
    Write down step by step what happens now. Including exceptions. This is the most underestimated step — and the most important.
  </li>
  <li>
    <strong>Define the happy path</strong><br>
    What's the standard case? Start there. Exceptions can be added later.
  </li>
  <li>
    <strong>Determine integration points</strong><br>
    Which systems are involved? Do they have an API? What's the input and output format?
  </li>
  <li>
    <strong>Build and test with real data</strong><br>
    Always test with real historical data before going live. Production data always contains edge cases you didn't foresee.
  </li>
  <li>
    <strong>Build in monitoring</strong><br>
    An automation that silently fails is more dangerous than a manual process. Ensure logging and alerts.
  </li>
</ol>

<h2>What does it cost?</h2>

<p>Indicative prices for automation projects:</p>

<ul>
  <li><strong>Simple automation (1–3 systems, clear process)</strong>: €3,000 – €10,000</li>
  <li><strong>Mid-sized automation with multiple integrations</strong>: €10,000 – €30,000</li>
  <li><strong>Complex enterprise automation</strong>: €30,000+</li>
</ul>

<p>The ROI for a well-chosen process is almost always under 6 months. An employee spending 4 fewer hours per week on manual work saves €5,000–€10,000 per year in labor costs alone — not counting error reduction.</p>

<h2>No-code tools or custom?</h2>

<p>Tools like Zapier, Make (Integromat) or Power Automate are suited for simple connections between popular SaaS tools. They work well when the process is simple and the involved systems have native integrations.</p>

<p>Custom is better when:</p>
<ul>
  <li>The process contains complex business logic</li>
  <li>You work with custom or legacy systems without standard integrations</li>
  <li>Performance and reliability are critical</li>
  <li>You don't want to depend on external tools with monthly costs</li>
</ul>

<h2>Ready to automate a process?</h2>

<p>Describe the process you want to automate — how it works now, which systems are involved and how much time it takes. Check out our <a href="/services/process-automation">process automation service</a> or <a href="/contact">get in touch</a> for honest advice on feasibility and approach.</p>
    `.trim(),
  },
  {
    slug: "mobile-app-development-guide",
    title: "Mobile app development in 2026: everything you need to know",
    description:
      "What does a mobile app cost, how long does it take and what are the pitfalls? An honest overview of iOS and Android app development.",
    date: "2026-04-01",
    category: "Mobile Applications",
    readTime: 7,
    body: `
<p>Having a mobile app built is a big step for many entrepreneurs. The questions are always the same: what does it cost, how long does it take, should I choose iOS or Android, and how do I know if my idea works?</p>

<p>In this article I give an honest overview — no sales pitch, but the reality of app development in 2026.</p>

<h2>iOS, Android or both?</h2>

<p>This is the first question you need to answer. The options:</p>

<p><strong>Native (iOS + Android separately)</strong><br>
Two separate codebases, maximum performance and platform-specific capabilities. More expensive and slower to build, but the best user experience.</p>

<p><strong>Cross-platform (React Native / Expo)</strong><br>
One codebase, runs on both iOS and Android. Costs 30–50% lower than native, quality excellent for most use cases. This is my default approach for new apps.</p>

<p><strong>Progressive Web App (PWA)</strong><br>
No app store needed — the website behaves like an app. Limited hardware access, but a smart choice for certain use cases.</p>

<p>For most B2B and business apps, <strong>React Native via Expo</strong> is the wisest choice: one codebase, lower costs, sufficient performance.</p>

<h2>What does a mobile app cost?</h2>

<p>Honestly: good apps aren't cheap. Here are realistic numbers:</p>

<ul>
  <li><strong>Simple app (MVP, 6–10 screens)</strong>: €15,000 – €35,000</li>
  <li><strong>Mid-sized app with backend and authentication</strong>: €35,000 – €80,000</li>
  <li><strong>Complex app with matching, payments or real-time features</strong>: €80,000+</li>
</ul>

<p>Offers under €10,000 for a "complete app" are almost always a template with your logo on it, or low-quality work that costs you dearly later.</p>

<h2>How long does it take?</h2>

<p>A realistic timeline:</p>

<ul>
  <li><strong>Discovery and design (2–4 weeks)</strong>: User flows, wireframes, technical architecture</li>
  <li><strong>MVP build (6–16 weeks)</strong>: Core functionality live</li>
  <li><strong>Testing and app store review (1–3 weeks)</strong>: Apple can take up to 2 weeks</li>
  <li><strong>Total</strong>: 3–6 months for a solid MVP</li>
</ul>

<h2>What makes a good app?</h2>

<p>Most apps don't fail because of bad code, but because of bad product decisions. What I always recommend:</p>

<ol>
  <li><strong>Start with an MVP</strong> — Build the <a href="/blog/mvp-vs-full-product-when-to-stop-building">smallest version that solves the core problem</a>. Validate with real users before building further.</li>
  <li><strong>Focus on one thing</strong> — The best apps do one thing exceptionally well.</li>
  <li><strong>Performance isn't a luxury</strong> — An app that responds slower than 300ms loses users. Performance must be baked in, not added later.</li>
  <li><strong>App Store Optimization (ASO)</strong> — Visibility in the App Store is the biggest growth lever for many apps.</li>
</ol>

<h2>My approach</h2>

<p>For mobile apps I work with React Native and Expo. This gives:</p>

<ul>
  <li>One codebase for iOS and Android</li>
  <li>Native performance for most use cases</li>
  <li>Over-the-air updates (no new App Store review for small updates)</li>
  <li>Access to native hardware (camera, GPS, biometrics, push notifications)</li>
</ul>

<p>An example from my portfolio: <strong><a href="/portfolio/studybuddy">StudyBuddy</a></strong> — a matching app for students to find local study partners based on course, location and availability, with a swipe interface and direct chat upon matching.</p>

<h2>Ready to discuss your app idea?</h2>

<p>Send me a short description of what you want to build, and I'll give you an honest picture of feasibility, <a href="/blog/custom-software-development-cost">costs</a> and timeline — free and no strings attached. See our <a href="/services/mobile-applications">mobile app development service</a> for more.</p>
    `.trim(),
  },
  {
    slug: "ai-integration-business-software",
    title: "Integrating AI into your business software: hype vs. reality",
    description:
      "When is AI in your software actually worthwhile? What does it cost, what does it deliver and how do you avoid wasting money on a chatbot nobody uses?",
    date: "2026-04-13",
    category: "AI & Software",
    readTime: 7,
    body: `
<p>AI is everywhere. Every software vendor slaps an "AI-powered" label on it, every consultancy sells AI trajectories and every LinkedIn post promises that AI will transform your business. But what does integrating AI into your business software actually mean? And when is it worth the investment?</p>

<p>In this article I separate the hype from reality. No buzzwords, just honest answers to the questions I get most often from business owners.</p>

<h2>What do we mean by "integrating AI"?</h2>

<p>AI in business software isn't a robot taking over your company. It's specific functions that make tasks faster, smarter or more accurate. Concrete examples:</p>

<ul>
  <li><strong>Document processing</strong> — Automatically reading and processing invoices, contracts or forms. No more manual data entry.</li>
  <li><strong>Smart search and filtering</strong> — Searching by meaning instead of exact words. "Show all complaints about delivery times" also finds emails that don't contain the word "delivery."</li>
  <li><strong>Predictive analytics</strong> — Which customers are at risk of churning? Which machines need maintenance soon? Recognizing patterns in historical data.</li>
  <li><strong>Text generation and summarization</strong> — Automatically creating summaries of lengthy reports, emails or meeting notes.</li>
  <li><strong>Classification and routing</strong> — Automatically categorizing incoming messages and routing them to the right department.</li>
</ul>

<p>The common denominator: AI takes over a specific, scoped task that previously required manual work or complex rules.</p>

<h2>When is AI actually worthwhile?</h2>

<p>AI is worth it when these conditions are met:</p>

<ol>
  <li><strong>You have sufficient data</strong> — AI learns from examples. Without historical data or input to work with, AI has nothing to build on.</li>
  <li><strong>The task is repetitive but not trivial</strong> — If a simple if/else rule suffices, you don't need AI. AI shines where the rules are too complex or too numerous to program manually.</li>
  <li><strong>Errors are acceptable or checkable</strong> — AI isn't 100% accurate. For tasks where a mistake is catastrophic (medical diagnoses, financial transactions), there must always be a human check.</li>
  <li><strong>The time savings are significant</strong> — If an employee saves 10 seconds per day, the investment isn't profitable. If a team saves 20 hours per week, it's a no-brainer.</li>
</ol>

<h2>When is AI not a good idea?</h2>

<p>I regularly advise <em>against</em> using AI. Situations where you're better off choosing a different solution:</p>

<ul>
  <li><strong>The problem is a process problem, not a technology problem</strong> — If your workflow is broken, AI just makes it go wrong faster. Consider <a href="/blog/business-process-automation-guide">process automation</a> first.</li>
  <li><strong>You want a chatbot "because everyone has one"</strong> — A chatbot that reads your FAQ aloud adds nothing. Invest that budget in a better FAQ page.</li>
  <li><strong>Your data is a mess</strong> — AI on bad data produces bad results. Fix your data housekeeping first.</li>
  <li><strong>The use case is too vague</strong> — "We want to do something with AI" isn't a use case. Start with the problem, not the technology.</li>
</ul>

<h2>How does an AI integration work technically?</h2>

<p>Most AI integrations in business software work via an <a href="/blog/api-integration-connecting-systems">API connection</a> to an AI model. The process:</p>

<ol>
  <li><strong>Data preparation</strong> — Structuring the input so the AI model can work with it. This is often the most work.</li>
  <li><strong>Model selection</strong> — Not every problem requires the largest and most expensive model. For classification a smaller model often suffices; for complex text analysis you need more.</li>
  <li><strong>Prompt engineering or fine-tuning</strong> — Instructing the model for your specific use case. With prompt engineering you provide instructions with each request. With fine-tuning you train the model on your data.</li>
  <li><strong>Integration build</strong> — Building the AI function into your existing software via API calls, with error handling and fallbacks.</li>
  <li><strong>Evaluation and monitoring</strong> — Measuring whether the output is correct and stays correct. AI models can respond differently over time after updates.</li>
</ol>

<h2>What does it cost?</h2>

<p>AI integration has two cost components: the <strong>build cost</strong> and the <strong>operational cost</strong>.</p>

<p><strong>Build cost (one-time):</strong></p>
<ul>
  <li><strong>Simple integration</strong> (document processing, classification): €5,000 – €15,000</li>
  <li><strong>Mid-sized integration</strong> (custom workflows, multiple AI functions): €15,000 – €40,000</li>
  <li><strong>Complex integration</strong> (fine-tuned models, real-time processing): €40,000+</li>
</ul>

<p><strong>Operational cost (ongoing):</strong></p>
<p>AI models cost money per request. Depending on volume and model, costs range from a few euros per month to hundreds of euros with intensive use. This is an important difference from traditional software: costs scale with usage.</p>

<h2>The pitfalls</h2>

<p><strong>1. Starting too big</strong><br>
Start with one scoped use case, prove the value and then expand. A company-wide "AI transformation" almost always fails.</p>

<p><strong>2. Not building in human oversight</strong><br>
AI makes mistakes. Always. Build a feedback loop so users can correct errors and the system learns.</p>

<p><strong>3. Ignoring privacy and compliance</strong><br>
Sending business data to an external AI model has privacy implications. Make sure you know where your data goes and whether that complies with GDPR and your data processing agreements.</p>

<p><strong>4. Vendor lock-in</strong><br>
Build your integration so you can switch AI providers. The market moves fast — today's best model isn't necessarily next year's best model.</p>

<h2>My approach</h2>

<p>At Zoyare I build AI integrations that fit the scale and budget of SMBs. That means:</p>

<ul>
  <li>Starting with a concrete use case, not with technology</li>
  <li>Transparent costs: what does it cost to build and what does it cost to run?</li>
  <li>No vendor lock-in: abstraction layer so you can switch models</li>
  <li>Privacy-first: processing data where it's allowed and required</li>
</ul>

<h2>Ready to explore what AI can do for your software?</h2>

<p>Describe your use case — which process you want to make smarter, which data you have available and what the desired outcome is. Then I'll give you honest advice: AI or a different solution.</p>
    `.trim(),
  },
  {
    slug: "technical-debt-hidden-cost",
    title: "Technical debt: the hidden cost that's slowing your business down",
    description:
      "What is technical debt, how does it accumulate, and when should you pay it off? A practical guide for business owners and decision-makers.",
    date: "2026-04-20",
    category: "Software Development",
    readTime: 7,
    body: `
<p>Your software works. Orders come in, invoices go out, the dashboard loads. But every new feature takes longer than the last one. Bug fixes break other things. Your developer says "we need to refactor" but can't explain why that matters to the business. Sound familiar?</p>

<p>You're dealing with technical debt — and it's costing you more than you think.</p>

<h2>What is technical debt?</h2>

<p>Technical debt is the gap between how your software is built and how it should be built. It accumulates when shortcuts are taken — sometimes deliberately to hit a deadline, sometimes accidentally because the requirements changed after the foundation was laid.</p>

<p>Think of it like building maintenance. Skip a year of upkeep and nothing happens. Skip five years and you're looking at a major renovation. Software works the same way.</p>

<p>Common forms of technical debt:</p>

<ul>
  <li><strong>Outdated dependencies</strong> — Libraries and frameworks that haven't been updated in years. Security vulnerabilities pile up, and eventually you can't upgrade without rewriting large parts.</li>
  <li><strong>No automated tests</strong> — Every change is a gamble. Developers are afraid to touch existing code because they can't verify nothing breaks.</li>
  <li><strong>Copy-paste architecture</strong> — The same logic duplicated in twelve places. Fix a bug in one spot, forget the other eleven.</li>
  <li><strong>Hardcoded business rules</strong> — Pricing logic buried in the code instead of a configuration layer. Changing a discount percentage requires a developer and a deployment.</li>
  <li><strong>No documentation</strong> — The original developer left, and nobody knows why certain decisions were made.</li>
</ul>

<h2>How does technical debt impact your business?</h2>

<p>Technical debt doesn't crash your software overnight. It slowly drains your velocity and budget:</p>

<p><strong>Features take longer</strong><br>
What should take a week takes three. Your developer isn't slow — they're navigating a codebase where every change has unexpected side effects. This is also one of the main reasons <a href="/blog/why-software-projects-fail">software projects fail</a>.</p>

<p><strong>Bugs multiply</strong><br>
Fix one thing, break another. Without tests and clean architecture, bug fixes create new bugs. Your team spends more time firefighting than building.</p>

<p><strong>Onboarding is painful</strong><br>
New developers need months to become productive. The codebase is too complex, undocumented and full of implicit knowledge that only exists in someone's head.</p>

<p><strong>You can't respond to the market</strong><br>
A competitor launches a feature in two weeks. Your team estimates four months. Not because the feature is complex, but because the foundation can't support it without major rework.</p>

<p><strong>Security risks accumulate</strong><br>
Outdated dependencies contain known vulnerabilities. The longer you wait, the harder and riskier the upgrade becomes.</p>

<h2>When should you pay it off?</h2>

<p>Not all technical debt needs to be fixed immediately. Some debt is strategic — you shipped fast to validate an idea, and that was the right call. The question is: <strong>is the debt slowing you down now?</strong></p>

<p>Signs it's time to act:</p>

<ul>
  <li>Feature delivery has slowed by 50% or more compared to a year ago</li>
  <li>Your team spends more than 30% of their time on bug fixes and maintenance</li>
  <li>You've lost or can't hire developers because the codebase is too painful to work in</li>
  <li>A security audit flagged critical vulnerabilities in your dependencies</li>
  <li>You're planning a major new feature or scaling up, and the current architecture can't support it</li>
</ul>

<h2>How to approach a debt payoff</h2>

<p>The biggest mistake: a "big rewrite." Throwing everything away and starting from scratch sounds appealing but almost always fails. You lose battle-tested edge case handling, the rewrite takes twice as long as estimated and your business stands still during the process.</p>

<p>What works instead:</p>

<ol>
  <li><strong>Audit first</strong> — Have the codebase reviewed by someone who hasn't been staring at it for years. An external perspective identifies the highest-impact debt.</li>
  <li><strong>Prioritize by business impact</strong> — Which debt is actually slowing you down? Fix that first. Not every imperfect piece of code needs attention.</li>
  <li><strong>Incremental refactoring</strong> — Improve the code piece by piece alongside regular feature work. Every sprint includes some debt reduction.</li>
  <li><strong>Add tests before changing code</strong> — Before refactoring a module, write tests for its current behavior. Now you can change it with confidence.</li>
  <li><strong>Update dependencies regularly</strong> — Small, frequent updates are safer than one massive upgrade after three years of neglect.</li>
</ol>

<h2>What does it cost?</h2>

<p>A codebase audit typically costs €2,000–€5,000 and gives you a prioritized list of issues with estimated effort. Actual refactoring depends on the scope:</p>

<ul>
  <li><strong>Targeted cleanup (tests, dependency updates, critical fixes)</strong>: €5,000 – €15,000</li>
  <li><strong>Architectural improvements (API layer, database optimization)</strong>: €15,000 – €40,000</li>
  <li><strong>Major modernization (framework migration, full test coverage)</strong>: €40,000+</li>
</ul>

<p>Compare this to the cost of doing nothing: slower delivery, more bugs, higher developer turnover, security incidents. The math usually favors acting sooner rather than later.</p>

<h2>Prevention is cheaper than cure</h2>

<p>The cheapest technical debt is the debt you never take on. Three practices that keep debt from accumulating:</p>

<ul>
  <li><strong>Code reviews</strong> — A second pair of eyes catches shortcuts before they ship.</li>
  <li><strong>Automated testing</strong> — Tests from day one. Not 100% coverage, but enough to catch regressions.</li>
  <li><strong>Regular maintenance sprints</strong> — Dedicate 10–20% of every sprint to dependency updates, small refactors and documentation. It's not glamorous, but it keeps the codebase healthy.</li>
</ul>

<h2>Not sure where you stand?</h2>

<p>I offer codebase audits for businesses that suspect their software is carrying more debt than they'd like. You get a clear, prioritized report — no jargon, no upselling, just an honest assessment of what needs attention and what can wait. <a href="/contact">Reach out</a> and let's take a look. Want to understand <a href="/blog/custom-software-development-cost">what custom software costs</a> in general? Start there.</p>
    `.trim(),
  },
];

// Existing posts and generated posts are all in English; tag accordingly so
// /blog (EN) and /nl/blog (NL) can filter on `lang`. NL translations of these
// can be added later with `lang: "nl"`.
const allPosts: Post[] = [
  ...posts.map((p) => ({ lang: "en" as const, ...p })),
  ...(generatedPosts as Post[]).map((p) => ({ lang: "en" as const, ...p })),
];

export function getPost(slug: string): Post | undefined {
  return allPosts.find((p) => p.slug === slug);
}

export function getAllPosts(): Post[] {
  return [...allPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
