"use client";

import { usePathname } from "next/navigation";
import { AnimatedModel } from "@/components/animated-model";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isRabbitHole = pathname.startsWith("/rabbit-hole");

  if (isRabbitHole) {
    return <div className="relative bg-white z-10">{children}</div>;
  }

  return (
    <>
      <div className="fixed inset-0 z-0">
        <AnimatedModel modelPath="/banana3d.glb" />
      </div>
      <div className="relative bg-black/10 z-10">{children}</div>
    </>
  );
}
