import { getAllPosts } from "@/lib/blog";
import { projects } from "@/lib/content";

export const dynamic = "force-static";

const BASE_URL = "https://zoyare.com";

export function GET() {
  const posts = getAllPosts()
    .map((p) => `- [${p.title}](${BASE_URL}/blog/${p.slug}): ${p.description}`)
    .join("\n");

  const cases = projects
    .map((p) => `- [${p.title}](${BASE_URL}/portfolio/${p.id}): ${p.short}`)
    .join("\n");

  const body = `# Zoyare

> Zoyare is a software engineering studio (founded 2024, based in the Netherlands, working worldwide) that builds custom software, API integrations, mobile applications and process automation for businesses that need more than off-the-shelf solutions. Clients work directly with the engineer — no layers of project managers. Fixed quotes after a free intake call.

Contact: hello@zoyare.com — or book a call at https://cal.eu/zoyare
Typical response time: within 24 hours.

## Services

- [Custom Software Development](${BASE_URL}/services/custom-software): From requirement to deployment. Small tools from €5k, mid-sized systems €20k–€75k, enterprise platforms €75k+.
- [API & System Integrations](${BASE_URL}/services/api-integrations): REST APIs, platform connectors, data pipelines. Simple connections from €2.5k.
- [Mobile Applications](${BASE_URL}/services/mobile-applications): iOS and Android via React Native. MVPs from €15k.
- [Process Automation](${BASE_URL}/services/process-automation): Automating manual workflows — fewer errors, less time, more control.
- [Project estimator](${BASE_URL}/estimate): Interactive tool for an instant, honest price indication.

## Case studies

${cases}

## Articles

${posts}

## Company

- [About](${BASE_URL}/about): Studio background and way of working.
- [FAQ](${BASE_URL}/faq): Pricing, timelines, technologies and collaboration.
- [Contact](${BASE_URL}/contact): Project inquiries — free consultation.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
