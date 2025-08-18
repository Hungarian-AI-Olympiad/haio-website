import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SiteHeader() {
  return (
    <header className="bg-background/80 sticky top-0 z-40 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          <span className="from-primary to-accent bg-gradient-to-r bg-clip-text text-transparent">
            Móló
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Button asChild variant="default" size="sm">
            <span>Explore</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
