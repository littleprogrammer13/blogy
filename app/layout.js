export const metadata = {
  title: "Blog do Vilor",
  description: "Um blog simples com admin e likes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body style={{ fontFamily: 'sans-serif', margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
