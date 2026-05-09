import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Clock,
  Compass,
  Globe,
  LayoutDashboard,
  Map as MapIcon,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const NAV_ITEMS = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/globe", label: "Globe", icon: Globe },
  { to: "/states", label: "US States", icon: MapIcon },
  { to: "/timeline", label: "Timeline", icon: Clock },
  { to: "/explore", label: "Explore", icon: Compass },
];

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { location } = useRouterState();
  const isMobile = useIsMobile();

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && open && (
        <div
          role="button"
          tabIndex={-1}
          className="fixed inset-0 z-30 bg-background/60 backdrop-blur-sm"
          onClick={onClose}
          onKeyDown={(e) => e.key === "Escape" && onClose()}
          aria-label="Close navigation"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-56 flex-col bg-sidebar border-r border-sidebar-border transition-transform duration-200",
          isMobile && !open ? "-translate-x-full" : "translate-x-0",
        )}
        aria-label="Sidebar navigation"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-sidebar-border">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-5 h-5"
              aria-hidden="true"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="oklch(var(--primary-foreground))"
                strokeWidth="1.5"
              />
              <path
                d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"
                stroke="oklch(var(--primary-foreground))"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-sidebar-foreground flex-1">
            Atlas
          </span>
          {isMobile && (
            <button
              type="button"
              onClick={onClose}
              data-ocid="nav.close_sidebar.button"
              aria-label="Close navigation"
              className="text-sidebar-foreground hover:text-foreground transition-smooth"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Nav */}
        <nav
          className="flex-1 overflow-y-auto px-3 py-4 space-y-1"
          aria-label="Main navigation"
        >
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => {
            const isActive =
              to === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                onClick={isMobile ? onClose : undefined}
                data-ocid={`nav.${label.toLowerCase().replace(" ", "_")}.link`}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-sidebar-border">
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            &copy; {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </aside>
    </>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Mobile top bar with hamburger */}
      {isMobile && (
        <header className="fixed top-0 left-0 right-0 z-20 flex items-center gap-3 px-4 h-14 bg-sidebar border-b border-sidebar-border">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            data-ocid="nav.open_sidebar.button"
            aria-label="Open navigation"
            className="text-sidebar-foreground hover:text-foreground transition-smooth"
          >
            <Menu className="w-5 h-5" aria-hidden="true" />
          </button>
          <span className="font-display text-base font-bold tracking-tight text-sidebar-foreground">
            Atlas
          </span>
        </header>
      )}

      <main className={cn("flex-1 min-w-0", isMobile ? "pt-14" : "ml-56")}>
        {children}
      </main>
    </div>
  );
}
