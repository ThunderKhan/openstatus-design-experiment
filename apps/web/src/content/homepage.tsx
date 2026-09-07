import Link from "next/link";
import type { ReactNode } from "react";

import motionStyles from "./homepage-motion.module.css";
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
    <div className={`${motionStyles.root} min-w-0`}>
      <Hero metadata={metadata} />
      <Trust />
      <Monitoring />
      <IncidentCommunication />
      <Tooling />
      <TryNetwork />
      <Faq metadata={metadata} />
    </div>
  );
}

function Hero({ metadata }: { metadata: ContentMetadata }) {
  return (
    <section className="border-border min-w-0 overflow-hidden border">
      <div
        className={`border-border grid border-b sm:grid-cols-[minmax(0,1fr)_auto] ${motionStyles.heroRail}`}
      >
        <p className="text-muted-foreground min-w-0 px-4 py-3 text-xs [overflow-wrap:anywhere]">
          Status pages + uptime monitoring
        </p>
        <p className="border-border text-muted-foreground min-w-0 border-t px-4 py-3 text-xs [overflow-wrap:anywhere] sm:border-t-0 sm:border-l">
          Open source / self-hostable
        </p>
      </div>

      <div className="grid min-w-0 lg:grid-cols-12">
        <div
          className={`border-border min-w-0 border-b p-5 sm:p-7 md:p-8 lg:col-span-8 lg:border-r lg:border-b-0 lg:p-10 ${motionStyles.heroContent}`}
        >
          <h1 className="text-foreground max-w-[18ch] text-balance text-3xl leading-[1.04] font-semibold tracking-[-0.045em] sm:text-4xl md:text-5xl lg:text-[3.6rem]">
            {metadata.hero ?? metadata.title}
          </h1>
          <p className="text-foreground/75 mt-5 max-w-[58ch] text-base leading-7 sm:mt-6 sm:text-lg sm:leading-8 md:mt-7">
            {metadata.description}
          </p>
          <div
            className={`mt-7 flex flex-col gap-2 sm:mt-8 sm:flex-row md:mt-9 [&>a]:w-full sm:[&>a]:w-auto ${motionStyles.ctaGroup}`}
          >
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

        <div className="bg-border grid min-w-0 grid-cols-2 gap-px lg:col-span-4 lg:grid-cols-1">
          {heroFacts.map((fact) => (
            <div
              key={fact.label}
              className="bg-background flex min-h-24 min-w-0 flex-col justify-between p-3 min-[480px]:p-4 sm:min-h-28 sm:p-5 lg:min-h-0"
            >
              <p className="text-muted-foreground text-[11px]">{fact.label}</p>
              <p className="text-foreground mt-3 max-w-[24ch] text-sm leading-6 font-medium [overflow-wrap:anywhere] sm:mt-4 sm:text-base">
                {fact.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className={`border-border min-w-0 border-t ${motionStyles.heroEvidence}`}>
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
    <div className="bg-background min-w-0 p-4">
      <p className="text-muted-foreground text-[11px]">{label}</p>
      <p className="text-foreground mt-2 text-sm leading-6 [overflow-wrap:anywhere]">
        {children}
      </p>
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
    <div
      className={`bg-muted/20 min-w-0 p-1.5 sm:p-2 md:p-3 ${motionStyles.evidenceFrame}`}
    >
      <div className="border-border bg-background min-w-0 overflow-hidden border">
        <div
          className={`border-border grid min-w-0 grid-cols-1 border-b sm:grid-cols-[minmax(0,1fr)_auto] ${motionStyles.evidenceHeader}`}
        >
          <p className="text-foreground flex min-w-0 items-center gap-2 px-3 py-2 text-[11px] [overflow-wrap:anywhere]">
            <span aria-hidden className="bg-foreground size-1.5 shrink-0" />
            {path}
          </p>
          <p className="border-border text-muted-foreground min-w-0 border-t px-3 py-2 text-left text-[11px] [overflow-wrap:anywhere] sm:border-t-0 sm:border-l sm:text-right">
            {meta}
          </p>
        </div>
        <div className="min-w-0 p-1 sm:p-2 [&_figcaption]:sr-only [&_figure]:m-0 [&_figure]:min-w-0 [&_img]:border-0 [&_img]:outline-0">
          <CustomImage src={src} alt={alt} priority={priority} />
        </div>
      </div>
    </div>
  );
}

function SectionRail({ path, meta }: { path: string; meta: string }) {
  return (
    <div className="border-border grid min-w-0 grid-cols-1 border-b md:grid-cols-[minmax(0,1fr)_auto]">
      <p className="text-foreground min-w-0 px-4 py-3 text-xs [overflow-wrap:anywhere]">
        {path}
      </p>
      <p className="border-border text-muted-foreground min-w-0 border-t px-4 py-3 text-xs [overflow-wrap:anywhere] md:border-t-0 md:border-l">
        {meta}
      </p>
    </div>
  );
}

function SectionActionLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`text-foreground hover:bg-muted focus-visible:bg-muted focus-visible:border-ring focus-visible:ring-ring/50 mt-6 inline-flex min-h-11 items-center border border-border px-3 py-2 text-sm underline decoration-muted-foreground/50 underline-offset-4 outline-none focus-visible:ring-[3px] ${motionStyles.inlineAction}`}
    >
      {children}
    </Link>
  );
}

function Trust() {
  return (
    <section
      aria-labelledby="customers-heading"
      className="border-border mt-5 min-w-0 border-y"
    >
      <div className="grid min-w-0 md:grid-cols-12">
        <div className="border-border min-w-0 border-b p-4 sm:p-5 md:col-span-4 md:border-r md:border-b-0 md:p-6">
          <p className="text-muted-foreground text-xs">/customers</p>
          <h2
            id="customers-heading"
            className="text-foreground mt-4 max-w-[25ch] text-balance text-lg leading-7 font-medium"
          >
            Teams use OpenStatus to make reliability visible.
          </h2>
        </div>
        <div className="min-w-0 md:col-span-8 [&>div]:my-0 max-md:[&>div]:grid-cols-2 [&>div>*]:p-3 max-md:[&>div>*]:border-t-0! max-md:[&>div>*]:border-l-0! max-md:[&>div>*]:text-sm max-md:[&>div>*:nth-child(2n+1)]:border-l! md:[&>div>*]:border-t-0! md:[&>div>*]:border-l-0! md:[&>div>*]:text-base [&>div>a]:hover:bg-muted [&>div>a]:focus-visible:bg-muted [&>div>a]:focus-visible:z-10 [&>div>a]:focus-visible:ring-[3px] [&>div>a]:focus-visible:ring-ring/50 [&>div>a]:focus-visible:outline-none">
          <CustomerLogos />
        </div>
      </div>

      <div className="border-border divide-border grid border-t divide-y bg-muted/20 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {trustFacts.map(([label, value]) => (
          <div key={label} className="min-w-0 p-3 sm:p-4">
            <p className="text-muted-foreground text-[11px]">{label}</p>
            <p className="text-foreground mt-1 text-sm [overflow-wrap:anywhere]">
              {value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Monitoring() {
  return (
    <section className="border-border mt-14 min-w-0 border-y sm:mt-16 lg:mt-20">
      <SectionRail path="/uptime-monitoring" meta="28 monitoring regions" />

      <div className="grid min-w-0 lg:grid-cols-12">
        <div className="border-border min-w-0 border-b p-5 sm:p-7 lg:col-span-5 lg:border-r lg:border-b-0 lg:p-8">
          <h2 className="text-foreground max-w-[17ch] text-balance text-2xl leading-[1.12] font-semibold tracking-[-0.03em] sm:text-3xl">
            Know before your customers do.
          </h2>
          <p className="text-foreground/70 mt-5 max-w-[43ch] leading-7">
            Monitor endpoints from 28 regions across multiple clouds. When
            something breaks, OpenStatus can alert your team and keep the
            public status page current.
          </p>

          <SectionActionLink href="/uptime-monitoring">
            Uptime monitoring
          </SectionActionLink>

          <ol className="border-border mt-7 border-l pl-4 sm:mt-9">
            {monitoringSteps.map((step, index) => (
              <li
                key={step}
                className="grid min-w-0 grid-cols-[2rem_minmax(0,1fr)] items-baseline gap-3 py-2"
              >
                <span className="text-muted-foreground text-xs tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-foreground text-sm [overflow-wrap:anywhere]">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="min-w-0 lg:col-span-7">
          <ProductEvidenceFrame
            path="/dashboard/monitor"
            meta="response logs"
            src="/assets/landing/dashboard-logs.png"
            alt="OpenStatus monitor response logs"
          />
        </div>
      </div>

      <div className="border-border bg-border grid grid-cols-2 gap-px border-t sm:grid-cols-4">
        {["Slack", "Discord", "PagerDuty", "Email"].map((channel) => (
          <div key={channel} className="bg-background min-w-0 p-3 sm:p-4">
            <p className="text-muted-foreground text-[11px]">Alert channel</p>
            <p className="text-foreground mt-1 text-sm [overflow-wrap:anywhere]">
              {channel}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function IncidentCommunication() {
  return (
    <section className="border-border mt-14 min-w-0 border sm:mt-16 lg:mt-20">
      <SectionRail path="/status-page" meta="timestamped incident history" />

      <div className="grid min-w-0 lg:grid-cols-12">
        <div className="border-border min-w-0 border-b lg:col-span-7 lg:border-r lg:border-b-0">
          <ProductEvidenceFrame
            path="/status-page/events"
            meta="incident + maintenance history"
            src="/assets/landing/statuspage-events.png"
            alt="OpenStatus incident and maintenance history"
          />
        </div>

        <div className="min-w-0 p-5 sm:p-7 lg:col-span-5 lg:p-8">
          <h2 className="text-foreground max-w-[18ch] text-balance text-2xl leading-[1.12] font-semibold tracking-[-0.03em] sm:text-3xl">
            Turn an outage into a documented incident trail.
          </h2>
          <p className="text-foreground/70 mt-5 leading-7">
            Security questionnaires ask how you notify customers during an
            incident. A branded status page gives customers one place to follow
            updates and gives auditors timestamped history they can inspect.
          </p>

          <div className="border-border mt-7 border-t sm:mt-9">
            {incidentFeatures.map(([label, description]) => (
              <div
                key={label}
                className="border-border grid min-w-0 gap-2 border-b py-4 sm:grid-cols-[9rem_minmax(0,1fr)]"
              >
                <span className="text-muted-foreground text-[11px]">{label}</span>
                <span className="text-foreground text-sm leading-6 [overflow-wrap:anywhere]">
                  {description}
                </span>
              </div>
            ))}
          </div>

          <SectionActionLink href="/status-page">Status pages</SectionActionLink>
        </div>
      </div>
    </section>
  );
}

function Tooling() {
  return (
    <section className="border-border mt-14 min-w-0 border-y sm:mt-16 lg:mt-20">
      <SectionRail path="/tooling" meta="CLI / API / MCP / Terraform" />

      <div className="grid min-w-0 lg:grid-cols-12">
        <div className="border-border min-w-0 border-b p-5 sm:p-7 lg:col-span-5 lg:border-r lg:border-b-0 lg:p-8">
          <h2 className="text-foreground max-w-[17ch] text-balance text-2xl leading-[1.12] font-semibold tracking-[-0.03em] sm:text-3xl">
            One API key. Four ways to run OpenStatus.
          </h2>
          <p className="text-foreground/70 mt-5 max-w-[40ch] leading-7">
            Every action in the dashboard is reachable programmatically, so the
            same monitoring setup can live in a terminal, an agent, or
            infrastructure as code.
          </p>
        </div>

        <div className="min-w-0 lg:col-span-7">
          {tooling.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`hover:bg-muted focus-visible:bg-muted focus-visible:ring-ring/50 relative grid min-h-11 min-w-0 gap-2 p-4 no-underline outline-none focus-visible:z-10 focus-visible:ring-[3px] sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-4 sm:p-5 ${motionStyles.toolRow} ${
                index < tooling.length - 1 ? "border-border border-b" : ""
              }`}
            >
              <span className="text-foreground min-w-0 font-medium [overflow-wrap:anywhere]">
                {item.name}
              </span>
              <span className="min-w-0">
                <span className="text-muted-foreground block text-sm leading-6 [overflow-wrap:anywhere]">
                  {item.description}
                </span>
                <span
                  className={`text-foreground mt-2 block min-w-0 text-xs [overflow-wrap:anywhere] ${motionStyles.toolPath}`}
                >
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
    <section className="border-border mt-14 min-w-0 border sm:mt-16 lg:mt-20">
      <SectionRail path="/play/checker" meta="same probe network" />

      <div className="grid min-w-0 md:grid-cols-12">
        <div className="border-border min-w-0 border-b p-5 sm:p-7 md:col-span-7 md:border-r md:border-b-0 md:p-8">
          <h2 className="text-foreground max-w-[20ch] text-balance text-2xl leading-[1.12] font-semibold tracking-[-0.03em] sm:text-3xl">
            Check any URL from every monitoring region before you sign up.
          </h2>
          <p className="text-foreground/70 mt-5 max-w-[53ch] leading-7">
            The Global Speed Checker uses the same probe network that powers
            your monitors. No account and no credit card required.
          </p>
          <div
            className={`mt-7 sm:mt-8 [&>a]:w-full sm:[&>a]:w-auto ${motionStyles.ctaGroup}`}
          >
            <ButtonLink href="/play/checker">Global Speed Checker</ButtonLink>
          </div>
        </div>

        <div className="min-w-0 md:col-span-5 md:flex md:flex-col">
          <div className="bg-foreground text-background min-w-0 p-5 sm:p-7 md:flex-1 md:p-8">
            <p className="text-background/70 text-xs">Monitoring coverage</p>
            <p className="mt-4 text-[4rem] leading-none font-semibold tracking-[-0.06em] tabular-nums sm:mt-5 sm:text-[4.5rem] md:text-[5.5rem]">
              28
            </p>
            <p className="text-background/80 mt-2 text-sm">regions worldwide</p>
          </div>
          <div className="border-border divide-border grid grid-cols-1 divide-y border-t min-[360px]:grid-cols-2 min-[360px]:divide-x min-[360px]:divide-y-0">
            <div className="min-w-0 p-4">
              <p className="text-muted-foreground text-[11px]">Signup</p>
              <p className="text-foreground mt-1 text-sm">Not required</p>
            </div>
            <div className="min-w-0 p-4">
              <p className="text-muted-foreground text-[11px]">Network</p>
              <p className="text-foreground mt-1 text-sm leading-5 [overflow-wrap:anywhere]">
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
    <section
      className={`prose dark:prose-invert mt-14 min-w-0 max-w-none sm:mt-16 lg:mt-20 [&_summary]:outline-none [&_summary:focus-visible]:bg-muted [&_summary:focus-visible]:ring-ring/50 [&_summary:focus-visible]:ring-[3px] ${motionStyles.faq}`}
    >
      <h2>Frequently asked questions</h2>
      {faq.map((item) => (
        <Details key={item.question} summary={item.question} headingLevel={3}>
          <div className={motionStyles.faqAnswer}>
            <CustomMDX source={item.answer} />
          </div>
        </Details>
      ))}
    </section>
  );
}
