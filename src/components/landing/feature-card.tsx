import type { ReactNode } from "react";

type IconType = React.ComponentType<{ className?: string }>;

export default function FeatureCard({
  icon: Icon,
  title,
  children,
}: {
  icon: IconType;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-card/50 border-accent/20 hover:bg-card/70 hover:border-accent/40 hover:shadow-accent/20 rounded-2xl border p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Icon className="text-accent mb-4 h-12 w-12" />
      <h3 className="mb-3 text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground text-base leading-relaxed">
        {children}
      </p>
    </div>
  );
}
