export const metadata = {
  title: "WeisAIR Flight",
  description:
    "Elevate your senses and discover Hungary's enchanting beauty from the sky.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
