"use client";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@openstatus/ui/components/ui/context-menu";
import Image from "next/image";
import Link from "next/link";

export function LogoWithContextMenu() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="group" asChild>
        <Link href="/" className="relative flex items-center gap-2">
          <Image
            src="/assets/landing/openstatus-logo.svg"
            alt="openstatus logo"
            width={20}
            height={20}
            className="border-border dark:border-foreground rounded-full border"
          />
          <span className="hidden sm:block">openstatus</span>
          <div className="absolute right-0.5 bottom-0 hidden group-hover:block">
            <span className="text-muted-foreground/50 text-[10px]">
              [right click]
            </span>
          </div>
        </Link>
      </ContextMenuTrigger>
      <ContextMenuContent className="min-w-[var(--radix-dropdown-menu-trigger-width)] rounded-none motion-reduce:animate-none">
        <ContextMenuItem
          className="rounded-none px-2 py-3 font-mono focus-visible:z-10 focus-visible:ring-[3px] focus-visible:ring-ring/50"
          asChild
        >
          <a href="/assets/logos/OpenStatus.svg" download="openstatus.svg">
            Download Name SVG
          </a>
        </ContextMenuItem>
        <ContextMenuItem
          className="rounded-none px-2 py-3 font-mono focus-visible:z-10 focus-visible:ring-[3px] focus-visible:ring-ring/50"
          asChild
        >
          <a
            href="/assets/logos/OpenStatus-Logo.svg"
            download="openstatus-logo.svg"
          >
            Download Logo SVG
          </a>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
