import "./globals.css";
import AuthProvider from "../provider/AuthProvider";

export const metadata = {
  title: "Dragon News - Journalism Without Fear or Favour",
  description: "A modern real-time news portal built with Next.js and Firebase Authentication.",
  icons: {
    icon: "/assets/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/logo.png" />
      </head>
      <body className="antialiased min-h-screen bg-white">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
