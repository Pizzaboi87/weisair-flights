export const metadata = {
  title: "WeisAIR Flights",
  description:
    "Elevate your senses and discover the enchanting beauty of Hungary, from the sky.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/faviconwa.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
