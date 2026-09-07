import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@openstatus/ui/components/ui/dropdown-menu";
import Link from "next/link";

import { headerLinks } from "../data/content";
import { CmdK } from "./cmdk";
import { LogoWithContextMenu } from "./logo-with-context-menu";

export function Header() {
  return (
    <header>
      <nav
        aria-label="Primary"
        className="border-border bg-border [&>*]:bg-background [&>*]:hover:bg-muted grid grid-cols-3 gap-px border lg:grid-cols-6 [&>*]:px-4 [&>*]:py-4 [&>a]:outline-none [&>a]:focus-visible:z-10 [&>a]:focus-visible:ring-[3px] [&>a]:focus-visible:ring-ring/50 [&>button]:outline-none [&>button]:focus-visible:z-10 [&>button]:focus-visible:ring-[3px] [&>button]:focus-visible:ring-ring/50"
      >
        <LogoWithContextMenu />
        {headerLinks.map((section, _) => (
          <DropdownMenu key={section.label}>
            <DropdownMenuTrigger className="group data-[state=open]:bg-muted flex items-center gap-1">
              <span className="w-full truncate text-left">{section.label}</span>
              <span
                className="text-muted-foreground group-hover:text-foreground group-data-[state=open]:text-foreground relative top-[1px] shrink-0 origin-center font-sans text-[10px] transition duration-300 motion-reduce:transition-none group-data-[state=open]:rotate-180"
                aria-hidden="true"
              >
                ▲
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="min-w-[var(--radix-dropdown-menu-trigger-width)] rounded-none"
              alignOffset={0}
              sideOffset={0}
            >
              {section.items.map((item) => (
                <DropdownMenuItem
                  key={item.href}
                  className="rounded-none px-2 py-3 font-mono focus-visible:z-10 focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  asChild
                >
                  <Link href={item.href}>{item.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ))}
        <Link href="/pricing" className="truncate">
          Pricing
        </Link>
        <CmdK />
        <Link
          href="https://app.openstatus.dev/login"
          className="truncate text-blue-700 dark:text-blue-400"
        >
          Dashboard
        </Link>
      </nav>
    </header>
  );
}
