"use client";

import { System, Dark, Light } from "@openstatus/icons";
import { useTheme } from "next-themes";
import type * as React from "react";
import { useEffect, useState } from "react";

import { cn } from "../lib/utils";

const themeButtonClassName =
  "bg-background hover:bg-muted aria-[pressed=true]:bg-foreground aria-[pressed=true]:text-background aria-[pressed=true]:hover:bg-foreground outline-none focus-visible:z-10 focus-visible:ring-[3px] focus-visible:ring-ring/50";

export function ThemeToggle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "bg-border [&>*]:bg-background flex items-center gap-px [&>*]:flex [&>*]:flex-1 [&>*]:items-center [&>*]:justify-center [&>*]:p-4",
          className,
        )}
        {...props}
      >
        <div>
          <Light className="h-6 w-6" />
        </div>
        <div>
          <Dark className="h-6 w-6" />
        </div>
        <div>
          <System className="h-6 w-6" />
        </div>
      </div>
    );
  }

  return (
    <div
      {...props}
      role="group"
      aria-label="Color theme"
      className={cn(
        "bg-border flex items-center gap-px [&>button]:flex [&>button]:flex-1 [&>button]:items-center [&>button]:justify-center [&>button]:p-4",
        className,
      )}
    >
      <button
        type="button"
        className={themeButtonClassName}
        aria-pressed={theme === "light"}
        onClick={() => setTheme("light")}
      >
        [light]
      </button>
      <button
        type="button"
        className={themeButtonClassName}
        aria-pressed={theme === "dark"}
        onClick={() => setTheme("dark")}
      >
        [dark]
      </button>
      <button
        type="button"
        className={themeButtonClassName}
        aria-pressed={theme === "system"}
        onClick={() => setTheme("system")}
      >
        [system]
      </button>
    </div>
  );
}
