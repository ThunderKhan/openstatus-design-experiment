import { Footer } from "../../content/footer";
import { Header } from "../../content/header";
import { SubNav } from "../../content/sub-nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col gap-4 font-mono">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:border focus:border-ring focus:bg-background focus:px-4 focus:py-3 focus:text-foreground focus:ring-[3px] focus:ring-ring/50 focus:outline-none"
      >
        Skip to main content
      </a>
      <Header />
      <SubNav />
      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 scroll-mt-4 px-4 py-4 focus:outline-none"
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
