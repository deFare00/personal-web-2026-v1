'use client';

import { PortfolioProvider } from "@/context/PortfolioContext";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PortfolioProvider>{children}</PortfolioProvider>;
}
