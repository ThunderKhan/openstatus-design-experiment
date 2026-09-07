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

const trustFacts = [
  ["Built by", "Thibault + Max"],
  ["Company", "Bootstrapped and self-funded"],
  ["Deployment", "Managed SaaS or self-hosted"],
] as const;

const monitoringSteps = [
  "Probe the endpoint",
  "Alert the team",
  "Update the status page",
  "Keep the incident history",
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
      <div className="border-border grid border-b sm:grid-cols-[1fr_auto]">
        <p className="text-muted-foreground px-4 py-3 text-xs">
          Status pages + uptime monitoring
        </p>
        <p className="border-border text-muted-foreground border-t px-4 py-3 text-xs sm:border-t-0 sm:border-l">
          Open source / self-hostable
        </p>
      </div>

      <div className="grid lg:grid-cols-12">
        <div className="border-border border-b p-6 sm:p-8 lg:col-span-8 lg:border-r lg:border-b-0 lg:p-10">
          <h1 className="text-foreground max-w-[18ch] text-balance text-3xl leading-[1.04] font-semibold tracking-[-0.045em] sm:text-5xl lg:text-[3.6rem]">
            {metadata.hero ?? metadata.title}
          </h1>
          <p className="text-foreground/75 mt-7 max-w-[58ch] text-base leading-7 sm:text-lg sm:leading-8">
            {metadata.description}
          </p>
          <div className="mt-9 flex flex-col gap-2 sm:flex-row">
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
            <div
              key={fact.label}
              className="bg-background flex min-h-28 flex-col justify-between p-4 sm:p-5 lg:min-h-0"
            >
              <p className="text-muted-foreground text-[11px]">{fact.label}</p>
              <p className="text-foreground mt-4 max-w-[24ch] text-sm leading-6 font-medium sm:text-base">
                {fact.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-border border-t">
        <ProductEvidenceFrame
          path="/status-page"
          meta="status.yourcompany.com"
          src="/assets/landing/statuspage-meow.png"
          alt="OpenStatus status page example"
          priority
        />
      </div>

      <div className="border-border divide-border grid border-t divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0">
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
      <p className="text-muted-foreground text-[11px]">{label}</p>
      <p className="text-foreground mt-2 text-sm leading-6">{children}</p>
    </div>
  );
}

function ProductEvidenceFrame({
  path,
  meta,
  src,
  alt,
  priority = false,
}: {
  path: string;
  meta: string;
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="bg-muted/20 p-2 sm:p-3">
      <div className="border-border bg-background border">
        <div className="border-border grid grid-cols-[1fr_auto] border-b">
          <p className="text-foreground flex items-center gap-2 px-3 py-2 text-[11px]">
            <span aria-hidden className="bg-foreground size-1.5" />
            {path}
          </p>
          <p className="text-muted-foreground border-border border-l px-3 py-2 text-right text-[11px]">
            {meta}
          </p>
        </div>
        <div className="p-1 sm:p-2 [&_figcaption]:sr-only [&_figure]:m-0 [&_img]:border-0 [&_img]:outline-0">
          <CustomImage src={src} alt={alt} priority={priority} />
        </div>
      </div>
    </div>
  );
}

function SectionRail({ path, meta }: { path: string; meta: string }) {
  return (
    <div className="border-border grid border-b sm:grid-cols-[1fr_auto]">
      <p className="text-foreground px-4 py-3 text-xs">{path}</p>
      <p className="border-border text-muted-foreground border-t px-4 py-3 text-xs sm:border-t-0 sm:border-l">
        {meta}
      </p>
    </div>
  );
}

function Trust() {
  return (
    <section className="border-border mt-5 border-y">
      <div className="grid md:grid-cols-12">
        <div className="border-border border-b p-5 md:col-span-4 md:border-r md:border-b-0 sm:p-6">
          <p className="text-muted-foreground text-xs">/customers</p>
          <p className="text-foreground mt-4 max-w-[25ch] text-lg leading-7 font-medium">
            Teams use OpenStatus to make reliability visible.
          </p>
        </div>
        <div className="md:col-span-8 [&>div]:my-0 [&>div>*]:p-3">
          <CustomerLogos />
        </div>
      </div>

      <div className="border-border divide-border grid border-t divide-y bg-muted/20 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {trustFacts.map(([label, value]) => (
          <div key={label} className="p-3 sm:p-4">
            <p className="text-muted-foreground text-[11px]">{label}</p>
            <p className="text-foreground mt-1 text-sm">{value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Monitoring() {
  return (
    <section className="border-border mt-20 border-y">
      <SectionRail path="/uptime-monitoring" meta="28 monitoring regions" />

      <div className="grid lg:grid-cols-12">
        <div className="border-border border-b p-6 sm:p-7 lg:col-span-5 lg:border-r lg:border-b-0 lg:p-8">
          <h2 className="text-foreground max-w-[17ch] text-2xl leading-[1.12] font-semibold tracking-[-0.03em] sm:text-3xl">
            Know before your customers do.
          </h2>
          <p className="text-foreground/70 mt-5 max-w-[43ch] leading-7">
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

          <ol className="border-border mt-9 border-l pl-4">
            {monitoringSteps.map((step, index) => (
              <li
                key={step}
                className="grid grid-cols-[2rem_1fr] items-baseline gap-3 py-2"
              >
                <span className="text-muted-foreground text-xs tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-foreground text-sm">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="lg:col-span-7">
          <ProductEvidenceFrame
            path="/dashboard/monitor"
            meta="response logs"
            src="/assets/landing/dashboard-logs.png"
            alt="OpenStatus monitor response logs"
          />
        </div>
      </div>

      <div className="bg-border grid grid-cols-2 gap-px sm:grid-cols-4">
        {["Slack", "Discord", "PagerDuty", "Email"].map((channel) => (
          <div key={channel} className="bg-background p-4">
            <p className="text-muted-foreground text-[11px]">Alert channel</p>
            <p className="text-foreground mt-1 text-sm">{channel}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function IncidentCommunication() {
  return (
    <section className="border-border mt-20 border">
      <SectionRail path="/status-page" meta="timestamped incident history" />

      <div className="grid lg:grid-cols-12">
        <div className="border-border border-b lg:col-span-7 lg:border-r lg:border-b-0">
          <ProductEvidenceFrame
            path="/status-page/events"
            meta="incident + maintenance history"
            src="/assets/landing/statuspage-events.png"
            alt="OpenStatus incident and maintenance history"
          />
        </div>

        <div className="p-6 sm:p-7 lg:col-span-5 lg:p-8">
          <h2 className="text-foreground max-w-[18ch] text-2xl leading-[1.12] font-semibold tracking-[-0.03em] sm:text-3xl">
            Turn an outage into a documented incident trail.
          </h2>
          <p className="text-foreground/70 mt-5 leading-7">
            Security questionnaires ask how you notify customers during an
            incident. A branded status page gives customers one place to follow
            updates and gives auditors timestamped history they can inspect.
          </p>

          <div className="border-border mt-9 border-t">
            {incidentFeatures.map(([label, description]) => (
              <div
                key={label}
                className="border-border grid gap-2 border-b py-4 sm:grid-cols-[9rem_1fr]"
              >
                <span className="text-muted-foreground text-[11px]">{label}</span>
                <span className="text-foreground text-sm leading-6">
                  {description}
                </span>
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
    <section className="border-border mt-20 border-y">
      <SectionRail path="/tooling" meta="CLI / API / MCP / Terraform" />

      <div className="grid md:grid-cols-12">
        <div className="border-border border-b p-6 sm:p-7 md:col-span-5 md:border-r md:border-b-0 md:p-8">
          <h2 className="text-foreground max-w-[17ch] text-2xl leading-[1.12] font-semibold tracking-[-0.03em] sm:text-3xl">
            One API key. Four ways to run OpenStatus.
          </h2>
          <p className="text-foreground/70 mt-5 max-w-[40ch] leading-7">
            Every action in the dashboard is reachable programmatically, so the
            same monitoring setup can live in a terminal, an agent, or
            infrastructure as code.
          </p>
        </div>

        <div className="md:col-span-7">
          {tooling.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`hover:bg-muted grid gap-2 p-4 no-underline sm:grid-cols-[7rem_1fr] sm:gap-4 sm:p-5 ${
                index < tooling.length - 1 ? "border-border border-b" : ""
              }`}
            >
              <span className="text-foreground font-medium">{item.name}</span>
              <span className="min-w-0">
                <span className="text-muted-foreground block text-sm leading-6">
                  {item.description}
                </span>
                <span className="text-foreground mt-2 block text-xs">
                  {item.path}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function TryNetwork() {
  return (
    <section className="border-border mt-20 border">
      <SectionRail path="/play/checker" meta="same probe network" />

      <div className="grid md:grid-cols-12">
        <div className="border-border border-b p-6 sm:p-7 md:col-span-7 md:border-r md:border-b-0 md:p-8">
          <h2 className="text-foreground max-w-[20ch] text-2xl leading-[1.12] font-semibold tracking-[-0.03em] sm:text-3xl">
            Check any URL from every monitoring region before you sign up.
          </h2>
          <p className="text-foreground/70 mt-5 max-w-[53ch] leading-7">
            The Global Speed Checker uses the same probe network that powers
            your monitors. No account and no credit card required.
          </p>
          <div className="mt-8">
            <ButtonLink href="/play/checker">Global Speed Checker</ButtonLink>
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="bg-foreground text-background p-6 sm:p-8">
            <p className="text-background/70 text-xs">Monitoring coverage</p>
            <p className="mt-5 text-[4.5rem] leading-none font-semibold tracking-[-0.06em] tabular-nums sm:text-[5.5rem]">
              28
            </p>
            <p className="text-background/80 mt-2 text-sm">regions worldwide</p>
          </div>
          <div className="border-border divide-border grid grid-cols-2 divide-x border-t">
            <div className="p-4">
              <p className="text-muted-foreground text-[11px]">Signup</p>
              <p className="text-foreground mt-1 text-sm">Not required</p>
            </div>
            <div className="p-4">
              <p className="text-muted-foreground text-[11px]">Network</p>
              <p className="text-foreground mt-1 text-sm leading-5">
                Same probes as OpenStatus monitors
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Faq({ metadata }: { metadata: ContentMetadata }) {
  const faq = metadata.faq ?? [];

  return (
    <section className="prose dark:prose-invert mt-20 max-w-none">
      <h2>Frequently asked questions</h2>
      {faq.map((item) => (
        <Details key={item.question} summary={item.question} headingLevel={3}>
          <CustomMDX source={item.answer} />
        </Details>
      ))}
    </section>
  );
}
