interface StaggerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Staggered reveal. The container is observed (shared IntersectionObserver in
 * layout.tsx adds `.is-in`); each `StaggerItem` cascades in via the nth-child
 * delays in globals.css. Server components, no client JS.
 */
export function StaggerContainer({ children, className = "" }: StaggerProps) {
  return <div className={`stagger${className ? ` ${className}` : ""}`}>{children}</div>;
}

export function StaggerItem({ children, className = "" }: StaggerProps) {
  return <div className={`stagger-item${className ? ` ${className}` : ""}`}>{children}</div>;
}
