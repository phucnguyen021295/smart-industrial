import type { Metadata } from "next";
import { AntdRegistry } from '@ant-design/nextjs-registry';

// Stores
import { ProviderRedux } from "@/ts-base/reducers/providers";
import { saira } from '@/ts-global/assets/fonts/index';

// Styles
import "./globals.scss";

export const metadata: Metadata = {
  title: "Smart Industrial",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={saira.className}>
        <AntdRegistry>
          <ProviderRedux>
            {children}
          </ProviderRedux>
        </AntdRegistry>
      </body>
    </html>
  );
}
