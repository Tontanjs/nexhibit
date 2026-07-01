"use client";

import { Check, Monitor, Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme, type ThemePreference } from "@/components/theme/theme-provider";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  compact?: boolean;
  align?: "start" | "center" | "end";
  className?: string;
};

const themeOptions: Array<{
  value: ThemePreference;
  label: string;
  description: string;
  icon: typeof Sun;
}> = [
  {
    value: "light",
    label: "Light",
    description: "Clean premium university mode",
    icon: Sun,
  },
  {
    value: "dark",
    label: "Dark",
    description: "Aurora premium presentation mode",
    icon: Moon,
  },
  {
    value: "system",
    label: "System",
    description: "Follow this device",
    icon: Monitor,
  },
];

const iconByTheme = {
  light: Sun,
  dark: Moon,
  system: Monitor,
} satisfies Record<ThemePreference, typeof Sun>;

export function ThemeToggle({ compact = false, align = "end", className }: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const CurrentIcon = iconByTheme[theme];
  const label = `Theme: ${theme}${theme === "system" ? ` (${resolvedTheme})` : ""}`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size={compact ? "icon-sm" : "sm"}
          aria-label={label}
          title={label}
          className={cn(
            "theme-toggle-trigger border border-white/10 bg-white/[0.06] text-current shadow-sm backdrop-blur hover:bg-white/[0.12]",
            compact ? "size-9 px-0" : "gap-2 px-3",
            className,
          )}
        >
          <CurrentIcon className="size-4" aria-hidden="true" />
          {compact ? null : <span className="hidden text-xs font-semibold lg:inline">{themeOptions.find((item) => item.value === theme)?.label}</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="theme-menu w-64">
        <DropdownMenuLabel className="text-xs uppercase tracking-wide text-muted-foreground">
          Appearance
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {themeOptions.map((option) => {
          const Icon = option.icon;
          const selected = option.value === theme;

          return (
            <DropdownMenuItem
              key={option.value}
              onSelect={() => setTheme(option.value)}
              className="min-h-11 cursor-pointer gap-3"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-background text-foreground">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold">{option.label}</span>
                <span className="block text-xs text-muted-foreground">{option.description}</span>
              </span>
              {selected ? <Check className="size-4 text-primary" aria-hidden="true" /> : null}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
