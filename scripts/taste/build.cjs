/* Builds the Taste-variant inner pages into public/p/*.html.
   Run from the repo root: node scripts/taste/build.cjs
   Each page is served on its real URL through the rewrites in next.config.js. */
const fs = require("fs");
const path = require("path");
const { ui, lanes, hub, hero, split, band, faq, page, ld, KIT_CSS, FONT_CSS } = require("./lib.cjs");

const FACTS = [["Intake call", "30 minutes, free"], ["Quote", "Fixed, in 48 hours"], ["Code", "Yours at handover"]];
const COUNT = (third) => [["30", "minutes for the free intake call"], ["48", "hours until the fixed quote"], third];
const APPROVAL = {
  layout: "free", alt: "A request from the agent goes to a person and is approved before it runs; the rejected branch stays unused.",
  nodes: [
    { id: "req", label: "Agent", icon: "ui:bot", at: [0.17, 0.5], atCompact: [0.5, 0.14] },
    { id: "mgr", label: "Person", icon: "ui:user", at: [0.47, 0.5], atCompact: [0.5, 0.42] },
    { id: "ok", label: "Approved", icon: "ui:check", done: true, at: [0.8, 0.29], atCompact: [0.27, 0.74] },
    { id: "no", label: "Rejected", icon: "ui:x", at: [0.8, 0.71], atCompact: [0.73, 0.74] },
  ],
  edges: [{ from: "req", to: "mgr" }, { from: "mgr", to: "ok", curve: "elbow" }, { from: "mgr", to: "no", curve: "elbow", idle: true }],
};
const PILOT_HUB = hub("During a pilot the agent reads data, writes drafts and a log, and a person approves or switches it off.", ["Agent", "ui:bot"], [["Read-only", "ui:search"], ["Drafts", "ui:pen-line"], ["Log", "ui:file-text"], ["Approval", "ui:check"], ["Team", "ui:users"], ["Off switch", "ui:x"]]);
const INTAKE = { alt: "An example checklist to prepare the intake call, one of three steps done.", visual: ui.checklist("Before the intake call", ["Name the workflow", "List the systems it touches", "Pick who approves"], 1) };
const PILOT = [
  { name: "Pick one workflow", text: "The intake call finds the repeat job that costs the most hours." },
  { name: "Connect read-only", text: "The agent reads your data first and changes nothing." },
  { name: "Run beside the team", text: "It drafts, your people send. Every draft is logged." },
  { name: "Switch on step by step", text: "Each action goes live when you approve it." },
];
const Q = {
  decide: { q: "What can an agent decide by itself?", a: "Only what you approve up front. Refunds, prices and exceptions wait for a person, and every action is logged." },
  runs: { q: "Who runs the agents after launch?", a: "Your choice. Zoyare can run and monitor them for you, or hand them to your own team with a runbook." },
  data: { q: "Where is our data stored?", a: "On EU hosting, under a Dutch contract. Access is agreed per source before anything is connected." },
  tools: { q: "Can agents connect to the tools we use?", a: "Yes, when the tool has an API or an export. The quote lists every connection, so you know what is in scope." },
  fast: { q: "How fast can the first agent go live?", a: "A small automation is live in 2 to 6 weeks after the quote is signed. The timeline is fixed in the quote." },
  cost: { q: "What does an agent cost?", a: "A first agent is priced like a small automation, 5K to 20K euro to build. Running and monitoring it afterwards is a separate line in the quote." },
  model: { q: "Which AI model does the agent use?", a: "The model is picked per job and named in the quote, together with the data terms of its provider." },
  own: { q: "Who owns the code and the workflows?", a: "You do. At handover you get the code, the documentation and the runbooks, and any developer can continue with them." },
};

/* ------------------------------------------------------------------ services */
const services = [
  {
    slug: "ai-agents", name: "AI agents", nav: "AI agents",
    title: "AI agents for repeat work in Dutch companies | Zoyare",
    description: "Zoyare builds and runs AI agents that handle orders, leads, documents and reports for Dutch companies of 50 to 500 people. People approve anything about money.",
    h1: "AI agents for the repeat work in Dutch companies",
    lead: "Zoyare builds agents that read the request, look up the record and update your systems. Anything about money waits for a person.",
    diagram: lanes("A new order goes to an agent, which reserves stock, prints the label and sends the invoice in parallel.", ["Order", "ui:package"], ["Agent", "ui:bot"], [["Stock", "ui:database", "Reserved"], ["Label", "ui:truck", "Printed"], ["Invoice", "ui:receipt", "Sent"]]),
    scope: {
      h2: 'Five jobs an agent takes over. <span class="muted">Each one runs in the systems you already have.</span>',
      rows: [
        { name: "Order handling", text: "Payment matched, stock reserved, customer told the day." },
        { name: "Lead routing", text: "New leads are read, scored and placed with the right person." },
        { name: "Document intake", text: "Invoices and forms are read and filed in your system." },
        { name: "Weekly reports", text: "Figures are collected and sent without anyone copying data." },
        { name: "Staff questions", text: "Answers come from your own manuals and policies." },
      ],
      alt: "An example order checklist with three of five steps done by the agent.",
      visual: ui.checklist("Example order", ["Match the payment", "Reserve the stock", "Print the shipping label", "Tell the customer the day", "Send the invoice"], 3),
      counters: COUNT(["2", "weeks at the least until a first agent runs"]),
    },
    mid: {
      id: "control", h2: 'What stays with a person. <span class="muted">You set the line, the agent keeps to it.</span>',
      rows: [
        { name: "Money", text: "Refunds, prices and payments always ask a person first." },
        { name: "Exceptions", text: "A case the agent has not seen goes to your team with a summary." },
        { name: "The log", text: "Every action is written down with its source." },
        { name: "The switch", text: "Any action can be turned off the same minute." },
      ],
      alt: "A list of what the agent may do by itself and what waits for a person.",
      visual: ui.toggles("What the agent may do", [["Answer order questions", "From your own order data", 1], ["Change a delivery day", "Before the order ships", 1], ["Refund a customer", "Always asks a person first", 0], ["Send invoice copies", "To contacts on the account", 1], ["Change a price", "Never without approval", 0]]),
    },
    band: { id: "pilot", h2: "A first agent starts as a pilot on one workflow", lead: "Zoyare has no agent case studies to show yet, so a first project is a small pilot with a fixed price and a clear stop.", rows: PILOT, ordered: true, diagram: PILOT_HUB },
    faq: [Q.decide, Q.cost, Q.fast, Q.tools, Q.model, Q.data],
  },
  {
    slug: "ai-customer-support", name: "AI customer support", nav: "Customer support",
    title: "AI customer support agent for Dutch companies | Zoyare",
    description: "A customer support agent that answers from your own order, invoice and product data and hands hard cases to a person. Built and run by Zoyare, a Dutch studio.",
    h1: "A customer support agent that answers from your own data",
    lead: "The agent reads the question, looks up the order or invoice and writes the reply. Hard cases go to your team with a summary.",
    diagram: lanes("A customer question goes to an agent, which looks up the order, sends an answer or hands the case to a person.", ["Question", "ui:message-square"], ["Agent", "ui:bot"], [["Order", "ui:package", "Found"], ["Answer", "ui:mail-check", "Sent"], ["Person", "ui:user", "Asked"]]),
    scope: {
      h2: 'Four kinds of questions it answers. <span class="muted">The rest goes to a person.</span>',
      rows: [
        { name: "Orders and delivery", text: "Where the order is and when it arrives, from the carrier status." },
        { name: "Invoices and accounts", text: "Invoice copies, new addresses and added users." },
        { name: "Product questions", text: "Answers from your help pages and product data." },
        { name: "Handover", text: "A person gets the case with the history and a draft reply." },
      ],
      alt: "Example notifications: the agent hands a refund request to a person and reports solved conversations.",
      visual: ui.notify([["agent", "Agent handed you a conversation", "now", "A customer asks for a refund over the limit", "Open"], [["TM", 5], "A team member took over", "4m", "Wrong pallet delivered, photo attached"], ["done", "Conversations solved this hour", "12m", "Order and invoice questions, none reopened"]]),
      counters: COUNT(["24", "hours a day the agent answers"]),
    },
    mid: {
      id: "control", h2: 'Rules the support agent keeps. <span class="muted">Set once, changed when you say so.</span>',
      rows: [
        { name: "Your tone", text: "Replies follow your own saved answers and style guide." },
        { name: "Your sources", text: "It answers only from data you connected, and names the source." },
        { name: "Your limits", text: "Refunds and exceptions wait for a person." },
        { name: "Your inbox", text: "It works in the mail or ticket tool your team uses now." },
      ],
      alt: "A list of what the support agent may do by itself.",
      visual: ui.toggles("Support agent rules", [["Answer delivery questions", "From the carrier status", 1], ["Send invoice copies", "To contacts on the account", 1], ["Approve a refund", "Always asks a person first", 0], ["Change an address", "Before the order ships", 1], ["Promise a discount", "Never without approval", 0]]),
    },
    band: { id: "pilot", h2: "The support agent starts on one queue, beside your team", lead: "There is no support case study on this site yet. A first project is a pilot on one queue, with a fixed price and a clear stop.", rows: PILOT, ordered: true, diagram: PILOT_HUB },
    faq: [Q.decide, Q.tools, { q: "Does the customer know it is an agent?", a: "Yes. The agent says what it is, and a customer can ask for a person at any point." }, Q.fast, Q.cost, Q.data],
  },
  {
    slug: "creative-production", name: "Ad and video production", nav: "Ads and video",
    title: "Ad and video production with AI for Dutch brands | Zoyare",
    description: "One brief becomes on-brand static ads, video cut-downs and captions, each checked by a person before it goes out. A production workflow built and run by Zoyare.",
    h1: "Ad and video production from one brief",
    lead: "Zoyare builds the workflow that turns a brief and your brand guide into static ads, video cuts and captions. A person approves every piece.",
    diagram: lanes("One brief goes to an agent, which makes static ads, video cuts and captions in parallel.", ["Brief", "ui:file-text"], ["Agent", "ui:bot"], [["Statics", "ui:layers", "Made"], ["Video", "ui:film", "Cut"], ["Captions", "ui:captions", "Written"]]),
    scope: {
      h2: 'Five outputs from one brief. <span class="muted">All of them follow your brand guide.</span>',
      rows: [
        { name: "Static ads", text: "Each concept in the sizes your ad platforms ask for." },
        { name: "Video cut-downs", text: "Long footage becomes short cuts for stories and feeds." },
        { name: "Captions and copy", text: "Headlines and captions in variants to test." },
        { name: "Creator campaigns", text: "Briefs, approvals and results for creators in one view." },
        { name: "Approval round", text: "Nothing is published until a person signs it off." },
      ],
      alt: "An example chat in which a creative agent reports a finished set of ads that waits for approval.",
      visual: ui.chat("Creative agent", "Make the spring sale ads from this brief.", "Ready: <b>the statics in two sizes</b> and the story cuts with captions. They wait for your approval.", "Brand guide"),
      counters: COUNT(["1", "brief for every size and format"]),
    },
    mid: {
      id: "control", h2: 'Checks before anything goes out. <span class="muted">The brand stays yours.</span>',
      rows: [
        { name: "Brand guide", text: "Colours, type and tone are checked on every piece." },
        { name: "Claims", text: "Prices and promises are compared with your product data." },
        { name: "Rights", text: "Only footage and images you own or licensed are used." },
        { name: "Sign-off", text: "A named person approves each set before export." },
      ],
      alt: "An example approval checklist for one set of ads with three of five steps done.",
      visual: ui.checklist("Example ad set", ["Check against the brand guide", "Compare prices with the shop", "Make the two sizes", "Wait for sign-off", "Export to the ad account"], 3),
    },
    band: { id: "pilot", h2: "Production starts with one campaign as a pilot", lead: "There is no production case study on this site yet. A first project is one campaign, with a fixed price and a clear stop.", rows: [
      { name: "Pick one campaign", text: "A brief you would run anyway, so the result can be compared." },
      { name: "Load the brand guide", text: "Fonts, colours, tone and examples of past work." },
      { name: "Review the first set", text: "Your team marks what is off, and the workflow is adjusted." },
      { name: "Run it each month", text: "Zoyare runs the workflow, or hands it to your team." },
    ], ordered: true, diagram: PILOT_HUB },
    faq: [{ q: "Who checks the ads before they go live?", a: "A person on your side, every time. The workflow prepares the set and stops until it is approved." }, { q: "Which tools make the images and video?", a: "The tools are picked per job and named in the quote, together with their licence and data terms." }, { q: "Do we own what is made?", a: "Yes. Every file, the prompts and the workflow are handed over to you." }, Q.cost, Q.fast, Q.data],
  },
  {
    slug: "growth-reporting", name: "Growth reporting", nav: "Growth reports",
    title: "Growth reports and dashboards from your own data | Zoyare",
    description: "Orders, payments, ad spend and support data in one place, with one weekly report and a dashboard your team reads. Built by Zoyare for Dutch companies.",
    h1: "Growth reports and dashboards from your own data",
    lead: "Zoyare connects your shop, payments, ad accounts and support tool, and sends one report your team reads. The figures are yours, in your own database.",
    diagram: hub("One report reads orders, payments, ad spend, support, customers and stock.", ["Report", "ui:chart-column"], [["Orders", "ui:package"], ["Payments", "ui:credit-card"], ["Ad spend", "ui:banknote"], ["Support", "ui:message-square"], ["Customers", "ui:users"], ["Stock", "ui:database"]]),
    scope: {
      h2: 'Five things you get. <span class="muted">One set of figures everyone trusts.</span>',
      rows: [
        { name: "One database", text: "Every source lands in one place, on EU hosting." },
        { name: "Weekly report", text: "The same figures each Monday, written in plain words." },
        { name: "Spend against revenue", text: "Ad spend beside the orders it brought in." },
        { name: "Alerts", text: "A message when a figure leaves the range you set." },
        { name: "Dashboard", text: "A live view for the team, with no licence per user." },
      ],
      alt: "An example chart of orders over the last fourteen days.",
      visual: ui.stat("Orders this week, example", 374, 412, "vs. the week before"),
      counters: COUNT(["1", "set of figures for every team"]),
    },
    mid: {
      id: "sources", h2: 'Sources the report reads. <span class="muted">Each one is agreed before it is connected.</span>',
      rows: [
        { name: "Shop and orders", text: "Orders, returns and stock from your shop or ERP." },
        { name: "Payments", text: "Paid, open and refunded amounts from your payment provider." },
        { name: "Ad accounts", text: "Spend and results per campaign." },
        { name: "Support", text: "Volume, topics and time to answer." },
      ],
      alt: "An example search across reports for the phrase revenue march.",
      visual: ui.search("revenue march", "Reports", [["<b>Revenue</b> per channel, <b>March</b>", "Report"], ["Ad spend against <b>revenue</b>", "Sheet"], ["<b>March</b> returns by product", "Report"]]),
    },
    band: { id: "pilot", h2: "Reporting starts with two sources and one report", lead: "There is no reporting case study on this site yet. A first project connects two sources, with a fixed price and a clear stop.", rows: [
      { name: "Pick the questions", text: "The five figures your team argues about most." },
      { name: "Connect two sources", text: "Read-only access, agreed per source." },
      { name: "Check the figures", text: "The report is compared with your own books for a month." },
      { name: "Add the next source", text: "Each new source is a small, quoted step." },
    ], ordered: true, diagram: hub("One database is read by the report, the dashboard, alerts and exports.", ["Data", "ui:database"], [["Report", "ui:file-text"], ["Dashboard", "ui:monitor"], ["Alerts", "ui:bell-ring"], ["Export", "ui:download"], ["Search", "ui:search"], ["Team", "ui:users"]]) },
    faq: [{ q: "Do we need a data team for this?", a: "No. Zoyare builds and runs the pipeline, and the report arrives as a message your team can read." }, { q: "Can we keep our current dashboard tool?", a: "Yes. The data lands in a database any dashboard tool can read." }, Q.tools, Q.own, Q.fast, Q.data],
  },
  {
    slug: "process-automation", name: "Business process automation", nav: "Process automation",
    title: "Business process automation for Dutch companies | Zoyare",
    description: "Business process automation for companies in the Netherlands and Benelux: invoicing, reports, data processing and approval flows, built around the process you already run.",
    h1: "Process automation for Dutch business workflows",
    lead: "Zoyare automates the manual work your team repeats every week: invoicing, reports, data entry between systems. Built around the tools you already use.",
    diagram: lanes("A timesheet file goes into the tool, which checks it, makes the invoice as a PDF and sends it.", ["Timesheet", "ui:file-text"], ["Tool", "ui:cpu"], [["Check", "ui:list-checks", "Passed"], ["Invoice", "ui:receipt", "Made"], ["Mail", "ui:mail-check", "Sent"]]),
    scope: {
      h2: 'Six kinds of manual work to automate. <span class="muted">Rule-based and repeated every week.</span>',
      rows: [
        { name: "Invoicing and administration", text: "From timesheets to sent PDF invoices, with no manual step." },
        { name: "Report generation", text: "Reports built from data in several sources." },
        { name: "Data processing", text: "CSV imports, transformations and exports to other systems." },
        { name: "Notifications and alerts", text: "Messages sent on thresholds or events." },
        { name: "Documents and approvals", text: "Templates, bulk generation and digital approval flows." },
      ],
      alt: "An example checklist of an invoice run with three of five steps done.",
      visual: ui.checklist("Example invoice run", ["Read the timesheet file", "Check hours and rates", "Calculate the invoices", "Make the PDFs", "Send them to the clients"], 3),
      counters: COUNT(["2", "weeks at the least for a single workflow"]),
    },
    mid: {
      id: "pricing", h2: 'What process automation costs. <span class="muted">Fixed quote after the intake.</span>',
      rows: [
        { name: "Single workflow", value: "€5k to €20k", text: "One manual process, automated. 2 to 6 weeks." },
        { name: "Connected processes", value: "€20k to €75k", text: "Several workflows and systems. 2 to 4 months." },
        { name: "Organization-wide", value: "€75k+", text: "Many teams and processes. 4 to 12 months." },
      ],
      link: ["Get a price indication for your process", "/estimate?service=automation"],
      alt: "A list of settings the client changes without a developer.",
      visual: ui.toggles("Settings you change yourself", [["Hourly rates", "Per freelancer or client", 1], ["Invoice template", "Logo, text and layout", 1], ["Recipients", "Who gets which invoice", 1], ["Send without review", "Off until you trust the run", 0]]),
    },
    band: {
      id: "case", h2: "Freelancer invoicing automation for ProAspect",
      lead: "An accounting firm processed weekly timesheets from dozens of freelancers by hand. The tool now reads the CSV, validates it, calculates the invoices, makes the PDFs and sends them.",
      quote: { text: "What used to take us hours every week is now fully automated. Zero errors, zero manual work. The ROI was immediate.", name: "Managing Director", company: "ProAspect" },
      link: ["View the ProAspect case", "/portfolio/proaspect"],
      diagram: hub("One invoicing tool reads timesheets and rates and produces invoices, PDFs and mail.", ["Tool", "ui:cpu"], [["Timesheets", "ui:file-text"], ["Rates", "ui:banknote"], ["Clients", "ui:users"], ["Invoices", "ui:receipt"], ["PDF", "ui:file-check"], ["Mail", "ui:mail-check"]]),
    },
    faq: [
      { q: "Which processes are worth automating?", a: "Repetitive, rule-based work that takes hours every week: invoicing, reports, data entry between systems, documents. If it follows the same steps each time, automation usually pays for itself quickly." },
      { q: "Will it work with the tools we already use?", a: "Yes. Automation is built around Excel, e-mail, your accounting software and your CRM. Your team keeps working the way it knows." },
      { q: "What if our process changes later?", a: "Rates, templates and recipients are settings you change yourself. A bigger change is a small, quoted adjustment." },
      { q: "How quickly does automation pay for itself?", a: "For a weekly manual process, typically within months. ProAspect's invoicing took several hours every week and now runs automatically." },
    ],
  },
  {
    slug: "custom-software", name: "Custom software development", nav: "Custom software",
    title: "Custom software development in the Netherlands | Zoyare",
    description: "Custom software for Dutch companies: internal tools, portals, dashboards and back-ends, from requirement to deployment, on a fixed quote. You own the code.",
    h1: "Custom software for Dutch companies that outgrew their tools",
    lead: "Zoyare builds internal tools, portals and back-end systems that fit your process. From requirement to deployment, with the engineer on the call.",
    diagram: hub("One system serves a portal, a database, an API, reports, users and payments.", ["System", "ui:server"], [["Portal", "ui:monitor"], ["Database", "ui:database"], ["API", "ui:globe"], ["Reports", "ui:chart-column"], ["Users", "ui:users"], ["Payments", "ui:credit-card"]]),
    scope: {
      h2: 'Four steps from problem to software. <span class="muted">You see working software every sprint.</span>',
      rows: [
        { name: "Discovery", text: "The process, the pain points and the outcome, before any code." },
        { name: "Architecture", text: "Database design, API structure and deployment that scale." },
        { name: "Iterative building", text: "Sprints with early feedback and no surprises at delivery." },
        { name: "Delivery", text: "Documented code, tests and a handover any developer can pick up." },
      ],
      ordered: true,
      alt: "An example delivery checklist with three of five steps done.",
      visual: ui.checklist("Example delivery", ["Agree the scope", "Design the database", "Build the first workflow", "Test with your team", "Hand over code and docs"], 3),
      counters: COUNT(["2", "weeks at the least for a small tool"]),
    },
    mid: {
      id: "pricing", h2: 'What custom software costs. <span class="muted">Fixed quote after the intake.</span>',
      rows: [
        { name: "Small automation", value: "€5k to €20k", text: "One focused workflow or tool. 2 to 6 weeks." },
        { name: "Mid-sized system", value: "€20k to €75k", text: "Several workflows, users and roles. 2 to 4 months." },
        { name: "Enterprise platform", value: "€75k+", text: "A complex domain with many integrations. 4 to 12 months." },
      ],
      link: ["Get a price indication for your system", "/estimate?service=custom"],
      alt: "An example search in an internal tool for a planning record.",
      visual: ui.search("shift week 14", "Planning", [["<b>Shift</b> plan, <b>week 14</b>", "Plan"], ["Open <b>shift</b>s in <b>week 14</b>", "List"], ["Hours report, <b>week 14</b>", "Report"]]),
    },
    band: {
      id: "case", h2: "Workforce management back-end for StrateX",
      lead: "A platform that combines scheduling, time tracking and reporting needed a data layer built for growth. Zoyare redesigned the database and built the APIs per domain.",
      quote: { text: "The back-end architecture Zoyare designed scaled exactly as we needed. Clean APIs, solid documentation, and seamless collaboration with our front-end team.", name: "Product Owner", company: "StrateX" },
      link: ["View the StrateX case", "/portfolio/stratex"],
      diagram: hub("One API serves scheduling, employees, reporting, sign-in, the database and deployment.", ["API", "ui:server"], [["Scheduling", "ui:list-checks"], ["Employees", "ui:users"], ["Reporting", "ui:chart-column"], ["Sign-in", "ui:user"], ["Database", "ui:database"], ["Deploy", "ui:container"]]),
    },
    faq: [
      { q: "Who owns the code when the project is done?", a: "You do, always. You get the full source code, documentation and deployment setup, and any competent developer can continue the work." },
      { q: "Can it connect to the tools we already use?", a: "Yes, and it usually should. Links with your accounting package, CRM, e-mail or databases are typically part of the scope." },
      { q: "Custom software or an off-the-shelf package?", a: "If an existing tool covers 80% of what you need, buy it. Build custom when the process is core to how you win business, or when workarounds cost more than software would." },
      { q: "What if Zoyare is unavailable?", a: "Every delivery includes documented code, automated tests and a handover that any developer can pick up." },
    ],
  },
  {
    slug: "api-integrations", name: "API integrations", nav: "API integrations",
    title: "System integrations and API connections for Dutch companies | Zoyare",
    description: "API integrations for Dutch companies: REST APIs, platform connectors and data pipelines that connect systems which do not talk to each other. Simple connections from 2.5K euro.",
    h1: "System integrations for Dutch companies whose tools do not talk",
    lead: "Zoyare connects systems that do not talk to each other: REST APIs, platform connectors and data pipelines. The data arrives once, in the right place.",
    diagram: lanes("A new record in the CRM goes through a connector, which updates the books, the warehouse and the carrier.", ["CRM", "ui:users"], ["Connector", "ui:refresh-cw"], [["Books", "ui:receipt", "Updated"], ["Warehouse", "ui:box", "Updated"], ["Carrier", "ui:truck", "Booked"]]),
    scope: {
      h2: 'Five things every integration includes. <span class="muted">Built to keep working when a system changes.</span>',
      rows: [
        { name: "Reliable connection", text: "Error handling, retries and monitoring for when a system is offline." },
        { name: "Documented code", text: "The data flow, the fields and the transformation logic, written down." },
        { name: "Maintainable layers", text: "When an API changes, the fix is small and isolated." },
        { name: "Minimal permissions", text: "OAuth 2.0 or API keys, with encrypted connections." },
        { name: "Dutch landscape", text: "Exact Online, AFAS, Twinfield, Mollie, PostNL and DHL." },
      ],
      alt: "An example sync checklist with three of five steps done.",
      visual: ui.checklist("Example sync", ["Read the new orders", "Map the fields", "Write to the books", "Book the carrier", "Log the result"], 3),
      counters: COUNT(["1", "week at the least for a simple connection"]),
    },
    mid: {
      id: "pricing", h2: 'What an integration costs. <span class="muted">Fixed quote after the intake.</span>',
      rows: [
        { name: "Simple connection", value: "€2.5k to €8k", text: "Two systems, one direction. 1 to 3 weeks." },
        { name: "Multi-system integration", value: "€8k to €25k", text: "Several systems with transformations. 3 to 8 weeks." },
        { name: "Enterprise or legacy", value: "€25k+", text: "Complex or undocumented systems. 2 to 6 months." },
      ],
      link: ["Get a price indication for your integration", "/estimate?service=api"],
      alt: "Example notifications from a monitored integration.",
      visual: ui.notify([["done", "Nightly sync finished", "now", "All records matched between both systems"], ["agent", "A retry solved a time-out", "2h", "The carrier API answered on the second try"], ["done", "Schema check passed", "1d", "No field changed in the source API"]]),
    },
    band: {
      id: "case", h2: "API integration case: the Siemens BuildingX connector",
      lead: "Siemens needed a production-ready connector that opens the BuildingX IoT platform to Mendix developers. Zoyare built it in Java with layered REST integrations and a sample application.",
      quote: { text: "Zoyare delivered a production-ready connector that met our enterprise quality standards. The technical depth and understanding of our API was impressive.", name: "Engineering Lead", company: "Siemens" },
      link: ["View the Siemens case", "/portfolio/siemens"],
      diagram: hub("One connector links the platform API with authentication, data, devices and a sample app.", ["Connector", "ui:refresh-cw"], [["REST API", "ui:globe"], ["OAuth", "ui:user"], ["Devices", "ui:microchip"], ["Data", "ui:database"], ["Sample app", "ui:monitor"], ["Docs", "ui:file-text"]]),
    },
    faq: [
      { q: "Can you connect systems that have no API?", a: "Often, yes. There is usually another route: database access, file exports, scheduled reports or e-mail parsing. The intake shows what is possible." },
      { q: "What happens when a connected API changes?", a: "Integrations are built in layers, so a change means a small, isolated fix. Monitoring flags issues early, and a maintenance agreement can cover adjustments." },
      { q: "How do you handle data security?", a: "OAuth 2.0 or API keys with minimal permissions, encrypted connections, and no data stored outside your systems unless the design needs it." },
      { q: "How long does an integration take?", a: "A simple one-way connection takes 1 to 3 weeks. Multi-system integrations take 3 to 8 weeks. Legacy systems with limited documentation take longer." },
    ],
  },
  {
    slug: "mobile-applications", name: "Mobile app development", nav: "Mobile applications",
    title: "Mobile app development for iOS and Android | Zoyare",
    description: "Mobile apps for iOS and Android built with React Native and Expo, including the back-end and store publication. MVPs from 15K euro, by a Dutch studio.",
    h1: "Mobile apps for iOS and Android from one codebase",
    lead: "Zoyare builds the app and its back-end with React Native and Expo, and handles the App Store and Play Store. The app is delivered when it is live.",
    diagram: lanes("The app talks to one API, which handles accounts, data and push notifications.", ["App", "ui:smartphone"], ["API", "ui:server"], [["Accounts", "ui:users", "Signed in"], ["Data", "ui:database", "Synced"], ["Push", "ui:bell-ring", "Sent"]]),
    scope: {
      h2: 'Four parts of every app build. <span class="muted">One party responsible for the whole product.</span>',
      rows: [
        { name: "React Native and Expo", text: "One codebase for iOS and Android, with over-the-air updates." },
        { name: "TypeScript", text: "Type-safe code that produces fewer bugs and is easier to maintain." },
        { name: "Back-end of choice", text: "Node.js, Supabase, Firebase or a custom REST API." },
        { name: "Store publication", text: "Certificates, listings and review for both stores." },
      ],
      alt: "An example release checklist for an app with three of five steps done.",
      visual: ui.checklist("Example release", ["Build for iOS and Android", "Test on real devices", "Write the store listings", "Submit for review", "Publish in both stores"], 3),
      counters: COUNT(["6", "weeks at the least for an MVP"]),
    },
    mid: {
      id: "pricing", h2: 'What a mobile app costs. <span class="muted">Fixed quote after the intake.</span>',
      rows: [
        { name: "MVP", value: "€15k to €35k", text: "6 to 10 screens with the core features. 6 to 10 weeks." },
        { name: "Full app and back-end", value: "€35k to €80k", text: "Accounts, data and notifications. 3 to 5 months." },
        { name: "Complex platform", value: "€80k+", text: "Real-time, payments and scale. 5 to 12 months." },
      ],
      link: ["Get a price indication for your app", "/estimate?service=mobile"],
      alt: "Example push notifications from a matching app.",
      visual: ui.notify([[["SB", 3], "New match on your course", "now", "Statistics 2, available on Thursday", "Open"], [["SB", 1], "Message from your study partner", "8m", "Shall we meet at the library at two?"], ["done", "Profile updated", "1h", "Your courses for this term are saved"]]),
    },
    band: {
      id: "case", h2: "Student matching platform StudyBuddy",
      lead: "Students find local study partners by course, location and availability, with a swipe interface and direct chat on a match. Built with React Native, Expo and WebSockets as an owned product.",
      link: ["View the StudyBuddy case", "/portfolio/studybuddy"],
      diagram: hub("One app back-end handles matching, chat, location, courses, accounts and notifications.", ["API", "ui:server"], [["Matching", "ui:users"], ["Chat", "ui:message-square"], ["Location", "ui:map-pin"], ["Courses", "ui:list-checks"], ["Accounts", "ui:user"], ["Push", "ui:bell-ring"]]),
    },
    faq: [
      { q: "Native or cross-platform?", a: "React Native with Expo: one codebase for iOS and Android. If your app needs full native, for heavy 3D or special hardware, you hear that in the intake." },
      { q: "Do you handle store publication?", a: "Yes, the full process: certificates, store listings, review submission and the questions Apple sends back." },
      { q: "Can you build the back-end too?", a: "Yes. Most apps need accounts, data and notifications, and the API is built alongside the app." },
      { q: "What does maintenance cost after launch?", a: "Apps need updates for new OS versions. Most fixes ship over the air without a store review, and the maintenance setup is agreed before launch." },
    ],
  },
];

const PILOT_V = { alt: "Example pilot settings: read-only access, drafts only and a full log are on, sending without review is off.", visual: ui.toggles("Pilot settings", [["Read-only access", "The agent changes nothing", 1], ["Drafts only", "Your people send", 1], ["Log every action", "With its source", 1], ["Send without review", "Off until you approve it", 0]]) };
const BAND_V = {
  "ai-agents": PILOT_V, "ai-customer-support": PILOT_V, "creative-production": PILOT_V,
  "growth-reporting": { alt: "An example checklist of a reporting pilot with two of four steps done.", visual: ui.checklist("Example reporting pilot", ["Pick the five figures", "Connect two sources", "Compare with the books", "Send the first report"], 2) },
  "process-automation": { alt: "Example notifications from an invoice run that finished without manual steps.", visual: ui.notify([["done", "Invoice run finished", "now", "Timesheets read, invoices made and sent"], ["agent", "One timesheet needs a look", "5m", "A rate is missing for a new freelancer", "Open"], ["done", "PDFs archived", "6m", "Stored with the week and the client"]]) },
  "custom-software": { alt: "An example handover checklist with all four parts done.", visual: ui.checklist("Example handover", ["Database schema", "APIs per domain", "API documentation", "Tests and deployment"], 4) },
  "api-integrations": { alt: "An example connector checklist with all four parts done.", visual: ui.checklist("Example connector", ["REST API layer", "OAuth 2.0 sign-in", "Sample application", "Developer documentation"], 4) },
  "mobile-applications": { alt: "An example app checklist with four of five parts done.", visual: ui.checklist("Example app build", ["Matching on course and place", "Swipe interface", "Real-time chat", "Accounts and profiles", "Store launch"], 4) },
};
const servicePage = (s) => page({
  path: `/services/${s.slug}`, title: s.title, description: s.description,
  jsonLd: [ld.faq(s.faq), ld.service(s.name, s.description, `/services/${s.slug}`), ld.crumbs([["Home", "/"], ["Services", "/services"], [s.nav, `/services/${s.slug}`]])],
  sections: [
    hero({ h1: s.h1, lead: s.lead, second: ["See all services", "/services"], facts: FACTS, diagram: s.diagram }),
    split({ id: "scope", ...s.scope, counters: s.scope.rows.length > 4 ? null : s.scope.counters }),
    split({ ...s.mid, counters: s.scope.rows.length > 4 ? s.scope.counters : null }),
    band({ ...s.band, ...BAND_V[s.slug] }),
    faq({ lead: "What buyers ask before the intake call.", items: s.faq, ...INTAKE }),
  ],
});

/* ------------------------------------------------------------------ /services */
const servicesIndex = page({
  path: "/services", title: "Services: AI agents, automation and custom software | Zoyare",
  description: "All Zoyare services: AI agents, customer support, ad and video production, growth reporting, custom software, integrations, mobile apps and process automation.",
  jsonLd: [ld.crumbs([["Home", "/"], ["Services", "/services"]])],
  sections: [
    hero({ h1: "AI agents and software services for Dutch companies", lead: "Eight services from one studio. Four take work off your team with AI, four build the systems underneath. Start with one.", second: ["See the portfolio", "/portfolio"], facts: FACTS,
      diagram: hub("One agent works with mail, orders, documents, reports, customers and payments.", ["Agent", "ui:bot"], [["Mail", "ui:mail-check"], ["Orders", "ui:package"], ["Documents", "ui:file-text"], ["Reports", "ui:chart-column"], ["Customers", "ui:users"], ["Payments", "ui:credit-card"]]) }),
    split({
      id: "ai", h2: 'Four AI services. <span class="muted">Built, and run for you if you want.</span>',
      rows: [
        { name: "AI agents", href: "/services/ai-agents", text: "Orders, leads, documents and reports handled without copying data." },
        { name: "Customer support agent", href: "/services/ai-customer-support", text: "Answers from your own data, hard cases to a person." },
        { name: "Ad and video production", href: "/services/creative-production", text: "One brief becomes static ads, cuts and captions." },
        { name: "Growth reporting", href: "/services/growth-reporting", text: "Every source in one place, one report your team reads." },
      ],
      alt: "A list of what an agent may do by itself and what waits for a person.",
      visual: ui.toggles("What the agent may do", [["Answer order questions", "From your own order data", 1], ["Change a delivery day", "Before the order ships", 1], ["Refund a customer", "Always asks a person first", 0], ["Send invoice copies", "To contacts on the account", 1], ["Change a price", "Never without approval", 0]]),
      counters: COUNT(["8", "services from one studio"]),
    }),
    band({
      id: "builds", h2: "Four build services for systems you own",
      lead: "When a ready-made tool does not fit, Zoyare builds the system in your environment. You keep the code and the runbooks.",
      rows: [
        { name: "Custom software", href: "/services/custom-software", text: "Portals, internal tools and dashboards. From €5k." },
        { name: "API integrations", href: "/services/api-integrations", text: "Systems that do not talk, connected. From €2.5k." },
        { name: "Mobile applications", href: "/services/mobile-applications", text: "iOS and Android from one codebase. From €15k." },
        { name: "Process automation", href: "/services/process-automation", text: "Manual weekly work, automated. From €5k." },
      ],
      alt: "An example delivery checklist with three of five steps done.", visual: ui.checklist("Example delivery", ["Agree the scope", "Design the database", "Build the first workflow", "Test with your team", "Hand over code and docs"], 3), diagram: hub("One back-end serves a portal, an app, a database, payments, reports and connected systems.", ["Back-end", "ui:server"], [["Portal", "ui:monitor"], ["App", "ui:smartphone"], ["Database", "ui:database"], ["Payments", "ui:credit-card"], ["Reports", "ui:chart-column"], ["Systems", "ui:refresh-cw"]]),
    }),
    faq({ ...INTAKE, lead: "What buyers ask before they pick a service.", items: [Q.cost, Q.own, Q.runs, Q.decide, Q.tools, Q.data] }),
  ],
});

/* ------------------------------------------------------------------ /about */
const about = page({
  path: "/about", title: "About Zoyare: a Dutch studio for AI agents and software",
  description: "Zoyare is a Dutch engineering studio, founded in 2024, that builds and runs AI agents, automations and custom software. One engineer on every project.",
  jsonLd: [ld.webPage("About Zoyare", "Zoyare is a Dutch engineering studio that builds and runs AI agents, automations and custom software.", "/about"), ld.crumbs([["Home", "/"], ["About", "/about"]])],
  sections: [
    hero({ h1: "A Dutch engineering studio for AI agents and software", lead: "Zoyare builds and runs agents, automations and back-end systems. One engineer is on every project, from the first call to the handover.", second: ["See the portfolio", "/portfolio"],
      facts: [["Founded", "2024"], ["Registered", "KvK 94498555"], ["Responds", "Within 24 hours"]],
      diagram: hub("One studio covers agents, automation, integrations, back-ends, apps and reports.", ["Zoyare", "ui:cpu"], [["Agents", "ui:bot"], ["Automation", "ui:zap"], ["Integrations", "ui:refresh-cw"], ["Back-ends", "ui:server"], ["Apps", "ui:smartphone"], ["Reports", "ui:chart-column"]]) }),
    split({
      id: "principles", h2: 'Three rules the studio works by. <span class="muted">One engineer, every project.</span>',
      rows: [
        { name: "Problem first", text: "The work starts with what you are solving. No assumptions and no overengineering." },
        { name: "Technical depth", text: "From database schema to API contract, each part is built with care." },
        { name: "Direct contact", text: "No layers of project managers. You talk to the engineer who builds it." },
      ],
      alt: "An example project checklist with three of five steps done.",
      visual: ui.checklist("Example project", ["Intake call", "Fixed quote", "First workflow live", "Test with your team", "Handover or run"], 3),
      counters: [["2024", "the year Zoyare was founded"], ["8", "case studies in the portfolio"], ["24", "hours to a first reply"]],
    }),
    band({
      id: "clients", h2: "Six clients Zoyare has built for",
      lead: "Each one is a case study in the portfolio.",
      rows: [
        { name: "Siemens", href: "/portfolio/siemens", text: "Enterprise IoT integration." },
        { name: "StrateX", href: "/portfolio/stratex", text: "Workforce management back-end." },
        { name: "ProAspect", href: "/portfolio/proaspect", text: "Invoicing automation." },
        { name: "StudyBuddy", href: "/portfolio/studybuddy", text: "Mobile matching platform." },
        { name: "Malole Studio", href: "/portfolio/malole-studio", text: "Booking and iDEAL deposits." },
        { name: "Refaja Zorgt", href: "/portfolio/refaja-zorgt", text: "Local discovery for a care practice." },
      ],
      alt: "Example project notifications: a sprint review and a weekly update.", visual: ui.notify([["done", "Sprint review ready", "now", "The first workflow runs on staging", "Open"], ["agent", "Weekly update sent", "2d", "What was built and what comes next"], ["done", "Handover complete", "1w", "Code, tests and docs in your repository"]]), diagram: hub("The studio's work spans integrations, back-ends, automation, apps, bookings and websites.", ["Builds", "ui:cpu"], [["Integration", "ui:refresh-cw"], ["Back-end", "ui:server"], ["Automation", "ui:zap"], ["App", "ui:smartphone"], ["Bookings", "ui:credit-card"], ["Website", "ui:globe"]]),
    }),
    faq({ ...INTAKE, lead: "What buyers ask about the studio.", items: [
      { q: "Is Zoyare a registered Dutch company?", a: "Yes. Zoyare is registered with the Dutch Chamber of Commerce under KvK number 94498555. Contracts run under Dutch law." },
      { q: "Does one Zoyare engineer do all the work?", a: "Yes, by design. For specific parts such as design or a security audit, selected specialists join, and responsibility stays with Zoyare." },
      { q: "What if Zoyare is unavailable?", a: "Every project ships with documented code, tests and deployment scripts in your own repository, so any developer can take over." },
      { q: "Where does Zoyare work?", a: "Remote first, from the Netherlands. An on-site day in the Randstad or elsewhere in the country is easy to arrange." },
      Q.runs, Q.data,
    ] }),
  ],
});

/* ------------------------------------------------------------------ /faq */
const faqGroups = [
  { id: "agents", h2: "Questions about AI agents", lead: "What an agent may do, and who watches it.", items: [Q.decide, Q.runs, Q.tools, Q.model, Q.fast] },
  { id: "cost", h2: "Questions about cost and timeline", lead: "Ranges come from finished projects; your quote is fixed.", items: [
    { q: "What does custom software cost?", a: "A small automation or tool costs 5,000 to 20,000 euro (2 to 6 weeks). A mid-sized system with integrations 20,000 to 75,000 euro (2 to 4 months). A platform or large app from 75,000 euro." },
    Q.cost,
    { q: "How long does a typical project take?", a: "A simple automation takes 2 to 6 weeks, an integration 2 to 8 weeks, and a mobile app or larger system 3 to 6 months for a solid MVP." },
    { q: "Fixed price or hourly rate?", a: "Both are possible. A clearly scoped project gets a fixed price. Ongoing work or an unclear scope is fairer at an hourly rate, agreed up front." },
    { q: "What is the minimum project size?", a: "There is no strict minimum, but under 3,000 euro custom work is rarely the smart choice. A no-code tool or existing package is then the better fit." },
  ] },
  { id: "process", h2: "Questions about working together", lead: "From the first call to the weekly update.", items: [
    { q: "What does the first conversation look like?", a: "A 30-minute call, free and without a sales pitch. You get advice on whether custom work fits, an approach and a rough price indication." },
    { q: "Does Zoyare work alone or with a team?", a: "One engineer does the work, by design. Selected specialists join for design or a security audit, and responsibility stays with Zoyare." },
    { q: "How does communication work during a project?", a: "Weekly updates, direct access by e-mail or chat, and sprint reviews where you see progress before delivery." },
    { q: "Can you extend or rebuild existing software?", a: "Yes. First comes a review of the code, architecture and documentation, then an assessment: continue building or start fresh." },
  ] },
  { id: "delivery", h2: "Questions about technology and delivery", lead: "What is used, and what you get at the end.", items: [
    { q: "Which technologies do you use?", a: "Node.js, TypeScript and PostgreSQL for back-ends and APIs. React Native with Expo for apps. Java and Mendix for enterprise integrations. Next.js and React for web." },
    { q: "Who manages the software after delivery?", a: "That is agreed up front: you, your internal team, or Zoyare under a maintenance contract. The handover lets any developer continue." },
    { q: "Do I get the source code?", a: "Always. The source code is fully yours, and you never depend on Zoyare for access to your own software." },
    { q: "How do you handle testing and quality?", a: "Automated tests are part of every delivery. You get a staging environment to test on, and bugs that trace back to Zoyare's code get fixed." },
  ] },
  { id: "situations", h2: "Questions about specific situations", lead: "Doubt, confidentiality and procurement.", items: [
    { q: "I am not sure I need custom software. What then?", a: "Book a free call. If a no-code tool or an existing package fits your situation better, you hear that, even when it means no project." },
    { q: "Do you work with NDAs?", a: "Yes. For sensitive projects an NDA is signed before any specifics are discussed." },
    Q.data,
    { q: "Can Zoyare support enterprise procurement?", a: "Yes. There is experience with enterprise procurement, including at Siemens, and the required documentation can be provided." },
  ] },
];
const FAQ_VISUALS = [
  { alt: "A list of what the agent may do by itself and what waits for a person.", visual: ui.toggles("What the agent may do", [["Answer order questions", "From your own order data", 1], ["Refund a customer", "Always asks a person first", 0], ["Send invoice copies", "To contacts on the account", 1]]) },
  { alt: "A checklist of what a fixed quote lists, all four parts done.", visual: ui.checklist("What the quote lists", ["Scope", "Timeline", "Fixed price", "Running costs"], 4) },
  { alt: "Example project notifications: a sprint review and a weekly update.", visual: ui.notify([["done", "Sprint review ready", "now", "The first workflow runs on staging", "Open"], ["agent", "Weekly update sent", "2d", "What was built and what comes next"]]) },
  { alt: "A handover checklist with all four parts done.", visual: ui.checklist("Handover", ["Source code", "Documentation", "Automated tests", "Deployment scripts"], 4) },
  INTAKE,
];
const faqPage = page({
  path: "/faq", title: "Questions about AI agents, cost and delivery | Zoyare",
  description: "Answers about AI agents, pricing, timelines, technologies and collaboration with Zoyare, a Dutch studio for agents, automation and custom software.",
  jsonLd: [ld.faq(faqGroups.flatMap((g) => g.items)), ld.crumbs([["Home", "/"], ["FAQ", "/faq"]])],
  sections: [
    hero({ h1: "Questions buyers ask Zoyare about agents and software", lead: "Answers on agents, cost, working together and delivery. If yours is missing, the intake call is free.", second: ["Contact Zoyare", "/contact"], facts: FACTS,
      diagram: APPROVAL }),
    ...faqGroups.map((g, i) => faq({ ...g, link: ["Ask your own question", "/contact"], ...FAQ_VISUALS[i] })),
  ],
});

/* ------------------------------------------------------------------ /software-development-netherlands */
const nlFaq = [
  { q: "Is Zoyare a registered Dutch company?", a: "Yes, under KvK number 94498555. Contracts run under Dutch law and invoices are in euros with Dutch BTW. Reverse-charge VAT applies for EU clients outside the Netherlands." },
  { q: "Where is our data stored, and is that AVG-compliant?", a: "On EU infrastructure by default, typically the Amsterdam or Frankfurt regions. You get a processing agreement before any personal data is touched." },
  { q: "Do you work on-site or fully remote?", a: "Mostly remote. For discovery sessions, workshops and go-live moments an on-site day in Amsterdam, Rotterdam, Utrecht or The Hague is easy to arrange." },
  { q: "Can you work with our team in Dutch?", a: "Yes. Sessions and daily contact happen in Dutch or English. Code and documentation are written in English so any developer can pick them up." },
  { q: "Why a one-person studio and not an agency?", a: "Rate and directness: you talk to the engineer. The trade-off is capacity. Work that needs five people in parallel fits an agency better, and you hear that in the intake." },
  { q: "What if you become unavailable mid-project?", a: "Code, tests, deployment scripts and a handover file sit in your own repository from day one. Any Dutch developer or agency can take over." },
];
const nl = page({
  path: "/software-development-netherlands", title: "Software development company in the Netherlands | Zoyare",
  description: "A Dutch software development studio for AI agents, automation and custom software. KvK-registered, Dutch law, EU hosting under AVG, on-site in the Randstad.",
  jsonLd: [ld.faq(nlFaq), ld.service("Software development in the Netherlands", "AI agents, automation, integrations and custom software for Dutch companies, under Dutch law and on EU hosting.", "/software-development-netherlands"), ld.crumbs([["Home", "/"], ["Software development in the Netherlands", "/software-development-netherlands"]])],
  sections: [
    hero({ h1: "A software development company in the Netherlands", lead: "Zoyare builds AI agents, automations and custom software for Dutch companies. KvK-registered, under Dutch law, on EU hosting.", second: ["See all services", "/services"],
      facts: [["Registered", "KvK 94498555"], ["Contract", "Dutch law, in euros"], ["Hosting", "EU, under AVG"]],
      diagram: lanes("An order goes through a connector, which updates the books, the payment and the carrier.", ["Order", "ui:package"], ["Connector", "ui:refresh-cw"], [["Books", "ui:receipt", "Updated"], ["Payment", "ui:credit-card", "Matched"], ["Carrier", "ui:truck", "Booked"]]) }),
    split({
      id: "projects", h2: 'Four first projects Dutch companies ask for. <span class="muted">Most start with one of these.</span>',
      rows: [
        { name: "The Dutch software landscape", text: "Exact Online, AFAS, Twinfield, Mollie, PostNL, DHL and Peppol e-invoicing." },
        { name: "The spreadsheet that runs the company", text: "The Excel file three people are afraid to touch becomes real software." },
        { name: "AVG-proof portals", text: "Personal data stays in the EU, with a processing agreement and a retention policy." },
        { name: "The manual hand-off", text: "Order to invoice, CRM to bookkeeping, warehouse to carrier." },
      ],
      alt: "An example checklist of an order hand-off with three of five steps done.",
      visual: ui.checklist("Example hand-off", ["Read the order", "Create the invoice", "Book it in the accounts", "Book the carrier", "Mail the track and trace"], 3),
      counters: COUNT(["4", "Randstad cities for an on-site day"]),
    }),
    split({
      id: "pricing", h2: 'What a project costs in the Netherlands. <span class="muted">A written quote with scope, price and date.</span>',
      rows: [
        { name: "Automation or integration", value: "€5k to €20k", text: "One workflow or connection. 2 to 6 weeks." },
        { name: "Mid-sized business system", value: "€20k to €75k", text: "Several workflows and roles. 2 to 4 months." },
        { name: "Platform build", value: "€75k+", text: "A complex domain. 4 to 12 months." },
      ],
      link: ["Get a price indication", "/estimate"],
      alt: "A list of terms that are fixed for every Dutch client.",
      visual: ui.toggles("Fixed for every client", [["Contract under Dutch law", "Invoices in euros with BTW", 1], ["EU hosting", "Amsterdam or Frankfurt", 1], ["Processing agreement", "Before personal data is touched", 1], ["Mandatory support contract", "Support is optional", 0]]),
    }),
    band({
      id: "case", h2: "Invoicing automation for the Dutch firm ProAspect",
      lead: "An accounting firm processed weekly freelancer timesheets by hand. The tool now runs the whole flow from CSV to sent invoice.",
      quote: { text: "What used to take us hours every week is now fully automated. Zero errors, zero manual work. The ROI was immediate.", name: "Managing Director", company: "ProAspect" },
      alt: "Example notifications from an invoice run that finished without manual steps.", visual: ui.notify([["done", "Invoice run finished", "now", "Timesheets read, invoices made and sent"], ["done", "PDFs archived", "6m", "Stored with the week and the client"]]),
      link: ["View the ProAspect case", "/portfolio/proaspect"],
      diagram: hub("One invoicing tool reads timesheets and rates and produces invoices, PDFs and mail.", ["Tool", "ui:cpu"], [["Timesheets", "ui:file-text"], ["Rates", "ui:banknote"], ["Clients", "ui:users"], ["Invoices", "ui:receipt"], ["PDF", "ui:file-check"], ["Mail", "ui:mail-check"]]),
    }),
    faq({ ...INTAKE, lead: "What Dutch buyers ask before the intake call.", items: nlFaq }),
  ],
});

/* ------------------------------------------------------------------ write */
const out = path.join(process.cwd(), "public", "p");
fs.mkdirSync(out, { recursive: true });
const files = {
  "services.html": servicesIndex, "about.html": about, "faq.html": faqPage, "netherlands.html": nl,
  ...Object.fromEntries(services.map((s) => [`services-${s.slug}.html`, servicePage(s)])),
};
for (const [name, html] of Object.entries(files)) {
  // a preset diagram is written as data-diagram="<preset>", as on the homepage
  const fixed = html.replace(/<div class="dg" data-diagram( data-dg-still)?><script type="application\/json">\{"preset":"([a-z-]+)"\}<\/script><\/div>/g, '<div class="dg" data-diagram="$2"$1></div>');
  fs.writeFileSync(path.join(out, name), fixed);
}
// the kit's stylesheets as one file, comments stripped
const kit = KIT_CSS.map((f) => fs.readFileSync(path.join(process.cwd(), "public", "assets", f), "utf8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\n\s*\n/g, "\n")).join("\n");
fs.writeFileSync(path.join(out, "kit.css"), FONT_CSS + kit);
console.log("built", Object.keys(files).length, "pages and kit.css,", Math.round(kit.length / 1024), "kB");
