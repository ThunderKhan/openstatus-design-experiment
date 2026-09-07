import Link from "next/link";
import type { ReactNode } from "react";

import { ButtonLink } from "./mdx-components/button-link";
import { CustomerLogos } from "./mdx-components/customer-logos";
import { CustomImage } from "./mdx-components/custom-image";
import { Details } from "./mdx-components/details";
import { CustomMDX } from "./mdx";
import type { Metadata as ContentMetadata } from "./utils/schema";

const heroFacts = [
  {
    label: "Public communication",
    value: "Branded status page on your domain",
  },
  {
    label: "Detection",
    value: "Uptime monitoring from 28 regions",
  },
  {
    label: "Audit trail",
    value: "Timestamped incident history",
  },
  {
    label: "Ownership",
    value: "Open source and self-hostable",
  },
] as const;

const incidentFeatures = [
  ["Status reports", "Publish incident updates as they happen."],
  ["Maintenance windows", "Communicate planned changes before they start."],
  ["Subscribers", "Proactively notify stakeholders."],
] as const;

const tooling = [
  {
    name: "CLI",
    href: "/tooling/cli",
    path: "/tooling/cli",
    description: "Keep monitor configuration in YAML and apply it from your repo.",
  },
  {
    name: "API",
    href: "/tooling/api",
    path: "/tooling/api",
    description: "Typed JSON-over-HTTP endpoints with a published OpenAPI spec.",
  },
  {
    name: "MCP server",
    href: "/tooling/mcp-server",
    path: "/tooling/mcp-server",
    description:
      "Let Claude, ChatGPT, Cursor, or another MCP client manage monitoring.",
  },
  {
    name: "Terraform",
    href: "/tooling/terraform",
    path: "/tooling/terraform",
    description: "Version monitors alongside the rest of your infrastructure.",
  },
] as const;

export function Homepage({ metadata }: { metadata: ContentMetadata }) {
  return (
    <>
      <Hero metadata={metadata} />
      <Trust />
      <Monitoring />
      <IncidentCommunication />
      <Tooling />
      <TryNetwork />
      <Faq metadata={metadata} />
    </>
  );
}

function Hero({ metadata }: { metadata: ContentMetadata }) {
  return (
    <section className="border-border overflow-hidden border">
      <div className="grid lg:grid-cols-12">
        <div className="border-border border-b p-5 sm:p-7 lg:col-span-8 lg:border-r lg:border-b-0 lg:p-8">
          <p className="text-muted-foreground mb-8 text-sm">
            Status pages + uptime monitoring
          </p>
          <h1 className="text-foreground max-w-[19ch] text-balance text-3xl leading-[1.08] font-semibold tracking-[-0.035em] sm:text-4xl lg:text-[3.25rem]">
            {metadata.hero ?? metadata.title}
          </h1>
          <p className="text-foreground/75 mt-6 max-w-[62ch] text-base leading-7 sm:text-lg sm:leading-8">
            {metadata.description}
          </p>
          <div className="mt-8 flex flex-col gap-2 sm:flex-row">
            <ButtonLink href="https://app.openstatus.dev" variant="default">
              Create your status page
            </ButtonLink>
            <ButtonLink href="https://openstatus.dev/github" variant="ghost">
              GitHub 8k+
            </ButtonLink>
          </div>
          <p className="text-muted-foreground mt-4 text-sm">
            Free to start. Paid plans from $30/mo. No credit card required.
          </p>
        </div>

        <div className="bg-border grid grid-cols-2 gap-px lg:col-span-4 lg:grid-cols-1">
          {heroFacts.map((fact) => (
            <div key={fact.label} className="bg-background p-4 sm:p-5">
              <p className="text-muted-foreground text-xs">{fact.label}</p>
              <p className="text-foreground mt-2 text-base font-medium">
                {fact.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-border bg-muted/40 border-t p-2 sm:p-4">
        <div className="[&_figcaption]:sr-only [&_figure]:m-0 [&_img]:border-0 [&_img]:outline-0">
          <CustomImage
            src="/assets/landing/statuspage-meow.png"
            alt="OpenStatus status page example"
            priority
          />
        </div>
      </div>

      <div className="bg-border grid gap-px sm:grid-cols-3">
        <EvidenceCell label="Custom domains">
          status.yourcompany.com
        </EvidenceCell>
        <EvidenceCell label="Incident communication">
          Status reports + maintenance windows
        </EvidenceCell>
        <EvidenceCell label="Audience">
          Public or password-protected access
        </EvidenceCell>
      </div>
    </section>
  );
}

function EvidenceCell({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-background p-4">
      <p className="text-muted-foreground text-xs">{label}</p>
      <p className="text-foreground mt-1">{children}</p>
    </div>
  );
}

function Trust() {
  return (
    <section className="border-border mt-4 overflow-hidden border">
      <div className="border-border grid border-b md:grid-cols-[minmax(0,0.8fr)_minmax(0,2.2fr)]">
        <div className="border-border p-4 md:border-r">
          <p className="text-muted-foreground text-xs">Trusted in production</p>
          <p className="text-foreground mt-2 max-w-[24ch] font-medium">
            Teams use OpenStatus to make reliability visible.
          </p>
        </div>
        <div className="[&>div]:my-0 [&>div>*]:p-3">
          <CustomerLogos />
        </div>
      </div>

      <div className="grid sm:grid-cols-3">
        <EvidenceCellWithBorder label="Built by">
          Thibault + Max
        </EvidenceCellWithBorder>
        <EvidenceCellWithBorder label="Company">
          Bootstrapped and self-funded
        </EvidenceCellWithBorder>
        <div className="p-4">
          <p className="text-muted-foreground text-xs">Deployment</p>
          <p className="text-foreground mt-1">Managed SaaS or self-hosted</p>
        </div>
      </div>
    </section>
  );
}

function EvidenceCellWithBorder({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="border-border border-b p-4 sm:border-r sm:border-b-0">
      <p className="text-muted-foreground text-xs">{label}</p>
      <p className="text-foreground mt-1">{children}</p>
    </div>
  );
}

function Monitoring() {
  return (
    <section className="border-border mt-16 border-y">
      <div className="grid lg:grid-cols-12">
        <div className="border-border border-b p-5 sm:p-7 lg:col-span-4 lg:border-r lg:border-b-0">
          <h2 className="text-foreground text-2xl leading-tight font-semibold tracking-tight sm:text-3xl">
            Know before your customers do.
          </h2>
          <p className="text-foreground/70 mt-4 max-w-[42ch] leading-7">
            Monitor endpoints from 28 regions across multiple clouds. When
            something breaks, OpenStatus can alert your team and keep the
            public status page current.
          </p>

          <Link
            href="/uptime-monitoring"
            className="text-foreground hover:bg-muted mt-6 inline-flex border border-border px-3 py-2 text-sm underline decoration-muted-foreground/50 underline-offset-4"
          >
            Uptime monitoring
          </Link>

          <ol className="border-border mt-8 border">
            {[
              "Probe the endpoint",
              "Alert the team",
              "Update the status page",
              "Keep the incident history",
            ].map((step, index) => (
              <li
                key={step}
                className="border-border grid grid-cols-[2.5rem_1fr] border-b last:border-b-0"
              >
                <span className="text-muted-foreground border-border border-r p-3 text-xs">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-foreground p-3 text-sm">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="bg-muted/25 p-2 sm:p-4 lg:col-span-8 lg:p-5">
          <div className="[&_figcaption]:sr-only [&_figure]:m-0 [&_img]:border-0 [&_img]:outline-0">
            <CustomImage
              src="/assets/landing/dashboard-logs.png"
              alt="OpenStatus monitor response logs"
            />
          </div>
        </div>
      </div>

      <div className="bg-border grid gap-px sm:grid-cols-4">
        {["Slack", "Discord", "PagerDuty", "Email"].map((channel) => (
          <div key={channel} className="bg-background p-4">
            <p className="text-foreground">{channel}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function IncidentCommunication() {
  return (
    <section className="border-border mt-16 border">
      <div className="grid lg:grid-cols-12">
        <div className="border-border bg-muted/25 border-b p-2 sm:p-4 lg:col-span-7 lg:border-r lg:border-b-0 lg:p-5">
          <div className="[&_figcaption]:sr-only [&_figure]:m-0 [&_img]:border-0 [&_img]:outline-0">
            <CustomImage
              src="/assets/landing/statuspage-events.png"
              alt="OpenStatus incident and maintenance history"
            />
          </div>
        </div>

        <div className="p-5 sm:p-7 lg:col-span-5">
          <h2 className="text-foreground text-2xl leading-tight font-semibold tracking-tight sm:text-3xl">
            Turn an outage into a documented incident trail.
          </h2>
          <p className="text-foreground/70 mt-4 leading-7">
            Security questionnaires ask how you notify customers during an
            incident. A branded status page gives customers one place to follow
            updates and gives auditors timestamped history they can inspect.
          </p>

          <div className="border-border mt-8 divide-y border">
            {incidentFeatures.map(([label, description]) => (
              <div
                key={label}
                className="grid gap-2 p-4 sm:grid-cols-[9rem_1fr]"
              >
                <span className="text-muted-foreground text-xs">{label}</span>
                <span className="text-foreground text-sm">{description}</span>
              </div>
            ))}
          </div>

          <Link
            href="/status-page"
            className="text-foreground hover:bg-muted mt-6 inline-flex border border-border px-3 py-2 text-sm underline decoration-muted-foreground/50 underline-offset-4"
          >
            Status pages
          </Link>
        </div>
      </div>
    </section>
  );
}

function Tooling() {
  return (
    <section className="mt-16">
      <div className="grid gap-6 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <h2 className="text-foreground max-w-[24ch] text-2xl leading-tight font-semibold tracking-tight sm:text-3xl">
            One API key. Four ways to run OpenStatus.
          </h2>
        </div>
        <p className="text-foreground/70 max-w-[52ch] leading-7 md:col-span-5">
          Every action in the dashboard is reachable programmatically, so the
          same monitoring setup can live in a terminal, an agent, or
          infrastructure as code.
        </p>
      </div>

      <div className="border-border mt-6 border">
        {tooling.map((item, index) => (
          <Link
            key={item.href}
            href={item.href}
            className={`hover:bg-muted grid gap-2 p-4 no-underline sm:grid-cols-[8rem_1fr_auto] sm:items-center ${
              index < tooling.length - 1 ? "border-border border-b" : ""
            }`}
          >
            <span className="text-foreground font-medium">{item.name}</span>
            <span className="text-muted-foreground text-sm">
              {item.description}
            </span>
            <span className="text-foreground text-sm">{item.path}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function TryNetwork() {
  return (
    <section className="border-border mt-16 border">
      <div className="grid md:grid-cols-12">
        <div className="border-border border-b p-5 sm:p-7 md:col-span-7 md:border-r md:border-b-0">
          <h2 className="text-foreground max-w-[22ch] text-2xl leading-tight font-semibold tracking-tight sm:text-3xl">
            Check any URL from every monitoring region before you sign up.
          </h2>
          <p className="text-foreground/70 mt-4 max-w-[54ch] leading-7">
            The Global Speed Checker uses the same probe network that powers
            your monitors. No account and no credit card required.
          </p>
          <div className="mt-7">
            <ButtonLink href="/play/checker">Global Speed Checker</ButtonLink>
          </div>
        </div>

        <div className="bg-border grid gap-px md:col-span-5">
          <div className="bg-background p-5">
            <p className="text-muted-foreground text-xs">Coverage</p>
            <p className="text-foreground mt-2 text-3xl font-semibold tabular-nums">
              28 regions
            </p>
          </div>
          <div className="bg-background p-5">
            <p className="text-muted-foreground text-xs">Signup</p>
            <p className="text-foreground mt-2 text-lg font-medium">
              Not required
            </p>
          </div>
          <div className="bg-background p-5">
            <p className="text-muted-foreground text-xs">Network</p>
            <p className="text-foreground mt-2 text-lg font-medium">
              Same probes as OpenStatus monitors
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Faq({ metadata }: { metadata: ContentMetadata }) {
  const faq = metadata.faq ?? [];

  return (
    <section className="prose dark:prose-invert mt-16 max-w-none">
      <h2>Frequently asked questions</h2>
      {faq.map((item) => (
        <Details key={item.question} summary={item.question} headingLevel={3}>
          <CustomMDX source={item.answer} />
        </Details>
      ))}
    </section>
  );
}
