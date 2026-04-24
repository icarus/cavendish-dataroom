"use client";

import { useEffect } from "react";

export default function RabbitHoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.body.classList.remove("bg-black");
    document.body.classList.add("bg-white");
    return () => {
      document.body.classList.remove("bg-white");
      document.body.classList.add("bg-black");
    };
  }, []);

  return <>{children}</>;
}
